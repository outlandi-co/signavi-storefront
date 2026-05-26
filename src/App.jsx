import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Store from "./pages/Store"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Account from "./pages/customer/Account"
import OrderHistory from "./pages/customer/OrderHistory"
import OrderDetail from "./pages/customer/OrderDetail"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminProducts from "./pages/admin/AdminProducts"
import AdminOrders from "./pages/admin/AdminOrders"
import FulfillmentBoard from "./pages/admin/FulfillmentBoard"
import RevenueDashboard from "./pages/admin/RevenueDashboard"
import ShippingDashboard from "./pages/admin/ShippingDashboard"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "store", element: <Store /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "account", element: <Account /> },
      { path: "account/orders", element: <OrderHistory /> },
      { path: "account/orders/:id", element: <OrderDetail /> },
      { path: "admin", element: <AdminDashboard /> },
      { path: "admin/products", element: <AdminProducts /> },
      { path: "admin/orders", element: <AdminOrders /> },
      { path: "admin/fulfillment", element: <FulfillmentBoard /> },
      { path: "admin/revenue", element: <RevenueDashboard /> },
      { path: "admin/shipping", element: <ShippingDashboard /> }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
