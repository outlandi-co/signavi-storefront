import axios from "axios"

/* =========================================================
   🌐 BASE URL
========================================================= */
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://signavi-backend.onrender.com/api"

const api = axios.create({
  baseURL: BASE_URL.replace(/\/$/, "")
})

console.log("🌐 API BASE:", api.defaults.baseURL)

/* =========================================================
   🔥 GLOBAL LOADING HANDLERS
========================================================= */
let startLoading = null
let stopLoading = null

export const setLoadingHandlers = (start, stop) => {
  startLoading = start
  stopLoading = stop
}

/* =========================================================
   🔥 REQUEST INTERCEPTOR
========================================================= */
api.interceptors.request.use((config) => {

  if (startLoading) startLoading()

  const adminToken =
    localStorage.getItem("adminToken") ||
    sessionStorage.getItem("adminToken")

  const customerToken =
    localStorage.getItem("customerToken") ||
    sessionStorage.getItem("customerToken")

  const token = adminToken || customerToken

  /* 🔥 ONLY SET JSON IF NOT FORMDATA */
  if (!(config.data instanceof FormData)) {
    config.headers = {
      ...(config.headers || {}),
      "Content-Type": "application/json"
    }
  } else {
    /* 🔥 LET BROWSER HANDLE FORM DATA */
    delete config.headers?.["Content-Type"]
  }

  if (token) {
    config.headers = {
      ...(config.headers || {}),
      Authorization: `Bearer ${token}`
    }
  }


  return config
})

/* =========================================================
   🔁 RESPONSE INTERCEPTOR
========================================================= */
api.interceptors.response.use(
  (res) => {
    if (stopLoading) stopLoading()
    return res
  },

  async (err) => {

    if (stopLoading) stopLoading()

    const status = err?.response?.status
    const url = err?.config?.url || ""

    console.error("API request failed:", status)

    const originalRequest = err.config || {}

    const requestPath = url
      .split("?")[0]
      .replace(/\/+$/, "")

    const isOrderCreation =
      String(originalRequest.method || "").toLowerCase() === "post" &&
      requestPath === "/orders"

    const safeRoutes = [
      "/auth/login",
      "/auth/register",
      "/auth/forgot-password",
      "/auth/reset-password"
    ]

    const isSafeRoute = safeRoutes.some((r) => url.includes(r))

    if (
      status === 401 &&
      !isSafeRoute &&
      !isOrderCreation &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      try {
        return await api(originalRequest)
      } catch (retryErr) {
      }
    }

    if (status === 401 && !isSafeRoute && !isOrderCreation) {
      const isCheckout = url.includes("/square")

      const wasAdmin =
        localStorage.getItem("adminUser") ||
        sessionStorage.getItem("adminUser")

      localStorage.clear()
      sessionStorage.clear()

      if (!isCheckout) {
        window.location.href = wasAdmin
          ? "/login"
          : "/customer-login"
      }
    }

    return Promise.reject(err)
  }
)

export default api