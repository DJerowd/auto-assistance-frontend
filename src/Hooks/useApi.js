import { useState, useEffect } from 'react'
import api from '../Services/api'

export function useApi(endpoint, options = {}, dependencies = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        const response = await api.request(
          { url: endpoint, ...options }
        );
        if (isMounted) setData(response.data)
      } catch (err) {
        if (isMounted) setError(err.response?.data?.message || 'Erro ao conectar com a API')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchData()
    return () => { isMounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return { data, loading, error }
} 