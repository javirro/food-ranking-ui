import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet'
import { endpoints } from '../Api/endpoints';
import CustomMarker from '../Components/Maps/CustomMarker'
import { useParams } from 'react-router'
import { headerGET } from '../Api/headers'
import useFetch from '../Hooks/useFetch'
import LoadingSpinner from '../Components/LoadingSpinner'
import '../../node_modules/leaflet/dist/leaflet.css'
import '../Styles/map.css'

const Map = () => {
  const { type } = useParams()
  const url = `${endpoints.ubication}?table=${type}`
  const [trigger, setTrigger] = useState(true)
  const requestOptions = useMemo(() => {
    const options = {
      method: "GET",
      headers: headerGET,
    }
    return options
  }, [])


  const { result, loaded, error } = useFetch({ url, requestOptions, trigger: trigger })
  console.log(result)

  useEffect(() => {
    if (loaded) setTrigger(false)
  }, [loaded, type])


  const mapCenterMadrid = [40.31, -3.48]

  if (error) {
    return (<div className="error-div-map">
      <span> Error loading data </span>
    </div>)
  }
  if (!loaded || !result) return <LoadingSpinner />

  return (
    <section className="map-container">
      <span>{type}</span>
      <MapContainer center={mapCenterMadrid} zoom={5} className="map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {result?.map(data => <CustomMarker lat={data.lat} lon={data.lon} name={data.name} key={data.name} />)}

      </MapContainer>
    </section>
  )
}

export default Map