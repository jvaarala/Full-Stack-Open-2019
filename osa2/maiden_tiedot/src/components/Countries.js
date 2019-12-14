import React from 'react'
import Weather from "./Weather";
import axios from "axios";

const Countries = ({countries, setSearchExp, setWeatherDataObject, weatherDataObject}) => {

    const Country = ({country}) => {
        return (
            <div>
                <h2>{country.name}</h2>
                <p>capital {country.capital}</p>
                <p>population {country.population}</p>

                <h3>languages</h3>
                {console.log(country.languages)}
                <ul>
                    {country.languages.map(language =>
                        <li key={language.name}>{language.name}</li>
                    )}
                </ul>
                <img src={country.flag} width="150px" alt=""/>
            </div>

        )

    }

    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (countries.length > 1) {
        return (
            <div className="Country">
                {countries.map(country =>
                    <p key={country.name}>
                        {country.name}
                        <button id={country.name} onClick={() => {
                            setSearchExp(country.name)
                        }}> show
                        </button>
                    </p>)}
            </div>
        )
    } else if (countries.length === 1) {

        return (
            <div>
                <Country
                    country={countries[0]}
                />
                <Weather
                    weatherDataObject={weatherDataObject}
                    setWeatherDataObject={setWeatherDataObject}
                    countryCapital={countries[0].capital}
                />
            </div>
        )
    } else {
        return (
            <div>
                No matches with current filter
            </div>
        )
    }

}

export default Countries