import { useState } from 'react'
import './index.css'
import UsersPage    from './pages/UsersPage'
import PostsPage    from './pages/PostsPage'
import ProductsPage from './pages/ProductsPage'

const PAGES = [
  { key: 'users',    label: 'Users' },
  { key: 'posts',    label: 'Posts' },
  { key: 'products', label: 'Products' },
]

export default function App() {
  const [activePage, setActivePage] = useState('users')

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">Tech<span>Corp</span> Dashboard</div>
        <ul className="navbar-nav">
          {PAGES.map((p) => (
            <li key={p.key}>
              <button
                className={activePage === p.key ? 'active' : ''}
                onClick={() => setActivePage(p.key)}
              >
                {p.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {activePage === 'users'    && <UsersPage />}
      {activePage === 'posts'    && <PostsPage />}
      {activePage === 'products' && <ProductsPage />}
    </>
  )
}
