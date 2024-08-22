import Homepage from "./pages/HomePage.jsx";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      // fetch the cities from the api

      try {
        const res = await fetch("http://localhost:8000/cities");
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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate replace to="cities" />} />

          <Route
            path="cities"
            element={
              <CityList cities={cities} loading={loading} error={error} />
            }
          />
          <Route path="form" element={<Form />} />

          <Route path="cities/:cityId" element={<City />} />

          <Route
            path="countries"
            element={
              <CountryList
                countries={countries}
                loading={loading}
                error={error}
              />
            }
          />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
