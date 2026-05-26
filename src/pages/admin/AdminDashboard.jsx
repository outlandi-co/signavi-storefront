import { Link } from "react-router-dom"
import { Boxes, ChartNoAxesCombined, Truck, Users } from "lucide-react"
import { starterOrders } from "../../data/orders"
import { products } from "../../data/products"
import { formatMoney } from "../../utils/money"

export default function AdminDashboard() {
  const revenue = starterOrders.reduce((sum, order) => sum + order.total, 0)
  const tax = starterOrders.reduce((sum, order) => sum + order.tax, 0)

  return (
    <main className="page-wrap">
      <section className="page-hero small">
        <p className="eyebrow">Admin</p>
        <h1>Storefront Dashboard</h1>
        <p>Manage premade products, purchases, revenue, shipping, and fulfillment workflow.</p>
      </section>

      <section className="metric-grid">
        <div className="metric-card"><ChartNoAxesCombined /><span>Revenue</span><strong>{formatMoney(revenue)}</strong></div>
        <div className="metric-card"><Boxes /><span>Products</span><strong>{products.length}</strong></div>
        <div className="metric-card"><Truck /><span>Orders</span><strong>{starterOrders.length}</strong></div>
        <div className="metric-card"><Users /><span>Tax Collected</span><strong>{formatMoney(tax)}</strong></div>
      </section>

      <section className="admin-link-grid">
        <Link to="/admin/products">Product Manager</Link>
        <Link to="/admin/orders">Orders</Link>
        <Link to="/admin/fulfillment">Fulfillment Board</Link>
        <Link to="/admin/revenue">Revenue</Link>
        <Link to="/admin/shipping">Shipping</Link>
      </section>
    </main>
  )
}
