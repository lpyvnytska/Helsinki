import React from 'react';

const Country = ({name, handleShowCountryDetails}) =>{
    return (
        <><li>{name} <button onClick={handleShowCountryDetails}>show</button></li></>
    )
}

const CountryList = ({countries, handleShowCountryDetails}) => {
    console.log(countries)
    return (
        <ul>
            {countries.map(country => <Country key={country.name} name={country.name} handleShowCountryDetails={() => handleShowCountryDetails(country.name)}/> )}
        </ul>
    );
};

export default CountryList;