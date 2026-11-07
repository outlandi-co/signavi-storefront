import { useEffect, useState } from "react"
import api from "../services/api"
import {
  beginStorefrontCreationAttempt,
  markStorefrontCreationAttempt
} from "../utils/storefrontCreationAttempt.mjs"
import { saveGuestCheckoutToken, getGuestCheckoutToken } from "../utils/guestCheckoutSession.mjs"
import { requestV3ShippingOptions } from "../utils/requestV3ShippingOptions.mjs"
import { submitV3Checkout } from "../utils/submitV3Checkout.mjs"
import {
  beginBuyNowCreation,
  getBuyNowCreationState,
  markBuyNowCreationUncertain,
  markBuyNowCreationCreated
} from "../utils/buyNowCreationGuard.mjs"
import { useNavigate } from "react-router-dom"
import { getBuyNowDraft } from "../utils/buyNowDraft.mjs"
import { buildBuyNowStoreOrder } from "../utils/buildBuyNowStoreOrder.mjs"

const getCustomer = () => {
  let user = null

  try {
    user = JSON.parse(localStorage.getItem("customerUser") || "null")
  } catch {
    user = null
  }

  return {
    customerName: String(user?.name || user?.customerName || ""),
    email: String(user?.email || ""),
    phone: String(user?.phone || ""),
    street: String(user?.address?.street || ""),
    city: String(user?.address?.city || ""),
    state: String(user?.address?.state || ""),
    zip: String(user?.address?.zip || ""),
    country: String(user?.address?.country || "US")
  }
}

const fields = [
  ["customerName", "Full name"],
  ["email", "Email address"],
  ["phone", "Phone (optional)"],
  ["street", "Street address"],
  ["city", "City"],
  ["state", "State (two letters)"],
  ["zip", "ZIP code"],
  ["country", "Country code"]
]

