const ID = /^[a-f0-9]{24}$/i

const clean = (value) =>
  typeof value === "string" ? value.trim() : ""

export const buildBuyNowStoreOrder = (draft, customer) => {
  if (!draft || !customer) {
    throw new Error("Checkout information missing.")
  }

  const productId = clean(draft.productId)
  const quantity = Number(draft.quantity)

  if (!ID.test(productId) ||
      !Number.isSafeInteger(quantity) ||
      quantity < 1 ||
      quantity > 100) {
    throw new Error("Invalid Buy Now product selection.")
  }

  const customerName = clean(customer.customerName)
  const email = clean(customer.email).toLowerCase()
  const phone = clean(customer.phone)

  const address = {
    street: clean(customer.street),
    city: clean(customer.city),
    state: clean(customer.state).toUpperCase(),
    zip: clean(customer.zip),
    country: clean(customer.country || "US").toUpperCase()
  }

  if (
    !customerName ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !address.street ||
    !address.city ||
    !/^[A-Z]{2}$/.test(address.state) ||
    !address.zip ||
    !/^[A-Z]{2}$/.test(address.country)
  ) {
    throw new Error("Complete customer and shipping details are required.")
  }

  return {
    customerName,
    email,
    phone,
    address,
    items: [{
      productId: productId.toLowerCase(),
      quantity,
      selectedVariant: draft.selectedVariant ?? null
    }],
    source: "store"
  }
}
