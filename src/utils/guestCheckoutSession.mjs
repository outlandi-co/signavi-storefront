const ORDER_ID = /^[a-f0-9]{24}$/i

const keyFor = (orderId) => {
  if (typeof orderId !== "string" || !ORDER_ID.test(orderId)) {
    return null
  }

  return `signavi:guest-checkout:${orderId.toLowerCase()}`
}

export const saveGuestCheckoutToken = (orderId, token, storage) => {
  const key = keyFor(orderId)

  if (
    !key ||
    typeof token !== "string" ||
    !token.trim() ||
    token.length > 4096
  ) {
    return false
  }

  try {
    const target = storage ?? globalThis.sessionStorage
    target.setItem(key, token)
    return true
  } catch {
    return false
  }
}

export const getGuestCheckoutToken = (orderId, storage) => {
  const key = keyFor(orderId)
  if (!key) return null

  try {
    const target = storage ?? globalThis.sessionStorage
    const token = target.getItem(key)

    return typeof token === "string" && token.trim()
      ? token
      : null
  } catch {
    return null
  }
}

export const clearGuestCheckoutToken = (orderId, storage) => {
  const key = keyFor(orderId)
  if (!key) return false

  try {
    const target = storage ?? globalThis.sessionStorage
    target.removeItem(key)
    return true
  } catch {
    return false
  }
}
