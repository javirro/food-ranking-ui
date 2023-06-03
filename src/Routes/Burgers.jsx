import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import AddItem from "../Components/AddItem"
const Burgers = () => {
  const [data, setData] = useState({
    name: null,
    position: null,
    ubication: null,
    price: null,
  })
  const location = useLocation()
  const table = location.pathname.slice(1)
  return (
    <main className="main-routes-container">
      <h3 className="routes-title">Burgers</h3>
      <AddItem data={data} setData={setData} table={table} />
    </main>)
}

export default Burgers