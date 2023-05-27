import '../Styles/addItemButton.css'
import { PositionError, PriceError } from '../ErrorValidation/CustomizeError'
const ErrorInputsMessage = ({ networkError, inputError }) => {
  if (inputError) {
    return (
      <div className="error-message-container">
        {(inputError instanceof PositionError) && <span> ❌ Error with Position. Must be a number.</span>}
        {(inputError instanceof PriceError) && <span> ❌ Error with Price. Must be a number.</span>}
      </div>)
  }
  else if (networkError) return <span> ❌ Error with Network connection. Data is not saved.</span>
  else return

}

export default ErrorInputsMessage