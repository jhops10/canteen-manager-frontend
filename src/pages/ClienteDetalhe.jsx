import { useEffect, useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/api'
import { formatCurrencyBRL } from '../utils'

export default function ClienteDetalhe() {
  const { id } = useParams()
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchSummary = useCallback(async () => {
    setLoading(true)
    try {
      let res = await api.get(`/customers/${id}/summary`)
      setSummary(res.data)
    } catch (e1) {
      try {
        let res2 = await api.get(`/customers/${id}/summmary`)
        setSummary(res2.data)
      } catch (e2) {
        console.error(e2)
        alert('Erro ao carregar o resumo do cliente.')
      }
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => { fetchSummary() }, [fetchSummary])

  async function clearOrders() {
    if (!confirm('Confirmar quitação e remoção de todas as compras deste cliente?')) return
    await api.delete(`/customers/${id}/orders`)
    await fetchSummary()
  }

  const totalDebt = summary?.totalDebt ?? 0

  return (
    <div className="grid gap-6 mt-4">
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Cliente #{id}</h2>
            <div className="mt-1">
              <span className="label">Nome:</span> <span className="font-medium">{summary?.customerName}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link className="btn" to="/clientes">Voltar</Link>
            <button className="btn btn-danger" onClick={clearOrders}>Limpar Compras</button>
          </div>
        </div>
        <div className="mt-4">
          <span className="label">Total em aberto:</span>{' '}
          <span className="text-lg font-semibold">{formatCurrencyBRL(totalDebt)}</span>
        </div>
      </div>

      <div className="card">
        <h3 className="text-md font-semibold mb-3">Pedidos deste Cliente</h3>
        {loading && <p className="text-sm text-gray-500">Carregando...</p>}
        {!loading && (
          <table className="table">
            <thead>
              <tr>
                <th className="th">Pedido ID</th>
                <th className="th">Produto</th>
                <th className="th">Qtd</th>
                <th className="th">Valor Unit.</th>
                <th className="th">Total</th>
                <th className="th">Data</th>
              </tr>
            </thead>
            <tbody>
              {(summary?.orders || []).map(o => (
                <tr key={o.id}>
                  <td className="td">{o.id}</td>
                  <td className="td">{o.product?.productName}</td>
                  <td className="td">{o.quantity}</td>
                  <td className="td">{formatCurrencyBRL(o.product?.unitValue)}</td>
                  <td className="td font-medium">{formatCurrencyBRL(o.totalAmount ?? (o.quantity * (o.product?.unitValue ?? 0)))}</td>
                  <td className="td">{o.purchaseDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {(!loading && (!summary?.orders || summary.orders.length === 0)) && <p className="text-sm text-gray-500">Nenhum pedido encontrado.</p>}
      </div>
    </div>
  )
}