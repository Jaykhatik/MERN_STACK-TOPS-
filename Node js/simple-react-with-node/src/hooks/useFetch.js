import { useEffect, useState } from 'react'

const BASE_URL = 'http://localhost:3001'

export function useFetch(endpoint) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`${BASE_URL}${endpoint}`)
      .then((res) => { if (!res.ok) throw new Error('Failed to fetch'); return res.json() })
      .then((d) => { setData(d); setLoading(false) })
      .catch((e) => { setError(e.message); setLoading(false) })
  }, [endpoint])

  return { data, loading, error }
}

export { BASE_URL }
