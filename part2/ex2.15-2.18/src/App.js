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
  let styles = {}
  props.notificationMsg === 'Error!' ?
  styles = {color:'red'} : styles = {color:'green'}
  return (
    <form onSubmit={props.onSubmit}>
      <h1>add an entry:</h1>
      <div style={styles}>{props.notificationMsg}</div>
      <br />
      <div>
        name: <input id='name' name={props.name} value={props.valueName} onInput={props.onInput}/>
      </div>
      <div>
        number: <input id='number' name={props.num} value={props.valueNum} onInput={props.onInput}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Numbers = (props) => {
  const newArray = props.numArray.map(num => 
    <div key={num.name}>{num.name}: {num.number} <button className={num.name} id={num.id} onClick={props.onClick}>Delete</button></div>
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
  const [notificationMsg, setNotificationMsg] = useState('')

  const dataHook = () => {
    entryService
      .getAll()
      .then(response => {
        const initialData = response.data
        console.log(response.data)
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
        console.log(idToUpdate)
        entryService
        .update(idToUpdate,{name:newName,number:newNum})
        .catch(error => {
          setNotificationMsg('Error!')
          setTimeout(() => {
            setNotificationMsg('')
          }, 5000)
        })
        entryService
        .getAll()
        .then(response => {
          const newData = response.data
          setData(newData)
          setNotificationMsg('Updated!')
          setTimeout(() => {
            setNotificationMsg('')
          }, 5000)
        })
        .catch(error => {
          setNotificationMsg('Error!')
          setTimeout(() => {
            setNotificationMsg('')
          }, 5000)
        })
      }
    }

    event.preventDefault()
    persons.find(name => 
      ((name.name === newName))
    ) !== undefined ?
      confirmUpdate(newName,newNum,persons)
    : entryService
      .create({name: newName, number: newNum})
      .then(response => {
        console.log(response)
        setData(response.data)
        setNotificationMsg('Added!')
        setTimeout(() => {
          setNotificationMsg('')
        }, 5000)
      })
      .catch(error => {
        setNotificationMsg('Error!')
        setTimeout(() => {
          setNotificationMsg('')
        }, 5000)
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
      .catch(error => {
        setNotificationMsg('Error!')
        setTimeout(() => {
          setNotificationMsg('')
        }, 5000)
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
        notificationMsg={notificationMsg}
        onInput={handleInput}
        onSubmit={handleSubmit}
        name={newName}
        valueName={newName}
        num={newNum}
        valueNum={newNum}
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