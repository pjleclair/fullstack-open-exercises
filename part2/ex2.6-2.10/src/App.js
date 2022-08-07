import React, { useState } from 'react'

const Numbers = (props) => {
  const newArray = props.numArray.map((num,i) => 
    <div key={i}>{num.name}</div>
  )
  console.log(newArray)
  return (
    <div>
      {newArray}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(event)
    setPersons(prevState => [
      ...prevState,
      {name: newName}
    ])
  }

  const handleInput = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onInput={handleInput}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h1>Numbers</h1>
      <Numbers 
        numArray={persons}
      />
    </div>
  )
}

export default App