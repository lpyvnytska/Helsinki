import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CountryList from './components/CountryList'
import CountryDetails from './components/CountryDetails'

function App() {
  const [country, setCountry]=useState('')
  const [countries, setCountries]=useState([])

  useEffect( () => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then( res => {
      setCountries(res.data)
    })
  } , [])
  const filteredCountries = countries.filter(item => ~item.name.indexOf(country))

  const handleFindCountry = event => {
    setCountry(event.target.value)
  }

  const handleShowCountryDetails = name =>{
    setCountry(name)
  }

  return (
    <>
    <div>
      find countries <input onChange={handleFindCountry} value={country}/>
    </div>
    <div>
      {filteredCountries.length>10 
      ? <p>Too many matches, specify another filter</p> 
      :  filteredCountries.length===1 
      ? <CountryDetails country={filteredCountries[0]}/>
      : <CountryList countries={filteredCountries} handleShowCountryDetails={handleShowCountryDetails}/>}
    </div>
    </>
  );
}

export default App;
