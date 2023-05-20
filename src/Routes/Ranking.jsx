import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { endpoints } from "../Api/endpoints"
import '../Styles/ranking.css'

const Ranking = () => {
  const { type } = useParams()
  const [result, setResult] = useState()
  console.log(result)
  useEffect(() => {
   const fetchRanking = async () => {
    try {
      const res = await fetch(`${endpoints.get}?table=${type}`)
      if (res.ok) {
        if (res.status === 200) setResult(await res.json())
      } else {
       console.log("Error with the response")
      }
    } catch (e) {
      console.log(e.message)
      setResult("Network Error")
    }
    }

    fetchRanking()

  },[type])
  return (
    <div className="ranking-container">
      <table>
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Restaurant</th>
            <th>Where</th>
            <th>Price</th>
            <th>Extra</th>
          </tr>

        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Prueba</td>
            <td>Coruña</td>
            <td>5.5 €</td>
            <td>...</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Prueba</td>
            <td>Coruña</td>
            <td>4.55 €</td>
            <td>...</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Ranking