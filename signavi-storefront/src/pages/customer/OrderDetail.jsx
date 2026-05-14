import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../services/api.js"

export default function OrderDetail() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const res = await api.get(`/orders/${id}`)
        setOrder(res.data?.data || res.data)
      } catch (err) {
        console.error("ORDER DETAIL ERROR:", err)
      }
    }

    loadOrder()
  }, [id])

  if (!order) {
    return <section className="page">Loading order...</section>
  }

  return (
    <section className="page">
      <h1>Order Detail</h1>

      <div className="detail-card">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Payment:</strong> {order.paymentStatus}</p>
        <p><strong>Total:</strong> ${Number(order.finalPrice || 0).toFixed(2)}</p>

        {order.trackingNumber && (
          <p><strong>Tracking:</strong> {order.trackingNumber}</p>
        )}
      </div>

      <h2>Timeline</h2>

      <div className="timeline">
        {(order.timeline || []).map((entry, index) => (
          <div key={`${entry.status}-${index}`} className="timeline-item">
            <strong>{entry.status}</strong>
            <span>{entry.date ? new Date(entry.date).toLocaleString() : ""}</span>
            {entry.note && <p>{entry.note}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}
