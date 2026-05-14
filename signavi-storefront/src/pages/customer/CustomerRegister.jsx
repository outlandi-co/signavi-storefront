import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import api from "../../services/api.js"

export default function CustomerRegister() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
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
      await api.post("/auth/register", {
        ...form,
        role: "customer"
      })

      navigate("/customer-login")
    } catch (err) {
      console.error("REGISTER ERROR:", err)
      alert(err.response?.data?.message || "Registration failed")
    }
  }

  return (
    <section className="page narrow">
      <h1>Create Customer Account</h1>

      <form className="stack-form" onSubmit={submit}>
        <input
          required
          placeholder="Name"
          value={form.name}
          onChange={(event) => update("name", event.target.value)}
        />

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
          Register
        </button>
      </form>

      <p>
        Already registered? <Link to="/customer-login">Login</Link>
      </p>
    </section>
  )
}
