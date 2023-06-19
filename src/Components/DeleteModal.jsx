
import { endpoints } from '../Api/endpoints'
import '../Styles/deleteModal.css'
import '../Styles/modal.css'


const DeleteModal = ({ table, row, setIsDeleteModal, setTrigger }) => {
  const token = window.localStorage.getItem("token")
  if(!token) {
    return (<div className="modal">
      <div id="modal-content-delete" className="modal-content" >
        <header>
          <button onClick={() => setIsDeleteModal(false)} className="close-delete">Close</button>
        </header>
        <section className="section-inputs-modal">
          <span className='not-authorized'> ⛔ You are not authorized to delete info.</span>
        </section>
      </div>
    </div>)
  }
  const deleteItem = async () => {
    fetch(`${endpoints.delete}?table=${table}&id=${row?.id}&position=${row?.position}`, {
      headers: { token }
    })
      .then(res => res.json())
      .then(data => data)
      .finally(() => {
        setTrigger(true)
        setIsDeleteModal(false)
      } )
  }

  return (
    <div className="modal">
      <div id="modal-content-delete" className="modal-content" >
        <header>
          <button onClick={() => setIsDeleteModal(false)} className="close-delete">Close</button>
        </header>
        <section className="section-inputs-modal">
          <button className="btn-delete" onClick={() => deleteItem()}>Delete - {row.name}</button>
        </section>
      </div>
    </div>)
}

export default DeleteModal