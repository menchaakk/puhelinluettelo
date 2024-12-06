import React from 'react';
import PropTypes from 'prop-types';

const Persons = ({ contacts, deletePerson }) => {
  return (
    <ul>
      {contacts.map((contact) => (
        <li key={contact.id}>
          {contact.name}: {contact.number}
          <button onClick={() => deletePerson(contact.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

Persons.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  deletePerson: PropTypes.func.isRequired,
};

export default Persons;