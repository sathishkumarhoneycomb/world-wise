// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Message from "./Message.jsx";

import styles from "./Form.module.css";
import Button from "./Button.jsx";
import UseUrlQueryParams from "../hook/useUrlQueryParams.jsx";
import Spinner from "./Spinner.jsx";

import { useCities } from "../context/CitiesContext.jsx";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export function convertToEmoji(countryCode) {

  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long"
  }).format(new Date(date));
}

const APIKEY = "ca8e749ff74792c095620488d42a7c2f";



function Form() {

  
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(() => {
    let date = new Date();
    return formatDate(date);
  });

  const [error, setError ] = useState();
  const [loading, setLoading] = useState(false);

  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState('');
  // custom hook
  const [lat, lng] = UseUrlQueryParams();

  const {addCity, loading: apiLoading, error: apiError}  = useCities();



  

  // get the information from the geocoding
  // const [query, setQuery] = useSearchParams();
  // const lat = query.get('lat');
  // const lng = query.get('lng');

  let url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=1&appid=${APIKEY}`

  // do a geocoding 

  useEffect(()=>{
    const getCityDetails = async () => {
      if(!lat && !lng) return;
      try{
        setLoading(true);
        setError(''); 
        // let response = await fetch("http://api.openweathermap.org/geo/1.0/reverse?lat=51.5098&lon=-0.1180&limit=5&appid=ca8e749ff74792c095620488d42a7c2f");
        // let response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=1&appid=${APIKEY}`);
        let response = await fetch(url);
        let responseData = await response.json();

        if(!response.ok) throw new Error('kindly select proper location. can not read the selected locations');

        console.log(responseData);
        // 
        if(responseData.length == 0) {
          throw new Error('city not found');
        }

    

        setCityName(responseData[0].name);
        setCountry(responseData[0].country);
        setEmoji(convertToEmoji(responseData[0].country));
        

      }catch(err) {
        console.log(err);
        setError(err.message);
      }finally{
        setLoading(false)
      }
    }
    getCityDetails();

  },[lat,lng]);


  const navigate = useNavigate();


  async function handleSubmit(e) {
    e.preventDefault();
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat ,
        lng
      }
    }
    let response = await addCity(newCity)

    if(response) {
      return navigate('/app/cities');
    }
  }

  if(!lat || !lng) return;

  if(loading) return <Spinner />

  if(error)  return <Message message={error} />


  if(apiError) return <Message message={apiError} />


  return (
    <>

       <form className={`${styles.form} ${apiLoading ? styles.loading : ""  }`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input

          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker selected={date} onChange={(date) => setDate(date)} dateFormat="dd/MM/yyyy" />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes"> Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary"> Add </Button>

        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          {" "}
          &larr; Back{" "}
        </Button>
      </div>
    </form>

 
    </>
     );
}

export default Form;
