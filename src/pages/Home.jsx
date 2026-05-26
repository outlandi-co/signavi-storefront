import { Link } from "react-router-dom"
import { PackageCheck, ShieldCheck, Truck } from "lucide-react"
import ProductCard from "../components/ProductCard"
import { products } from "../data/products"

export default function Home() {
  const featured = products.filter(product => product.featured)

  return (
    <main>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">SignaVi Storefront</p>
          <h1>Premade products, ready to buy.</h1>
          <p>
            Apparel, engraved goods, gifts, and branded drops with the same SignaVi Studio experience.
          </p>
          <div className="hero-actions">
            <Link to="/store" className="primary-btn">Shop Store</Link>
            <Link to="/account/orders" className="secondary-btn">View Order History</Link>
          </div>
        </div>

        <div className="hero-panel">
          <span>Store Workflow</span>
          <h2>Buy → Fulfill → Ship</h2>
          <p>
            Customers purchase premade items. Admin tracks orders through the fulfillment board, shipping, and revenue dashboard.
          </p>
        </div>
      </section>

      <section className="feature-grid">
        <div className="feature-card"><PackageCheck /><h3>Premade Items</h3><p>No custom quotes. Products are ready for checkout.</p></div>
        <div className="feature-card"><ShieldCheck /><h3>Customer Accounts</h3><p>Order history, receipts, and tracking in one place.</p></div>
        <div className="feature-card"><Truck /><h3>Shipping Workflow</h3><p>Admin can manage fulfillment, tracking, and delivery status.</p></div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Featured</p>
          <h2>Ready-to-buy products</h2>
        </div>
        <div className="product-grid">
          {featured.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </main>
  )
}
