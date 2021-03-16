import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

const Map = () => {
  // const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

  // mapboxgl.accessToken =
  //   'pk.eyJ1IjoiZGllZ29sbWkiLCJhIjoiY2ttNWR0eXNxMGRkbTJ2cWJidnd1bmlwNSJ9.ZyTtRvrSkd5g8xDgFnn3YQ';
  // const map = new mapboxgl.Map({
  //   container: 'map', // container ID
  //   style: 'mapbox://styles/mapbox/satellite-v9', // style ID
  //   center: [-26.861181,-65.295111], // starting position [lng, lat]
  //   zoom: 13, // starting zoom
  // });
  return (
    <MapContainer
      center={[-26.861199615826607, -65.29513777686327]}
      zoom={14}
      scrollWheelZoom={true}
      style={{ height: '500px', width: '500px' }}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGllZ29sbWkiLCJhIjoiY2ttNWR0eXNxMGRkbTJ2cWJidnd1bmlwNSJ9.ZyTtRvrSkd5g8xDgFnn3YQ`}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
      />
      <Marker position={[-26.861199615826607, -65.29513777686327]} draggable={true}>
        <Popup>Hey ! I live here</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
