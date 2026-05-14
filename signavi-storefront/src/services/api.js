import axios from "axios"

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://signavi-backend.onrender.com/api",
  withCredentials: true
})

api.interceptors.request.use((config) => {
  const customerToken = localStorage.getItem("customerToken")

  if (customerToken) {
    config.headers.Authorization = `Bearer ${customerToken}`
  }

  return config
})

export default api
