import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Paises from './components/Paises'
import DatoPais from './components/DatoPais'


function App() {
  const [query, setQuery] = useState('');
  const [paises, setPaises] = useState([]);
  const [paisesMostrados, setPaisesMostrados] = useState([]);


  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setPaises(response.data);
    })
  }, [])

  const handleQueryChange = (event) => {
    const search = event.target.value;
    setQuery(search);
    setPaisesMostrados(
      paises.filter((pais) =>
        pais.name.common.toLowerCase().includes(search.toLowerCase())
      )
    )
  }

  return (
    <div>
      <div>
        Buscar Paises <input value={query} onChange={handleQueryChange} />
      </div>  
      {paisesMostrados.length === 1 ? (
        <DatoPais pais={paisesMostrados[0]} />
      ) : null}
      {paisesMostrados.length > 10 ? (
        <div>Demasiadas coincidencias, especifica más</div>
      ) : (
        <Paises
          paisesMostrados={paisesMostrados}
          setPaisesMostrados={setPaisesMostrados}
        />
      )}
    </div>
  )
}

export default App
