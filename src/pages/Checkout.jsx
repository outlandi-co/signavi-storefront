import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { formatMoney } from "../utils/money"

export default function Checkout() {
  const { cartItems, totals, clearCart } = useCart()
  const [placed, setPlaced] = useState(false)

  const handleSubmit = event => {
    event.preventDefault()
    setPlaced(true)
    clearCart()
  }

  if (placed) {
    return (
      <main className="page-wrap centered-panel">
        <p className="eyebrow">Order Received</p>
        <h1>Thank you for your purchase.</h1>
        <p>Your storefront order was created. Connect Square later to process live payments.</p>
        <Link to="/account/orders" className="primary-btn">View Order History</Link>
      </main>
    )
  }

  return (
    <main className="page-wrap">
      <section className="page-hero small">
        <p className="eyebrow">Checkout</p>
        <h1>Complete Purchase</h1>
        <p>Starter checkout UI. Square payment link integration can connect to your backend next.</p>
      </section>

      <form className="checkout-grid" onSubmit={handleSubmit}>
        <div className="form-card">
          <h2>Customer Info</h2>
          <input required placeholder="Full name" />
          <input required type="email" placeholder="Email address" />
          <input required placeholder="Phone" />

          <h2>Shipping Address</h2>
          <input required placeholder="Street address" />
          <input required placeholder="City" />
          <div className="two-col">
            <input required placeholder="State" />
            <input required placeholder="ZIP" />
          </div>

          <button disabled={cartItems.length === 0} className="primary-btn full">
            Place Starter Order
          </button>
        </div>

        <aside className="summary-card">
          <h2>Summary</h2>
          {cartItems.map(item => (
            <p key={item.key}><span>{item.name} x{item.quantity}</span><strong>{formatMoney(item.price * item.quantity)}</strong></p>
          ))}
          <hr />
          <p><span>Total</span><strong>{formatMoney(totals.total)}</strong></p>
        </aside>
      </form>
    </main>
  )
}
