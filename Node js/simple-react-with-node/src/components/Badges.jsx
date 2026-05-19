export function StatusBadge({ status }) {
  return (
    <span className={`badge ${status === 'Active' ? 'badge-green' : 'badge-red'}`}>
      {status}
    </span>
  )
}

const CATEGORY_MAP = {
  Engineering: 'badge-purple',
  Design: 'badge-blue',
  Product: 'badge-cyan',
  Infrastructure: 'badge-orange',
  Quality: 'badge-green',
  Analytics: 'badge-gray',
  Backend: 'badge-purple',
  Frontend: 'badge-blue',
  DevOps: 'badge-orange',
  Testing: 'badge-green',
  Electronics: 'badge-blue',
  Peripherals: 'badge-purple',
  Furniture: 'badge-orange',
  Audio: 'badge-cyan',
}

export function CategoryBadge({ category }) {
  return (
    <span className={`badge ${CATEGORY_MAP[category] || 'badge-gray'}`}>
      {category}
    </span>
  )
}
