import { useState, useEffect } from 'react'
import phonebookService from "./services/phonebook"

const FilterPersons = (props) => {
  return (
    <div>
      Filter phonebook with: 
      <input value={props.keywords} onChange={props.setKeywords} />
    </div>
  )
}
const PersonForm = (props) => {
  return (
      <form onSubmit={props.handleAddPerson}>
      <table>
        <tbody>
          <tr><td>Name</td>
            <td><input value={props.newName} onChange={props.handleNewName} /></td>
          </tr>
          <tr><td>Number</td>
            <td><input value={props.newNumber} onChange={props.handleNewNumber} /></td></tr>
          <tr><td>&nbsp;</td>
            <td><button type="submit">Add</button></td></tr>
        </tbody>
      </table>
    </form>
  )
}
const ShowPersons = (props) => {
  return (
    <>
      {props.persons.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterKeywords, setFilterKeywords] = useState('')
 
  const fetchServerNotes = () => {
    phonebookService
      .getAll()
      .then(initialEntries => setPersons(initialEntries))
  }

  useEffect(fetchServerNotes, [])
  
  const personsToShow = filterKeywords === "" ? persons : persons.filter(person => person.name.includes(filterKeywords))

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterKeywords = (event) => {
    setFilterKeywords(event.target.value)
  }

  const handleAddPerson = (event) => {
    event.preventDefault()
    
    const newNameObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    }

    for(var i=0;i<persons.length;i++) {
      if((persons[i].name === newName) && persons[i].number === newNumber) {
        alert(`${newName} (${newNumber}) is already added to phonebook.`)
        return
      }
    }
    phonebookService.createEntry(newNameObject)
    setPersons(persons.concat(newNameObject))
    setNewName("")
    setNewNumber("")
  }

  return (    
    <div>      
      <h1>Phonebook</h1>
      <FilterPersons keywords={filterKeywords} setKeywords={handleFilterKeywords} />

      <h2>Add a new entry</h2>
      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        handleNewName={handleNewName} 
        handleNewNumber={handleNewNumber}
        handleAddPerson={handleAddPerson} />

      <h2>Numbers</h2>
      <ShowPersons persons={personsToShow} />

    </div>
  )
}

export default App