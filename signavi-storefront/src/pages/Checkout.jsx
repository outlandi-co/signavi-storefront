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

  const [loading, setLoading] = useState(false)

  const tax = subtotal * 0.0825
  const shipping = 0
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
  }

  const submitOrder = async (event) => {
    event.preventDefault()

    if (cartItems.length === 0) return

    setLoading(true)

    try {
      const payload = {
        ...customerInfo,
        source: "store",
        salesChannel: "signavi_store",
        orderType: "store",
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
                  onChange={(event) => updateQuantity(item.key, Number(event.target.value))}
                />

                <button onClick={() => removeFromCart(item.key)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="totals">
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <p>Tax: ${tax.toFixed(2)}</p>
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
          placeholder="Street"
          value={customerInfo.address.street}
          onChange={(event) => updateAddress("street", event.target.value)}
        />

        <input
          placeholder="City"
          value={customerInfo.address.city}
          onChange={(event) => updateAddress("city", event.target.value)}
        />

        <input
          placeholder="State"
          value={customerInfo.address.state}
          onChange={(event) => updateAddress("state", event.target.value)}
        />

        <input
          placeholder="Zip"
          value={customerInfo.address.zip}
          onChange={(event) => updateAddress("zip", event.target.value)}
        />

        <button
          className="primary-button"
          type="submit"
          disabled={loading || cartItems.length === 0}
        >
          {loading ? "Creating Order..." : "Continue to Payment"}
        </button>
      </form>
    </section>
  )
}
