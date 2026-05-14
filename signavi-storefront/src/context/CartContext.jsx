import {
  createContext,
  useContext,
  useMemo,
  useState
} from "react"

const CartContext = createContext(null)

const getStoredCart = () => {
  try {
    return JSON.parse(localStorage.getItem("signaviCart") || "[]")
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getStoredCart)

  const persist = (items) => {
    setCartItems(items)
    localStorage.setItem("signaviCart", JSON.stringify(items))
  }

  const addToCart = (product, selectedVariant = {}) => {
    const itemKey = `${product._id}-${selectedVariant.color || ""}-${selectedVariant.size || ""}`

    const existing = cartItems.find(item => item.key === itemKey)

    if (existing) {
      const updated = cartItems.map(item =>
        item.key === itemKey
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )

      persist(updated)
      return
    }

    persist([
      ...cartItems,
      {
        key: itemKey,
        productId: product._id,
        name: product.name,
        price: Number(product.listPrice || product.price || product.finalPrice || 0),
        image: product.image || product.imageUrl || "",
        quantity: 1,
        variant: selectedVariant
      }
    ])
  }

  const updateQuantity = (key, quantity) => {
    if (quantity <= 0) {
      removeFromCart(key)
      return
    }

    persist(
      cartItems.map(item =>
        item.key === key
          ? { ...item, quantity }
          : item
      )
    )
  }

  const removeFromCart = (key) => {
    persist(cartItems.filter(item => item.key !== key))
  }

  const clearCart = () => {
    persist([])
  }

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      return sum + Number(item.price || 0) * Number(item.quantity || 1)
    }, 0)
  }, [cartItems])

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal
  }

  return (
    <CartContext.Provider value={value}>
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
