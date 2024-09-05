import React from "react"

const Paises = ({paisesMostrados, setPaisesMostrados}) => {
    if (paisesMostrados.length === 1) return null

    return paisesMostrados.map((pais) => (
        <div key={pais.name.official}>
            {pais.name.common}{' '}
            <button onClick={() => setPaisesMostrados([pais])}>Mostrar</button>

        </div>
    ))
}

export default Paises