import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    
  ]) 
  const [newName, setNewName] = useState('')
  const [phone, setPhone] = useState("")
  const addPerson = (event) => {
    event.preventDefault()
    const randId = Math.random()*persons.length

    if(!persons.some(person=> person.name ===newName)){
      setPersons(persons.concat({name: newName, phone: phone, id: randId}))

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
      <h2>Numbers</h2>
      {
        persons.map((person,i)=>{
          return <p key={i} >name: {person.name}  _____  phone: {person.phone}</p>
             
        })
      }
      ...
    </div>
  )
}

export default App