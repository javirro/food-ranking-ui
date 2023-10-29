import { Marker, Popup } from 'react-leaflet';
import '../../../node_modules/leaflet/dist/leaflet.css';
import L from "leaflet"
import pointer from '../../Images/pointer.svg'

const CustomMarker = ({ position }) => {
  const customIcon = new L.Icon({
    iconUrl: pointer,
    iconSize: [24, 24], // Adjust the size as needed
  });

  return (
    <Marker position={position} icon={customIcon} >
      <Popup>
        A sample marker on the map.
      </Popup>
    </Marker>
  )
}

export default CustomMarker