import { createContext, useContext, useMemo, useState } from "react"

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (product, options = {}) => {
    setCartItems(prev => {
      const key = `${product.id}-${options.size || ""}-${options.color || ""}`
      const existing = prev.find(item => item.key === key)

      if (existing) {
        return prev.map(item =>
          item.key === key
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [
        ...prev,
        {
          key,
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size: options.size || product.sizes?.[0] || "One Size",
          color: options.color || product.colors?.[0] || "Default",
          quantity: 1
        }
      ]
    })
  }

  const removeFromCart = key => {
    setCartItems(prev => prev.filter(item => item.key !== key))
  }

  const updateQuantity = (key, quantity) => {
    const nextQuantity = Math.max(1, Number(quantity || 1))
    setCartItems(prev =>
      prev.map(item =>
        item.key === key ? { ...item, quantity: nextQuantity } : item
      )
    )
  }

  const clearCart = () => setCartItems([])

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
    const tax = subtotal * 0.0825
    const shipping = subtotal > 75 || subtotal === 0 ? 0 : 7.99
    const total = subtotal + tax + shipping
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0)

    return { subtotal, tax, shipping, total, count }
  }, [cartItems])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totals
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used inside CartProvider")
  }
  return context
}
