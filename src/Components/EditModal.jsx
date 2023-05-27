import '../Styles/editModal.css'
import '../Styles/modal.css'

const EditModal = ({ row, setIsEditModal }) => {
  return (
    <div className="modal">
      <div className="modal-content" >
        <header>
          <button onClick={() => setIsEditModal(false)}>Close</button>
        </header>
        <section className="modal-edit-inputs">
        </section>
      </div>
    </div>)
}

export default EditModal