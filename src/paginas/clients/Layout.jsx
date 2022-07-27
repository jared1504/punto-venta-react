import { Outlet, Link, useLocation } from 'react-router-dom'

const Layout = () => {
    const location = useLocation();
    const urlActual = location.pathname;
    return (
        <div>
            <div className="bg-blue-800 grid grid-cols-2 p-2">
                <Link
                    to="/clients">
                    <h2
                        //
                        className={`${urlActual === '/clients' ? ' bg-blue-500 text-white' : 'text-white'} hover:text-blue-300  text-2xl font-bold text-center  py-2 rounded-lg`}
                    >
                        Ver Clientes
                    </h2>
                </Link>
                <Link
                    to="/clients/new">
                    <h2 className={`${urlActual === '/clients/new' ? ' bg-blue-500 text-white' : 'text-white'} hover:text-blue-300 text-2xl font-bold text-center  py-2 rounded-lg`}
                    >
                        Agregar Cliente
                    </h2>
                </Link>

            </div>
            <div className='mt-5 mx-5 '><Outlet /></div>
        </div>
    )
}

export default Layout