
import { PositionError, PriceError } from '../ErrorValidation/CustomizeError'
import '../Styles/addItemButton.css'

const ErrorInputsMessage = ({ networkError, inputError }) => {
  if (inputError) {
    return (
      <div className="error-message-container">
        {(inputError instanceof PositionError) && <span> ❌ Error with Position. Must be a number.</span>}
        {(inputError instanceof PriceError) && <span> ❌ Error with Price. Must be a number.</span>}
      </div>)
  }
  else if (networkError) return <div className="error-message-container"> <span> ❌ Error with Network connection. Data is not saved.</span></div>
  else return

}

export default ErrorInputsMessage