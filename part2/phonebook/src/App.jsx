import { useState, useEffect } from "react";
import Form from "./Form";
import Filter from "./Filter";
import Persons from "./Persons";
import personService from "./services/personService"; // <-- new import
import Notification from "./Notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(true)
  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
  event.preventDefault();
  const person = {
    name: newName,
    number: newNumber
  };

  personService.create(person).then(returnedPerson => {
    setPersons(persons.concat(returnedPerson)); // 👈 add to state
    setNewName("");
    setNewNumber("");
    setMessage(`${returnedPerson.name} added successfully`);
    setStatus(true);
    setTimeout(() => setMessage(""), 3000);
  }).catch(error => {
    setMessage(error.response?.data?.error || "Error adding person");
    setStatus(false);
  });
};

  const handlePersonChange = (e) => setNewName(e.target.value);
  const handlePhoneChange = (e) => setNewNumber(e.target.value);
  const handleSearch = (e) => setSearch(e.target.value);

  const personsToShow = persons.filter(person =>
    person.name ? person.name.toLowerCase().includes(search.toLowerCase()) : false
  );

 const handleDelete = (id) => {
  const person = persons.find(p => p._id === id);
  console.log("id for deletion: ", person)
  if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id));
        setMessage(`${person.name} was successfully deleted`);
        setStatus(true);
        setTimeout(() => setMessage(""), 3000);
      })
      .catch(error => {
        setMessage(error.response?.data?.error || `${person.name} could not be deleted`);
        setStatus(false);
        setPersons(persons.filter(p => p.id !== id)); // keep frontend in sync
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
        phone={newNumber}
      />
      <br />

      <Notification status={status} message={message} />

      <br />
      <Filter handleSearch={handleSearch} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
