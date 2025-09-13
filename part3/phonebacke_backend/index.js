const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const morgan = require('morgan')
app.use(express.json())
const path = require('path')

app.use(express.static('dist'))

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(p => p.id === id)
  if (person) res.json(person)
  else res.status(404).json({ error: "not found" })
})

app.post('/api/persons', (req, res) => {
  const data = req.body
  if (!data.name || !data.number) {
    return res.status(400).json({ error: "name or number missing" })
  }
  if (persons.find(p => p.name === data.name)) {
    return res.status(400).json({ error: "name must be unique" })
  }
  const newPerson = {
    id: String(Math.floor(Math.random() * 100000)),
    name: data.name,
    number: data.number,
  }
  persons = persons.concat(newPerson)
  res.json(newPerson)
})

app.delete('/api/persons/:id', (req, res) => {
  const before = persons.length
  persons = persons.filter(p => p.id !== req.params.id)
  if (persons.length < before) return res.status(204).end()
  else return res.status(404).json({ error: "person not found" })
})

app.get('/api/info', (req, res) => {
  const count = persons.length
  const time = new Date()
  res.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${time}</p>
  `)
})

app.use((req, res) => {
  res.sendFile(path.resolve('dist', 'index.html'))
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
