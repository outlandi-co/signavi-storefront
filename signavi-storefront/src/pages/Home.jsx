import { Link } from "react-router-dom"

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">Signavi Storefront</p>
        <h1>Custom apparel, creative goods, and branded products.</h1>
        <p>
          Shop curated Signavi products connected directly to the same production
          workflow that powers Signavi Studio.
        </p>

        <div className="hero-actions">
          <Link to="/store" className="primary-button">
            Shop Store
          </Link>

          <Link to="/customer-login" className="secondary-button">
            Customer Login
          </Link>
        </div>
      </div>

      <div className="hero-panel">
        <h2>Built for customers</h2>
        <ul>
          <li>Browse products</li>
          <li>Checkout securely</li>
          <li>Receive receipts</li>
          <li>Track order status</li>
        </ul>
      </div>
    </section>
  )
}
