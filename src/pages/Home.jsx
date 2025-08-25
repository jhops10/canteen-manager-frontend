import { Link } from 'react-router-dom'

function Card({ title, description, to, variant, svg }) {
  const btnClass =
    variant === 'primary' ? 'btn btn-primary' :
    variant === 'success' ? 'btn btn-success' :
    'btn btn-purple'

  return (
    <div className="card flex flex-col items-start gap-3">
      <div className="w-full flex items-center gap-4">
        <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center">
          {svg}
        </div>
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <Link to={to} className={btnClass}>Acessar</Link>
    </div>
  )
}

const UserSVG = (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)
const BoxSVG = (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
    <path d="M21 7l-9-4-9 4 9 4 9-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 7v10l9 4 9-4V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const CartSVG = (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="20" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="17" cy="20" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 4h2l2.4 10.2A2 2 0 0 0 9.36 16H17a2 2 0 0 0 1.94-1.53L21 7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

export default function Home() {
  return (
    <div className="grid sm:grid-cols-3 gap-6 mt-10">
      <Card
        title="Cadastrar Cliente"
        description="Cadastrar um novo cliente para fazer pedidos."
        to="/clientes"
        variant="primary"
        svg={UserSVG}
      />
      <Card
        title="Cadastrar Produto"
        description="Faça o cadastro de novos produtos."
        to="/produtos"
        variant="success"
        svg={BoxSVG}
      />
      <Card
        title="Venda"
        description="Selecione cliente, produto e finalize o pedido."
        to="/pedidos"
        variant="purple"
        svg={CartSVG}
      />
    </div>
  )
}