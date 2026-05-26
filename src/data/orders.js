export const starterOrders = [
  {
    id: "SVS-1001",
    customerName: "Demo Customer",
    email: "customer@example.com",
    date: "2026-05-25",
    status: "paid",
    total: 83.46,
    subtotal: 76,
    tax: 6.27,
    shipping: 7.19,
    trackingNumber: "9400-DEMO-TRACKING",
    items: [
      { name: "SignaVi Classic Tee", quantity: 1, price: 24 },
      { name: "Engraved Tumbler", quantity: 1, price: 32 },
      { name: "Leather Keychain Set", quantity: 1, price: 8 }
    ],
    timeline: [
      { label: "Order placed", date: "2026-05-25" },
      { label: "Payment received", date: "2026-05-25" }
    ]
  },
  {
    id: "SVS-1002",
    customerName: "Sample Buyer",
    email: "buyer@example.com",
    date: "2026-05-24",
    status: "production",
    total: 52.96,
    subtotal: 48,
    tax: 3.96,
    shipping: 1,
    trackingNumber: "",
    items: [
      { name: "SignaVi Studio Hoodie", quantity: 1, price: 48 }
    ],
    timeline: [
      { label: "Order placed", date: "2026-05-24" },
      { label: "Production started", date: "2026-05-25" }
    ]
  }
]
