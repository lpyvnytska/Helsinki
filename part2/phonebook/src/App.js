import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filterWord, setFilter ] = useState('')

  const filteredPersons = filterWord ?
        persons.filter(person => ~person.name.indexOf(filterWord))
        : persons
  
  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) =>{
    setNewPhone(event.target.value)
  }
  const handleFilterChange = (event) =>{
    setFilter(event.target.value)
  }
  const addPersonIntoPhonebook = (event) => {
      event.preventDefault()
      const name = newName.trim().replace(/\s\s+/g, ' ');
      const phone = newPhone.trim().replace(/\s\s+/g, '');
      if (name === '' || phone ==='') return
      if (persons.some(person => person.name === name || person.phone === phone)) {
          alert(`${name} or ${phone} is already added to phonebook`)
          return
      }
      const newPerson = {name: name, phone: phone}
      setNewName('')
      setNewPhone('')
      setPersons(persons.concat(newPerson))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} value={filterWord}/>
      <h3>add a new</h3>
      <PersonForm  handleNameChange={handleNameChange} newName={newName}
                    handlePhoneChange={handlePhoneChange} newPhone={newPhone}
                    addPersonIntoPhonebook={addPersonIntoPhonebook}/>
      
      <h2>Numbers</h2>
      <Persons persons={filteredPersons}/>
    </div>
  )
}

export default App