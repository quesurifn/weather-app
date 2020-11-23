import React, {useState, useEffect} from "react";
import qs from 'querystring';


import { fetchWeather, parseWeatherData } from '../utils';
import { Button, Input, Form } from 'semantic-ui-react';
import WeatherCard from './weatherCard'
import "../App.css";

import 'semantic-ui-css/semantic.min.css';


function App() {
  const [locationData, setLocationData] = useState(null);
  const [error, setError] = useState("")

  const parseQuery = () => {
    return qs.parse(window.location.search.replace('?', ''));
  }

  useEffect(() => {
    const { location, units } = parseQuery()
    if(location && /\d{5}/.test(location)) {
      try {
        const fetchData = async () => {
          const weather = await fetchWeather(location, units)
          const parsedWeather = parseWeatherData(weather.data)
          setLocationData(parsedWeather)
        };
        fetchData();
      } catch(e) {
        setError(`There was an error retrieving weather data for zip code: ${location}`)
      }
    }
  }, []);

  const {units} = parseQuery()

  return (
      <main>
        <h1>Weather</h1>

        {!locationData &&
        <div className="form-container">
          <form>
            <h3> Enter Your Zip Code </h3>
            <Input type="number" name="location" placeholder="Your zip code" min="00000" max="99999" required/>
            <div>
              <div>
                <label>Ferinheight</label>
                <input type="radio" name="units" value="imperial" defaultChecked />
              </div>
              <div>
                <label>Celcius</label>
                <input type="radio" name="units" value="metric"></input>
              </div>
            </div>
            <Button type="submit">Find Weather</Button>
          </form>
        </div>
        }

        {locationData &&
          <div>
            <h3>Weather for {locationData.city}</h3>
            <div className="weather-container">
            {locationData.data.map((e, idx) => {
              return <WeatherCard key={idx} day={e} unit={units} />
            })}
            </div>
          </div>
        }

        {error &&
          <p>There was an error, please try again later.</p>
        }
      </main>
    );
}

export default App;
