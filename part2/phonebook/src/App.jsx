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
  const [status, setStatus] = useState(true)
  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(p => p.name === newName)
    if (existingPerson) {
      if (window.confirm(`${newName} already exists, do you want to replace the number?`)) {
        const updatedPerson = { ...existingPerson, number: phone };
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson));
            setMessage(`Number for ${newName} updated successfully!`);
            setStatus(true);
            setTimeout(() => {
              setMessage("");
            }, 3000);
            setPhone("");
          })
          .catch(error => {
            // 🛠 Handle when backend says 404
            setMessage(
              `Information of ${newName} has already been removed from the server`
            );
            setStatus(false); // false → "error" style
            setPersons(persons.filter(p => p.id !== existingPerson.id)); // sync frontend
            setTimeout(() => {
              setMessage("");
            }, 4000);
          });
      }
    }
    else {
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
    const person = persons.find(p => p.id === id);

    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
          setMessage(`${person.name} was successfully deleted`);
        })
        .catch(() => {
          setMessage(`${person.name} has already been deleted from the server`);
          setStatus(false)
          setPersons(persons.filter(p => p.id !== id)); // sync state with backend
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

      <Notification status={status} message={message} />

      <br />
      <Filter handleSearch={handleSearch} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
