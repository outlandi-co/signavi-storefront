const KEY = "signavi:buy-now-draft:v1"
const ORDER_ID = /^[a-f0-9]{24}$/i
const MAX_SIZE = 16384

const normalize = (input) => {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return null
  }

  const productId = String(input.productId || "")
  const quantity = Number(input.quantity)

  if (!ORDER_ID.test(productId) ||
      !Number.isSafeInteger(quantity) ||
      quantity < 1 ||
      quantity > 100) {
    return null
  }

  return {
    productId: productId.toLowerCase(),
    quantity,
    selectedVariant: input.selectedVariant ?? null,
    artworkFileName: String(input.artworkFileName || "").slice(0, 255),
    personalization: String(input.personalization || "").slice(0, 2000)
  }
}

export const saveBuyNowDraft = (input, storage) => {
  const draft = normalize(input)
  if (!draft) return false

  try {
    const value = JSON.stringify(draft)
    if (value.length > MAX_SIZE) return false

    const target = storage ?? globalThis.sessionStorage
    target.setItem(KEY, value)
    return true
  } catch {
    return false
  }
}

export const getBuyNowDraft = (storage) => {
  try {
    const target = storage ?? globalThis.sessionStorage
    const value = target.getItem(KEY)
    if (!value || value.length > MAX_SIZE) return null

    return normalize(JSON.parse(value))
  } catch {
    return null
  }
}

export const clearBuyNowDraft = (storage) => {
  try {
    const target = storage ?? globalThis.sessionStorage
    target.removeItem(KEY)
    return true
  } catch {
    return false
  }
}
