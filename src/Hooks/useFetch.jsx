import { useEffect, useState } from "react"

const useFetch = ({ url, trigger, requestOptions }) => {
  const [result, setResult] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(undefined)

  useEffect(() => {
    if (trigger) {
      setLoaded(false)
      setError(undefined)
      fetch(url, requestOptions)
        .then((res) => {
          if (res.ok) return res.json()
          setError(res.status)
          return
        })
        .then((data) => {
          if (data) {
            setResult(data)
            setError(undefined)
          }
        })
        .catch((e) => setError(e))
        .finally(() => setLoaded(true))
    }
  }, [url, requestOptions, trigger])

  return ({ result, error, loaded })
}

export default useFetch