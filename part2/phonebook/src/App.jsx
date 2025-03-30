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
      {props.persons.map(person => (
        <p key={person.id}>
          {person.name} {person.number} 
          &nbsp;
          <button onClick={()=> props.handleDelete(person.id)}>Delete</button>
        </p>))
      }
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
  
  const handleDeletePerson = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      phonebookService
        .deleteEntry(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)));
    }
  }


  const handleAddPerson = (event) => {
    event.preventDefault()
     
    var updateExisting = false
    var updateId = 0 
    for(var i=0;i<persons.length;i++) 
    {
      if(persons[i].name === newName) 
      {
        if(persons[i].number === newNumber) 
        {
          // New number is the same, we don't need to update it.
          alert(`${newName} (${newNumber}) is already added to phonebook`)
          return
        }
        // New number is different than the existing, lets check if they really want to update it
        else if(window.confirm(`${newName} is already added to phonebook, replace the old number (${persons[i].number}) with a new one (${newNumber})?`)) 
        {          
          updateExisting=true
          updateId = persons[i].id
        } 
        else
        {
          return
        }
      }
    }
    if(updateExisting)
    {
      const updatedPerson = {
        name: newName,
        number: newNumber
      }
      phonebookService
        .updateEntry(updateId, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id === updateId ? returnedPerson : person))
        })
    }
    else 
    {
      const newNameObject = {
        name: newName,
        number: newNumber,
        id: String(persons.length + 1)
      }
  
      phonebookService.createEntry(newNameObject)
      setPersons(persons.concat(newNameObject))
    }
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
      <ShowPersons persons={personsToShow} handleDelete={handleDeletePerson}/>

    </div>
  )
}

export default App


