import React, { useEffect, useState } from 'react'
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
  const [weatherData, setWeatherData] = useState({temp: 0, icon: '10n', wind: ''})
  let newCountryArray
  let countryForRenderLangs

  if (props.countryArray.length === 1) {
    countryForRenderLangs = Object.values(props.countryArray[0].languages).map((lang,i) =>
        <li key={i}>{lang}</li>
    )
  }

  console.log(weatherData)

  const weatherHook = () => {
    if (props.countryArray.length === 1) {
    axios
      //.get('http://localhost:3001/data')
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${props.countryArray[0].name.common}&exclude=minutely,hourly,daily&units=imperial&appid=${props.apiKey}`)
      .then (response => {
        console.log(response)
        setWeatherData({temp: response.data.main.temp, icon: response.data.weather[0].icon, wind: response.data.wind.speed})
      })
    
    }
  }
  useEffect(weatherHook, [props.countryArray.length, props.apiKey, props.countryArray])
   
  props.countryArray.length === 1 ? 
  newCountryArray = <div>
    <h2>{props.countryArray[0].name.common}</h2>
    <h3>Basic Info</h3>
    <div>capital: {props.countryArray[0].capital[0]}</div>
    <div>area: {props.countryArray[0].area}</div>
    <br />
    <div>
      languages: <ul>{countryForRenderLangs}</ul>
    </div>
    <div>flag:</div>
    <img src={props.countryArray[0].flags.svg} style={{width:'100px'}} alt='flag'/>
    <h2>Weather in {props.countryArray[0].name.common}</h2>
    <div>temperature: {weatherData.temp} degrees F</div>
    <img alt='weather' src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}/>
    <div>wind: {weatherData.wind} mi/hr</div>
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
  const api_key = process.env.REACT_APP_API_KEY

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
    setFilteredCountries([targetCountry])
  }

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
          apiKey={api_key}
        />
      }
    </div>
  )
}

export default App