import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import ClientesPage from './pages/ClientesPage.jsx'
import ProdutosPage from './pages/ProdutosPage.jsx'
import PedidosPage from './pages/PedidosPage.jsx'
import ClienteDetalhe from './pages/ClienteDetalhe.jsx'

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/clientes/:id" element={<ClienteDetalhe />} />
          <Route path="/produtos" element={<ProdutosPage />} />
          <Route path="/pedidos" element={<PedidosPage />} />
        </Routes>
      </div>
    </div>
  )
}