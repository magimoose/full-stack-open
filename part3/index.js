const express = require('express')
const app = express()
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const morgan = require('morgan')

app.use(express.json())
morgan.token('body', (req, res) => { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Express API',
      version: '1.0.0',
    },
    servers: [{ url: 'http://localhost:3001' }],
  },
  // where to look for @openapi comments
  apis: ['./*.js'],
};

const openapiSpec = swaggerJsdoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
	const id = request.params.id
	const person = persons.find(person => person.id === id)
	response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id
	persons = persons.filter(person => person.id !== id)
	response.status(204).end()
})


app.post('/api/persons', (request, response) => {
	const id = Math.floor( Math.random() * 1000 ).toString()
	const person = request.body
	if ( !(person.name && person.number) ) {
		return response.status(400).json({ 
    error: 'Name or number missing' 
  })
	}
	if (persons.find(p => p.name === person.name)) {
		return response.status(409).json({ 
    error: 'Name already in the database' 
  })
	}
	persons = persons.concat({...person, id: id})
	response.status(204).end()
})

app.get('/info', (request, response) => {
	response.send(`
		<div>
			<div>Phonebook has info for ${persons.length} people</div>
			<div>${new Date().toString()}</div>
		</div>
		`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
