import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import contactService from './services/persons';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    contactService.getAll()
      .then(initialContacts => {
        setContacts(initialContacts);
      })
      .catch(error => {
        console.error('Error loading contacts:', error.message);
      });
  }, []);

  const addPerson = (newPerson) => {
    const existingContact = contacts.find(contact => contact.name === newPerson.name);

    if (existingContact) {
      if (window.confirm(`${newPerson.name} already exists Do you want to change your phone number to a new one?`)) {
        contactService.update(existingContact.id, { ...existingContact, phone: newPerson.phone })
          .then(updatedContact => {
            setContacts(contacts.map(contact => contact.id !== updatedContact.id ? contact : updatedContact));
          })
          .catch(error => {
            console.error('Error updating contact:', error.message);
          });
      }
    } else {
      contactService.create(newPerson)
        .then(returnedContact => {
          setContacts([...contacts, returnedContact]);
        })
        .catch(error => {
          console.error('Error adding contact:', error.message);
        });
    }
  };

  const deletePerson = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      contactService.remove(id)
        .then(() => {
          setContacts(contacts.filter(contact => contact.id !== id));
        })
        .catch(error => {
          console.error('Error deleting contact::', error.message);
        });
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handler={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} />
      <h3>Numbers</h3>
       <Persons contacts={filteredContacts} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
