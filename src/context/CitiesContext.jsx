import { createContext, useState, useEffect, useContext } from "react";

const CitiesContext = createContext();
const URL = "http://localhost:8000/cities";



function CitiesProvider({children}){

    const [cities, setCities] = useState([]);
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [currentCity, setCurrentCity] = useState({})
  
    useEffect(() => {
      const getData = async () => {
        setLoading(true);
        try {
          const res = await fetch(URL);
          const data = await res.json();
          setCities(data);
  
          const countryData = data.reduce((acc, city) => {
            const countries_arr = acc.map((country) => {
              return country.name;
            });
            // console.log(countries_arr);
            if (countries_arr.includes(city.country)) {
              return acc;
            } else {
              return [
                ...acc,
                { id: city.id, name: city.country, emoji: city.emoji },
              ];
            }
          }, []);
  
          setCountries(countryData);
        } catch (e) {
          console.log(e);
          setError(e.message);
        } finally {
          setLoading(false);
        }
      };
  
      setTimeout(() => {
        getData();
      });
    }, []);


    function getCity(id) {
      const getData = async () => {
        setLoading(true);
        try {
          const res = await fetch(URL + "/" + id);
          const data = await res.json();
          
          console.log(data)
          setCurrentCity(data)
        } catch (e) {
          console.log(e);
          setError(e.message);
        } finally {
          setLoading(false);
        }
      }
      getData();
    }

    return <CitiesContext.Provider value={{ cities, countries, loading, error, getCity, currentCity}}>
        {children}
    </CitiesContext.Provider>
}


const useCities = () => {
    const context =useContext(CitiesContext);
    return context;
}




export { CitiesProvider, useCities}