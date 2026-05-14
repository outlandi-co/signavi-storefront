import { useEffect, useMemo, useState } from "react"
import api from "../services/api.js"
import ProductCard from "../components/ProductCard.jsx"

export default function Store() {
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await api.get("/products", {
          params: {
            storefrontVisible: true,
            storefront: "signavi"
          }
        })

        const data = res.data?.data || res.data || []

        setProducts(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error("STORE PRODUCTS ERROR:", err)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const filtered = useMemo(() => {
    const text = query.toLowerCase()

    return products.filter(product => {
      return (
        product.name?.toLowerCase().includes(text) ||
        product.category?.toLowerCase().includes(text) ||
        product.description?.toLowerCase().includes(text)
      )
    })
  }, [products, query])

  return (
    <section className="page">
      <div className="page-header">
        <p className="eyebrow">Shop</p>
        <h1>Signavi Store</h1>
        <p>Products, apparel, and creative goods ready for checkout.</p>
      </div>

      <input
        className="search-input"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search products..."
      />

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-grid">
          {filtered.map(product => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  )
}
