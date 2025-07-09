require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('dist'))
const cors = require('cors')
app.use(cors())

//tehtävä 3.12-3.16
const Person = require('./models/persons')

app.get('/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.post('/persons', (request, response) => {
  const body = request.body
  if (!body.number) {
    return response.status(400).json({ error: 'number missing' })
  }
  const note = new Person({
    number: body.number,
    name: body.name || false,
  })
  note.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.delete('/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.get('/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.put('/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      if (updatedPerson) {
        response.json(updatedPerson)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

