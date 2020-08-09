import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import phonesService from './services/Phones'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filterWord, setFilter ] = useState('')
  const [ notification, setNotification] = useState({message: null, is_error: false})

  useEffect( () =>{
    phonesService.getAll()
    .then(persons => {
      setPersons(persons)
    })
  } ,[])

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
      const newPerson = {name: name, number: phone}
      const findPerson = persons.find(person => person.name === name)
      if (findPerson) {
          const replaceConfirm = window.confirm(`${name} is already added to phonebook. Replace the old number with a new one?`)
          if (replaceConfirm){
            phonesService.replace(findPerson.id, newPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id!==findPerson.id?person:returnedPerson))
              setNotification({message: `Changed number for ${returnedPerson.name}`})
              setTimeout(() =>{setNotification({message:null})}, 3000)
            })
            .catch(error => {
              setNotification({message: JSON.stringify(error.response.data), is_error: true})
              setTimeout(() =>{setNotification({message:null})}, 3000)
            })
          } else {
            return
          }
      } else {
        phonesService.create(newPerson)
        .then(returnedPerson => {
          setNewName('')
          setNewPhone('')
          setPersons(persons.concat(returnedPerson))
          setNotification({message:`Added ${returnedPerson.name}`})
          setTimeout(() =>{setNotification({message:null})}, 3000)
        })
        .catch(error => {
          setNotification({message: JSON.stringify(error.response.data), is_error: true})
          setTimeout(() =>{setNotification({message:null})}, 3000)
        })
      }
  }

  const handleDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
    phonesService.remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id!==id))
        setNotification({message: `Deleted ${name}`})
        setTimeout(() =>{setNotification({message:null})}, 3000)
      })
      .catch(() => {
        setPersons(persons.filter(person => person.id!==id))
        setNotification({message: `Information of ${name} has already been removed from server`, is_error: true})
        setTimeout(() =>{setNotification({message:null})}, 3000)
      })
    }
  }

  return (
    <div>
      <Notification notification={notification}/>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} value={filterWord}/>
      <h3>add a new</h3>
      <PersonForm  handleNameChange={handleNameChange} newName={newName}
                    handlePhoneChange={handlePhoneChange} newPhone={newPhone}
                    addPersonIntoPhonebook={addPersonIntoPhonebook}/>
      
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDeletePerson={handleDeletePerson}/>
    </div>
  )
}

export default App