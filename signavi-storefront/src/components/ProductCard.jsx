import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext.jsx"

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  const price = Number(product.listPrice || product.price || product.finalPrice || 0)

  return (
    <article className="product-card">
      <Link to={`/product/${product._id}`} className="product-image-wrap">
        {product.image || product.imageUrl ? (
          <img
            src={product.image || product.imageUrl}
            alt={product.name}
            className="product-image"
          />
        ) : (
          <div className="image-placeholder">Signavi</div>
        )}
      </Link>

      <div className="product-card-body">
        <h3>{product.name}</h3>
        <p>{product.description || "Custom Signavi product"}</p>

        <div className="product-card-footer">
          <strong>${price.toFixed(2)}</strong>

          <button onClick={() => addToCart(product)}>
            Add
          </button>
        </div>
      </div>
    </article>
  )
}
