import styles from "./City.module.css";

import { useParams, useSearchParams } from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  // use params
  const { cityId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams([]);

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const currentCity = {
    cityName: "Lisbon",
    emoji: "🇵🇹",
    date: "2027-10-31T15:59:59.138Z",
    notes: "My favorite city so far!",
  };

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <h1> {cityId} </h1>
      <h1> {lat} </h1>
      <h1> {lng} </h1>
    </div>
  );
}

export default City;
