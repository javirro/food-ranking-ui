import { Marker, Popup } from 'react-leaflet';
import '../../../node_modules/leaflet/dist/leaflet.css';
import L from "leaflet"
import pointer from '../../Images/pointer.svg'

const CustomMarker = ({ lat, lon, name }) => {
  const customIcon = new L.Icon({
    iconUrl: pointer,
    iconSize: [20, 20], // Adjust the size as needed
  });

  return (
    <Marker position={[lat, lon]} icon={customIcon} >
      <Popup> {name} </Popup>
    </Marker>
  )
}

export default CustomMarker