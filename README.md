
# Cantina Frontend (React + Vite + Tailwind)

Frontend para consumir sua API da cantina.

## Requisitos
- Node.js 18+
- Backend rodando em `http://localhost:8080` com CORS habilitado para `http://localhost:5173`

## Como rodar
```bash
npm install
npm run dev
```
- A aplicação abrirá em `http://localhost:5173`.

## Variável de ambiente (opcional)
Crie um arquivo `.env` na raiz para apontar para outra URL de API:
```
VITE_API_BASE=http://localhost:8080/api
```

## Endpoints esperados pelo frontend
- **Clientes**
  - POST `/api/customers` body: `{ "name": "Exemplo" }`
  - GET `/api/customers`
  - GET `/api/customers/{id}`
  - GET `/api/customers/{id}/summary` (ou fallback `/summmary`) → usado na página de detalhe do cliente
  - PUT `/api/customers/{id}` body: `{ "customerName": "Francisco" }`
  - DELETE `/api/customers/{id}`
  - DELETE `/api/customers/{id}/orders` → limpa compras do cliente

- **Produtos**
  - POST `/api/products` body: `{ "productName": "Frangos", "unitValue": 18.00 }`
  - GET `/api/products`
  - GET `/api/products/{id}`
  - PUT `/api/products/{id}` body: `{ "productName": "Frango Assado" }`
  - DELETE `/api/products/{id}`

- **Pedidos**
  - POST `/api/orders` body:
    ```json
    {
      "customerId": 1,
      "productId": 2,
      "quantity": 3,
      "purchaseDate": "2025-08-20"
    }
    ```
  - GET `/api/orders`
  - GET `/api/orders/{id}`
  - DELETE `/api/orders/{id}`

## O que foi feito de acordo com seu pedido
- Página **Pedidos** agora exibe **nome do produto**, **valor unitário** e **total** por venda (calculado no frontend).
- Página **Cliente** usa `GET /customers/{id}/summary` para exibir a lista de compras com **produto, unitValue, total**, e mostra **Total em aberto**.
- Adicionado botão **"Limpar Compras"** na página do cliente que chama `DELETE /customers/{id}/orders` e recarrega o resumo.
- Menu inicial repaginado com **ícones SVG** para Clientes, Produtos e Vendas.

## Observações
- Se ocorrer erro de CORS, habilite CORS no seu backend Spring (exemplo já enviado na conversa).
- Você pode alterar `VITE_API_BASE` via `.env` sem recompilar.

