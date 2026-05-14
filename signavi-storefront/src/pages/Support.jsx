import { useState } from "react"
import api from "../services/api.js"

export default function Support() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  })

  const [sent, setSent] = useState(false)

  const update = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const submit = async (event) => {
    event.preventDefault()

    try {
      await api.post("/support", form)
      setSent(true)
      setForm({
        name: "",
        email: "",
        message: ""
      })
    } catch (err) {
      console.error("SUPPORT ERROR:", err)
      alert("Could not send support message.")
    }
  }

  return (
    <section className="page narrow">
      <h1>Support</h1>
      <p>Need help with an order? Send us a message.</p>

      {sent && <p className="notice">Message sent.</p>}

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

        <textarea
          required
          placeholder="Message"
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
        />

        <button className="primary-button" type="submit">
          Send Message
        </button>
      </form>
    </section>
  )
}
