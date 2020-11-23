import React from "react";
import Cloudy from '../images/cloudy.png'
import Rainy from '../images/rainy.png'
import Sunny from '../images/sunny.png'


function WeatherCard(props) {
    const unit = props.unit === 'metric' ? 'C' : 'F';
    const image = () => {
        const {day: {condition}} = props
        if(~condition.indexOf('rain')) {
            return <img src={Rainy} alt="Rainy weather" />
        } else if(~condition.indexOf('clouds')) {
            return <img src={Cloudy} alt="Cloudy weather" />
        } else if (~condition.indexOf('sun')){
            return <img src={Sunny} alt="Sunny Weather"/>
        } else {
            return <img src={Cloudy} alt="Cloudy Weather" />
        }
    }

    return (
        <div className="weather-card">
            <h3>{props.day.dayOfWeek}</h3>
            {image()}
            <p>High: {props.day.maxTemp} {unit}</p>
            <p>Low: {props.day.lowTemp} {unit}</p>
        </div>
    )
}

export default WeatherCard;