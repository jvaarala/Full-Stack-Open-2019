import React from 'react'

const Countries = ({countries}) => {

    const Country = ({country}) => {
        return (
            <div>
                <h2>{country.name}</h2>
                <p>capital {country.capital}</p>
                <p>population {country.population}</p>

                <h3>languages</h3>
                {console.log(country.languages)}
                <ul>
                    {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
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
                {countries.map(country => <p key={country.name}>{country.name}</p>)}
            </div>
        )
    } else if (countries.length === 1) {
        return (
            <Country country={countries[0]}/>
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