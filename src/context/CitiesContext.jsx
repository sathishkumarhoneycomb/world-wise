import { createContext, useState, useEffect, useContext, useReducer, useCallback } from "react";

const CitiesContext = createContext();
const URL = "http://localhost:8000/cities";


const initialState = {
  cities : [],
  loading: false,
  currentCity : {}
}

function reducer(state, action) {
  switch(action.type){
    case "setLoading": {
      return {...state, loading: action.payload}
    }

    case "fetchCities": {
      return {...state, cities : action.payload}
    }

    case "setCurrentCity": {
      return {...state, currentCity: action.payload}
    }

    case "addCity": {
      return {...state, cities: [...state.cities, action.payload]}
    }

    case "deleteCity": {
      return { 
        ...state,
        cities:  state.cities.filter(cur => cur.id != action.payload)
      }
    }
  }
}

function getCountryList(data) {
  // data is an array of city object 
  // i want to loop through those cities object and return an array containing only country array 
  const countryData = data.reduce((acc,city) => {
    // before pushing check if city already exists in acc
    const countryNames = acc.map(cur => cur.name);

    if(countryNames.includes(city.country)){
      return acc;
    }else {
      return [...acc, { id: city.id, name: city.country, emoji: city.emoji }]
    }
  },[]);

  return countryData;

}



function CitiesProvider({children}){

  const [{cities, loading, currentCity}, dispatch] = useReducer(reducer, initialState);


    // const [cities, setCities] = useState([]);
    const [countries, setCountries] = useState([]);
    // const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    // const [currentCity, setCurrentCity] = useState({})
  
    useEffect(() => {
      const getData = async () => {
        dispatch({type: "setLoading", payload: true});
        try {
          const res = await fetch(URL);
          const data = await res.json();
          // setCities(data);
          dispatch({type: "fetchCities", payload: data});
  
          // const countryData = data.reduce((acc, city) => {
          //   const countries_arr = acc.map((country) => {
          //     return country.name;
          //   });
          //   // console.log(countries_arr);
          //   if (countries_arr.includes(city.country)) {
          //     return acc;
          //   } else {
          //     return [
          //       ...acc,
          //       { id: city.id, name: city.country, emoji: city.emoji },
          //     ];
          //   }
          // }, []);
          const countryData = getCountryList(data);

  
          setCountries(countryData);
        } catch (e) {
          console.log(e);
          setError(e.message);
        } finally {
          dispatch({type: "setLoading", payload: false});
        }
      };
  
      setTimeout(() => {
        getData();
      });
    }, []);

    // set the country list 
    useEffect(() => {
      setCountries(getCountryList(cities));
    },[cities])


    const getCity  = useCallback((id) => {
      const getData = async () => {
        dispatch({type: "setLoading", payload: true});
        try {
          const res = await fetch(URL + "/" + id);
          const data = await res.json();

  
          
          console.log(data)
          dispatch({type: "setCurrentCity", payload: data });
        } catch (e) {
          console.log(e);
          setError(e.message);
        } finally {
          dispatch({type: "setLoading", payload: false});
        }
      }
      getData();
    },[currentCity.id]);


    // function to add the city 
    function addCity(cityData) {
      dispatch({type: "setLoading", payload: true});
      setError("");
     
      async function asyncAddCity() {
        try {
          let response = await fetch(URL, {
            method: "POST",
            body: JSON.stringify(cityData)
          });
  
          if(response.ok) {

            let data = await response.json();
            // setCities((prev) => ([...prev, data]));

            dispatch({type: "addCity", payload: data});

            return true;
          } else {
            throw new Error('Failed to upload new city data');
          }
        }catch(err) {
          setError(err.message);
          return false;
         
        }finally{
          dispatch({type: "setLoading", payload: false});
        }
           
      }

     return asyncAddCity();
    }


    async function deleteCity(cityID) {
     dispatch({type: "setLoading", payload: true});

      setError('');

        try{
            const  response = await fetch(URL + "/" + cityID, {
              method: 'DELETE'
            })

            if(!response.ok) throw new Error('Can not delete the city now.');

            console.log(response);
            let data = await response.json();
            console.log(data);

            // setCities(prev => prev.filter(cur => cur.id != cityID) )

            dispatch({type: "deleteCity", payload: cityID});


        }catch(err) {
          console.log(err);
        }finally{
          dispatch({type: "setLoading", payload: false});
        }
    }

    return <CitiesContext.Provider value={{ cities, countries, loading, error, getCity, currentCity, addCity, deleteCity}}>
        {children}
    </CitiesContext.Provider>
}


const useCities = () => {
    const context = useContext(CitiesContext);
    return context;
}




export { CitiesProvider, useCities}