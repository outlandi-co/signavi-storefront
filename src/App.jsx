import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import {
  useState
} from "react"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import CartDrawer from "./components/CartDrawer"
import AccountDrawer from "./components/AccountDrawer"

import AdminLayout from "./components/admin/AdminLayout"
import AdminRoute from "./components/admin/AdminRoute"

import CustomerRoute from "./components/guards/CustomerRoute"

import Home from "./pages/Home"
import Store from "./pages/Store"
import ProductDetail from "./pages/ProductDetail"
import Gallery from "./pages/Gallery"
import Support from "./pages/Support"

import Login from "./pages/Login"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"

import CustomerLogin from "./pages/customer/CustomerLogin"
import CustomerDashboard from "./pages/customer/CustomerDashboard"
import CustomerOrders from "./pages/customer/CustomerOrders"
import CustomerSupport from "./pages/customer/CustomerSupport"
import Security from "./pages/customer/Security"

import TrackingPage from "./pages/TrackingPage"

import CheckoutRedirect from "./pages/CheckoutRedirect"
import ClientCheckout from "./pages/ClientCheckout"
import ClientOrder from "./pages/ClientOrder"

import Success from "./pages/Success"

import Account from "./pages/Account"

import Receipts from "./pages/Receipts"
import ReceiptDetail from "./pages/ReceiptDetail"

import Orders from "./pages/admin/Orders"
import AdminOrderDetail from "./pages/admin/AdminOrderDetail"
import AdminCustomers from "./pages/admin/AdminCustomers"
import AdminCustomerDetail from "./pages/admin/AdminCustomerDetail"
import AdminEmails from "./pages/admin/AdminEmails"
import AdminSupport from "./pages/admin/AdminSupport"
import AdminRevenue from "./pages/admin/AdminRevenue"
import AdminProducts from "./pages/admin/AdminProducts"
import MarketingHub from "./pages/admin/MarketingHub"

import CreateProduct from "./pages/admin/CreateProduct"
import EditProduct from "./pages/admin/EditProduct"

import {
  CartProvider
} from "./context/CartContext"

import {
  NotificationProvider
} from "./context/NotificationContext"

function App() {

  const [cartOpen, setCartOpen] =
    useState(false)

  const [accountOpen, setAccountOpen] =
    useState(false)

  return (
    <NotificationProvider>
      <CartProvider>

        <BrowserRouter>

          <Navbar
            setCartOpen={setCartOpen}
            setAccountOpen={setAccountOpen}
          />

          <CartDrawer
            isOpen={cartOpen}
            onClose={() =>
              setCartOpen(false)
            }
          />

          <AccountDrawer
            open={accountOpen}
            onClose={() =>
              setAccountOpen(false)
            }
          />

          <Routes>

            {/* PUBLIC */}

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/store"
              element={<Store />}
            />

            <Route
              path="/product/:id"
              element={<ProductDetail />}
            />

            <Route
              path="/gallery"
              element={<Gallery />}
            />

            <Route
              path="/support"
              element={<Support />}
            />

            <Route
              path="/track"
              element={<TrackingPage />}
            />

            <Route
              path="/track/:id"
              element={<TrackingPage />}
            />

            {/* AUTH */}

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/customer-login"
              element={<CustomerLogin />}
            />

            <Route
              path="/forgot-password"
              element={<ForgotPassword />}
            />

            <Route
              path="/reset-password/:token"
              element={<ResetPassword />}
            />

            {/* CHECKOUT */}

            <Route
              path="/checkout/:id"
              element={<CheckoutRedirect />}
            />

            <Route
              path="/client-checkout/:id"
              element={<ClientCheckout />}
            />

            <Route
              path="/client-order/:id"
              element={<ClientOrder />}
            />

            <Route
              path="/success/:id"
              element={<Success />}
            />

            {/* CUSTOMER */}

            <Route element={<CustomerRoute />}>

              <Route
                path="/dashboard"
                element={<CustomerDashboard />}
              />

              <Route
                path="/account"
                element={<Account />}
              />

              <Route
                path="/my-orders"
                element={<CustomerOrders />}
              />

              <Route
                path="/support-center"
                element={<CustomerSupport />}
              />

              <Route
                path="/security"
                element={<Security />}
              />

              <Route
                path="/receipts"
                element={<Receipts />}
              />

              <Route
                path="/receipt/:id"
                element={<ReceiptDetail />}
              />

            </Route>

            {/* ADMIN */}

            <Route
              path="/admin"
              element={<AdminRoute />}
            >

              <Route
                element={<AdminLayout />}
              >

                <Route
                  index
                  element={<Orders />}
                />

                <Route
                  path="orders"
                  element={<Orders />}
                />

                <Route
                  path="orders/:id"
                  element={<AdminOrderDetail />}
                />

                <Route
                  path="customers"
                  element={<AdminCustomers />}
                />

                <Route
                  path="customers/:id"
                  element={<AdminCustomerDetail />}
                />

                <Route
                  path="emails"
                  element={<AdminEmails />}
                />

                <Route
                  path="support"
                  element={<AdminSupport />}
                />

                <Route
                  path="revenue"
                  element={<AdminRevenue />}
                />

                <Route
                  path="marketing"
                  element={<MarketingHub />}
                />

                <Route
                  path="products"
                  element={<AdminProducts />}
                />

                <Route
                  path="products/new"
                  element={<CreateProduct />}
                />

                <Route
                  path="products/edit/:id"
                  element={<EditProduct />}
                />

              </Route>

            </Route>

          </Routes>

          <Footer />

        </BrowserRouter>

      </CartProvider>
    </NotificationProvider>
  )
}

export default App