import React from 'react';
import Person from './Person'

const Persons = ({persons, handleDeletePerson}) => {
    return (
        persons.map(person => <Person handleDeletePerson={()=>handleDeletePerson(person.id, person.name)} person={person} key={person.id}/>)
    );
};

export default Persons;