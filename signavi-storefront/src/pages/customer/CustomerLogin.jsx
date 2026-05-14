import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import api from "../../services/api.js"

export default function CustomerLogin() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const update = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const submit = async (event) => {
    event.preventDefault()

    try {
      const res = await api.post("/auth/login", form)

      const token = res.data?.token
      const user = res.data?.user

      if (user?.role !== "customer") {
        alert("This storefront is for customer accounts only.")
        return
      }

      localStorage.setItem("customerToken", token)
      localStorage.setItem("customerUser", JSON.stringify(user))
      localStorage.setItem("customerEmail", user.email)

      navigate("/dashboard")
    } catch (err) {
      console.error("LOGIN ERROR:", err)
      alert(err.response?.data?.message || "Login failed")
    }
  }

  return (
    <section className="page narrow">
      <h1>Customer Login</h1>

      <form className="stack-form" onSubmit={submit}>
        <input
          required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(event) => update("email", event.target.value)}
        />

        <input
          required
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(event) => update("password", event.target.value)}
        />

        <button className="primary-button" type="submit">
          Login
        </button>
      </form>

      <p>
        Need an account? <Link to="/customer-register">Register</Link>
      </p>
    </section>
  )
}
