
import { AuthError, PositionError, PriceError, UserError } from '../ErrorValidation/CustomizeError'
import '../Styles/addItemButton.css'

const ErrorInputsMessage = ({ networkError, inputError, authError }) => {
  if (inputError) {
    return (
      <div className="error-message-container">
        {(inputError instanceof PositionError) && <span> ❌ Error with Position. Must be a number.</span>}
        {(inputError instanceof PriceError) && <span> ❌ Error with Price. Must be a number.</span>}
      </div>)
  }
  else if (authError) {
    return (
      <div className="error-message-container">
        {(authError instanceof UserError) && <span> ❌ Error with user Data. Must complete data.</span>}
        {(authError instanceof AuthError) && <span> ❌ Error in authorization. Incorrect credentials.</span>}
      </div>)
  }
  else if (networkError) return <div className="error-message-container"> <span> ❌ Error with Network connection. Retry later.</span></div>
  else return

}

export default ErrorInputsMessage