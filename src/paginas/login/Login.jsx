import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Navigate, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Alerta from '../../components/Alerta';
import Spinner from '../../components/Spinner';

const Login = ({ setUser, setToken }) => {
    const [cargando, setCargando] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const newLoginSchema = Yup.object().shape({
        email: Yup.string()
            .required('El email es obligatorio'),
        password: Yup.string().
            required('El password es obligatorio')

    })
    const handleSubmit = async (valores) => {
        setCargando(true);

        const url = `${import.meta.env.VITE_API_URL}/login`;

        const resp = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(valores),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const resul = await resp.json();
        const { access_token, success, user } = resul;
        if (success) {
            setToken(access_token);
            setUser(user);
            navigate('/');//redireccionar
        } else {//mostra un mensaje por 5 seg
            setMessage('Los datos de acceso son incorrectos');
            setTimeout(() => {
                setMessage('');
            }, 5000);
            
        }
        setCargando(false);

    }
    return (
        <div className="bg-gray-100">
            <div className="bg-blue-800 p-5 text-white">
                <h1 className="text-5xl font-black ">Bienvenido</h1>
                <p className="my-5 text-xl">Ingresa tus credenciales para acceder al sistema</p>
            </div>
            <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
                <h1 className="text-gray-500 font-bold text-xl uppercase text-center">
                    Iniciar Sesión
                </h1>
                {message !== '' && <Alerta>{message}</Alerta>}
                <div >
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        enableReinitialize={true}//poner valores existentes
                        onSubmit={async (values, { resetForm }) => {
                            await handleSubmit(values);
                            //resetForm();//limpiar formulario
                        }}
                        validationSchema={newLoginSchema}
                    >

                        {({ errors, touched }) => {

                            return (


                                <Form className='mt-5'>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="email"
                                            className='text-gray-800 text-xl'
                                        >Email:</label>
                                        <Field
                                            id="email" name="email" type="email"
                                            placeholder="Tu Email"
                                            className="mt-2 block w-full p-3 bg-gray-200"
                                        />
                                        {(errors.email && touched.email) && <Alerta>{errors.email}</Alerta>}
                                    </div>

                                    <div className="mb-4">
                                        <label
                                            htmlFor="password"
                                            className='text-gray-800 text-xl'
                                        >Password:</label>
                                        <Field
                                            id="password" name="password" type="password"
                                            placeholder="Tu Password"
                                            className="mt-2 block w-full p-3 bg-gray-200"
                                        />
                                        {(errors.password && touched.password) && <Alerta>{errors.password}</Alerta>}
                                    </div>
                                    {cargando ? <Spinner /> :
                                        <input
                                            type="submit" value='Iniciar Sesión'
                                            className="mt-5 w-full bg-blue-800 hover:bg-blue-600 cursor-pointer p-3 text-white uppercase font-bold text-lg"
                                        />
                                    }

                                </Form>
                            )
                        }}
                    </Formik>

                </div>

            </div>
        </div>
    )
}

export default Login