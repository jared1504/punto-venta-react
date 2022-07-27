import React from 'react'
import Formulario from './Formulario'

const NewClient = (clients, setClients,  setAuxClients) => {
    return (
        <div >
            <h1 className='font-black text-4xl text-blue-900'>Nuevo Cliente</h1>
            <p className="mt-3 text-lg">Llena los siguientes campos para registrar un Cliente</p>
            <Formulario
                clients={clients}
                setClients={setClients}
                setAuxClients={setAuxClients}
            />

        </div>
    )
}

export default NewClient