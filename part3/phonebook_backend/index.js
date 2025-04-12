require('dotenv').config()
const cors = require('cors')
const express = require('express')
const errorHandler = require('./middlewares/errorHandler');
const ApiError = require("./utils/ApiError")

var morgan = require('morgan')

const app = express()

app.use(cors())
app.use(express.static('dist'))

// Middleware for parsing JSON content
app.use(express.json())

// Create a new morgan token to fetch body
morgan.token('body', (req, res) => JSON.stringify(req.body))

// HTTP request logger middleware
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const Person = require("./models/person")

let persons = []


// // Helpers
// function generateRandomId() {
//     let minimum = 10
//     let maximum = 100000
//     return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
// }

// function getNewPersonId()
// {
//     let newId = generateRandomId();
//     let newIdTaken = true;
//     while(newIdTaken) {
//         let person = persons.find(p => Number(p.id) === newId)
//         if(!person) {
//             newIdTaken=false            
//         } else {
//             newId = generateRandomId()
//         }
        
//     }
//     return String(newId)
// }

// API endpoints
app.get('/', (request, response) => response.send('<h1>Phonebook Back-end!</h1>'))  

app.get('/info', (request, response) => {    
    const request_datetime = new Date()
    response.send(`<h1>Phonebook has ${persons.length} persons!</h1><p>${request_datetime}</p>`)
})

// Get all entries
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
      response.json(persons)        
    })  
})

// Get details of a person
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)
    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

// Delete an entry
app.delete('/api/persons/:id', (request, response) => {
    // const id = request.params.id
    // persons = persons.filter(person => person.id !== id)  
    // response.status(204).end()
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
      if(!result) {
        return next(new ApiError(400, "The entry could not be deleted from the phonebook."))
        // response.status(400).json({ 
        //   error: 'The entry could not be deleted from the phonebook.' 
        // })
      } else {
        response.status(204).end()
      }
    })
    .catch(error => next(new ApiError(500, error.message)))
})

// Create a new entry
app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        return next(new ApiError(400, "You must enter both person's name and number"))
    }
    
    // const existingPerson = persons.find((p) => p.name === body.name)
    // if (existingPerson) {
    //     return response.status(400).json({ 
    //       error: 'The name already exists in the phonebook.' 
    //     })
    // }
    // // Add new person
    // newPerson = {
    //     id: getNewPersonId(),
    //     name: body.name,
    //     number: body.number,
    // }
    // persons = persons.concat(newPerson)
    // response.json(newPerson)
    
    const newPerson = new Person({
      name: body.name,
      number: body.number
    })
    newPerson.save().then(savedPerson => response.json(savedPerson))
})

// Update an existing entry
app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return next(new ApiError(404, "The requested person does not exist."))
      }

      person.name = body.name
      person.number = body.number

      return person.save().then((updated) => {
        response.json(updated)
      })
    })
    .catch(error => next(error))  
})

// Middleware for catching requests made to non-existent routes
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

//Error handler
// const errorHandler = (error, request, response, next) => {
//   console.log(error.message)

//   if(error.name === "CastError") {
//     return response.status(400).send({ error: "Malformatted ID"})
//   }
//   next(error)
// }
app.use(errorHandler)

// Server settings 
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}. http://localhost:${PORT}/api/persons`)
})
  