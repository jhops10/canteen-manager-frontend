import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:8080/api'

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err?.response?.data?.message || err.message || 'Erro inesperado'
    console.error('[API ERROR]', msg, err?.response?.data)
    alert(msg)
    return Promise.reject(err)
  }
)

export default api