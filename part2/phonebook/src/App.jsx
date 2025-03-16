import { useState } from 'react'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "1234567" }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleAddPerson = (event) => {
    event.preventDefault()
    
    const newNameObject = {
      name: newName,
      number: newNumber
    }

    for(var i=0;i<persons.length;i++) {
      if((persons[i].name === newName) && persons[i].number === newNumber) {
        alert(`${newName} (${newNumber}) is already added to phonebook.`)
        return
      }
    }

    setPersons(persons.concat(newNameObject))
    setNewName("")
    setNewNumber("")
  }

  return (    
    <div>      
      <h2>Phonebook</h2>
      <form onSubmit={handleAddPerson}>
        <table>
          <tbody>
            <tr><td>Name</td>
              <td><input value={newName} onChange={handleNewName} /></td>
            </tr>
            <tr><td>Number</td>
              <td><input value={newNumber} onChange={handleNewNumber} /></td></tr>
            <tr><td>&nbsp;</td>
              <td><button type="submit">Add</button></td></tr>
          </tbody>
        </table>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App