import React, {useState, useEffect} from 'react'
import PersonForm from "./componets/PersonForm";
import Persons from "./componets/Persons";
import Filter from "./componets/Filter";
import personService from './services/personsService'
import Notification from "./componets/Notification";

const App = () => {

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterExp, setFilterExp] = useState('')
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [notificationStyle, setNotificationStyle] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(response => {
                console.log('promise fulfilled', response)
                setPersons(response)
            })
    }, [])

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    };

    const handleFilterChange = (event) => {
        setFilterExp(event.target.value)
    }

    const handleClickDelete = (id, name) => {
        if (window.confirm(`Delete ${name} from phonebook?`)) {
            personService
                .deleteItem(id)
                .then(() => {
                    removePersonLocally(name)
                    console.log('deleted')
                })
                .catch(error => {
                    console.log(error)
                    removePersonLocally(name)
                    setNotificationMessage(
                        `Information of ${newName} has already been removed from the server`
                    )
                    setNotificationStyle("error")
                    setTimeout(() => {
                        setNotificationMessage(null)
                        setNotificationStyle(null)
                    }, 5000)
                })
        }
    }

    const addNewName = (event) => {
        console.log('onSubmit called')
        event.preventDefault()

        if (!persons.map(person => person.name).includes(newName)) {
            const personObject = {
                name: newName,
                number: newNumber
            }

            personService
                .create(personObject)
                .then(response => {
                    console.log(response)
                    setPersons(persons.concat(response))
                    setNewName('')
                    setNewNumber('')
                })
                .then(() => {
                    setNotificationMessage(
                        `${newName} added to the phonebook`
                    )
                    setNotificationStyle("notification")
                    setTimeout(() => {
                        setNotificationMessage(null)
                        setNotificationStyle(null)
                    }, 5000)
                })
                .catch(error => {
                    console.log('Error', error)
                })
        } else if (window.confirm(`${newName} is already in phonebook, replace the old number with new one?`)) {
            const personToUpdate = persons.find(p => p.name === newName)
            const changedPerson = { ...personToUpdate, number: newNumber}
            personService
                .update(personToUpdate.id, changedPerson)
                .catch(error => {
                    console.log(error)
                    setNotificationMessage(
                        `Information of ${newName} has already been removed from the server`
                    )
                    setNotificationStyle("error")
                    setTimeout(() => {
                        setNotificationMessage(null)
                        setNotificationStyle(null)
                    }, 5000)
                })
                .then(() => {
                    personService.getAll()
                        .then(response => {
                            setPersons(response)
                        })
                    setNewName('')
                    setNewNumber('')
                })

        }
    };

    const filterHandle = () => {
        let pattern = new RegExp(filterExp, 'i')
        let filteredPersonsCopy = []

        persons.forEach((person) => {
            if (pattern.test(person.name) | pattern.test(person.number)) filteredPersonsCopy.push(person)
        })

        return filteredPersonsCopy
    }

    const removePersonLocally = (e) => {
        let array = [...persons];
        console.log(e)
        let index = array.map(e => e.name).indexOf(e);
        if (index !== -1) {
            array.splice(index, 1);
            setPersons(array);
        }
    }

    console.log('rendering app...')


    return (
        <div>
            <h2>Phonebook</h2>

            <Notification message={notificationMessage} style={notificationStyle} />

            <Filter handleFilterChange={handleFilterChange}
                    filterExp={filterExp}/>

            <h2>add a new</h2>
            <PersonForm handleNameChange={handleNameChange}
                        handleNumberChange={handleNumberChange}
                        addNewName={addNewName}
                        newName={newName}
                        newNumber={newNumber}/>

            <h2>Numbers</h2>
            <Persons persons={filterHandle()}
                     handleClickDelete={handleClickDelete}/>
        </div>
    )
}

export default App
