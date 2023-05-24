import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import TextInputs from "../Components/TextInputs"
import AddItemButton from "../Components/AddItemButton"

const Cheesecakes = () => {
  const [data, setData] = useState({
    name: undefined,
    position: undefined,
    ubication: undefined,
    price: undefined,
    extra: undefined
  })
  const location = useLocation()
  const table = location.pathname.slice(1)
  return (
    <main className="main-routes-container">
      <h3 className="routes-title">Cheesecakes</h3>
      <TextInputs data={data} setData={setData} />
      <AddItemButton data={data} table={table}/>
    </main>)
}

export default Cheesecakes