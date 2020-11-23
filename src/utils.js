import axios from 'axios';
import dotenv from 'dotenv';
import _ from 'lodash';
dotenv.config()

const fetchWeather = (zipCode, unit) => {
  const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  // TODO: fetch weather forecast from endpoint
  // from https://openweathermap.org/api

  const url = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&units=${unit}&appid=${API_KEY}`
  return axios.get(url)
};

const findCondition = (condition) => {
  if(~condition.indexOf('Rain')) {
    return 'rainy';
  } else if(~condition.indexOf('Clouds')) {
    return 'cloudy';
  } else if (~condition.indexOf('Sun')){
    return 'sunny';
  } else {
    return 'cloudy'
  }
}

const parseWeatherData = (data) => {
  data.list = _.chunk(data.list, 8)
  const parsedDays = []
  data.list.map((day) => {
    console.log(day)
    const hourlyTemps = day.map(e => e.main.temp)
    const maxTemp = Math.max(...hourlyTemps)
    const lowTemp = Math.min(...hourlyTemps)
    const condition = findCondition(day[3].weather[0].main)
    const dayOfWeek = new Date(day[0].dt).toLocaleDateString('en-US', { weekday: 'long' })
 
    parsedDays.push({maxTemp, lowTemp, condition, dayOfWeek})
  });
  const city = data.city.name
  return {data: parsedDays, city};
}

export {
  fetchWeather,
  parseWeatherData
}
