import OrderStatusBadge from "../../components/OrderStatusBadge"
import { starterOrders } from "../../data/orders"
import { formatMoney } from "../../utils/money"

export default function AdminOrders() {
  return (
    <main className="page-wrap">
      <section className="page-hero small">
        <p className="eyebrow">Admin Orders</p>
        <h1>Purchases</h1>
        <p>Track storefront purchases after checkout.</p>
      </section>

      <section className="table-card">
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Total</th>
              <th>Tracking</th>
            </tr>
          </thead>
          <tbody>
            {starterOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td><OrderStatusBadge status={order.status} /></td>
                <td>{formatMoney(order.total)}</td>
                <td>{order.trackingNumber || "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}
