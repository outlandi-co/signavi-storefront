import { Link } from "react-router-dom"

export default function Login() {
  return (
    <main className="page-wrap centered-panel">
      <p className="eyebrow">Account</p>
      <h1>Sign in</h1>
      <p>Connect this to your existing customer/admin auth backend when ready.</p>
      <form className="auth-form">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className="primary-btn full">Sign In</button>
      </form>
      <Link to="/register">Create account</Link>
    </main>
  )
}
