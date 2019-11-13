import React, {useState} from 'react'
import PersonForm from "./componets/PersonForm";
import Persons from "./componets/Persons";
import Filter from "./componets/Filter";

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456'},
        {name: 'Ada Lovelace', number: '39-44-5323523'},
        {name: 'Dan Abramov', number: '12-43-234345'},
        {name: 'Mary Poppendieck', number: '39-23-6423122'}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filteredPersons, setFilteredPersons] = useState(persons)
    const [filterExp, setFilterExp] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    };

    const handleFilterChange = (event) => {
        setFilterExp(event.target.value)
        let pattern = new RegExp(event.target.value, 'i')
        let filteredPersonsCopy = []

        persons.forEach((person) => {
            console.log(person)
            if (pattern.test(person.name) | pattern.test(person.number)) filteredPersonsCopy.push(person)
        })
        setFilteredPersons(filteredPersonsCopy)
    }

    const addNewName = (event) => {
        console.log('onSubmit called')
        event.preventDefault()

        if (!persons.map(person => person.name).includes(newName)) {
            const personObject = {
                name: newName,
                number: newNumber
            }

            setPersons(persons.concat(personObject))
            setNewName('')
            setNewNumber('')
        } else alert(`${newName} is already added to phonebook`)

    };


    console.log('rendering app...')
    return (
        <div>
            <h2>Phonebook</h2>

            <Filter handleFilterChange={handleFilterChange} filterExp={filterExp}/>

            <h2>add a new</h2>
            <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
                        addNewName={addNewName} newName={newName} newNumber={newNumber}/>

            <h2>Numbers</h2>
            <Persons persons={filteredPersons}/>
        </div>
    )

}

export default App
