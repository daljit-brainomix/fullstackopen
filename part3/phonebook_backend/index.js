const express = require('express')
const app = express()

app.use(express.json())

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

app.get('/', (request, response) => response.send('<h1>Phonebook Back-end!</h1>'))  

app.get('/info', (request, response) => {    
    const request_datetime = new Date()
    response.send(`<h1>Phonebook has ${persons.length} persons!</h1><p>${request_datetime}</p>`)
})

app.get('/api/persons', (request, response) => response.json(persons))

app.get('/api/persons/:id', (request, response) => {
    const person = persons.find(p => p.id === request.params.id)
    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

// Server settings 
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}. http://localhost:${PORT}/api/persons`)
})
  