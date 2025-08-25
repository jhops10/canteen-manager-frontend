import { useEffect, useMemo, useState } from 'react'
import api from '../api/api'
import { formatCurrencyBRL } from '../utils'

function todayISO() {
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth()+1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

export default function PedidosPage() {
  const [clientes, setClientes] = useState([])
  const [produtos, setProdutos] = useState([])
  const [orders, setOrders] = useState([])

  const [customerId, setCustomerId] = useState('')
  const [productId, setProductId] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [date, setDate] = useState(todayISO())

  const produtosMap = useMemo(() => {
    const m = {}
    produtos.forEach(p=> m[p.id] = p)
    return m
  }, [produtos])

  const clientesMap = useMemo(() => {
    const m = {}
    clientes.forEach(c=> m[c.id] = c)
    return m
  }, [clientes])

  async function loadAll() {
    const [c, p, o] = await Promise.all([
      api.get('/customers'), api.get('/products'), api.get('/orders')
    ])
    setClientes(c.data || [])
    setProdutos(p.data || [])
    setOrders(o.data || [])
  }

  useEffect(() => { loadAll() }, [])

  async function create(e) {
    e.preventDefault()
    if (!customerId || !productId || !quantity) return alert('Selecione cliente, produto e quantidade.')
    await api.post('/orders', {
      customerId: Number(customerId),
      productId: Number(productId),
      quantity: Number(quantity),
      purchaseDate: date
    })
    setQuantity(1); setProductId(''); // mantém o cliente e a data
    await loadAll()
  }

  async function remove(id) {
    if (!confirm('Excluir este pedido?')) return
    await api.delete(`/orders/${id}`)
    await loadAll()
  }

  return (
    <div className="grid gap-6 mt-4">
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Concluir Venda</h2>
        <form onSubmit={create} className="grid sm:grid-cols-5 gap-3">
          <select className="input" value={customerId} onChange={e=>setCustomerId(e.target.value)}>
            <option value="">Selecione o cliente</option>
            {clientes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          <select className="input" value={productId} onChange={e=>setProductId(e.target.value)}>
            <option value="">Selecione o produto</option>
            {produtos.map(p => <option key={p.id} value={p.id}>{p.productName}</option>)}
          </select>

          <input className="input" type="number" min="1" value={quantity} onChange={e=>setQuantity(e.target.value)} placeholder="Qtd" />
          <input className="input" type="date" value={date} onChange={e=>setDate(e.target.value)} />
          <button className="btn btn-purple">Finalizar Pedido</button>
        </form>
      </div>

      <div className="card">
        <h3 className="text-md font-semibold mb-3">Pedidos Recentes</h3>
        <table className="table">
          <thead>
            <tr>
              <th className="th">ID</th>
              <th className="th">Cliente</th>
              <th className="th">Produto</th>
              <th className="th">Qtd</th>
              <th className="th">Valor Unit.</th>
              <th className="th">Total</th>
              <th className="th">Data</th>
              <th className="th">Ações</th>
            </tr>
          </thead>
<tbody>
  {orders.map(o => {
    const unit = o.product?.unitValue ?? 0;
    const total = o.totalAmount ?? (Number(o.quantity || 0) * Number(unit));
    return (
      <tr key={o.id}>
        <td className="td">{o.id}</td>
        <td className="td">{o.customerName}</td>
        <td className="td">{o.product?.productName}</td>
        <td className="td">{o.quantity}</td>
        <td className="td">{formatCurrencyBRL(unit)}</td>
        <td className="td font-medium">{formatCurrencyBRL(total)}</td>
        <td className="td">{o.purchaseDate}</td>
        <td className="td">
          <button className="btn btn-danger" onClick={() => remove(o.id)}>Excluir</button>
        </td>
      </tr>
    )
  })}
</tbody>
        </table>
        {orders.length === 0 && <p className="text-sm text-gray-500">Nenhum pedido cadastrado.</p>}
      </div>
    </div>
  )
}