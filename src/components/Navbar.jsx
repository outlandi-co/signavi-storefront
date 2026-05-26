import { Link, NavLink } from "react-router-dom"
import { ShoppingBag, UserRound, Shield } from "lucide-react"
import { useCart } from "../context/CartContext"

export default function Navbar() {
  const { totals } = useCart()

  const linkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link"

  return (
    <header className="site-header">
      <Link to="/" className="brand-lockup">
        <span className="brand-mark">S</span>
        <span>
          <strong>SignaVi Store</strong>
          <small>Premade drops & ready-to-buy goods</small>
        </span>
      </Link>

      <nav className="main-nav">
        <NavLink to="/" className={linkClass}>Home</NavLink>
        <NavLink to="/store" className={linkClass}>Store</NavLink>
        <NavLink to="/account/orders" className={linkClass}>Orders</NavLink>
        <NavLink to="/admin" className={linkClass}>Admin</NavLink>
      </nav>

      <div className="nav-actions">
        <Link to="/account" className="icon-link" aria-label="Customer account">
          <UserRound size={20} />
        </Link>
        <Link to="/admin" className="icon-link" aria-label="Admin account">
          <Shield size={20} />
        </Link>
        <Link to="/cart" className="cart-link" aria-label="Cart">
          <ShoppingBag size={20} />
          <span>{totals.count}</span>
        </Link>
      </div>
    </header>
  )
}
