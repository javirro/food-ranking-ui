import { useState } from 'react'
import { endpoints } from '../Api/endpoints'
import { headerPOST } from '../Api/headers'
import { validatePosition } from '../ErrorValidation/validator'
import { InputError } from '../ErrorValidation/CustomizeError'
import NotAuthorized from './NotAuthorized'
import '../Styles/editModal.css'

const EditModal = ({ table, row, setIsEditModal, setTrigger }) => {
  const [data, setData] = useState({
    id: row?.id,
    name: row?.name,
    position: row?.position,
    ubication: row?.ubication,
    price: row?.price,
  })
  const url = endpoints.update
  const token = window.localStorage.getItem("token")

  if (!token) return <NotAuthorized operation={"edit"} setIsModal={setIsEditModal} />
  const updateRow = () => {
    try {
      validatePosition(data.position)
    } catch (e) {
      if (e instanceof InputError) setTrigger(false)
      return
    }

    headerPOST.token = token

    const requestOptions = {
      method: "POST",
      headers: headerPOST,
      body: JSON.stringify({
        table,
        name: data.name,
        id: data.id,
        position: data.position
      })
    }
    setTrigger(false)
    fetch(url, requestOptions)
      .then((res) => {
        if (res.ok) return res.json()
      })
      .then((data) => {
        if (data) return data
      })
      .catch((e) => console.error(e))
      .finally(() => setTrigger(true))
  }

  return (
    <div className="modal-edit">
      <div className="modal-edit-content" >
        <header className="header-edit-modal">
          <button onClick={() => setIsEditModal(false)} className="close-edit-modal-btn">Close</button>
        </header>
        <section className="section-inputs-modal">
          <label className="edit-modal-labels">Restaurant name</label>
          <input type="text" value={data?.name} onChange={(ev) => setData(s => ({ ...s, name: ev.target.value }))} placeholder="Restaurant Name" className="inputs-edit-modal" maxLength={120} />
          <label className="edit-modal-labels">Ranking position</label>
          <input type="text" value={data?.position} onChange={(ev) => setData(s => ({ ...s, position: ev.target.value }))} placeholder="Position" className="inputs-edit-modal" />
          <label className="edit-modal-labels">Ubication</label>
          <input type="text" value={data?.ubication} onChange={(ev) => setData(s => ({ ...s, ubication: ev.target.value }))} placeholder="Ubication" className="inputs-edit-modal" />
          {/* <input type="text" value={`${data?.price} €`} onChange={(ev) => setData(s => ({ ...s, price: ev.target.value }))} placeholder="Price" className="inputs-edit-modal" /> */}
          <button className="button-update" onClick={() => updateRow()}>Update - {row.name}</button>
        </section>
      </div>
    </div>)
}

export default EditModal