import React, { useState } from 'react'
import entryService from './services/entries'

const SearchFunction = (props) => {
  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          search the listings: <input onInput={props.onInput}/>
        </div>
    </div>
  )
}

const AddEntry = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <h1>add an entry:</h1>
      <div>
        name: <input id='name' onInput={props.onInput}/>
      </div>
      <div>
        number: <input id='number' onInput={props.onInput}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Numbers = (props) => {
  const newArray = props.numArray.map(num => 
    <div key={num.name}>{num.name}: {num.num} <button className={num.name} id={num.id} onClick={props.onClick}>Delete</button></div>
  )

  return (
    <div>
     <h1>Numbers</h1>
      {props.searchFilters !== '' ? newArray.filter(name => name.key.toLowerCase().includes(props.searchFilters.toLowerCase())) : newArray}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const dataHook = () => {
    entryService
      .getAll()
      .then(response => {
        console.log(response.data)
        if (response.data.length !== persons.length)
          {setPersons(response.data)}
      })
  }

  React.useEffect(dataHook, [persons])

  const handleSubmit = (event) => {
    event.preventDefault()
    persons.find(name => 
      name.name === newName
    ) !== undefined ? alert(`${newName} is already in the phonebook!`) :
    setPersons(prevState => [
      ...prevState,
      {name: newName, num: newNum}
    ])
    const newPerson = {name: newName, num: newNum}
    entryService
      .create(newPerson)
      .then(response => {
        console.log(response)
      })
  }

  const handleClick = (event) => {
    if(window.confirm(`Are you sure you want to delete ${event.target.className}?`))
    {
      entryService
      .del(event.target.id)
      entryService
      .getAll()
      .then(response => {
        console.log(response.data)
        setPersons(response.data)
      })
    }
  }

  const handleInput = (event) => {
    event.target.id === 'name' ? setNewName(event.target.value) : setNewNum(event.target.value)
  }

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <SearchFunction 
        onInput={handleSearch}
      />
      <AddEntry 
        onInput={handleInput}
        onSubmit={handleSubmit}
      /> 
      <Numbers 
        numArray={persons}
        searchFilters={newSearch}
        onClick={(event) => handleClick(event)}
      />
    </div>
  )
}

export default App