import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import AddItem from "../Components/AddItem"
import AuthModal from "../Components/AuthModal"

const Restaurants = () => {
  const [data, setData] = useState({
    name: null,
    position: null,
    ubication: null,
    price: null,
  })
  const [isAuthModal, setIsAuthModal] = useState(window.localStorage.getItem("token") ? false : true)
  const location = useLocation()
  const table = location.pathname.slice(1)
  return (
    <main className="main-routes-container">
      {isAuthModal && <AuthModal setIsAuthModal={setIsAuthModal} />}
      <h3 className="routes-title">Restaurants</h3>
      <AddItem data={data} setData={setData} table={table} />
    </main>)
}


export default Restaurants