import { Link, NavLink, useNavigate } from "react-router-dom"
import { ShoppingCart, UserRound } from "lucide-react"
import { useCart } from "../context/CartContext.jsx"

export default function Navbar() {
  const { cartItems } = useCart()
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("customerUser") || "null")
  const isCustomer = user?.role === "customer"

  const logout = () => {
    localStorage.removeItem("customerToken")
    localStorage.removeItem("customerUser")
    localStorage.removeItem("customerEmail")
    navigate("/")
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-mark">S</span>
        <span>Signavi</span>
      </Link>

      <nav className="nav-links">
        <NavLink to="/store">Store</NavLink>
        <NavLink to="/support">Support</NavLink>

        {isCustomer && (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/my-orders">My Orders</NavLink>
          </>
        )}
      </nav>

      <div className="nav-actions">
        <Link to="/checkout" className="icon-button">
          <ShoppingCart size={20} />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>

        {isCustomer ? (
          <button className="ghost-button" onClick={logout}>
            Logout
          </button>
        ) : (
          <Link to="/customer-login" className="icon-button">
            <UserRound size={20} />
          </Link>
        )}
      </div>
    </header>
  )
}
