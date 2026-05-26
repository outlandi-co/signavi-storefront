import { Link } from "react-router-dom"

export default function Register() {
  return (
    <main className="page-wrap centered-panel">
      <p className="eyebrow">Account</p>
      <h1>Create customer account</h1>
      <form className="auth-form">
        <input placeholder="Full name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className="primary-btn full">Create Account</button>
      </form>
      <Link to="/login">Already have an account?</Link>
    </main>
  )
}
