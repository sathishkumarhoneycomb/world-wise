import styles from "./CountryList.module.css";

import CountryItem from "./CountryItem";

function CountryList({ countries, loading, error }) {
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
