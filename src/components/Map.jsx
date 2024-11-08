import styles from "./Map.module.css";
import { useSearchParams, useNavigate } from "react-router-dom";

import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents  } from "react-leaflet";
import { useState, useEffect } from "react";
import { useCities } from "../context/CitiesContext";
import Button from "./Button";
import useGeolocation from "../hook/useGeolocation";
import UseUrlQueryParams from "../hook/useUrlQueryParams";
import User from "./User";
import { useAuth } from "../context/AuthContext";

function Map() {
  const navigate = useNavigate();
  const{cities, currentCity} = useCities()
  const [mapPosition, setMapPosition] = useState([51.505, -0.09])



 

  
  // const [searchParams, setSearchParams] = useSearchParams([]);
  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");
  const [lat, lng] = UseUrlQueryParams();

  const {getPosition, position: geoPosition, loading:geoLoading, error: geoError} = useGeolocation();

  useEffect(() => {
    if(lat && lng) {
      setMapPosition([lat, lng])
    }
  },[lat, lng])

  useEffect(() => {
    
    if(geoPosition[0] && geoPosition[1]) {
      setMapPosition([geoPosition[0], geoPosition[1]]);
    }
  },[geoPosition])






  return (
    <>
   
      <div
        className={styles.mapContainer}
      >
   

      {
        !geoPosition[0] &&  <Button type="position" onClick={() => {
        getPosition();
      }}> {geoLoading  ? "Fetch Your Location" : "Loading"  } </Button>
      }
  
    <MapContainer 
          className={styles.map}
          center={mapPosition} zoom={13} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {
              cities.map(city =>   
              <Marker position={city.position} key={city.id}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>)
            }
  
  <MoveMap position={mapPosition} />
  <DetectClick />

  </MapContainer>

      </div>
    </>
  );
}


function MoveMap({position}) {
  const map = useMap();
  map.setView(position)
  return null;
} 

function DetectClick() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();


  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  })

}





export default Map;
