import React from 'react';
import Persona from './Persona';

const Personas = (props) => {
  return (
    <ul>
      {props.personas
        .filter((persona) =>
          persona.name.toUpperCase().includes(props.newSearch.toUpperCase())
        )
        .map((persona) => (
          <Persona
            key={persona.id}
            name={persona.name}
            number={persona.number}
            deletePersona={props.handleDeletePersona(persona.name, persona.id)}
          />
        ))}
    </ul>
  );
}
export default Personas;
