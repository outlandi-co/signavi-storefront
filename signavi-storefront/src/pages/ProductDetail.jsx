import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import api from "../services/api.js"
import { useCart } from "../context/CartContext.jsx"

const safeText = (value, fallback = "") => {
  if (!value) return fallback
  if (typeof value === "string") return value
  if (typeof value === "number") return String(value)

  if (typeof value === "object") {
    return value.name || value.title || value.label || value.value || fallback
  }

  return fallback
}

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

  const productName = safeText(product.name, "Product")
  const productDescription = safeText(
    product.description,
    "Custom Signavi product."
  )

  const price = Number(
    product.listPrice ||
    product.price ||
    product.finalPrice ||
    0
  )

  const colors = Array.isArray(product.colors)
    ? product.colors.map(color => safeText(color)).filter(Boolean)
    : []

  const sizes = Array.isArray(product.sizes)
    ? product.sizes.map(size => safeText(size)).filter(Boolean)
    : []

  return (
    <section className="product-detail">
      <div className="detail-image">
        {product.image || product.imageUrl ? (
          <img
            src={product.image || product.imageUrl}
            alt={productName}
          />
        ) : (
          <div className="image-placeholder large">Signavi</div>
        )}
      </div>

      <div className="detail-content">
        <Link to="/store" className="back-link">← Back to Store</Link>

        <h1>{productName}</h1>
        <p>{productDescription}</p>

        <h2>${price.toFixed(2)}</h2>

        {colors.length > 0 && (
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
              {colors.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </label>
        )}

        {sizes.length > 0 && (
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
              {sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </label>
        )}

        <button
          className="primary-button"
          onClick={() => addToCart(
            {
              ...product,
              name: productName
            },
            selectedVariant
          )}
        >
          Add to Cart
        </button>
      </div>
    </section>
  )
}