export default function BuyNowCheckout() {
  const navigate = useNavigate()
  const [draft] = useState(() => getBuyNowDraft())
  const [customer, setCustomer] = useState(getCustomer)
  const [error, setError] = useState("")
  const [ready, setReady] = useState(false)

  const updateField = (field, value) => {
    setCustomer((prev) => ({
      ...prev,
      [field]: value
    }))
    setReady(false)
    setError("")
  }

  const [creatingOrder, setCreatingOrder] = useState(false)
  const [createdOrderId, setCreatedOrderId] = useState(null)
  const [creationState, setCreationState] = useState(
    () => getBuyNowCreationState()
  )

  useEffect(() => {
    const existing = getBuyNowCreationState()

    if (existing?.status !== "created") {
      return
    }

    const orderId = existing.orderId

    if (
      typeof orderId !== "string" ||
      !/^[a-f0-9]{24}$/i.test(orderId) ||
      !getGuestCheckoutToken(orderId)
    ) {
      setError(
        "An existing order requires recovery. " +
        "Do not create another order."
      )
      return
    }

    setCreatedOrderId(orderId)
    setReady(true)
    setError("")
  }, [])
  const [shippingOptions, setShippingOptions] = useState([])
  const [selectedShippingOption, setSelectedShippingOption] = useState(null)
  const [loadingShipping, setLoadingShipping] = useState(false)
  const [submittingCheckout, setSubmittingCheckout] = useState(false)
  const [checkoutOutcome, setCheckoutOutcome] = useState("")

  const continueToPayment = async () => {
    if (
      !createdOrderId ||
      !selectedShippingOption ||
      submittingCheckout ||
      checkoutOutcome
    ) {
      return
    }

    setSubmittingCheckout(true)
    setError("")

    try {
      const guestToken = getGuestCheckoutToken(createdOrderId)

      if (!guestToken) {
        throw new Error("Checkout session unavailable.")
      }

      const outcome = await submitV3Checkout({
        api,
        orderId: createdOrderId,
        guestToken,
        signedQuote: selectedShippingOption.signedQuote
      })

      if (outcome.status === "preview") {
        setCheckoutOutcome("preview")
        return
      }

      if (outcome.status === "locked") {
        setCheckoutOutcome("locked")
        return
      }

      if (
        outcome.status === "authorized" &&
        outcome.paymentUrl
      ) {
        setCheckoutOutcome("authorized")
        window.location.assign(outcome.paymentUrl)
        return
      }

      throw new Error("Checkout authorization was not returned.")
    } catch {
      // An unknown payment result must not invite an automatic retry.
      setCheckoutOutcome("uncertain")
      setError(
        "Checkout could not be confirmed. Please contact support before retrying payment."
      )
    } finally {
      setSubmittingCheckout(false)
    }
  }

  const loadShippingOptions = async () => {
    if (!createdOrderId || loadingShipping) return

    setLoadingShipping(true)
    setError("")
    setShippingOptions([])
    setSelectedShippingOption(null)

    try {
      const guestToken = getGuestCheckoutToken(createdOrderId)

      if (!guestToken) {
        throw new Error(
          "Checkout session unavailable. Do not create another order."
        )
      }

      const options = await requestV3ShippingOptions({
        api,
        orderId: createdOrderId,
        guestToken
      })

      setShippingOptions(options)
    } catch (err) {
      // Do not print response bodies or guest tokens.
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Shipping options are unavailable."
      )
    } finally {
      setLoadingShipping(false)
    }
  }

  const validate = async (event) => {
    event.preventDefault()

    if (creatingOrder || createdOrderId || creationState) return

    let requestStarted = false

    try {
      if (!draft) {
        throw new Error(
          "Buy Now selection missing. Please return to the store."
        )
      }

      const payload = buildBuyNowStoreOrder(draft, customer)

      if (!beginBuyNowCreation()) {
        setCreationState(
          getBuyNowCreationState() || { status: "uncertain" }
        )
        throw new Error(
          "An earlier order attempt requires review."
        )
      }

      // Preserve the same attempt identity if the request becomes
      // uncertain. Never silently generate another purchase attempt.
      const attemptHeaders =
        beginStorefrontCreationAttempt("buy-now")

      setCreationState({ status: "pending" })
      setError("")
      setReady(false)
      setCreatingOrder(true)

      requestStarted = true
      const response = await api.post(
        "/orders",
        payload,
        { headers: attemptHeaders }
      )

      const orderId = response.data?.data?._id
      const checkoutToken = response.data?.checkoutToken

      if (
        response.status !== 201 ||
        response.data?.success !== true ||
        typeof orderId !== "string" ||
        !/^[a-f0-9]{24}$/i.test(orderId) ||
        typeof checkoutToken !== "string" ||
        !checkoutToken.trim()
      ) {
        throw new Error(
          "Order checkout authorization was not returned."
        )
      }

      if (!saveGuestCheckoutToken(orderId, checkoutToken)) {
        throw new Error(
          "Could not preserve your checkout session. Do not retry yet."
        )
      }

      if (
        !markStorefrontCreationAttempt(
          "buy-now",
          "created"
        )
      ) {
        throw new Error(
          "Purchase attempt recovery state could not be saved."
        )
      }

      if (!markBuyNowCreationCreated(orderId)) {
        throw new Error("Order recovery state could not be saved.")
      }

      setCreationState({
        status: "created",
        orderId
      })
      setCreatedOrderId(orderId)
      setReady(true)
    } catch {
      if (requestStarted) {
        try {
          markStorefrontCreationAttempt(
            "buy-now",
            "uncertain"
          )
        } catch {
          // Existing Buy Now guard remains the final safety boundary.
        }

        markBuyNowCreationUncertain()
        setCreationState(
          getBuyNowCreationState() || { status: "uncertain" }
        )
        setError(
          "Order creation could not be confirmed. " +
          "Do not create another order until this is reviewed."
        )
      } else {
        setError(
          "Checkout information is invalid or an earlier " +
          "order attempt requires review."
        )
      }
    } finally {
      setCreatingOrder(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#020617] px-6 py-16 text-white">
      <section className="mx-auto max-w-3xl">
        <button
          type="button"
          onClick={() => navigate("/store")}
          className="mb-8 text-sm font-semibold text-cyan-300"
        >
          Back to Store
        </button>

        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
          <h1 className="mb-3 text-3xl font-extrabold">
            Buy Now — Shipping Information
          </h1>

          <p className="mb-6 text-sm text-slate-400">
            Enter your shipping information before creating the order.
          </p>

          {!draft ? (
            <p className="rounded-xl border border-amber-500/30 p-4 text-amber-300">
              Your Buy Now selection was not found. Return to the store
              and select your product again.
            </p>
          ) : (
            <>
              <p className="mb-6 text-sm text-cyan-300">
                Selected quantity: {draft.quantity}
              </p>

              <form onSubmit={validate} className="grid gap-4">
                {fields.map(([field, label]) => (
                  <label key={field} className="grid gap-2">
                    <span className="text-sm text-slate-300">
                      {label}
                    </span>
                    <input
                      name={field}
                      type={field === "email" ? "email" : "text"}
                      value={customer[field]}
                      onChange={(event) =>
                        updateField(field, event.target.value)
                      }
                      className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
                    />
                  </label>
                ))}

                {error && (
                  <p role="alert" className="text-sm text-red-300">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={creatingOrder || Boolean(createdOrderId) || Boolean(creationState)}
                  className="rounded-xl bg-cyan-500 px-5 py-4 font-bold text-black disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {creatingOrder ? "Preparing order..." : createdOrderId ? "Order prepared" : creationState ? "Order attempt requires review" : "Prepare Order"}
                </button>

                {creationState && !ready && (
                  <p role="alert" className="text-sm text-amber-300">
                    An order creation attempt exists in this browser session.
                    Do not submit another order until its status is verified.
                  </p>
                )}

                {ready && createdOrderId && (
                  <div className="grid gap-4 rounded-xl border border-slate-700 p-4">
                    <p role="status" className="text-sm text-emerald-300">
                      Order prepared. Select a verified shipping option.
                      No payment has been created.
                    </p>

                    <button
                      type="button"
                      disabled={loadingShipping}
                      onClick={loadShippingOptions}
                      className="rounded-xl bg-cyan-500 px-5 py-3 font-bold text-black disabled:opacity-50"
                    >
                      {loadingShipping ? "Loading shipping..." : "Get V3 Shipping Options"}
                    </button>

                    {shippingOptions.length > 0 && (
                      <div className="grid gap-3">
                        <h2 className="font-bold">Available Shipping</h2>

                        {shippingOptions.map((option, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setSelectedShippingOption(option)}
                            className={`rounded-xl border p-4 text-left ${
                              selectedShippingOption === option
                                ? "border-emerald-400"
                                : "border-slate-700"
                            }`}
                          >
                            <span className="font-semibold">
                              {option.carrier || "Carrier"}
                            </span>
                            <span className="ml-3 text-slate-300">
                              {option.serviceName ||
                                option.serviceToken ||
                                "Shipping"}
                            </span>
                            <span className="ml-3 font-bold">
                              {option.amount} {option.currency || "USD"}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}

                    {selectedShippingOption && !checkoutOutcome && (
                      <button
                        type="button"
                        disabled={submittingCheckout}
                        onClick={continueToPayment}
                        className="rounded-xl bg-emerald-500 px-5 py-4 font-bold text-black disabled:opacity-50"
                      >
                        {submittingCheckout
                          ? "Verifying checkout..."
                          : "Continue to Secure Payment"}
                      </button>
                    )}

                    {checkoutOutcome === "preview" && (
                      <p role="status" className="text-sm text-amber-300">
                        Sandbox checkout preview completed.
                        No payment was created.
                      </p>
                    )}

                    {checkoutOutcome === "locked" && (
                      <p role="status" className="text-sm text-amber-300">
                        Production checkout is currently locked.
                        No payment was created.
                      </p>
                    )}

                    {checkoutOutcome === "uncertain" && (
                      <p role="alert" className="text-sm text-red-300">
                        Payment status could not be confirmed.
                        Do not retry checkout until it has been reviewed.
                      </p>
                    )}
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
