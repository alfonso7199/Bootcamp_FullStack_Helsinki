import { useState, useEffect } from 'react'
import FiltrarPersonas from './components/FiltrarPersonas'
import AddPerson from './components/AddPerson'
import Personas from './components/Personas'
import axios from 'axios'
import Persona from './components/Persona'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('');

  useEffect(() => {
      axios
        .get('http://localhost:3002/persons')
        .then(response => {
          setPersons(response.data);
        })
    }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    const nameExists = persons.some(person => person.name === newName);
    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('');
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <FiltrarPersonas value={newSearch} onChange={handleSearchChange} />
      <h3>add a new</h3>
      <AddPerson 
        onSubmit={addName} 
        newName={newName} 
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Personas persons={personsToShow}/>
    </div>
  )
}

export default App