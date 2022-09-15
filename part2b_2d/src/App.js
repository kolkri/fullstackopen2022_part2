import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import contactService from './services/contacts'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  useEffect(()=>{
    contactService
      .getAll()
      .then(data => {
        setPersons(data)
      })
  }, [])

  const addName = (event) => {
        event.preventDefault()
        const personObject = {
          name: newName,
          number: newNumber
        }
        if(persons.some(person => person.name === newName)){
          if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
            const personToFind = persons.find(p => p.name === newName)
            const personID = personToFind.id
            const changedContact = {...personToFind, number: newNumber}
            contactService
              .update(personID, changedContact)
              .then(data => {
                setPersons(persons.map(person => person.id !== personID ? person : data))
              })
              .catch(error => {
                alert(`The contact of ${personToFind.name} was already deleted from server!`)
                setPersons(persons.filter(p => p.id !== personID))
              })
          }
        } else {
          contactService.create(personObject).then(data => {
            setPersons(persons.concat(data))
            setNewName('')
            setNewNumber('')
          })
          
        }
      }
  
  const deleteName = (id) => {
      const personToFind = persons.find(p => p.id === id)
      if (window.confirm(`Delete ${personToFind.name}?`)) {
        contactService.deleteContact(id).then(data => {
          setPersons(persons.filter(p => p.id !== id))
        })
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
      <Persons persons={persons} filter={filter} deleteName={deleteName}/>
    </div>
  )

}

export default App
