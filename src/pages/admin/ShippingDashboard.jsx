import { starterOrders } from "../../data/orders"

export default function ShippingDashboard() {
  return (
    <main className="page-wrap">
      <section className="page-hero small">
        <p className="eyebrow">Shipping</p>
        <h1>Shipping Dashboard</h1>
        <p>Track shipping status and add tracking numbers after connecting Shippo or your carrier workflow.</p>
      </section>

      <section className="table-card">
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Tracking</th>
            </tr>
          </thead>
          <tbody>
            {starterOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.status}</td>
                <td>{order.trackingNumber || "Needs tracking"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}
