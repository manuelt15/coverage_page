import { useState, useEffect } from 'react'

const API_URL = 'https://api.getrollee.com/api/dashboard/v0.1/documentation/datasources'

const normalize = (item) => ({
  id: item.id,
  name: item.title,
  category: item.type ?? 'Other',
  type: item.type ?? 'Other',
  status: item.status,
  logoUrl: item.logo ?? null,
})

export const useDatasources = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL)

        if (!res.ok) throw new Error('Failed')

        const json = await res.json()
        console.log(json)
        setData(json.datasources.map(normalize))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}
