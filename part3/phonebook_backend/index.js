const cors = require('cors')
const express = require('express')
var morgan = require('morgan')

const app = express()

app.use(cors())

// Middleware for parsing JSON content
app.use(express.json())

// Create a new morgan token to fetch body
morgan.token('body', (req, res) => JSON.stringify(req.body))

// HTTP request logger middleware
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


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
// Helpers
function generateRandomId() {
    let minimum = 10
    let maximum = 100000
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function getNewPersonId()
{
    let newId = generateRandomId();
    let newIdTaken = true;
    while(newIdTaken) {
        let person = persons.find(p => Number(p.id) === newId)
        if(!person) {
            newIdTaken=false            
        } else {
            newId = generateRandomId()
        }
        
    }
    return String(newId)
}

// API endpoints
app.get('/', (request, response) => response.send('<h1>Phonebook Back-end!</h1>'))  

app.get('/info', (request, response) => {    
    const request_datetime = new Date()
    response.send(`<h1>Phonebook has ${persons.length} persons!</h1><p>${request_datetime}</p>`)
})

app.get('/api/persons', (request, response) => response.json(persons))

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)
    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ 
          error: 'Name or number is missing.' 
        })
    }
    
    const existingPerson = persons.find((p) => p.name === body.name)
    if (existingPerson) {
        return response.status(400).json({ 
          error: 'The name already exists in the phonebook.' 
        })
    }
    // Add new person
    newPerson = {
        id: getNewPersonId(),
        name: body.name,
        number: body.number,
    }
    persons = persons.concat(newPerson)
    
    response.json(newPerson)
})

// Middleware for catching requests made to non-existent routes
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

// Server settings 
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}. http://localhost:${PORT}/api/persons`)
})
  