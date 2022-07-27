import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import Spinner from '../../components/Spinner';

const ViewClient = ({ clients }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [client, setClient] = useState({});
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const getClientAPI = async () => {
            //Buscar en el State
            const auxCli = clients.filter(cli => cli.id == id);
            setClient(auxCli[0])

            setCargando(false);
        }
        getClientAPI();

    }, []);

    return (
        <div>
            {cargando ? <Spinner /> : (
                Object.keys(client).length == 0 ? <p>No hay resultado</p> : (
                    <>
                        <h1 className='font-black text-4xl text-blue-800'>Ver Cliente</h1>
                        <p className="mt-3">Información del cliente</p>

                        <p className="text-4xl text-gray-700 mt-10">
                            <span className=" uppercase font-bold ">Cliente: </span>
                            {client.name}
                        </p>
                    
                        <p className="text-2xl text-gray-600 mt-4">
                            <span className="text-gray-800 uppercase font-bold ">Código: </span>
                            {client.id}
                        </p>

                        <p className="text-2xl text-gray-600 mt-4">
                            <span className="text-gray-800 uppercase font-bold ">Teléfono: </span>
                            {client.phone}
                        </p>

                        <p className="text-2xl text-gray-600 mt-4">
                            <span className="text-gray-800 uppercase font-bold ">Dirección: </span>
                            {client.direction}
                        </p>


                        <button
                            className='mt-10 text-xl bg-blue-800 hover:bg-blue-600 block w-full text-white p-3 uppercase font-bold '
                            type='button'
                            onClick={() => navigate(`/clients/edit/${id}`)}
                        >Editar Cliente</button>
                    </>
                )
            )

            }



        </div>
    )
}
export default ViewClient