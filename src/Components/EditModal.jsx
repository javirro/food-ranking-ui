import { useState } from 'react'
import '../Styles/editModal.css'
import '../Styles/modal.css'
import { endpoints } from '../Api/endpoints'
import { headerPOST } from '../Api/headers'

const EditModal = ({ table, row, setIsEditModal, setTrigger }) => {
  const [error, setError] = useState(null)
  const [data, setData] = useState({
    id: row?.id,
    name: row?.name,
    position: row?.position,
    ubication: row?.ubication,
    price: row?.price,
    extra: row?.extra
  })
  const url = endpoints.update
  console.log(error)
  const updateRow = () => {
    const requestOptions = {
      method: "POST",
      headers: headerPOST,
      body: JSON.stringify({
        table,
        id: data.id,
        position: data.position
      })
    }
    setTrigger(false)
    fetch(url, requestOptions)
      .then((res) => {
        if (res.ok) return res.json()
        setError(res.status)
        return
      })
      .then((data) => {
        if (data) {
          setError(null)
        }
      })
      .catch((e) => setError(e))
      .finally(() => setTrigger(true))
  }

  return (
    <div className="modal">
      <div className="modal-content" >
        <header>
          <button onClick={() => setIsEditModal(false)}>Close</button>
        </header>
        <section className="section-inputs-modal">
          <input type="text" value={data?.name} onChange={(ev) => setData(s => ({ ...s, name: ev.target.value }))} placeholder="Restaurant Name" className="inputs-edit-modal" maxLength={120} />
          <input type="text" value={data?.position} onChange={(ev) => setData(s => ({ ...s, position: ev.target.value }))} placeholder="Position" className="inputs-edit-modal" />
          <input type="text" value={data?.ubication} onChange={(ev) => setData(s => ({ ...s, ubication: ev.target.value }))} placeholder="Ubication" className="inputs-edit-modal" />
          <input type="text" value={`${data?.price} €`} onChange={(ev) => setData(s => ({ ...s, price: ev.target.value }))} placeholder="Price" className="inputs-edit-modal" />
          <textarea type="text" value={data?.extra} onChange={(ev) => setData(s => ({ ...s, extra: ev.target.value }))} placeholder="Extra comments" className="inputs-edit-modal" maxLength={256} />
          <button className="button-update" onClick={() => updateRow()}>Update - {row.name}</button>
        </section>
      </div>
    </div>)
}

export default EditModal