import { Link, useParams } from "react-router-dom"
import OrderStatusBadge from "../../components/OrderStatusBadge"
import { starterOrders } from "../../data/orders"
import { formatMoney } from "../../utils/money"

export default function OrderDetail() {
  const { id } = useParams()
  const order = starterOrders.find(item => item.id === id)

  if (!order) {
    return (
      <main className="page-wrap centered-panel">
        <h1>Order not found</h1>
        <Link to="/account/orders" className="primary-btn">Back to Orders</Link>
      </main>
    )
  }

  return (
    <main className="page-wrap">
      <section className="page-hero small">
        <p className="eyebrow">Order Detail</p>
        <h1>{order.id}</h1>
        <OrderStatusBadge status={order.status} />
      </section>

      <section className="checkout-grid">
        <div className="table-card">
          <h2>Products Purchased</h2>
          <table>
            <thead><tr><th>Item</th><th>Qty</th><th>Price</th></tr></thead>
            <tbody>
              {order.items.map(item => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{formatMoney(item.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <aside className="summary-card">
          <h2>Totals</h2>
          <p><span>Subtotal</span><strong>{formatMoney(order.subtotal)}</strong></p>
          <p><span>Tax</span><strong>{formatMoney(order.tax)}</strong></p>
          <p><span>Shipping</span><strong>{formatMoney(order.shipping)}</strong></p>
          <hr />
          <p><span>Total</span><strong>{formatMoney(order.total)}</strong></p>
          <p><span>Tracking</span><strong>{order.trackingNumber || "Pending"}</strong></p>
        </aside>
      </section>

      <section className="section-block">
        <h2>Order Timeline</h2>
        <div className="timeline-card">
          {order.timeline.map(event => (
            <div key={`${event.date}-${event.label}`}>
              <strong>{event.label}</strong>
              <span>{event.date}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
