import { useState, useEffect } from 'react'
import api from '../Services/api'

export function useData(dataType) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    useEffect(() => {
        let isMounted = true
        async function fetchData() {
            setLoading(true)
            setError(null)
            try {
                const response = await api.get(`/data/${dataType}`);
                if (isMounted) setData(response);
            } catch (error) {
                if (isMounted) setError(error); 
            } finally {
                if (isMounted) setLoading(false);
            }
        }
        fetchData()
        return () => { isMounted = false }
    }, [dataType])
    return { data, loading, error }
}