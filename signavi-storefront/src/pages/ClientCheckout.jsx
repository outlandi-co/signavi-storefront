import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../services/api.js"

export default function ClientCheckout() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("Preparing secure checkout...")

  useEffect(() => {
    const createPayment = async () => {
      try {
        const res = await api.post(`/square/create-payment/${id}`)
        const paymentUrl = res.data?.paymentUrl || res.data?.url || res.data?.data?.paymentUrl

        if (!paymentUrl) {
          throw new Error("Payment URL missing")
        }

        window.location.assign(paymentUrl)
      } catch (err) {
        console.error("SQUARE PAYMENT ERROR:", err)
        setMessage(err.response?.data?.message || "Unable to create payment link.")
      } finally {
        setLoading(false)
      }
    }

    createPayment()
  }, [id])

  return (
    <section className="page">
      <h1>Secure Checkout</h1>
      <p>{message}</p>
      {loading && <p>Please keep this page open.</p>}
    </section>
  )
}
