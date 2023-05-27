import { useEffect, useState } from "react"

const useFetch = ({ url, trigger, requestOptions }) => {
  const [result, setResult] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (trigger) {
      setLoaded(false)
      fetch(url, requestOptions)
        .then((res) => {
          if (res.ok) return res.json()
          setError(res.status)
          return
        })
        .then((data) => {
          if (data) {
            console.log(data)
            setResult(data)
            setError(null)
          }
        })
        .catch((e) => setError(e))
        .finally(() => setLoaded(true))
    }
  }, [url, requestOptions, trigger])

  return ({ result, error, loaded })
}

export default useFetch