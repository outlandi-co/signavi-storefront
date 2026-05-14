import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from "react-router-dom"

import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"

import Home from "./pages/Home.jsx"
import Store from "./pages/Store.jsx"
import ProductDetail from "./pages/ProductDetail.jsx"
import Checkout from "./pages/Checkout.jsx"
import ClientCheckout from "./pages/ClientCheckout.jsx"
import Success from "./pages/Success.jsx"
import Support from "./pages/Support.jsx"

import CustomerLogin from "./pages/customer/CustomerLogin.jsx"
import CustomerRegister from "./pages/customer/CustomerRegister.jsx"
import CustomerDashboard from "./pages/customer/CustomerDashboard.jsx"
import CustomerOrders from "./pages/customer/CustomerOrders.jsx"
import OrderDetail from "./pages/customer/OrderDetail.jsx"

function CustomerRoute({ children }) {
  const token = localStorage.getItem("customerToken")
  const user = JSON.parse(localStorage.getItem("customerUser") || "null")

  if (!token || user?.role !== "customer") {
    return <Navigate to="/customer-login" replace />
  }

  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/client-checkout/:id" element={<ClientCheckout />} />
          <Route path="/success/:id" element={<Success />} />
          <Route path="/support" element={<Support />} />

          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/customer-register" element={<CustomerRegister />} />

          <Route
            path="/dashboard"
            element={
              <CustomerRoute>
                <CustomerDashboard />
              </CustomerRoute>
            }
          />

          <Route
            path="/my-orders"
            element={
              <CustomerRoute>
                <CustomerOrders />
              </CustomerRoute>
            }
          />

          <Route
            path="/order/:id"
            element={
              <CustomerRoute>
                <OrderDetail />
              </CustomerRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}
