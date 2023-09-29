import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import '../../node_modules/leaflet/dist/leaflet.css';
import L from "leaflet"
import pointer from '../Images/pointer.svg'
const Map = () => {

  const position = [51.505, -0.09]
  const position2 = [50.505, -0.09]
  const customIcon = new L.Icon({
    iconUrl: pointer,
    iconSize: [24, 24], // Adjust the size as needed
  });
  return (
    <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={customIcon} >
        <Popup>
          A sample marker on the map.
        </Popup>
      </Marker>

      <Marker position={position2} icon={customIcon} >
        <Popup>
          A sample marker on the map.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map