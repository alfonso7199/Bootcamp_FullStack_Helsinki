import React from 'react'
const FiltrarPersonas = ({ value, onChange }) => {
    return (
      <div>
        Filtrar nombre  <input value={value} onChange={onChange} />
      </div>
    )
  }
  
  export default FiltrarPersonas
  