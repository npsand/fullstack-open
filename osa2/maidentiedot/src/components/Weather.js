import React from 'react';


const Weather = ({weather}) =>{
    if(weather !== null){
        return(
            <div>
                <h2>Weather in {weather.location.name}</h2>
                <h3>temperature: {weather.current.temperature}</h3>
                <img src={weather.current.weather_icons[0]} />
                <h3>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</h3>
            </div>
        )
    }else{
        return(
            <div>no weather data</div>
        )
    }
}


export default Weather;