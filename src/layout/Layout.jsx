import { Outlet, Link, useLocation } from 'react-router-dom'

const Layout = () => {
    const location = useLocation();
    const urlActual = location.pathname;

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
                </nav>
            </div>
            <div className="md:w-3/4  md:h-screen md:overflow-scroll">
                <Outlet />
            </div>

        </div>
    )
}

export default Layout