import React, {useState, useEffect} from "react";
import qs from 'querystring';


import { fetchWeather, parseWeatherData } from '../utils';
import { Button, Input } from 'semantic-ui-react';
import WeatherCard from './weatherCard'
import "../App.css";

import 'semantic-ui-css/semantic.min.css';


function App() {
  const [count, setCount] = useState(0);
  const [locationData, setLocationData] = useState(null);
  const [error, setError] = useState("")
  const [unit, setUnit] = useState('imperial')

  useEffect(() => {
    const parsedQuery = qs.parse(window.location.search.replace('?', ''));
    const { location } = parsedQuery
    if(location && /\d{5}/.test(location)) {
      try {
        const fetchData = async () => {
          const weather = await fetchWeather(location, unit)
          const parsedWeather = parseWeatherData(weather.data)
          console.log(parseWeatherData)
          setLocationData(parsedWeather)
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

        {!locationData &&
          <form>
            <p>
              Enter Your Zip Code
            </p>
            <Input type="number" name="location" placeholder="Your zip code" min="00000" max="99999"/>
            <Button type="submit">Find Weather</Button>
          </form>
        }

        {locationData &&
          <div>
            <h3>Weather for {locationData.city}</h3>
            {locationData.data.map((e, idx) => {
              return <WeatherCard key={idx} day={e}/>
            })}
          </div>
        }

        {error &&
          <p>There was an error, please try again later.</p>
        }
      </main>
    );
}

export default App;
