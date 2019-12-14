import React, { useEffect } from 'react'
import axios from 'axios'

const Weather = ({weatherDataObject, setWeatherDataObject, countryCapital}) => {

    useEffect(() => {
        axios
            .get('http://api.weatherstack.com/current?access_key=b672a90ff6ccdca402ae9e2c16803bf2&query=' + countryCapital)
            .then(response => {
                setWeatherDataObject(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }, [])

    if (weatherDataObject != null) {
        return (

            <div>
                <h2>Weather in {countryCapital}</h2>
                <p><b>temperature:</b> {weatherDataObject.current.temperature} Celsius</p>
                <img src={weatherDataObject.current.weather_icons[0]} alt='icon'/>
                <p><b>wind:</b> {weatherDataObject.current.wind_speed} kph direction {weatherDataObject.current.wind_dir}</p>
            </div>
        )
    } else return <></>

}

export default Weather