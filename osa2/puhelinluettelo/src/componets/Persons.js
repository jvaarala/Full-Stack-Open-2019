import React from 'react'


const Person = ({person, handleClickDelete}) => {
    return (
        <div>
            {person.name} {person.number} <button onClick={(e) => {e.preventDefault(); handleClickDelete(person.id, person.name)}}>delete</button>
        </div>
    )
}

const Persons = ({persons, handleClickDelete}) => {

    return (
        <div>
            {persons.map(person => <Person key={person.id} person={person} handleClickDelete={handleClickDelete}/>)}
        </div>
    )
}

export default Persons