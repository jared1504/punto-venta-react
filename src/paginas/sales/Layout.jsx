import { Outlet, Link, useLocation } from 'react-router-dom'

const Layout = () => {
    const location = useLocation();
    const urlActual = location.pathname;
    return (
        <div>
            <div className="bg-blue-800 grid grid-cols-2 gap-5 p-5">
                
                <Link
                    to="/">
                    <h2 className={`${urlActual === '/' ? ' bg-blue-500 text-white' : 'text-white'} hover:text-blue-300  text-2xl font-bold text-center  py-2 rounded-lg`}
                    >Nueva Venta</h2>
                </Link>

                <Link
                    to="/sales">
                    <h2 className={`${urlActual === '/sales' ? ' bg-blue-500 text-white' : 'text-white'} hover:text-blue-300  text-2xl font-bold text-center  py-2 rounded-lg`}
                    >Ver Ventas</h2>
                </Link>

            </div>
            <div className='mt-5 mx-5 '><Outlet /></div>
        </div>
    )
}

export default Layout