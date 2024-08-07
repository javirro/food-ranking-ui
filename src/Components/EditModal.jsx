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

  const handleEdit = (ev) => {
    const name = ev.target.name
    const value = ev.target.value
    setData(s => ({ ...s, [name]: value }))
  }

  return (
    <div className="modal-edit">
      <div className="modal-edit-content" >
        <header className="header-edit-modal">
          <button onClick={() => setIsEditModal(false)} className="close-edit-modal-btn">Close</button>
        </header>
        <section className="section-inputs-modal">
          <label className="edit-modal-labels">Restaurant name</label>
          <input type="text" value={data?.name} onChange={handleEdit} placeholder="Restaurant Name" maxLength={120}   name="name"/>
          <label className="edit-modal-labels">Ranking position</label>
          <input type="text" value={data?.position} onChange={handleEdit} placeholder="Position"  name="position"/>
          <label className="edit-modal-labels">Ubication</label>
          <input type="text" value={data?.ubication} onChange={handleEdit} placeholder="Ubication" name="ubication"/>
          {/* <input type="text" value={`${data?.price} €`} onChange={(ev) => setData(s => ({ ...s, price: ev.target.value }))} placeholder="Price" className="inputs-edit-modal" /> */}
          <button className="button-update" onClick={() => updateRow()}>Update - {row.name}</button>
        </section>
      </div>
    </div>)
}

export default EditModal