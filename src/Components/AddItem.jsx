import { useState } from "react"
import { endpoints } from "../Api/endpoints"
import { headerPOST } from "../Api/headers"
import { validatePosition, validatePrice } from "../ErrorValidation/validator"
import ErrorInputsMessage from "./ErrorInputsMessage"
import DoneInputsMessage from "./DoneInputsMessage"
import "../Styles/addItemButton.css"
import '../Styles/textInputs.css'

const AddItem = ({ data, setData, table }) => {
  const [inputError, setInputError] = useState(undefined)
  const [loaded, setLoaded] = useState(false)
  const [networkError, setNetworkError] = useState(undefined)
  const url = endpoints.add

  const textInputChange = (ev, key) => {
    if (loaded) setLoaded(false)
    if (inputError) setInputError(undefined)
    if (networkError) setNetworkError(undefined)
    setData(s => ({ ...s, [key]: ev.target.value }))
  }

  const addItemHandler = () => {
    try {
      validatePosition(data.position)
      validatePrice(data.price)
    } catch (error) {
      setInputError(error)
    }
    const requestOptions = {
      method: "POST",
      headers: headerPOST,
      body: JSON.stringify({ ...data, table })
    }
    fetch(url, requestOptions)
      .then((res) => {
        if (res.ok) return res.json()
        setNetworkError(res.status)
        return
      })
      .then((data) => {
        if (data) {
          setNetworkError(undefined)
        }
      })
      .catch((e) => setNetworkError(e))
      .finally(() => setLoaded(true))

  }

  return (
    <>
      <section className="inputs-container">
        <input type="text" onChange={(ev) => textInputChange(ev, "name")} placeholder="Restaurant Name" className="text-inputs" maxLength={120} />
        <input type="text" onChange={(ev) => textInputChange(ev, "position")} placeholder="Position" className="text-inputs" />
        <input type="text" onChange={(ev) => textInputChange(ev, "ubication")} placeholder="Ubication" className="text-inputs" />
        <input type="text" onChange={(ev) => textInputChange(ev, "price")} placeholder="Price" className="text-inputs" />
      </section>
      <section className="save-btn-container">
        <button className="save-btn" onClick={addItemHandler}>Save data</button>
        {loaded && !inputError && !networkError && <DoneInputsMessage data={data} />}
        {(inputError || networkError) && <ErrorInputsMessage networkError={networkError} inputError={inputError} />}
      </section>
    </>
  )

}

export default AddItem