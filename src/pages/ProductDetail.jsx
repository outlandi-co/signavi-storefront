import { useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { products } from "../data/products"
import { useCart } from "../context/CartContext"
import { formatMoney } from "../utils/money"

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find(item => item.id === id)
  const { addToCart } = useCart()
  const [size, setSize] = useState(product?.sizes?.[0] || "")
  const [color, setColor] = useState(product?.colors?.[0] || "")

  const related = useMemo(() => {
    if (!product) return []
    return products.filter(item => item.category === product.category && item.id !== product.id).slice(0, 3)
  }, [product])

  if (!product) {
    return (
      <main className="page-wrap centered-panel">
        <h1>Product not found</h1>
        <Link to="/store" className="primary-btn">Back to Store</Link>
      </main>
    )
  }

  return (
    <main className="page-wrap">
      <section className="detail-grid">
        <div className="detail-image-card">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="detail-copy">
          <span className="chip">{product.category}</span>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <strong className="detail-price">{formatMoney(product.price)}</strong>

          <label>
            Size
            <select value={size} onChange={event => setSize(event.target.value)}>
              {product.sizes.map(item => <option key={item}>{item}</option>)}
            </select>
          </label>

          <label>
            Color
            <select value={color} onChange={event => setColor(event.target.value)}>
              {product.colors.map(item => <option key={item}>{item}</option>)}
            </select>
          </label>

          <button className="primary-btn" onClick={() => addToCart(product, { size, color })}>
            Add to Cart
          </button>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-block">
          <h2>Related Products</h2>
          <div className="product-grid compact">
            {related.map(item => <Link key={item.id} to={`/product/${item.id}`}>{item.name}</Link>)}
          </div>
        </section>
      )}
    </main>
  )
}
