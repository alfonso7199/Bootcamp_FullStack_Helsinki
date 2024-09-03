import { useState, useEffect } from 'react'
import FiltrarPersonas from './components/FiltrarPersonas'
import AddPersona from './components/AddPersona'
import Personas from './components/Personas'
import Persona from './components/Persona'
import personDB from './services/personDB'
import Notification from './components/Notification';


const App = () => {
    const [personas, setPersonas] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newSearch, setNewSearch] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [notificationType, setNotificationType] = useState(null);


    useEffect(() => {
        personDB.getAll().then((response) => {
            console.log('Datos recibidos:', response);
            setPersonas(response)
        })
    }, [])

    const handleDeletePersona = (name, id) => {
        return () => {
            if (window.confirm(`Delete ${name}?`)) {
                personDB.deletePersona(id)
                    .then(() => {
                        setPersonas(personas.filter(persona => persona.id !== id))
                        setNotificationType('success');
                        setErrorMessage(`Eliminado ${name}`)
                        setNewName('')
                        setNewNumber('')
                    })
                    .catch((error) => {
                        setNotificationType('error');
                        setPersonas(personas.filter(persona => persona.id !== id))
                        setErrorMessage(`Informacion de ${name} ya ha sido eliminado del servidor`)
                    })
                setTimeout(() => {
                    setErrorMessage(null)
                    setNotificationType(null);
                }, 3000)
            }
        }

    }

    const addName = (event) => {
        event.preventDefault()
        const personaObject = {
            name: newName,
            number: newNumber,
        }
        if (personas.filter((persona) => persona.name === personaObject.name).length > 0) {
            if (window.confirm(`${personaObject.name} ya está en la lista, actualizar número?`)
            ) {
                const previousPersona = personas.find((n) => n.name === newName);
                personDB
                    .update(previousPersona.id, { ...previousPersona, number: newNumber })
                    .then((updatedPersona) => {
                        setPersonas(
                            personas.map((n) => (n.name === newName ? updatedPersona : n))
                        )
                        setNotificationType('success');
                        setErrorMessage(`Cambiado el número de ${personaObject.name}`);
                    })
                    .catch((error) => {
                        console.log(error);
                        setNotificationType('error');
                        setErrorMessage(`Error: ${personaObject.name} ya ha sido eliminado del servidor.`);
                    })
            }
        } else {
            personDB
                .create(personaObject)
                .then((newPersona) => {
                    setPersonas(personas.concat(newPersona));
                    setNotificationType('success');
                    setErrorMessage(`Se añadió a ${personaObject.name}`);
                })
                .catch((error) => {
                    setNotificationType('error');
                    setErrorMessage(`${error.response.data.error}`);
                    console.log(error.response.data);
                });
        }
        setNewName('');
        setNewNumber('');
        setTimeout(() => {
            setErrorMessage(null);
            setNotificationType(null);
        }, 3000);

    };
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleSearchChange = (event) => {
        setNewSearch(event.target.value);
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={errorMessage} type={notificationType} />
            <FiltrarPersonas value={newSearch} onChange={handleSearchChange} />
            <h3>Añadir nuevo contacto</h3>
            <AddPersona
                onSubmit={addName}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Personas
                personas={personas}
                newSearch={newSearch}
                handleDeletePersona={handleDeletePersona} />
        </div>
    )
}

export default App