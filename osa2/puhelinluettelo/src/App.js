import React, { useState, useEffect } from 'react'
import personService from './services/persons';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';

const App = () => {
  useEffect(() =>{
    personService
      .getAll()
      .then(data => {
        setPersons(data);
      })
  }, [])
  

  const [ persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [filtered, setFiltered] = useState('');
  const [filter, setFilter] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMode, setErrorMode] = useState(false);

  const result = (filter === '') ? persons : filtered;

  const showNotifyMsg = (message, error) =>{

    setErrorMode(error);

    setNotificationMessage(message);
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const deletePerson = id =>{
    const selectedPerson = persons.find(person => person.id === id);
    const check = window.confirm(`Delete ${selectedPerson.name}?`);
    if(check){
      personService
        .deletePerson(selectedPerson)
        .then(data =>{
          console.log(data);
          setPersons(persons.filter(person => person.id !== selectedPerson.id));
          showNotifyMsg(`Deleted ${selectedPerson.name}`, false);
        })
    }
  }

  const handleFilterChange = (event) =>{
      setFilter(event.target.value);

      const result = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()));
      console.log(result);
      setFiltered(result);
  }

  const handleNumberChange = (event) =>{
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  const handleNameChange = (event) =>{
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  const addNew = (event) =>{
    event.preventDefault();
    
    const personObject = {
      name: newName,
      number: newNumber,
    }

    if(persons.some(person => person.name.toLocaleLowerCase() === newName.toLowerCase())){
      const check = window.confirm(`Wanna overwrite ${newName}?`);
      if(check){
        const selectedPerson = persons.find(person => person.name.toLowerCase() === newName.toLocaleLowerCase());
        const id = selectedPerson.id;
        const changedPerson = {...selectedPerson, number: personObject.number};

        personService
          .update(id, changedPerson)
          .then(data =>{
            setPersons(persons.map(person => person.id !== id ? person : data));
            showNotifyMsg(`Updated ${selectedPerson.name}`, false);
          }).catch(error =>{
            console.log('error, already deleted');
            showNotifyMsg(`Information of ${selectedPerson.name} has already been removed from server`, true);
            setPersons(persons.filter(person => person.id !== id));
          });
      }
    }else{
      personService
        .addPerson(personObject)
        .then(data =>{
          setPersons(persons.concat(data));
          showNotifyMsg(`Added ${data.name}`, false);
          /*setNewName('');
          setNewNumber('');*/
        });
      
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {console.log('error mode', errorMode)}
      <Notification message={notificationMessage} error={errorMode} />
      <Filter handler={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm nameHandler={handleNameChange} numberHandler={handleNumberChange} clickHandler={addNew} />
      <h3>Numbers</h3>
      <Persons personArray={result} clickHandler={deletePerson} />
    </div>
  )

}

export default App