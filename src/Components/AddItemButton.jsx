import { useState, useMemo } from "react"
import useFetch from "../Hooks/useFetch"
import { endpoints } from "../Api/endpoints"
import { headerPOST } from "../Api/headers"
import "../Styles/addItemButton.css"

const AddItemButton = ({ data, table }) => {
  const [trigger, setTrigger] = useState(false)
  const url = endpoints.add
  const requestOptions = useMemo(() => {
    const options = {
      method: "POST",
      headers: headerPOST,
      body: JSON.stringify({ ...data, table })
    }
    return options
  }, [data, table])

  const { loaded, error } = useFetch({ url, trigger, requestOptions })

  return (
    <div className="save-btn-container">
      <button className="save-btn" onClick={() => setTrigger(true)}>Save data</button>
      {loaded && !error &&  <span> Register done </span>}
      {error && <span> Register Fail </span>}
    </div>

  )

}

export default AddItemButton