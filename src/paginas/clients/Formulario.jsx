
import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Alerta from '../../components/Alerta';
import Spinner from '../../components/Spinner';



const Formulario = ({ client, cargando, clients, setClients }) => {

    const [respAPI, setRespAPI] = useState(true);
    const [idValido, setIdValido] = useState(true);
    const navigate = useNavigate();

    const newProductSchema = Yup.object().shape({
        name: Yup.string()
            .required('El nombre es obligatorio'),
        phone: Yup.number('El teléfono debe ser númerico')
            .required('El teléfono es obligatorio'),
        direction: Yup.string()
            .required('La dirección es obligatoria'),
    });

    const handleSubmit = async (valores) => {
        setRespAPI(true);
        try {

            if (client.id) {
                //editar cliente en la API
                const url = `${import.meta.env.VITE_API_URL}/clients/${client.id}`;
                const resp = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                //editar cliente en State
                const arrayClients = clients.map(cli => {
                    if (cli.id == client.id) {
                        //previene que se cambien el id del cliente
                        valores.id=cli.id;
                        return valores;
                    } else {
                        return cli;
                    }
                });

                setClients(arrayClients);
                navigate('/clients');//redireccionar

            } else {
                //guardar cliente en la API
                const url = `${import.meta.env.VITE_API_URL}/clients/store`;

                const resp = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const resul = await resp.json();
                const { success, message, data } = resul;

                if (success) {

                    //guardar cliente en State
                    valores.id = data.id
                    const arrayClients = [...clients.clients, valores];
                    clients.setClients(arrayClients);

                    navigate('/clients');//redireccionar
                } else {
                    setIdValido(false);
                    setRespAPI(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        cargando ? <Spinner /> : (
            <div className='bg-white mt-5 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
                <h1 className="text-gray-500 font-bold text-xl uppercase text-center">
                    {client?.name ? 'Actualizar Cliente' : 'Agregar Cliente'}
                </h1>
                {!respAPI && <Alerta>Hubo un error en los datos ingresados</Alerta>}
                <Formik
                    initialValues={{
                        id: client?.id ?? "",
                        name: client?.name ?? "",
                        phone: client?.phone ?? "",
                        direction: client?.direction ?? ""

                    }}
                    enableReinitialize={true}//poner valores existentes
                    onSubmit={async (values, { resetForm }) => {
                        await handleSubmit(values);
                        if (respAPI) {
                            resetForm();//limpiar formulario
                        }
                    }}
                    validationSchema={newProductSchema}
                >
                    {({ errors, touched }) => {

                        return (
                            <Form className='mt-10'>
                                {client?.name ? (
                                    <div className="mb-4">
                                        <label
                                            htmlFor="id"
                                            className='text-gray-800 '
                                        >Código:</label>


                                        <Field
                                            disabled
                                            id="id"
                                            type="number"
                                            className="mt-2 block w-full p-3 bg-gray-100"
                                            placeholder="Código del Cliente"
                                            name="id"
                                        />


                                        {!idValido && <Alerta>El código ya es usado por otro Cliente</Alerta>}
                                        {errors.id && touched.id ? (
                                            <Alerta>{errors.id}</Alerta>
                                        ) : null}
                                    </div>
                                ) : (
                                    ''
                                )}

                                <div className="mb-4">
                                    <label
                                        htmlFor="name"
                                        className='text-gray-800 '
                                    >Nombre:</label>
                                    <Field
                                        id="name"
                                        type="text"
                                        className="mt-2 block w-full p-3 bg-gray-100"
                                        placeholder="Nombre del Cliente"
                                        name="name"
                                    />
                                    {errors.name && touched.name ? (
                                        <Alerta>{errors.name}</Alerta>
                                    ) : null}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="phone"
                                        className='text-gray-800 '
                                    >Teléfono:</label>
                                    <Field
                                        id="phone"
                                        type="number"
                                        className="mt-2 block w-full p-3 bg-gray-100"
                                        placeholder="Teléfono del Cliente"
                                        name="phone"
                                    />
                                    {errors.phone && touched.phone ? (
                                        <Alerta>{errors.phone}</Alerta>
                                    ) : null}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="direction"
                                        className='text-gray-800 '
                                    >Dirección:</label>
                                    <Field
                                        id="direction"
                                        type="text"
                                        className="mt-2 block w-full p-3 bg-gray-100"
                                        placeholder="Dirección del Cliente"
                                        name="direction"
                                    />
                                    {errors.direction && touched.direction ? (
                                        <Alerta>{errors.direction}</Alerta>
                                    ) : null}
                                </div>

                                <input
                                    type="submit"
                                    value={client?.name ? 'Actualizar Cliente' : 'Agregar Cliente'}
                                    className="mt-5 w-full bg-blue-800 hover:bg-blue-600 cursor-pointer p-3 text-white uppercase font-bold text-lg"
                                />
                            </Form>

                        )

                    }}
                </Formik>
            </div>
        )
    )
}
Formulario.defaultProps = {
    client: {},
    cargando: false
}


export default Formulario