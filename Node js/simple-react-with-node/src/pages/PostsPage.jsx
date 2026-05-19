import Avatar from '../components/Avatar'
import { CategoryBadge } from '../components/Badges'
import { useFetch } from '../hooks/useFetch'

export default function PostsPage() {
  const { data: posts, loading, error } = useFetch('/posts')
  const { data: users } = useFetch('/users')

  const getUserName = (id) => users.find((u) => u.id === id)?.name || `User #${id}`

  if (loading) return <div className="loading">Loading posts...</div>
  if (error)   return <div className="error-msg">Error: {error}</div>

  const categories = [...new Set(posts.map((p) => p.category))]
  const totalRead  = posts.reduce((a, p) => a + parseInt(p.readTime), 0)

  return (
    <div className="page">
      <div className="page-header">
        <h1>Blog Posts</h1>
        <p>Technical articles and guides published by the team.</p>
      </div>

      <div className="stats-bar">
        <div className="stat-card">
          <span className="stat-value">{posts.length}</span>
          <span className="stat-label">Total Posts</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{categories.length}</span>
          <span className="stat-label">Categories</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{totalRead} min</span>
          <span className="stat-label">Total Read Time</span>
        </div>
      </div>

      <div className="cards-grid">
        {posts.map((post) => (
          <div className="card" key={post.id}>
            <div className="card-meta">
              <CategoryBadge category={post.category} />
              <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{post.readTime} read</span>
            </div>
            <div className="card-title">{post.title}</div>
            <div className="card-body">{post.body}</div>
            <div className="card-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="badge badge-gray">{tag}</span>
              ))}
            </div>
            <div className="card-footer">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Avatar name={getUserName(post.userId)} id={post.userId} size={24} />
                <span>{getUserName(post.userId)}</span>
              </div>
              <span>
                {new Date(post.date).toLocaleDateString('en-IN', {
                  year: 'numeric', month: 'short', day: 'numeric',
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
