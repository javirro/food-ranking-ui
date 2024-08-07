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
        <label className="labels-inputs">Restaurant name</label>
        <input type="text" onChange={textInputChange} placeholder="Restaurant Name" className="text-inputs" maxLength={120} name="name" />
        <label className="labels-inputs">Position in ranking</label>
        <input type="text" onChange={textInputChange} placeholder="Position" className="text-inputs" name="position"/>
        <label className="labels-inputs">Ubication</label>
        <input type="text" onChange={textInputChange} placeholder="Ubication" className="text-inputs" name="ubication" />
        <label className="labels-inputs">Price</label>
        <input type="text" onChange={textInputChange} placeholder="Price (€)" className="text-inputs"  name="price"/>
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