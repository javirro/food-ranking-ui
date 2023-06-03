import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import AddItem from "../Components/AddItem"

const Cheesecakes = () => {
  const [data, setData] = useState({
    name: undefined,
    position: undefined,
    ubication: undefined,
    price: undefined,
  })
  const location = useLocation()
  const table = location.pathname.slice(1)
  return (
    <main className="main-routes-container">
      <h3 className="routes-title">Cheesecakes</h3>
      <AddItem data={data} setData={setData} table={table} />
    </main>)
}

export default Cheesecakes