import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api.js"
import { useCart } from "../context/CartContext.jsx"

export default function Checkout() {
  const navigate = useNavigate()
  const { cartItems, subtotal, updateQuantity, removeFromCart } = useCart()

  const [customerInfo, setCustomerInfo] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "US"
    }
  })

  const [rates, setRates] = useState([])
  const [selectedRate, setSelectedRate] = useState(null)
  const [loadingRates, setLoadingRates] = useState(false)
  const [loading, setLoading] = useState(false)

  const tax = subtotal * 0.0825
  const shipping = selectedRate ? Number(selectedRate.amount || 0) : 0
  const total = subtotal + tax + shipping

  const updateField = (field, value) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const updateAddress = (field, value) => {
    setCustomerInfo(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }))

    setRates([])
    setSelectedRate(null)
  }

  const getShippingRates = async () => {
    const { customerName, address } = customerInfo

    if (
      !customerName ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.zip
    ) {
      alert("Please enter your full shipping address first.")
      return
    }

    setLoadingRates(true)

    try {
      const res = await api.post("/shipping/get-rates", {
        address_to: {
          name: customerName,
          street1: address.street,
          city: address.city,
          state: address.state,
          zip: address.zip,
          country: address.country || "US"
        }
      })

      const returnedRates = res.data?.rates || []

      setRates(returnedRates)

      if (returnedRates.length > 0) {
        setSelectedRate(returnedRates[0])
      }
    } catch (err) {
      console.error("SHIPPING RATE ERROR:", err)
      alert(err.response?.data?.message || "Failed to get shipping rates")
    } finally {
      setLoadingRates(false)
    }
  }

  const submitOrder = async (event) => {
    event.preventDefault()

    if (cartItems.length === 0) return

    if (!selectedRate) {
      alert("Please choose a shipping option before continuing.")
      return
    }

    setLoading(true)

    try {
      const payload = {
        ...customerInfo,
        source: "store",
        salesChannel: "signavi_store",
        orderType: "store",
        shippingCost: shipping,
        shippingRateId: selectedRate.object_id,
        shippingProvider: selectedRate.provider,
        shippingService: selectedRate.servicelevel?.name || selectedRate.servicelevel?.token,
        shippingDays: selectedRate.estimated_days,
        shippingRate: selectedRate,
        items: cartItems.map(item => ({
          productId: item.productId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          variant: item.variant
        }))
      }

      const res = await api.post("/orders", payload)

      const orderId = res.data?.data?._id || res.data?._id

      if (!orderId) {
        throw new Error("Order ID missing")
      }

      localStorage.setItem("customerEmail", customerInfo.email.toLowerCase())

      navigate(`/client-checkout/${orderId}`)
    } catch (err) {
      console.error("CHECKOUT ERROR:", err)
      alert(err.response?.data?.message || "Checkout failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="checkout-page">
      <div>
        <h1>Checkout</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-list">
            {cartItems.map(item => (
              <div key={item.key} className="cart-row">
                <div>
                  <strong>{item.name}</strong>
                  <p>${Number(item.price).toFixed(2)}</p>
                </div>

                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(event) =>
                    updateQuantity(item.key, Number(event.target.value))
                  }
                />

                <button
                  type="button"
                  onClick={() => removeFromCart(item.key)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="totals">
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <p>Tax: ${tax.toFixed(2)}</p>
          <p>Shipping: ${shipping.toFixed(2)}</p>
          <h3>Total: ${total.toFixed(2)}</h3>
        </div>
      </div>

      <form className="checkout-form" onSubmit={submitOrder}>
        <h2>Customer Info</h2>

        <input
          required
          placeholder="Full name"
          value={customerInfo.customerName}
          onChange={(event) => updateField("customerName", event.target.value)}
        />

        <input
          required
          type="email"
          placeholder="Email"
          value={customerInfo.email}
          onChange={(event) => updateField("email", event.target.value)}
        />

        <input
          placeholder="Phone"
          value={customerInfo.phone}
          onChange={(event) => updateField("phone", event.target.value)}
        />

        <input
          required
          placeholder="Street"
          value={customerInfo.address.street}
          onChange={(event) => updateAddress("street", event.target.value)}
        />

        <input
          required
          placeholder="City"
          value={customerInfo.address.city}
          onChange={(event) => updateAddress("city", event.target.value)}
        />

        <input
          required
          placeholder="State"
          value={customerInfo.address.state}
          onChange={(event) => updateAddress("state", event.target.value)}
        />

        <input
          required
          placeholder="Zip"
          value={customerInfo.address.zip}
          onChange={(event) => updateAddress("zip", event.target.value)}
        />

        <button
          type="button"
          className="primary-button"
          onClick={getShippingRates}
          disabled={loadingRates || cartItems.length === 0}
        >
          {loadingRates ? "Getting Shipping..." : "Get Shipping Options"}
        </button>

        {rates.length > 0 && (
          <div className="shipping-options">
            <h3>Shipping Options</h3>

            {rates.map(rate => (
              <label
                key={rate.object_id}
                className="shipping-rate"
              >
                <input
                  type="radio"
                  name="shippingRate"
                  checked={selectedRate?.object_id === rate.object_id}
                  onChange={() => setSelectedRate(rate)}
                />

                <span>
                  <strong>
                    {rate.provider} {rate.servicelevel?.name}
                  </strong>
                  <br />
                  ${Number(rate.amount || 0).toFixed(2)}
                  {rate.estimated_days
                    ? ` • ${rate.estimated_days} day(s)`
                    : ""}
                </span>
              </label>
            ))}
          </div>
        )}

        <button
          className="primary-button"
          type="submit"
          disabled={loading || cartItems.length === 0 || !selectedRate}
        >
          {loading ? "Creating Order..." : "Continue to Payment"}
        </button>
      </form>
    </section>
  )
}