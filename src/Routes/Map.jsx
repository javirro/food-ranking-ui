import { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import '../../node_modules/leaflet/dist/leaflet.css';
import { GEOCODING_BASE_URl, endpoints } from '../Api/endpoints';
import CustomMarker from '../Components/Maps/CustomMarker';
import { useParams } from 'react-router';
import { headerGET } from '../Api/headers';
import useFetch from '../Hooks/useFetch';

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



  const [geoData, setGeoData] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      if (loaded) {
        const apiKey = process.env.REACT_APP_API_KEY_GEO;
        const cities = result.map(item => item.ubication)
        const citiesWIthoutDuplicated = [...new Set(cities)]
        const promises = citiesWIthoutDuplicated?.map(async (item) => {
          const res = await fetch(GEOCODING_BASE_URl + `q=${item?.ubication}&appid=${apiKey}`);
          const data = await res.json();
          if (data.length > 0) return { name: item.ubication, position: [data[0].lon, data[0].lat] };
          else return undefined;
        });

        const resolvedGeoData = await Promise.all(promises);
        const filteredGeoData = resolvedGeoData.filter(data => data);

        setGeoData(filteredGeoData);
      }
    };

    fetchData();
  }, [loaded, result]);


  console.log("geo data", geoData)
  const position = [51.505, -0.09]

  if (error) {
    return <span> Error loading data </span>
  }

  return (
    <MapContainer center={position} zoom={2} style={{ height: '400px', width: '400px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {geoData.map(data => <CustomMarker position={data.position} />)}

    </MapContainer>
  )
}

export default Map