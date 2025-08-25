import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/api'

export default function ClientesPage() {
  const [clientes, setClientes] = useState([])
  const [nome, setNome] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingName, setEditingName] = useState('')

  async function load() {
    const res = await api.get('/customers')
    setClientes(res.data || [])
  }

  useEffect(() => { load() }, [])

  async function create(e) {
    e.preventDefault()
    if (!nome.trim()) return
    await api.post('/customers', { name: nome.trim() })
    setNome('')
    await load()
  }

  function startEdit(c) {
    setEditingId(c.id)
    setEditingName(c.name)
  }

  async function confirmEdit(id) {
    await api.put(`/customers/${id}`, { customerName: editingName })
    setEditingId(null)
    setEditingName('')
    await load()
  }

  async function remove(id) {
    if (!confirm('Deseja excluir este cliente?')) return
    await api.delete(`/customers/${id}`)
    await load()
  }

  return (
    <div className="grid gap-6 mt-4">
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Cadastrar Cliente</h2>
        <form onSubmit={create} className="grid sm:grid-cols-[1fr_auto] gap-3">
          <input className="input" placeholder="Nome do cliente"
            value={nome} onChange={(e)=>setNome(e.target.value)} />
          <button className="btn btn-primary">Salvar</button>
        </form>
      </div>

      <div className="card">
        <h3 className="text-md font-semibold mb-3">Clientes Cadastrados</h3>
        <table className="table">
          <thead>
            <tr>
              <th className="th">ID</th>
              <th className="th">Nome</th>
              <th className="th">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(c => (
              <tr key={c.id}>
                <td className="td">{c.id}</td>
                <td className="td">
                  {editingId === c.id ? (
                    <input className="input" value={editingName}
                      onChange={e=>setEditingName(e.target.value)} />
                  ) : (
                    <span>{c.name}</span>
                  )}
                </td>
                <td className="td space-x-2">
                  {editingId === c.id ? (
                    <button className="btn btn-primary" onClick={()=>confirmEdit(c.id)}>Confirmar</button>
                  ) : (
                    <button className="btn btn-primary" onClick={()=>startEdit(c)}>Editar</button>
                  )}
                  <button className="btn btn-danger" onClick={()=>remove(c.id)}>Excluir</button>
                  <Link to={`/clientes/${c.id}`} className="btn btn-purple">Ver Pedidos</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}