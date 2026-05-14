import { Link, useParams } from "react-router-dom"
import { useEffect } from "react"
import { useCart } from "../context/CartContext.jsx"

export default function Success() {
  const { id } = useParams()
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <section className="page success-page">
      <h1>Payment received</h1>
      <p>Your order was submitted successfully.</p>
      <p>Order ID: {id}</p>

      <Link className="primary-button" to="/my-orders">
        View My Orders
      </Link>
    </section>
  )
}
