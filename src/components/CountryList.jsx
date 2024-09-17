import styles from "./CountryList.module.css";

import CountryItem from "./CountryItem";
import { useCities } from "../context/CitiesContext";

function CountryList() {
  const { countries, loading, error} = useCities();
  return (
    <>
      <div className={styles.countryList}>
        {countries.map((country) => {
          return <CountryItem country={country} key={country.id} />;
        })}
      </div>
    </>
  );
}

export default CountryList;
