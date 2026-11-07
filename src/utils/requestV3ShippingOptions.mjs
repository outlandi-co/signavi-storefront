const ID = /^[a-f0-9]{24}$/i

export const requestV3ShippingOptions = async ({
  api,
  orderId,
  guestToken
}) => {
  if (
    !api ||
    typeof api.post !== "function" ||
    typeof orderId !== "string" ||
    !ID.test(orderId) ||
    typeof guestToken !== "string" ||
    !guestToken.trim()
  ) {
    throw new Error("Valid checkout authorization is required.")
  }

  const response = await api.post(
    `/v3/shipping/${orderId.toLowerCase()}/quote`,
    {},
    {
      headers: {
        "x-signavi-guest-checkout-token": guestToken
      }
    }
  )

  const data = response?.data

  if (
    response?.status !== 200 ||
    data?.success !== true ||
    typeof data?.orderId !== "string" ||
    data.orderId.toLowerCase() !== orderId.toLowerCase() ||
    !Array.isArray(data.shippingOptions) ||
    data.shippingOptions.length === 0 ||
    data.shippingOptions.some(option =>
      !option ||
      typeof option !== "object" ||
      Array.isArray(option) ||
      !option.signedQuote
    )
  ) {
    throw new Error("Verified V3 shipping options were not returned.")
  }

  return data.shippingOptions
}