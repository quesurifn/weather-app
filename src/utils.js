import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config()

const fetchWeather = async (zipCode) => {
  const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  // TODO: fetch weather forecast from endpoint
  // from https://openweathermap.org/api

  const url = `api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${API_KEY}`
  await axios.get(url)
};

export {
  fetchWeather
}
