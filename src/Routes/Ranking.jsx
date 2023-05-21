import React from "react"
import { useParams } from "react-router-dom"
import { endpoints } from "../Api/endpoints"
import '../Styles/ranking.css'
import useFetch from "../Hooks/useFetch"

const Ranking = () => {
  const { type } = useParams()
  const url = `${endpoints.get}?table=${type}`
  const trigger = true
  const { result, loaded, error } = useFetch({ url, trigger })

  console.log(error)
  return (
    <div className="ranking-container">
      {loaded && <table>
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
          {
            result?.map(row => (
              <tr key={row.position}>
                <td>{row?.position}</td>
                <td>{row?.name}</td>
                <td>{row?.ubication}</td>
                <td>{row?.price} €</td>
                <td>{row?.extra_info}</td>
              </tr>
            ))
          }
        </tbody>
      </table>}
    </div>
  )
}

export default Ranking