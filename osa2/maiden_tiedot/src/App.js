import React, {useState, useEffect} from 'react';
import Countries from "./components/Countries";

import axios from 'axios'


const App = () => {
    const [searchExp, setSearchExp] = useState('')
    const [countries, setCountries] = useState([])

    const hook = () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }
    useEffect(hook, [])

    const handleInputChange = (event) => {
        setSearchExp(event.target.value)
    };

    const getFilteredCountries = (exp) => {

        let pattern = new RegExp(exp, 'i')
        let filteredCountriesCopy = []

        countries.forEach((country) => {
            if (pattern.test(country.name)) filteredCountriesCopy.push(country)
        })


        return filteredCountriesCopy

    }

    console.log('rendering..')
    return (
        <div className="App">
            find coutries <input value={searchExp} onChange={handleInputChange}/>
            <Countries countries={getFilteredCountries(searchExp)}/>
        </div>
    );
};

export default App;
