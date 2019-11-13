import React, {useState, useEffect} from 'react'
import PersonForm from "./componets/PersonForm";
import Persons from "./componets/Persons";
import Filter from "./componets/Filter";
import axios from 'axios'


const App = () => {

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterExp, setFilterExp] = useState('')

    const hook = () => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }
    useEffect(hook, [])

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    };

    const handleFilterChange = (event) => {
        setFilterExp(event.target.value)
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

    const filterHandle = () => {
        let pattern = new RegExp(filterExp, 'i')
        let filteredPersonsCopy = []

        persons.forEach((person) => {
            if (pattern.test(person.name) | pattern.test(person.number)) filteredPersonsCopy.push(person)
        })

        return filteredPersonsCopy

    }

    console.log('rendering app...')


    return (
        <div>
            <h2>Phonebook</h2>

            <Filter handleFilterChange={handleFilterChange} filterExp={filterExp}/>

            <h2>add a new</h2>
            <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
                        addNewName={addNewName} newName={newName} newNumber={newNumber}/>

            <h2>Numbers</h2>
            <Persons persons={filterHandle()}/>
        </div>
    )

}

export default App
