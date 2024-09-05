import DatosMeteo from './DatosMeteo'
import React from 'react'

const DatoPais = ({pais}) => {
    return (
        <div>
            <h1>{pais.name.common}</h1>
            <div>Capital: {pais.capital}</div>
            <div>Area: {pais.area} km²</div>
            <h3>Idiomas</h3>
            <ul>
                {Object.values(pais.languages).map((language) => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={pais.flags.png} alt={`${pais.name.common} bandera`} />
            <DatosMeteo ciudad={pais.capital} />
        </div>
    )
} 

export default DatoPais