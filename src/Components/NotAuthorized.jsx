import '../Styles/modal.css'
import '../Styles/notAuthorized.css'

const NotAuthorized = ({ operation, setIsModal }) => {
  return (
    <div className="modal">
      <div className="modal-content" id="modal-content-not-auth" >
        <header>
          <button onClick={() => setIsModal(false)} id="close-not-authorized">Close</button>
        </header>
        <section className='not-authorized'>
          <span> ⛔ You are not authorized to {operation} info.</span>
        </section>
      </div>
    </div>)
}

export default NotAuthorized