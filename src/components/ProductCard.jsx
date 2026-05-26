import { Link } from "react-router-dom"
import { ShoppingCart } from "lucide-react"
import { useCart } from "../context/CartContext"
import { formatMoney } from "../utils/money"

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-wrap">
        <img src={product.image} alt={product.name} />
      </Link>

      <div className="product-card-body">
        <span className="chip">{product.category}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <div className="product-card-footer">
          <strong>{formatMoney(product.price)}</strong>
          <button onClick={() => addToCart(product)}>
            <ShoppingCart size={17} />
            Add
          </button>
        </div>
      </div>
    </article>
  )
}
