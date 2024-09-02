import React from 'react';

const Persona = (props, deletePersona) => {
  return (
    <li>
      {props.name} {props.number}{' '}
      <button onClick={props.deletePersona}>Borrar</button>
    </li>
  );
};

export default Persona;
