import { useState, useEffect } from "react";
import Form from "./Form";
import Filter from "./Filter";
import Persons from "./Persons";
import personService from "./services/personService"; // <-- new import
import Notification from "./Notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phone, setPhone] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("")
  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(p => p.name === newName)
    if (existingPerson) {
      if (window.confirm(`${newName} already exist do you want to replace the number`)) {
        const updatedPerson = { ...existingPerson, number: phone }
        personService.update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
            setMessage(`${newName} number replaced with new number!`)
            setTimeout(() => {
              setMessage("")
            }, 3000);
            setPhone("");
          })
          .catch(err => {
            setPersons(persons.filter(p => p.id !== existingPerson.id));
            console.log("something went wrong", err)
          })
      }
    } else {
      const personObject = { name: newName, number: phone };
      personService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setMessage(`${newName} added !`)
            setTimeout(() => {
              setMessage("")
            }, 3000);
        setNewName("");
        setPhone("");
      });
    }

  };

  const handlePersonChange = (e) => setNewName(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleSearch = (e) => setSearch(e.target.value);

  const personsToShow = persons.filter(person =>
    person.name ? person.name.toLowerCase().includes(search.toLowerCase()) : false
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      personService.remove(id).then(() => {
        setPersons(persons.filter(p => p.id !== id));
      });
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Form
        addPerson={addPerson}
        handlePersonChange={handlePersonChange}
        handlePhoneChange={handlePhoneChange}
        newName={newName}
        phone={phone}
      />
      <br />

        <Notification message={message}/>
   
      <br />
      <Filter handleSearch={handleSearch} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
