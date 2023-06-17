import { useState } from 'react'
import { endpoints } from '../Api/endpoints'
import { validateUserInput } from '../ErrorValidation/validator'
import { UserError } from '../ErrorValidation/CustomizeError'
import '../Styles/authModal.css'
import '../Styles/modal.css'


const AuthModal = ({ setIsAuthModal, setTrigger }) => {
  const [userData, setUserData] = useState({
    user: undefined,
    password: undefined
  })
  const [token, setToken] = useState(window.localStorage.getItem("token"))
  const url = endpoints.auth
  const updateRow = () => {
    try {
      validateUserInput(userData)
    } catch (e) {
      if (e instanceof UserError) setTrigger(false)
      return
    }

    const requestOptions = {
      method: "GET",
      headers: {
        authorization: {
          user: userData.user,
          password: userData.password
        }
      },
    }
    setTrigger(false)
    fetch(url, requestOptions)
      .then((res) => {
        if (res.ok) return res.json()
      })
      .then((data) => {
        if (data) {
          window.localStorage.setItem("token", data.token)
          setToken(data.token)
        }
      })
      .catch((e) => console.error(e))
      .finally(async () => {
        setTimeout(() => {
          setIsAuthModal(false)
        }, 4000)
      })
  }

  return (
    <div className="modal">
      <div className="modal-content" >
        <header>
          <button onClick={() => setIsAuthModal(false)}>Close</button>
        </header>
        {!token && <section className="section-inputs-modal">
          <input type="text" value={userData.user} onChange={(ev) => setUserData(s => ({ ...s, user: ev.target.value }))} placeholder="User Name" className="inputs-edit-modal" maxLength={60} />
          <input type="password" value={userData?.password} onChange={(ev) => setUserData(s => ({ ...s, password: ev.target.value }))} placeholder="Password" className="inputs-edit-modal" />
          <button className="button-update" onClick={() => updateRow()}>Request Authorization</button>
        </section>}
        {token && <p className='text-user-authorized'>User Authorized!</p>}
      </div>
    </div>)
}

export default AuthModal