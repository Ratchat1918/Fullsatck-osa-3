const express = require('express')
//require('dotenv').config()
const app = express()
app.use(express.json())
app.use(express.static('dist'))
const cors = require('cors')
app.use(cors())

const Person = require('./models/note')
app.get('/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})
/*
app.get('/persons/:id', (request, response) => {
  const id = request.params.id
  const note = persons.find(note => note.id === id)
  if (note) {
    response.send(`<h1>${note.id} ${note.name} ${note.number}</h1>`)
  } else {
    response.status(404).end()
  }
})
app.delete('/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(note => note.id !== id)

  response.status(204).end()
})
const generateId = () => {
  //const maxId = persons.length > 0
  //  ? Math.max(...persons.map(n => Number(n.id)))
  //  : 0
  const newId=Math.floor(Math.random() * 1000000000);
  return String(newId)
}
app.post('/persons', (request, response) => {
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
})*/

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
