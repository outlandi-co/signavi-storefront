const KEY = "signavi:buy-now-creation-state:v1"

const read = (storage) => {
  try {
    const value = storage.getItem(KEY)
    if (!value) return null

    const parsed = JSON.parse(value)

    return parsed &&
      ["pending", "uncertain", "created"].includes(parsed.status)
      ? parsed
      : null
  } catch {
    return null
  }
}

export const getBuyNowCreationState = (storage) => {
  try {
    return read(storage ?? globalThis.sessionStorage)
  } catch {
    return null
  }
}

export const beginBuyNowCreation = (storage) => {
  try {
    const target = storage ?? globalThis.sessionStorage
    const previous = read(target)

    if (previous) {
      return false
    }

    target.setItem(KEY, JSON.stringify({
      status: "pending"
    }))

    return true
  } catch {
    return false
  }
}

export const markBuyNowCreationUncertain = (storage) => {
  try {
    const target = storage ?? globalThis.sessionStorage
    const current = read(target)

    if (!current || current.status !== "pending") {
      return false
    }

    target.setItem(KEY, JSON.stringify({
      status: "uncertain"
    }))

    return true
  } catch {
    return false
  }
}

export const markBuyNowCreationCreated = (orderId, storage) => {
  if (
    typeof orderId !== "string" ||
    !/^[0-9a-f]{24}$/i.test(orderId)
  ) {
    return false
  }

  try {
    const target = storage ?? globalThis.sessionStorage
    const current = read(target)

    if (!current || current.status !== "pending") {
      return false
    }

    target.setItem(KEY, JSON.stringify({
      status: "created",
      orderId: orderId.toLowerCase()
    }))

    return true
  } catch {
    return false
  }
}