const AVATAR_COLORS = [
  '#6366f1', '#0891b2', '#16a34a', '#dc2626',
  '#d97706', '#7c3aed', '#0284c7', '#059669',
]

export function getColor(id) {
  return AVATAR_COLORS[(id - 1) % AVATAR_COLORS.length]
}

export default function Avatar({ name, id, size = 36 }) {
  return (
    <div
      className="avatar"
      style={{
        background: getColor(id),
        width: size,
        height: size,
        fontSize: size * 0.38,
      }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  )
}
