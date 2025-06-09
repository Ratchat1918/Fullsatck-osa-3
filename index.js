const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('dist'))
const cors = require('cors')
app.use(cors())

let persons =[
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": "1"
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": "2"
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": "3"
    }
];
// toimi kun käynistetty npm run dev mukaan
app.get('/info', (request, response) => {
  response.send(`<h1>Phonebook has info for ${persons.length} people</h1>`)
})
app.get('/api/persons', (request, response) => {
  response.json(persons)
})
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const note = persons.find(note => note.id === id)
  if (note) {
    response.send(`<h1>${note.id} ${note.name} ${note.number}</h1>`)
  } else {
    response.status(404).end()
  }
})
//toimi DELETE http://localhost:3001/api/persons/3 HTTP/1.1 mukaan
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(note => note.id !== id)

  response.status(204).end()
})
//generates new id for a new note
const generateId = () => {
  //const maxId = persons.length > 0
  //  ? Math.max(...persons.map(n => Number(n.id)))
  //  : 0
  const newId=Math.floor(Math.random() * 1000000000);
  return String(newId)
}
//toimi POST http://localhost:3001/api/persons HTTP/1.1 mukaan
app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  } else if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  } else if (persons.find(note => note.name === body.name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const note = {
    number: body.number,
    name: body.name,
    id: generateId(),
  }

  persons = persons.concat(note)

  response.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
//tehtävä 3.1-3.8