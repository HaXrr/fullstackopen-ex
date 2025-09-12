const express = require('express')
const app = express()
const morg = require('morgan')
app.use(express.json()) // for parsing JSON bodies

app.use(morg('tiny'))


let persons = [
    { id: "1", name: "Arto Hellas", number: "040-123456" },
    { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
    { id: "3", name: "Dan Abramov", number: "12-43-234345" },
    { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
]


// Get all persons
app.get('/api/persons', (req, res) => {
    res.json(persons)
})


app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(p => p.id === id)
    if (person) res.json(person)
    else res.status(404).json({ error: "not found" })
})

app.post('/api/persons', (req, res)=> {
    const data = req.body
    if (!data.name || !data.number) {
    return res.status(400).json({ error: "name or number missing" });
  }
  if (persons.find(p => p.name === data.name)) {
    return res.status(400).json({ error: "name must be unique" });
  }
    
    const newPerson = {
        id: String(Math.floor(Math.random()*100000)),
        name: data.name,
        number: data.number,
    }

    persons = persons.concat(newPerson)
    res.json(newPerson)
})

app.delete('/api/persons/:id', (req, res) => {
    persons = persons.filter(p => p.id !== req.params.id)
    res.status(204).json({ error: "person not found" })
})

app.get('/api/info', (req, res) => {
    const count = persons.length
    const time = new Date()
    res.send(`
        <p>Phonebook has info for ${count} people</p>
    <p>${time}</p>
        `)

})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
