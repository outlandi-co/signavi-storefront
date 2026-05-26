import { Link } from "react-router-dom"
import { Package, ReceiptText, Truck } from "lucide-react"
import { starterOrders } from "../../data/orders"
import { formatMoney } from "../../utils/money"

export default function Account() {
  const totalSpent = starterOrders.reduce((sum, order) => sum + order.total, 0)

  return (
    <main className="page-wrap">
      <section className="page-hero small">
        <p className="eyebrow">Customer Dashboard</p>
        <h1>Welcome back</h1>
        <p>View order history, receipts, tracking, and storefront purchases.</p>
      </section>

      <section className="metric-grid">
        <div className="metric-card"><Package /><span>Total Orders</span><strong>{starterOrders.length}</strong></div>
        <div className="metric-card"><ReceiptText /><span>Total Spent</span><strong>{formatMoney(totalSpent)}</strong></div>
        <div className="metric-card"><Truck /><span>Active Shipments</span><strong>{starterOrders.filter(order => order.status !== "delivered").length}</strong></div>
      </section>

      <Link to="/account/orders" className="primary-btn">View Order History</Link>
    </main>
  )
}
