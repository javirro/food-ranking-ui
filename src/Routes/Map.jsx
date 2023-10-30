import { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import '../../node_modules/leaflet/dist/leaflet.css';
import { GEOCODING_BASE_URl, endpoints } from '../Api/endpoints';
import CustomMarker from '../Components/Maps/CustomMarker';
import { useParams } from 'react-router';
import { headerGET } from '../Api/headers';
import useFetch from '../Hooks/useFetch';
import LoadingSpinner from '../Components/LoadingSpinner'
import '../Styles/map.css'

const Map = () => {
  const { type } = useParams()
  const url = `${endpoints.get}?table=${type}`

  const requestOptions = useMemo(() => {
    const options = {
      method: "GET",
      headers: headerGET,
    }
    return options
  }, [])

  const { result, loaded, error } = useFetch({ url, requestOptions, trigger: true })


  const [geoData, setGeoData] = useState(undefined);

  useEffect(() => {

    const fetchData = async () => {
      if (loaded) {
        const apiKey = process.env.REACT_APP_API_KEY_GEO;
        const cities = result.map(item => item.ubication)
        const citiesWIthoutDuplicated = [...new Set(cities)]
        const promises = citiesWIthoutDuplicated?.map(async (item) => {
          if (!window.localStorage.getItem(item)) {
            const res = await fetch(GEOCODING_BASE_URl + `q=${item}&appid=${apiKey}`);
            const data = await res.json();
            if (data.length > 0) {
              window.localStorage.setItem(item, JSON.stringify({ lon: data[0].lon, lat: data[0].lat }))
              return { name: item, position: [data[0].lon, data[0].lat] };
            }
            else return undefined;
          } else {
            const storageData = JSON.parse(window.localStorage.getItem(item))
            return { name: item, position: [storageData.lat, storageData.lon] }
          }

        });

        const resolvedGeoData = await Promise.all(promises);
        const filteredGeoData = resolvedGeoData.filter(data => data);

        setGeoData(filteredGeoData);
      }
    };

    fetchData();
  }, [loaded, result]);

  const mapCenterMadrid = [40.31, -3.48]

  if (error) {
    return <span> Error loading data </span>
  }
  if (!loaded || !geoData) return <LoadingSpinner />

  return (
    <section className="map-container">
      <MapContainer center={mapCenterMadrid} zoom={5} className="map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {geoData?.map(data => <CustomMarker position={data.position} name={data.name} key={data.name} />)}

      </MapContainer>
    </section>
  )
}

export default Map