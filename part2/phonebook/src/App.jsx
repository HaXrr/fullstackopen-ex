import { useState, useEffect } from "react";
import Form from "./Form";
import Filter from "./Filter";
import Persons from "./Persons";
import personService from "./services/personService"; // <-- new import

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phone, setPhone] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    if (!persons.some(person => person.name === newName)) {
      const personObject = { name: newName, number: phone };

      personService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setPhone("");
      });
    } else {
      alert(`${newName} already exists`);
    }
  };

  const handlePersonChange = (e) => setNewName(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleSearch = (e) => setSearch(e.target.value);

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this person?")) {
    personService.remove(id).then(() => {
      setPersons(persons.filter(person => person.id !== id));
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
      <Filter handleSearch={handleSearch} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
