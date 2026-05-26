import { products } from "../../data/products"
import { formatMoney } from "../../utils/money"

export default function AdminProducts() {
  return (
    <main className="page-wrap">
      <section className="page-hero small">
        <p className="eyebrow">Admin Products</p>
        <h1>Product Manager</h1>
        <p>Starter table for premade storefront items. Connect this to MongoDB product routes next.</p>
      </section>

      <section className="table-card">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Cost</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{formatMoney(product.price)}</td>
                <td>{formatMoney(product.cost)}</td>
                <td>{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}
