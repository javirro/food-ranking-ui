import React, { useState, useMemo } from "react"
import { useParams } from "react-router-dom"
import { endpoints } from "../Api/endpoints"
import rubbish from '../Images/rubbish-icon.svg'
import edit from '../Images/edit-icon.svg'
import useFetch from "../Hooks/useFetch"
import EditModal from "../Components/EditModal"
import { headerGET } from "../Api/headers"
import LoadingSpinner from "../Components/LoadingSpinner"
import ErrorLoadingData from "../Components/ErrorLoadingData"
import DeleteModal from "../Components/DeleteModal"

import '../Styles/ranking.css'


const Ranking = () => {
  const { type } = useParams()
  const [trigger, setTrigger] = useState(true) // To refresh data once the item has been deleted
  const [isEditModal, setIsEditModal] = useState(false)
  const [isDeleteModal, setIsDeleteModal] = useState(false)
  const [rowToEdit, setRowToEdit] = useState(null)
  const url = `${endpoints.get}?table=${type}`

  const requestOptions = useMemo(() => {
    const options = {
      method: "GET",
      headers: headerGET,
    }
    return options
  }, [])

  const { result, loaded, error } = useFetch({ url, requestOptions, trigger })

  const deleteItem = async (row) => {
    setTrigger(false)
    setIsDeleteModal(true)
    setRowToEdit(row)
  }

  const editItem = (row) => {
    setIsEditModal(true)
    setRowToEdit(row)
  }

  return (
    <div className="ranking-container">
      {isEditModal && <EditModal table={type} row={rowToEdit} setIsEditModal={setIsEditModal} setTrigger={setTrigger} />}
      {isDeleteModal && <DeleteModal table={type} row={rowToEdit} setIsDeleteModal={setIsDeleteModal} setTrigger={setTrigger} />}
      {!loaded && <LoadingSpinner />}
      {error && <ErrorLoadingData />}
      {loaded && !error && <table>
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
              <tr key={row.id}>
                <td className="ranking-column">{row?.position}</td>
                <td>{row?.name}</td>
                <td>{row?.ubication}</td>
                <td >
                  <img src={edit} alt="edit-icon" className="edit-icon" onClick={() => editItem(row)} />
                  <img src={rubbish} alt="delete-icon" className="info-icon" onClick={() => deleteItem(row)} />
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