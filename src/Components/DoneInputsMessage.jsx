import '../Styles/addItemButton.css'

const DoneInputsMessage = ({ data }) => {
  return <span className="done-message"> ✅ {data.name} has been registered</span>

}

export default DoneInputsMessage