import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import api from "../services/api.js"
import { useCart } from "../context/CartContext.jsx"

export default function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [selectedVariant, setSelectedVariant] = useState({
    color: "",
    size: ""
  })

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`)
        setProduct(res.data?.data || res.data)
      } catch (err) {
        console.error("PRODUCT DETAIL ERROR:", err)
      }
    }

    loadProduct()
  }, [id])

  if (!product) {
    return <section className="page">Loading product...</section>
  }

  const price = Number(product.listPrice || product.price || product.finalPrice || 0)

  return (
    <section className="product-detail">
      <div className="detail-image">
        {product.image || product.imageUrl ? (
          <img src={product.image || product.imageUrl} alt={product.name} />
        ) : (
          <div className="image-placeholder large">Signavi</div>
        )}
      </div>

      <div className="detail-content">
        <Link to="/store" className="back-link">← Back to Store</Link>

        <h1>{product.name}</h1>
        <p>{product.description || "Custom Signavi product."}</p>

        <h2>${price.toFixed(2)}</h2>

        {product.colors?.length > 0 && (
          <label>
            Color
            <select
              value={selectedVariant.color}
              onChange={(event) => {
                setSelectedVariant(prev => ({
                  ...prev,
                  color: event.target.value
                }))
              }}
            >
              <option value="">Select color</option>
              {product.colors.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </label>
        )}

        {product.sizes?.length > 0 && (
          <label>
            Size
            <select
              value={selectedVariant.size}
              onChange={(event) => {
                setSelectedVariant(prev => ({
                  ...prev,
                  size: event.target.value
                }))
              }}
            >
              <option value="">Select size</option>
              {product.sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </label>
        )}

        <button
          className="primary-button"
          onClick={() => addToCart(product, selectedVariant)}
        >
          Add to Cart
        </button>
      </div>
    </section>
  )
}
