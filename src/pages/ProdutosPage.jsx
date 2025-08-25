import { useEffect, useState } from 'react'
import api from '../api/api'
import { formatCurrencyBRL } from '../utils'

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState([])
  const [nome, setNome] = useState('')
  const [valor, setValor] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingName, setEditingName] = useState('')

  async function load() {
    const res = await api.get('/products')
    setProdutos(res.data || [])
  }

  useEffect(() => { load() }, [])

  async function create(e) {
    e.preventDefault()
    const unitValue = parseFloat(String(valor).replace(',', '.'))
    if (!nome.trim() || Number.isNaN(unitValue)) return alert('Informe nome e valor numérico.')
    await api.post('/products', { productName: nome.trim(), unitValue })
    setNome(''); setValor('')
    await load()
  }

  function startEdit(p) {
    setEditingId(p.id)
    setEditingName(p.productName)
  }

  async function confirmEdit(id) {
    await api.put(`/products/${id}`, { productName: editingName })
    setEditingId(null)
    setEditingName('')
    await load()
  }

  async function remove(id) {
    if (!confirm('Deseja excluir este produto?')) return
    await api.delete(`/products/${id}`)
    await load()
  }

  return (
    <div className="grid gap-6 mt-4">
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Cadastrar Produto</h2>
        <form onSubmit={create} className="grid sm:grid-cols-[1fr_200px_auto] gap-3">
          <input className="input" placeholder="Nome do produto"
            value={nome} onChange={(e)=>setNome(e.target.value)} />
          <input className="input" placeholder="Exemplo: R$ 4.00"
            value={valor} onChange={(e)=>setValor(e.target.value)} />
          <button className="btn btn-success">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h3 className="text-md font-semibold mb-3">Produtos</h3>
        <table className="table">
          <thead>
            <tr>
              <th className="th">ID</th>
              <th className="th">Nome</th>
              <th className="th">Valor</th>
              <th className="th">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map(p => (
              <tr key={p.id}>
                <td className="td">{p.id}</td>
                <td className="td">
                  {editingId === p.id ? (
                    <input className="input" value={editingName}
                      onChange={e=>setEditingName(e.target.value)} />
                  ) : (
                    <span>{p.productName}</span>
                  )}
                </td>
                <td className="td">{formatCurrencyBRL(p.unitValue)}</td>
                <td className="td space-x-2">
                  {editingId === p.id ? (
                    <button className="btn btn-success" onClick={()=>confirmEdit(p.id)}>Confirmar</button>
                  ) : (
                    <button className="btn btn-primary" onClick={()=>startEdit(p)}>Editar</button>
                  )}
                  <button className="btn btn-danger" onClick={()=>remove(p.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}