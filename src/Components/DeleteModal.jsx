
import { endpoints } from '../Api/endpoints'
import NotAuthorized from './NotAuthorized'
import '../Styles/deleteModal.css'


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
    <div className="modal-delete">
      <div className="modal-delete-content" >
        <header className="modal-delete-header">
          <button onClick={() => setIsDeleteModal(false)} className="close-delete">Close</button>
        </header>
        <section className="delete-section">
          <button className="btn-delete" onClick={() => deleteItem()}>Delete - {row.name}</button>
        </section>
      </div>
    </div>)
}

export default DeleteModal