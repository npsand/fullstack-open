import React from 'react';


const Person = ({person, clickHandler}) => {
    return(
      <h4 key={person.name}>
        {person.name} {person.number}
        <button onClick={() => clickHandler(person.id)}>delete</button>
      </h4>
    )
  }
  
  const Persons = ({personArray, clickHandler}) =>{
    return(
      <div>
        {personArray.map(person => 
          <Person key={person.name} person={person} clickHandler={clickHandler} />
        )}
      </div>
    )
  }

export default Persons;