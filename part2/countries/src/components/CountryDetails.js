import React from 'react';
import Weather from './Weather'

const CountryDetails = ({country}) => {
    return (
        <>
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital} <br />population {country.population}</p>
            
                <h3>languages</h3>
                <ul>
                    {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
                </ul>
            
            <p>
                <img src={country.flag} alt={country.name} width="150px" />
            </p>
        </div>
       <Weather capital={country.capital}/>
       </>
    );
};

export default CountryDetails;