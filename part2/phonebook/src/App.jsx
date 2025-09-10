import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [phone, setPhone] = useState("")
  const [search, setSearch]= useState("")
  const addPerson = (event) => {
    event.preventDefault()
    const randId = Math.random()*persons.length

    if(!persons.some(person=> person.name ===newName)){
      setPersons(persons.concat({name: newName, number: phone, id: randId}))

    }
    else{
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

  const handlePhoneChange = (e)=>{
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
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          Phone: <input type='phone' value={phone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <br />
      <div>
        Search <input type="text" placeholder='search here by name' onChange={handleSearch} />
      </div>
      <h2>Numbers</h2>
      <div>
        {
        personsToShow.map((person,i)=>{
          return <p key={i} >name: {person.name}  _____  phone: {person.number}</p>
             
        })
      }
      </div>
      ...
    </div>
  )
}

export default App