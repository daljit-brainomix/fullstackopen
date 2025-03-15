import { useState } from 'react'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])

  const [newName, setNewName] = useState('')
  
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleAddPerson = (event) => {
    event.preventDefault()
    const newNameObject = {
      name: newName
    }
    for(var i=0;i<persons.length;i++) {
      if(persons[i].name === newName) {
        alert(`${newName} is already added to phonebook.`)
        return
      }
    }

    setPersons(persons.concat(newNameObject))
    setNewName("")
  }

  return (    
    <div>      
      <h2>Phonebook</h2>
      <form onSubmit={handleAddPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App