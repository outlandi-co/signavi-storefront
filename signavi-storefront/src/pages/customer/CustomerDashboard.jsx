import { Link } from "react-router-dom"

export default function CustomerDashboard() {
  const user = JSON.parse(localStorage.getItem("customerUser") || "null")

  return (
    <section className="page">
      <div className="page-header">
        <p className="eyebrow">Customer Portal</p>
        <h1>Welcome{user?.name ? `, ${user.name}` : ""}</h1>
        <p>Track orders, view status updates, and contact support.</p>
      </div>

      <div className="dashboard-grid">
        <Link className="dashboard-card" to="/my-orders">
          <h2>My Orders</h2>
          <p>View order status and production updates.</p>
        </Link>

        <Link className="dashboard-card" to="/store">
          <h2>Shop More</h2>
          <p>Return to the Signavi storefront.</p>
        </Link>

        <Link className="dashboard-card" to="/support">
          <h2>Support</h2>
          <p>Ask a question about your order.</p>
        </Link>
      </div>
    </section>
  )
}
