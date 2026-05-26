import { useMemo, useState } from "react"
import ProductCard from "../components/ProductCard"
import { products } from "../data/products"

export default function Store() {
  const [category, setCategory] = useState("All")
  const categories = ["All", ...new Set(products.map(product => product.category))]

  const filteredProducts = useMemo(() => {
    if (category === "All") return products
    return products.filter(product => product.category === category)
  }, [category])

  return (
    <main className="page-wrap">
      <section className="page-hero small">
        <p className="eyebrow">Shop</p>
        <h1>SignaVi Store</h1>
        <p>Premade apparel, drinkware, gifts, and ready-to-buy products.</p>
      </section>

      <div className="filter-row">
        {categories.map(item => (
          <button
            key={item}
            className={category === item ? "filter-btn active" : "filter-btn"}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <section className="product-grid">
        {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
      </section>
    </main>
  )
}
