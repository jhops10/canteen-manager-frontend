
export function formatCurrencyBRL(value) {
  if (value === null || value === undefined) return ''
  const num = typeof value === 'string' ? Number(value) : value
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num)
}
