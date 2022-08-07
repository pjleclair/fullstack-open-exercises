import React, { useState } from 'react'

const Numbers = (props) => {
  const newArray = props.numArray.map(num => 
    <div key={num.name}>{num.name}: {num.num}</div>
  )
  return (
    <div>
      {props.searchFilters !== '' ? newArray.filter(name => name.key.toLowerCase().includes(props.searchFilters)) : newArray}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', num: '999-999-9999' },
    {name: 'Joseph Shmoe', num: '207-888-8222'},
    {name: 'Phil LeClair', num: '207-555-2222'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    
    persons.find(name => 
      name.name === newName
    ) !== undefined ? alert(`${newName} is already in the phonebook!`) :
    setPersons(prevState => [
      ...prevState,
      {name: newName, num: newNum}
    ])
  }

  const handleInput = (event) => {
    event.target.id === 'name' ? setNewName(event.target.value) : setNewNum(event.target.value)
  }

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          search the listings: <input onInput={handleSearch}/>
        </div>
        <h1>add an entry:</h1>
        <div>
          name: <input id='name' onInput={handleInput}/>
        </div>
        <div>
          number: <input id='number' onInput={handleInput}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h1>Numbers</h1>
      <Numbers 
        numArray={persons}
        searchFilters={newSearch}
      />
    </div>
  )
}

export default App