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
  let countryForRender
  let countryForRenderLangs
  if (props.countryArray.length === 1) {
    countryForRender = props.countryData.find(country => 
    country.name.common.toLowerCase().includes(props.countryArray[0].key.toLowerCase()))
    console.log(Object.values(countryForRender.languages))
    countryForRenderLangs = Object.values(countryForRender.languages).map((lang,i) =>
        <li key={i}>{lang}</li>
    )
}
  props.countryArray.length === 1 ? 
  newCountryArray = <div>
    <h1>{props.countryArray[0]}</h1>
    <div>capital: {countryForRender.capital[0]}</div>
    <div>area: {countryForRender.area}</div>
    <br />
    <div>
      languages: <ul>{countryForRenderLangs}</ul>
    </div>
    <img src={countryForRender.flags.svg} style={{width:'100px'}} alt='flag'/>
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
        const elementList = countryList.map(country => 
        <div key={country.name.common}>{country.name.common}</div>
        )
        setCountries(countryList)
        setFilteredCountries(elementList)
    })
  }
  const SearchHook = () => {
    const countryList = countries.map(country => 
      <div key={country.name.common}>{country.name.common}</div>
      )
    const filteredArray = countryList.filter(name => {
      return (
      name.key.toLowerCase().includes(
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

  return (
    <div>
      <SearchFunction 
        onInput={handleSearch}
      />
      {(filteredCountries.length) > 10 && (filteredCountries.length !== countries.length) ? 
      <div>Too many matches, specify another filter.</div> : 
        <Entries 
          countryArray={filteredCountries}
          countryData={countries}
        />
      }
    </div>
  )
}

export default App