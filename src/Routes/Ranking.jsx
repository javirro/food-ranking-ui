import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { endpoints } from "../Api/endpoints"
import info from '../Images/info-icon.svg'
import rubbish from '../Images/rubbish-icon.svg'
import edit from '../Images/edit-icon.svg'
import '../Styles/ranking.css'
import useFetch from "../Hooks/useFetch"

const Ranking = () => {
  const { type } = useParams()
  const [trigger, setTrigger] = useState(true)
  const url = `${endpoints.get}?table=${type}`
  const { result, loaded, error } = useFetch({ url, trigger })

  const deleteItem = async (id) => {
    setTrigger(false)
    fetch(`${endpoints.delete}?table=${type}&id=${id}`)
      .then(res => res.json())
      .then(data => data)
      .finally(() => setTrigger(true))
  }

  return (
    <div className="ranking-container">
      {!error && loaded && <table>
        <thead>
          <tr>
            <th className="ranking-column">Ranking</th>
            <th>Restaurant</th>
            <th>Where</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {
            result?.map(row => (
              <tr key={row.position}>
                <td className="ranking-column">{row?.position}</td>
                <td>{row?.name}</td>
                <td>{row?.ubication}</td>
                <td >
                  <img src={info} alt="info-icon" className="info-icon" />
                  <img src={edit} alt="edit-icon" className="edit-icon" />
                  <img src={rubbish} alt="delete-icon" className="info-icon" onClick={() => deleteItem(row.id)} />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>}
    </div>
  )
}

export default Ranking