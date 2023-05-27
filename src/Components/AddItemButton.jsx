import { useState, useMemo } from "react"
import useFetch from "../Hooks/useFetch"
import { endpoints } from "../Api/endpoints"
import { headerPOST } from "../Api/headers"
import { validatePosition, validatePrice } from "../ErrorValidation/validator"
import "../Styles/addItemButton.css"
import ErrorInputsMessage from "./ErrorInputsMessage"

const AddItemButton = ({ data, table }) => {
  const [trigger, setTrigger] = useState(false)
  const [inputError, setInputError] = useState(false)
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

  const addItemHandler = () => {
    try {
      validatePosition(data.position)
      validatePrice(data.price)
      setTrigger(true)
    } catch (error) {
        setTrigger(false)
        setInputError(error)
    }
  }

  return (
    <div className="save-btn-container">
      <button className="save-btn" onClick={addItemHandler}>Save data</button>
      {loaded && !error && <span> Register done </span>}
      {(inputError || error) && <ErrorInputsMessage networkError={error} inputError={inputError}/>}
    </div>

  )

}

export default AddItemButton