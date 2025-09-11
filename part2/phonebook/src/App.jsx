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
    

    if (!persons.some(person => person.name === newName)) {
      
      axios.post('http://localhost:3001/persons', {name: newName, number:phone})
      .then((res)=>{
        console.log(res)
        setPersons(persons.concat(res.data))
        setNewName("")
    setPhone("")

      })
      .catch((err)=>{
        console.log("error adding person data", err)
      })
    }
    else {
      alert(`${newName} Already exist`)
    }

    
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