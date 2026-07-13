import personsService from "./services/persons"
import Notification from './components/Notification.jsx'
import { useState, useEffect } from "react"

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personsService.getAll().then((initPersons) => {
      setPersons(initPersons)
    })
  }, [])

  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setNewFilter] = useState("")
	const [notifMsg, setNotifMsg] = useState(null)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    if (persons.map((person) => person.name).includes(newName)) {
      if (
        confirm(
          `${newName} is already in the phonebook, would you like to update the number?`,
        )
      ) {
        const id = persons.find((person) => person.name === newName).id
        personsService
          .update(id, { id: id, name: newName, number: newNumber })
          .then(() =>
            personsService.getAll().then((initPersons) => {
              setPersons(initPersons)
            }),
          )
      } else {
        return
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      personsService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
      })
			setNotifMsg(`Added ${newName}`)
			setTimeout(() => {
				setNotifMsg(null)
			},5000)
    }
    setNewName("")
    setNewNumber("")
  }

  const deletePerson = (id, name) => {
    if (confirm(`Would you like to delete ${name}?`)) {
      personsService.deletePers(id).then(() =>
        personsService.getAll().then((initPersons) => {
          setPersons(initPersons)
        }),
      )
    }
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
			<Notification message={notifMsg} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        handleNameChange={handleNameChange}
        newName={newName}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

const Persons = (props) => {
  console.log("rerendered")
  return props.persons
    .filter((person) =>
      person.name.toLowerCase().includes(props.filter.toLowerCase()),
    )
    .map((person) => (
      <div>
        <div key={person.id}>
          {person.name} {person.number}
        </div>{" "}
        <button
          type="button"
          onClick={() => props.deletePerson(person.id, person.name)}
        >
          deletee
        </button>
      </div>
    ))
}
const PersonForm = (props) => {
  return (
    <form onSubmit={props.addName}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number:{" "}
        <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = (props) => {
  return (
    <form>
      filter shown with{" "}
      <input value={props.filter} onChange={props.handleFilterChange} />
    </form>
  )
}
export default App
