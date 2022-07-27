import { useState, useEffect } from 'react'
import Spinner from '../../components/Spinner';
import Client from './Client';
import { Formik, Form, Field } from 'formik';
import Alerta from '../../components/Alerta';

const Clients = ({
  clients,
  cargando
}) => {

  const [nameClient, setNameClient] = useState('');
  const [respAPI, setRespAPI] = useState(false);
  const [existeClient, setExisteClient] = useState(true);
  const [auxClients, setAuxClients] = useState([]);

  useEffect(() => {
    setAuxClients(clients);
  }, []);

  const handleSubmit = async ({ name }) => {
    setRespAPI(false);

    //Buscar cliente por su id
    setNameClient(name);


    //filtrar si contienen la palabra ingresada
    const filterArray = clients.filter((cli) => {
      if (cli.name.toUpperCase().includes(nameClient.toUpperCase())) {
        return cli;
      }
    });
    if (filterArray.length > 0) {
      setAuxClients(filterArray);
      setExisteClient(true);
    } else {
      setAuxClients(clients);
      setExisteClient(false);
    }

  }

  return (
    <>{cargando ? <Spinner /> :
      (<>
        <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
        <p className="mt-3">Administra tus clientes</p>

        <Formik
          initialValues={{
            name: ''
          }}
          onSubmit={async (values, { resetForm }) => {
            await handleSubmit(values);
          }}
        >
          {({ errors, touched }) => {

            return (
              <Form className='mt-2 mb-2 '>
                <div className=" grid grid-cols-3 gap-5">
                  <label
                    htmlFor="name"
                    className='p-3 text-bold text-gray-800 text-lg text-right '
                  >Buscar Cliente:</label>
                  <Field
                    id="name"
                    type="text"
                    className="block w-full p-3 bg-gray-100 text-lg"
                    placeholder="Nombre del Cliente"
                    name="name"
                  />

                  <input
                    type="submit"
                    value='Buscar Cliente'
                    className=" w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
                  />
                </div>
                {existeClient ? '' : (
                  <Alerta>No se encontraron coincidencias de: {nameClient}</Alerta>
                )}
              </Form>

            )

          }}
        </Formik>

        <table className="w-full mt-5 table-auto shadow bg-white">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Código</th>
              <th className="p-2">Nombre</th>
              <th className="p-2">Teléfono</th>
              <th className="p-2">Dirección</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="">
            {auxClients.map(client => (
              <Client
                key={client.id}
                client={client}
              />
            ))}

          </tbody>
        </table>
      </>
      )}

    </>
  )
}

export default Clients