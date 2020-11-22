import React, {useState, useEffect} from "react";
import qs from 'querystring';

import { fetchWeather } from '../utils';
import { ReactComponent as Logo } from "../images/sun.svg";
import "../App.css";


function App() {
  const [count, setCount] = useState(0);
  const [locationData, setLocationData] = useState({});
  const [error, setError] = useState("")

  useEffect(() => {
    const parsedQuery = qs.parse(window.location.search.replace('?', ''));
    const { location } = parsedQuery
    if(location && /\d{5}/.test(location)) {
      try {
        const fetchData = async () => {
          const weather = await fetchWeather(location)
          console.log(weather.data)
          setLocationData(weather.data)
        };
        fetchData();
      } catch(e) {
        setError(`There was an error retrieving weather data for zip code: ${location}`)
      }
    }
  }, []);

  return (
      <main>
        <h1>Weather</h1>



      </main>

      );
}

export default App;
