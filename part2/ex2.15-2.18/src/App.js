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
  const [data, setData] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const dataHook = () => {
    entryService
      .getAll()
      .then(response => {
        const initialData = response.data
        setPersons(initialData)
      })
  }

  React.useEffect(dataHook, [data])

  const handleSubmit = (event) => {

    const confirmUpdate = (newName,newNum,persons) => {
      if (window.confirm(`${newName} is already in the phonebook! Would you like to update the number?`))
      {
        const idToUpdate = persons.find(person => {
          return person.name === newName
        }).id
        entryService
        .update(idToUpdate,{name:newName,num:newNum})
        entryService
        .getAll()
        .then(response => {
          const newData = response.data
          setData(newData)
          }
        )
      }
    }

    event.preventDefault()
    persons.find(name => 
      ((name.name === newName))
    ) !== undefined ?
      confirmUpdate(newName,newNum,persons)
    : entryService
      .create({name: newName, num: newNum})
      .then(response => {
        console.log(response)
        setData(response.data)
      })

    setNewName('')
    setNewNum('')
  }

  const handleClick = (event) => {
    if(window.confirm(`Are you sure you want to delete ${event.target.className}?`))
    {
      entryService
      .del(event.target.id)
      entryService
      .getAll()
      .then(response => {
        const newData = response.data
        setData(newData)
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