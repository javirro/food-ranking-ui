import { useState } from 'react'
import { endpoints } from '../Api/endpoints'
import { validateUserInput } from '../ErrorValidation/validator'
import { AuthError, UserError } from '../ErrorValidation/CustomizeError'
import ErrorInputsMessage from './ErrorInputsMessage'
import '../Styles/authModal.css'
import '../Styles/modal.css'



const AuthModal = ({ setIsAuthModal }) => {
  const TIME_TO_WAIT_TO_CLOSE_MODAL = 4000
  const [userData, setUserData] = useState({ user: undefined, password: undefined })
  const [token, setToken] = useState(window.localStorage.getItem("token"))
  const [error, setError] = useState(undefined)
  const [networkError, setNetworkError] = useState(undefined)
  const url = endpoints.auth

  const updateRow = () => {
    setError(undefined)
    setNetworkError(undefined)
    try {
      validateUserInput(userData)
    } catch (e) {
      if (e instanceof UserError) setError(new UserError())
      return
    }

    const requestOptions = {
      method: "POST",
      headers: {
        'Access-Control-Allow-Origin': "*",
        "authorization": `${userData.user}:${userData.password}`
      },
    }
    fetch(url, requestOptions)
      .then((res) => {
        if (res.ok) return res.json()
        else setError(new AuthError("Not Authorized"))
      })
      .then((data) => {
        if (data) {
          window.localStorage.setItem("token", data)
          setToken(data)
          setError(undefined)
          setNetworkError(undefined)
        }
      })
      .catch(e => setNetworkError(e))
      .finally(async () => {
        setTimeout(() => {
          setIsAuthModal(window.localStorage.getItem("token") ? false : true)
        }, TIME_TO_WAIT_TO_CLOSE_MODAL)
      })
  }

  const handleUserData = (ev) => {
    const name = ev.target.name
    const value = ev.target.value
    setUserData(s => ({ ...s, [name]: value }))
  }
  return (
    <div className="modal-auth">
      <div className="modal-auth-content" >
        <header className="header-auth">
          <h3>Authorization control</h3>
          <button onClick={() => setIsAuthModal(false)} className="close-auth-btn">Close</button>
        </header>
        {!token && <section className="section-inputs-modal">
          <input type="text" value={userData.user} onChange={handleUserData} placeholder="User Name" maxLength={60} name="user"/>
          <input type="password" value={userData?.password} onChange={handleUserData} placeholder="Password"  name="password" />
          <button className="button-update" onClick={() => updateRow()}>Request Authorization</button>
        </section>}
        {token != null && <p className='text-user-authorized'> ✅ User Authorized!</p>}
        {(error || networkError) && <ErrorInputsMessage authError={error} networkError={networkError} />}
      </div>
    </div>)
}

export default AuthModal