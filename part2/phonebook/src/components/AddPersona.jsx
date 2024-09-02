import React from 'react';

const AddPersona = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      Nombre: 
      <input value={props.newName} onChange={props.handleNameChange} />
      <br />
      Número:
      <input value={props.newNumber} onChange={props.handleNumberChange} />
      <br />
      <button type="submit">Añadir</button>
    </form>
  );
};

export default AddPersona;
