import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()
  const active = (p) => pathname === p ? 'font-semibold text-blue-700' : 'text-gray-700'

  return (
    <nav className="bg-white shadow mb-6">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="text-xl font-bold">Cantina</Link>
        <div className="flex gap-4">
          <Link className={active('/clientes')} to="/clientes">Clientes</Link>
          <Link className={active('/produtos')} to="/produtos">Produtos</Link>
          <Link className={active('/pedidos')} to="/pedidos">Pedidos</Link>
        </div>
      </div>
    </nav>
  )
}