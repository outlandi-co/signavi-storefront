import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../../services/api.js"

export default function CustomerOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("customerUser") || "null")
        const email = user?.email || localStorage.getItem("customerEmail")

        const res = await api.get("/orders/my-orders", {
          params: { email }
        })

        setOrders(res.data?.data || res.data || [])
      } catch (err) {
        console.error("CUSTOMER ORDERS ERROR:", err)
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [])

  return (
    <section className="page">
      <h1>My Orders</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <div className="order-list">
          {orders.map(order => (
            <Link
              key={order._id}
              className="order-card"
              to={`/order/${order._id}`}
            >
              <strong>Order #{order._id}</strong>
              <span>Status: {order.status}</span>
              <span>Total: ${Number(order.finalPrice || 0).toFixed(2)}</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
