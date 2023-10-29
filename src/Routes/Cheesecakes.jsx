import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import AddItem from "../Components/AddItem"
import AuthModal from "../Components/AuthModal"
import '../Styles/global.css'

const Cheesecakes = () => {
  const [data, setData] = useState({
    name: undefined,
    position: undefined,
    ubication: undefined,
    price: undefined,
  })
  const [isAuthModal, setIsAuthModal] = useState(window.localStorage.getItem("token") ? false : true)
  const location = useLocation()
  const table = location.pathname.slice(1)
  return (
    <main className="main-routes-container">
      {isAuthModal && <AuthModal setIsAuthModal={setIsAuthModal} />}
      <h3 className="routes-title">Cheesecakes</h3>
      <AddItem data={data} setData={setData} table={table} />
    </main>)
}

export default Cheesecakes