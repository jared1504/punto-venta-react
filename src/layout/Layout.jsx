import { Outlet, Link, useLocation } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';

const Layout = ({ user, token, setUser, setToken, setProducts, setSales, setOrders, setClients }) => {
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const urlActual = location.pathname;

    useEffect(() => {
        if (!user.name) {
            navigate('/login');//redireccionar
        }
    }, [])

    const Logout = async () => {
        setCargando(true);
        try {
            const url = `${import.meta.env.VITE_API_URL}/logout`;
            const resp = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const resul = await resp.json();
            const { success } = resul;
            if (success) {//reiniciar valores
                setProducts([]);
                setSales([]);
                setOrders([]);
                setClients([]);
                setUser({});
                setToken('');
                navigate('/login');//redireccionar
            }
        } catch (error) {

        }
    }

    return (
        <div className="md:flex md:min-h-screen">
            <div className="md:w-1/4 bg-blue-800 px-5 py-10 ">
                <Link
                    to="/">
                    <h2 className="text-4xl font-black text-center text-white">Tienda</h2>
                </Link>
                <nav className="mt-10">
                    <Link
                        to="/"
                        className={`${urlActual == '/' ? 'text-white bg-blue-500 hover:text-white' : 'text-white'} 
                        ${urlActual == '/sales' ? 'text-white bg-blue-500 hover:text-white' : 'text-white'}
                         font-bold text-white text-2xl block mt-2 hover:text-blue-300 p-2 rounded-lg  text-center`}
                    >Ventas</Link>

                    <Link
                        to="/products"
                        className={`${urlActual == '/products' ? 'text-white bg-blue-500 hover:text-white' : 'text-white'} 
                        ${urlActual == '/products/new' ? 'text-white bg-blue-500 hover:text-white' : 'text-white'}
                         font-bold text-white text-2xl block mt-2 hover:text-blue-300 p-2 rounded-lg  text-center`}
                    >Productos</Link>

                    <Link
                        to="/clients"
                        className={`${urlActual == '/clients' ? 'text-white bg-blue-500 hover:text-white' : 'text-white'} 
                        ${urlActual == '/clients/new' ? 'text-white bg-blue-500 hover:text-white' : 'text-white'}
                         font-bold text-white text-2xl block mt-2 hover:text-blue-300 p-2 rounded-lg  text-center`}
                    >Clientes</Link>

                    <Link
                        to="/orders/new"
                        className={`${urlActual == '/orders/new' ? 'text-white bg-blue-500 hover:text-white' : 'text-white'} 
                        ${urlActual == '/orders' ? 'text-white bg-blue-500 hover:text-white' : 'text-white'}
                         font-bold text-white text-2xl block mt-2 hover:text-blue-300 p-2 rounded-lg  text-center`}
                    >Pedidos</Link>
                    <h2 className="text-2xl md:mt-20 mt-5  text-center text-white">Hola {user.name}</h2>
                    {cargando ?
                        <div className="bg-red-600 rounded-lg p-3 mt-5">
                            <Spinner />
                            <p className="  mt-5 text-white uppercase font-bold text-center text-lg">Cerrando Sesión</p>
                        </div>
                        :
                        <Formik
                            initialValues={{}}
                            onSubmit={() => Logout()}
                        >
                            {() =>
                                <Form>
                                    <input
                                        type="submit" value='Cerrar Sesión'
                                        className="mt-5 w-full rounded-lg bg-red-600 hover:bg-red-800 cursor-pointer p-3 text-white uppercase font-bold text-lg"
                                    />
                                </Form>
                            }
                        </Formik>
                    }
                </nav>
            </div>
            <div className="md:w-3/4  md:h-screen md:overflow-scroll">
                <Outlet />
            </div>

        </div>
    )
}

export default Layout