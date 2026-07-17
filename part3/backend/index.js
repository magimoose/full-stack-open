require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())

app.use(express.static('dist'))

app.use(express.json())
morgan.token('body', (req) => { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const PORT = process.env.PORT

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => response.json(persons))
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findById(id).then(person => response.json(person))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if ( !(body.name && body.number) ) {
    return response.status(400).json({
      error: 'Name or number missing'
    })
  }

  console.log(Person.find({ name: body.name }))
  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
  response.send(`
		<div>
			<div>Phonebook has info for 5 people</div>
			<div>${new Date().toString()}</div>
		</div>
		`)
})

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
