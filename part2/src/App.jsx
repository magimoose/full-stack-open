import { useState } from 'react'

const App = () => {
	  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setNewFilter] = useState('')

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	const addName = (event) => {
		event.preventDefault()
		if (persons.map((person) => person.name).includes(newName)) {
			alert(`${newName} is already added to phonebook`)
			return
		}
		const copy = persons.concat({name: newName, number: newNumber})
		setPersons(copy)
		setNewName('')
		setNewNumber('')
	}

	const handleFilterChange = (event) => {
		setNewFilter(event.target.value)
	}

  return (
    <div>
      <h2>Phonebook</h2>
			<Filter filter={filter} handleFilterChange={handleFilterChange} />
			<h2>add a new</h2>
			<PersonForm addName={addName} handleNameChange={handleNameChange} newName={newName} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
			<Persons persons={persons} filter={filter} />
    </div>
  )
}

const Persons = (props) => {
	return (

			(props.persons.filter((person) => person.name.toLowerCase().includes(props.filter.toLowerCase()))).map((person) => <div>{person.name} {person.number}</div>)
	)
}
const PersonForm = (props) => {
	return (

      <form onSubmit={props.addName}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange}/>
        </div>
				<div>
					number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
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
				filter shown with <input value={props.filter}
				onChange={props.handleFilterChange}/>
			</form>
	)
}
export default App
