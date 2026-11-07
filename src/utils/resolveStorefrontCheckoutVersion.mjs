export const resolveStorefrontCheckoutVersion = (response) => {
  const data = response?.data

  if (
    response?.status !== 201 ||
    data?.success !== true
  ) {
    throw new Error("Verified order-creation response required.")
  }

  if (
    data.checkoutVersion !== "v2" &&
    data.checkoutVersion !== "v3"
  ) {
    throw new Error(
      "Unknown checkout version. Do not create another order."
    )
  }

  return data.checkoutVersion
}
