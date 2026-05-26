export default function OrderStatusBadge({ status }) {
  const label = String(status || "new").replaceAll("_", " ")
  return <span className={`status-badge ${status}`}>{label}</span>
}
