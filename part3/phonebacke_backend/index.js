const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/persons.js')
app.use(cors())
const morgan = require('morgan')
app.use(express.json())
const path = require('path')
const db = require('./mongo.js')
app.use(express.static('dist'))
 db()
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// get all persons
app.get('/api/persons', async (req, res) => {
  try {
    const persons = await Person.find({});
    res.json(persons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get one by id
app.get('/api/persons/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (person) res.json(person);
    else res.status(404).json({ error: "not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// add person
app.post('/api/persons', async (req, res) => {
  const data = req.body;

  if (!data.name || !data.number) {
    return res.status(400).json({ error: "name or number missing" });
  }

  try {
    const existingPerson = await Person.findOne({ name: data.name });
    if (existingPerson) {
      return res.status(400).json({ error: "name must be unique" });
    }

    const person = new Person({
      name: data.name,
      number: data.number,
    });

    const savedPerson = await person.save();
    res.json(savedPerson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// delete person
app.delete('/api/persons/:id', async (req, res) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(req.params.id);
    if (deletedPerson) return res.status(204).end();
    else return res.status(404).json({ error: "person not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
