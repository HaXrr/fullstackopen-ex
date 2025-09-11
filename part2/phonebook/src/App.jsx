import { useState } from 'react'
import Form from './Form'
import Filter from './Filter'
import Persons from './Persons'
import axios from 'axios'
import { useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
  ])

  useEffect(()=>{
    axios.get('http://localhost:3001/persons')
    .then((res)=>{
      console.log(res.data)
      setPersons(res.data)

    })
  },[])
  
  const [newName, setNewName] = useState('')
  const [phone, setPhone] = useState("")
  const [search, setSearch] = useState("")
  const addPerson = (event) => {
    event.preventDefault()
    const randId = Math.random() * persons.length

    if (!persons.some(person => person.name === newName)) {
      setPersons(persons.concat({ name: newName, number: phone, id: randId }))

    }
    else {
      alert(`${newName} Already exist`)
    }

    setNewName("")
    setPhone("")
    console.log("Form Submited", persons)
  }

  const handlePersonChange = (e) => {
    console.log("New person", e.target.value)
    setNewName(e.target.value)
  }

  const handlePhoneChange = (e) => {
    console.log(e.target.value)
    setPhone(e.target.value)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    console.log("searching", search)
  }
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Form addPerson={addPerson} handlePersonChange={handlePersonChange} handlePhoneChange={handlePhoneChange} />
      <br />
      <Filter handleSearch={handleSearch} />
      <h2>Numbers</h2>
      <div>
        <Persons personsToShow={personsToShow} />
      </div>
      ...
    </div>
  )
}

export default App