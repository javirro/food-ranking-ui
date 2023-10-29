import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import AddItem from "../Components/AddItem"
import AuthModal from "../Components/AuthModal"
import { endpoints } from "../Api/endpoints"

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

  const clickHandler = () => {
    fetch(endpoints.examples, {
      method: "GET",
      headers: {
        "x-function-key": "LTwViSoqJ9yJlZjSYMLHAAQIk937h07Mf9yO5rboRzP2AzFuyFTWKQ=="
      }
    })
      .then(res => res.json())
      .then(console.log)
  }
  return (
    <main className="main-routes-container">
      {isAuthModal && <AuthModal setIsAuthModal={setIsAuthModal} />}
      <h3 className="routes-title">Restaurants</h3>
      <button onClick={() => clickHandler()}>search example</button>
      <AddItem data={data} setData={setData} table={table} />
    </main>)
}


export default Restaurants