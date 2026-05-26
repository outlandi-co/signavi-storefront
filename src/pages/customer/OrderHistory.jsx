import { Link } from "react-router-dom"
import OrderStatusBadge from "../../components/OrderStatusBadge"
import { starterOrders } from "../../data/orders"
import { formatMoney } from "../../utils/money"

export default function OrderHistory() {
  return (
    <main className="page-wrap">
      <section className="page-hero small">
        <p className="eyebrow">Customer Orders</p>
        <h1>Order History</h1>
        <p>Customers can view storefront purchases just like the Studio customer UI.</p>
      </section>

      <section className="table-card">
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Tracking</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {starterOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td><OrderStatusBadge status={order.status} /></td>
                <td>{formatMoney(order.total)}</td>
                <td>{order.trackingNumber || "Pending"}</td>
                <td><Link to={`/account/orders/${order.id}`}>View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}
