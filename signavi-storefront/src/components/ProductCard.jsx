import { Link } from "react-router-dom"
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

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  const productName = safeText(product.name, "Product")
  const productDescription = safeText(
    product.description,
    "Custom Signavi product"
  )

  const price = Number(
    product.listPrice ||
    product.price ||
    product.finalPrice ||
    0
  )

  return (
    <article className="product-card">
      <Link to={`/product/${product._id}`} className="product-image-wrap">
        {product.image || product.imageUrl ? (
          <img
            src={product.image || product.imageUrl}
            alt={productName}
            className="product-image"
          />
        ) : (
          <div className="image-placeholder">Signavi</div>
        )}
      </Link>

      <div className="product-card-body">
        <h3>{productName}</h3>
        <p>{productDescription}</p>

        <div className="product-card-footer">
          <strong>${price.toFixed(2)}</strong>

          <button
            type="button"
            onClick={() => addToCart({
              ...product,
              name: productName
            })}
          >
            Add
          </button>
        </div>
      </div>
    </article>
  )
}