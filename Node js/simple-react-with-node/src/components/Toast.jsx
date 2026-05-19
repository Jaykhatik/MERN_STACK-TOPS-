export default function Toast({ toast }) {
  if (!toast) return null
  return (
    <div className={`toast toast-${toast.type}`}>
      {toast.msg}
    </div>
  )
}
