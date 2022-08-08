import React, { useState } from 'react'
import axios from 'axios'

const SearchFunction = (props) => {
  return (
    <div>
      <h1>Countries</h1>
        <div>
          search the listings: <input onInput={props.onInput}/>
        </div>
    </div>
  )
}

const Entries = (props) => {
  let newCountryArray
  let countryForRenderLangs
  if (props.countryArray.length === 1) {
    countryForRenderLangs = Object.values(props.countryArray[0].languages).map((lang,i) =>
        <li key={i}>{lang}</li>
    )
  }
   
  props.countryArray.length === 1 ? 
  newCountryArray = <div>
    <h1>{props.countryArray[0].name.common}</h1>
    <div>capital: {props.countryArray[0].capital[0]}</div>
    <div>area: {props.countryArray[0].area}</div>
    <br />
    <div>
      languages: <ul>{countryForRenderLangs}</ul>
    </div>
    <img src={props.countryArray[0].flags.svg} style={{width:'100px'}} alt='flag'/>
  </div> : 
  newCountryArray = <div>
    <h2>Listings</h2>
    {props.countryArray} 
 </div>
  return (
    <div>
      {newCountryArray}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [filteredCountries, setFilteredCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')

  const Hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        const countryList = response.data
        // const elementList = countryList.map(country => 
        // <div key={country.name.common}>{country.name.common}</div>
        // )
        setCountries(countryList)
    })
  }
  const SearchHook = () => {
    const filteredArray = countries.filter(name => {
      return (
      name.name.common.toLowerCase().includes(
        newSearch.toLowerCase()
      ))})
      console.log(filteredArray)
      setFilteredCountries(filteredArray)
  }

  React.useEffect(Hook,[])
  React.useEffect(SearchHook,[newSearch, countries])

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const handleClick = (event) => {
    console.log(event.target.className);
    const name = event.target.className
    const targetCountry = countries.find(country => country.name.common === name)
    console.log(targetCountry)
    setFilteredCountries([targetCountry])
  }

  console.log(filteredCountries.length)
  let newFilteredCountries
  if ((filteredCountries.length === countries.length)) {
    newFilteredCountries = countries.map(country => {
      return (
      <div key={country.name.common}>
        {country.name.common}
        </div>
      )
    })
  } else if ((filteredCountries.length === 1)) {
    newFilteredCountries = filteredCountries
  } else {
    newFilteredCountries = filteredCountries.map(country => {
      return (
      <div key={country.name.common}>
        {country.name.common} <button className={country.name.common} onClick={handleClick}>Show</button>
        </div>
      )
    })
  }

  return (
    <div>
      <SearchFunction 
        onInput={handleSearch}
      />
      {(filteredCountries.length) > 10 && (filteredCountries.length !== countries.length) ? 
      <div>Too many matches, specify another filter.</div> : 
        <Entries 
          countryArray={newFilteredCountries}
          countryData={countries}
        />
      }
    </div>
  )
}

export default App