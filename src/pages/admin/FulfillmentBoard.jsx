import { fulfillmentStatuses } from "../../data/statuses"
import { starterOrders } from "../../data/orders"
import { formatMoney } from "../../utils/money"

export default function FulfillmentBoard() {
  return (
    <main className="page-wrap board-page">
      <section className="page-hero small">
        <p className="eyebrow">Workflow</p>
        <h1>Order Fulfillment Board</h1>
        <p>Store orders move through fulfillment. This replaces quote-based production workflow.</p>
      </section>

      <section className="kanban-board">
        {fulfillmentStatuses.map(column => {
          const orders = starterOrders.filter(order => order.status === column.id)

          return (
            <div className="kanban-column" key={column.id}>
              <h3>{column.label}</h3>
              {orders.length === 0 && <p className="empty-column">No orders</p>}
              {orders.map(order => (
                <article className="order-card" key={order.id}>
                  <strong>{order.id}</strong>
                  <span>{order.customerName}</span>
                  <span>{formatMoney(order.total)}</span>
                  <small>{order.items.length} item group(s)</small>
                </article>
              ))}
            </div>
          )
        })}
      </section>
    </main>
  )
}
