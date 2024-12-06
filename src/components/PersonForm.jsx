import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PersonForm = ({ addPerson }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !number) {
      alert('fill in all fields!');
      return;
    }
    addPerson({ name, number });
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name: <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        Phone: <input value={number} onChange={(e) => setNumber(e.target.value)} />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

PersonForm.propTypes = {
  addPerson: PropTypes.func.isRequired,
};

export default PersonForm;