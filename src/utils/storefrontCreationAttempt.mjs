const PREFIX = "signavi:storefront-attempt:v1:"

const validFlow = flow =>
  flow === "buy-now" || flow === "cart"

const keyFor = flow => {
  if (!validFlow(flow)) {
    throw new Error("Invalid storefront checkout flow.")
  }

  return PREFIX + flow
}

const read = (storage, flow) => {
  const value = storage.getItem(keyFor(flow))

  if (!value) return null

  const record = JSON.parse(value)

  if (
    !record ||
    typeof record !== "object" ||
    !["pending", "uncertain", "created"].includes(record.status) ||
    typeof record.attemptKey !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      record.attemptKey
    ) ||
    typeof record.recoverySecret !== "string" ||
    !/^[A-Za-z0-9_-]{43}$/.test(record.recoverySecret)
  ) {
    throw new Error("Stored purchase attempt requires review.")
  }

  return record
}

const getStorage = storage => {
  const target = storage ?? globalThis.sessionStorage

  if (
    !target ||
    typeof target.getItem !== "function" ||
    typeof target.setItem !== "function"
  ) {
    throw new Error("Secure checkout session is unavailable.")
  }

  return target
}

export const getStorefrontCreationAttempt = (
  flow,
  storage
) => {
  const target = getStorage(storage)

  return read(target, flow)
}

export const beginStorefrontCreationAttempt = (
  flow,
  storage,
  cryptoProvider = globalThis.crypto
) => {
  const target = getStorage(storage)
  const key = keyFor(flow)

  // Never replace existing attempts, including uncertain ones.
  if (target.getItem(key) !== null) {
    throw new Error(
      "An earlier purchase attempt requires review."
    )
  }

  if (
    !cryptoProvider ||
    typeof cryptoProvider.randomUUID !== "function" ||
    typeof cryptoProvider.getRandomValues !== "function"
  ) {
    throw new Error("Secure random generation is unavailable.")
  }

  const bytes = new Uint8Array(32)

  cryptoProvider.getRandomValues(bytes)

  const recoverySecret = btoa(
    String.fromCharCode(...bytes)
  )
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")

  const attempt = {
    status: "pending",
    attemptKey: cryptoProvider.randomUUID(),
    recoverySecret
  }

  target.setItem(key, JSON.stringify(attempt))

  const saved = read(target, flow)

  if (
    !saved ||
    saved.status !== "pending" ||
    saved.attemptKey !== attempt.attemptKey ||
    saved.recoverySecret !== recoverySecret
  ) {
    throw new Error(
      "Purchase attempt could not be preserved."
    )
  }

  return {
    "x-signavi-storefront-attempt-key": saved.attemptKey,
    "x-signavi-storefront-recovery-secret":
      saved.recoverySecret
  }
}

export const markStorefrontCreationAttempt = (
  flow,
  status,
  storage
) => {
  if (!["uncertain", "created"].includes(status)) {
    throw new Error("Invalid purchase attempt transition.")
  }

  const target = getStorage(storage)
  const current = read(target, flow)

  if (!current || current.status !== "pending") {
    return false
  }

  target.setItem(
    keyFor(flow),
    JSON.stringify({
      ...current,
      status
    })
  )

  const saved = read(target, flow)

  return saved?.status === status
}
