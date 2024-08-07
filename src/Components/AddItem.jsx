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

  const textInputChange = (ev) => {
    if (loaded) setLoaded(false)
    if (inputError) setInputError(undefined)
    if (networkError) setNetworkError(undefined)
    const key = ev.target.name
    const value = ev.target.value
    setData(s => ({ ...s, [key]: value }))
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
        <label>Restaurant name</label>
        <input type="text" onChange={textInputChange} placeholder="Restaurant Name" maxLength={120} name="name" />
        <label>Position in ranking</label>
        <input type="text" onChange={textInputChange} placeholder="Position" name="position" />
        <label >Ubication</label>
        <input type="text" onChange={textInputChange} placeholder="Ubication" name="ubication" />
        <label >Price</label>
        <input type="text" onChange={textInputChange} placeholder="Price (€)" name="price" />
      </section>
      <section className="save-btn-container">
        <button className="save-btn" disabled={window.localStorage.getItem("token") ? false : true} onClick={addItemHandler}>Save data</button>
        {loaded && !inputError && !networkError && <DoneInputsMessage data={data} />}
        {(inputError || networkError) && <ErrorInputsMessage networkError={networkError} inputError={inputError} />}
      </section>
    </>
  )

}

export default AddItem