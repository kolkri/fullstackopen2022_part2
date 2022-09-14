import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addName = (event) => {
        event.preventDefault()
        if(persons.some(person => person.name === newName)){
          alert(`${newName} is already added to phonebook`)
      } else {
          const personObject = {
            name: newName,
            number: newNumber
          }
          setPersons(persons.concat(personObject))
          setNewName('')
          setNewNumber('')
        }
      }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter}/>
      <h2>add a new</h2>
      <PersonForm 
        addName={addName} 
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter}/>
    </div>
  )

}

export default App
