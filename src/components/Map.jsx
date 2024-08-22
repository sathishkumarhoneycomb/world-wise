import styles from "./Map.module.css";
import { useSearchParams, useNavigate } from "react-router-dom";

function Map() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams([]);

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <>
      <div
        className={styles.mapContainer}
        onClick={() => {
          navigate("form");
        }}
      >
        <h1> {lat} </h1>
        <h1> {lng} </h1>

        <button
          onClick={() => {
            setSearchParams({ lat: 12.2333, lng: 23.508 });
          }}
        >
          {" "}
          Change position{" "}
        </button>
      </div>
    </>
  );
}

export default Map;
