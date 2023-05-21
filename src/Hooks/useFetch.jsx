import { useEffect, useState } from "react"

const useFetch = ({ url }) => {
  const [result, setResult] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoaded(false)
    fetch(url)
      .then((res) => {
        if (res.ok) return res.json()
        setError(res.status)
        return
      })
      .then((data) => setResult(data))
      .catch((e) => setError(e))
      .finally(() => setLoaded(true))
  }, [url])

  return ({ result, error, loaded })
}

export default useFetch