const ORDER_ID = /^[0-9a-f]{24}$/i
const APPROVED_HOSTS = new Set([
  "square.link",
  "checkout.square.site"
])

const verifiedPaymentUrl = (payload, orderId) => {
  if (
    payload?.success !== true ||
    payload?.paymentCreated !== true ||
    payload?.paymentCompleted !== false ||
    payload?.retryAuthorized !== false ||
    String(payload?.orderId || "").toLowerCase() !== orderId
  ) {
    throw new Error("Verified payment authorization required.")
  }

  if (
    typeof payload.paymentUrl !== "string" ||
    !payload.paymentUrl.trim()
  ) {
    throw new Error("Verified Square URL missing.")
  }

  let url

  try {
    url = new URL(payload.paymentUrl)
  } catch {
    throw new Error("Invalid Square payment URL.")
  }

  if (
    url.protocol !== "https:" ||
    !APPROVED_HOSTS.has(url.hostname) ||
    url.username ||
    url.password ||
    url.port ||
    url.hash ||
    url.pathname.length <= 1
  ) {
    throw new Error("Unapproved Square payment URL.")
  }

  return url.href
}

export const submitV3Checkout = async ({
  api,
  orderId,
  guestToken,
  signedQuote
}) => {
  if (
    typeof api?.patch !== "function" ||
    typeof orderId !== "string" ||
    !ORDER_ID.test(orderId) ||
    typeof guestToken !== "string" ||
    !guestToken.trim() ||
    !signedQuote ||
    typeof signedQuote !== "object" ||
    Array.isArray(signedQuote)
  ) {
    throw new Error("Valid signed checkout authorization required.")
  }

  const normalizedOrderId = orderId.toLowerCase()

  // Exactly one checkout request. Never retry automatically.
  let response

  try {
    response = await api.patch(
      `/orders/${normalizedOrderId}/checkout`,
      { v3ShippingQuote: signedQuote },
      {
        headers: {
          "x-signavi-guest-checkout-token": guestToken
        }
      }
    )
  } catch (error) {
    if (error?.response?.status !== 423) {
      // Includes 401, 403, timeouts, and unknown network outcomes.
      // Never automatically issue another payment request.
      throw error
    }

    response = error.response
  }

  if (response?.status === 202) {
    const data = response.data

    if (
      data?.success !== true ||
      data?.paymentCreated !== false ||
      data?.squareRequestAuthorized !== false ||
      data?.paymentUrl ||
      data?.checkoutUrl ||
      data?.url
    ) {
      throw new Error("Unsafe checkout preview response.")
    }

    return {
      status: "preview",
      paymentUrl: null
    }
  }

  // A production lock must never produce an authorized redirect.
  if (response?.status === 423) {
    const data = response.data

    if (
      data?.paymentCreated === true ||
      data?.squareRequestAuthorized === true ||
      data?.paymentUrl ||
      data?.checkoutUrl ||
      data?.url
    ) {
      throw new Error("Unsafe production lock response.")
    }

    return {
      status: "locked",
      paymentUrl: null
    }
  }

  if (response?.status !== 200 && response?.status !== 201) {
    throw new Error("Unexpected checkout response.")
  }

  return {
    status: "authorized",
    paymentUrl: verifiedPaymentUrl(
      response.data,
      normalizedOrderId
    )
  }
}