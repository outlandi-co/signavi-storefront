import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { starterOrders } from "../../data/orders"
import { formatMoney } from "../../utils/money"

const chartData = starterOrders.map(order => ({
  name: order.id,
  revenue: order.total,
  tax: order.tax
}))

export default function RevenueDashboard() {
  const revenue = starterOrders.reduce((sum, order) => sum + order.total, 0)
  const taxes = starterOrders.reduce((sum, order) => sum + order.tax, 0)
  const avg = starterOrders.length ? revenue / starterOrders.length : 0

  return (
    <main className="page-wrap">
      <section className="page-hero small">
        <p className="eyebrow">Revenue</p>
        <h1>Store Revenue</h1>
        <p>Track storefront revenue, taxes, order count, and average order value.</p>
      </section>

      <section className="metric-grid">
        <div className="metric-card"><span>Total Revenue</span><strong>{formatMoney(revenue)}</strong></div>
        <div className="metric-card"><span>Taxes Collected</span><strong>{formatMoney(taxes)}</strong></div>
        <div className="metric-card"><span>Orders</span><strong>{starterOrders.length}</strong></div>
        <div className="metric-card"><span>Average Order</span><strong>{formatMoney(avg)}</strong></div>
      </section>

      <section className="chart-card">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </main>
  )
}
