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
  const days = data.list.map((day) => {
    const dailyTemps = day.map(e => e.main.temp)
    const maxTemp = Math.max(dailyTemps)
    const lowTemp = Math.min(dailyTemps)
    const conditionImage = findCondition(day[3].weather.main)
    const dayOfWeek = new Date(day.dt).toLocaleDateString('en-US', { weekday: 'long' })
    days.push({maxTemp, lowTemp, conditionImage, dayOfWeek})
  });
  return parsedDays;
}



export {
  fetchWeather,
  parseWeatherData
}
