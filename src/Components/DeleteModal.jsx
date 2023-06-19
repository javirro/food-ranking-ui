
import { endpoints } from '../Api/endpoints'
import NotAuthorized from './NotAuthorized'
import '../Styles/deleteModal.css'
import '../Styles/modal.css'


const DeleteModal = ({ table, row, setIsDeleteModal, setTrigger }) => {
  const token = window.localStorage.getItem("token")
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
  if (!token) return <NotAuthorized operation={"delete"} setIsModal={setIsDeleteModal} />
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