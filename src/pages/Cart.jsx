import { Link } from "react-router-dom"
import { Trash2 } from "lucide-react"
import { useCart } from "../context/CartContext"
import { formatMoney } from "../utils/money"

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totals } = useCart()

  return (
    <main className="page-wrap">
      <section className="page-hero small">
        <p className="eyebrow">Cart</p>
        <h1>Your Cart</h1>
        <p>Review premade items before checkout.</p>
      </section>

      {cartItems.length === 0 ? (
        <div className="empty-card">
          <h2>Your cart is empty</h2>
          <Link to="/store" className="primary-btn">Shop Products</Link>
        </div>
      ) : (
        <section className="checkout-grid">
          <div className="cart-list">
            {cartItems.map(item => (
              <div className="cart-row" key={item.key}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.size} / {item.color}</p>
                  <strong>{formatMoney(item.price)}</strong>
                </div>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={event => updateQuantity(item.key, event.target.value)}
                />
                <button className="danger-btn" onClick={() => removeFromCart(item.key)}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <aside className="summary-card">
            <h2>Order Summary</h2>
            <p><span>Subtotal</span><strong>{formatMoney(totals.subtotal)}</strong></p>
            <p><span>Tax</span><strong>{formatMoney(totals.tax)}</strong></p>
            <p><span>Shipping</span><strong>{formatMoney(totals.shipping)}</strong></p>
            <hr />
            <p><span>Total</span><strong>{formatMoney(totals.total)}</strong></p>
            <Link to="/checkout" className="primary-btn full">Checkout</Link>
          </aside>
        </section>
      )}
    </main>
  )
}
