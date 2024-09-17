import styles from "./CityList.module.css";
import CityItem from "./CityItem.jsx";
import Message from "./Message.jsx";
import { useContext } from "react";
import { useCities } from "../context/CitiesContext.jsx";

function CityList() {
  const { cities, loading, error }  = useCities();
  if (cities.length == 0) {
    return (
      <Message message="Add your first city by clicking on a city on the map!" />
    );
  }

  return (
    <>
      {loading && !error ? (
        <h1> ...Loading </h1>
      ) : !loading && error ? (
        <h1> No Cities Found </h1>
      ) : (
        <ul className={styles.cityList}>
          {cities.map((city) => {
            return <CityItem city={city} key={city.id} />;
          })}
        </ul>
      )}
    </>
  );
}

export default CityList;
