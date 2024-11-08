import { useCities } from "../context/CitiesContext";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityItem({ city }) {
  const { emoji, cityName, date, id, position } = city;
  const {currentCity, deleteCity, loading: deleteLoading, error: deleteError} = useCities();
  
 async function handleDelete (id) {
    await deleteCity(id);
  } 



  return (
    <>

      <Link className={`${styles.cityItem} ${id == currentCity.id ? styles["cityItem--active"] : ""}`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}> {emoji}</span>
        <h3 className={styles.name}> {cityName} </h3>
        <time className={styles.date}>{formatDate(date)}</time>


      <button className={styles.deleteBtn} onClick={(e) => {
          e.preventDefault()
          handleDelete(id)
        }}> &times;</button>
              </Link>
     
    </>
  );
}

export default CityItem;
