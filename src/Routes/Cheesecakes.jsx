import React, { useState } from "react"
import TextInputs from "../Components/TextInputs"
import AddItemButton from "../Components/AddItemButton"
const Cheesecakes = () => {
  const [data, setData] = useState({
    name: null,
    position: null,
    ubication: null,
    price: null,
    extra: null
  })
  return (
    <main className="main-routes-container">
      <h3 className="routes-title">Cheesecakes</h3>
      <TextInputs data={data} setData={setData} />
      <AddItemButton data={data} />
    </main>)
}

export default Cheesecakes