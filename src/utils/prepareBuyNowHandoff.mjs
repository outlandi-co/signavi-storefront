import {
  saveBuyNowDraft
} from "./buyNowDraft.mjs"

import {
  getBuyNowCreationState
} from "./buyNowCreationGuard.mjs"

export const prepareBuyNowHandoff = (input, storage) => {
  const target = storage ?? globalThis.sessionStorage

  if (!target) {
    throw new Error("Browser checkout session unavailable.")
  }

  const existing = getBuyNowCreationState(target)

  if (existing) {
    throw new Error(
      "An earlier checkout attempt already exists. " +
      "Verify it before beginning another purchase."
    )
  }

  if (!input || typeof input !== "object") {
    throw new Error("Invalid Buy Now selection.")
  }

  // Custom artwork and personalization are not yet included in the
  // trusted V3 order payload. Never silently discard those details.
  if (
    String(input.artworkFileName || "").trim() ||
    String(input.personalization || "").trim()
  ) {
    throw new Error(
      "Customized products are not yet supported by " +
      "the new Buy Now checkout."
    )
  }

  const draft = {
    productId: input.productId,
    quantity: input.quantity,
    selectedVariant: input.selectedVariant ?? null,
    artworkFileName: "",
    personalization: ""
  }

  if (!saveBuyNowDraft(draft, target)) {
    throw new Error("Unable to preserve Buy Now selection.")
  }

  return {
    ready: true,
    path: "/client-checkout/buy-now"
  }
}