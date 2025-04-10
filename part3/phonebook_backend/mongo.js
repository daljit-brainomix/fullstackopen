const mongoose = require("mongoose")

// Skip node and script path
const args = process.argv.slice(2)

if(args.length < 1) {
    console.log("Database password is missing.")
    process.exit(1)
}

const DB_NAME = "phonebookApp"
const DB_USER = "phonebookdb"
const DB_PASSWORD = args[0]

const inputName = args[1]
const inputNumber = args[2]

// connect to db
const CONNECTION_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.hxbq78l.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set("strictQuery", false)
mongoose.connect(CONNECTION_URL)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
// Create model
const Person = mongoose.model("Person", personSchema)

const exitWithError = (message) => {
    console.log(message)
    process.exit(1)
}

// When adding a new entry, both name and number should be entered.
if(inputName && !inputNumber)
{
   exitWithError("Both name and number should be provided to create a new entry.") 
} 
else if(inputName && inputNumber) 
{
    const newPerson = new Person({
        name: inputName,
        number: inputNumber,
    })
    newPerson.save().then(result => {
        console.log(`Added ${inputName} ${inputNumber} to phonebook`)
        mongoose.connection.close()
    })
} 
else 
{
    Person.find({}).then(persons => {
        persons.forEach(person => console.log(`${person.name} ${person.number}`))
        mongoose.connection.close()
    })
}