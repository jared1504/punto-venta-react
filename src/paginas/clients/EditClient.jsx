import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Formulario from './Formulario';
import { Navigate, useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';


const EditClient = ({ token, clients, setClients }) => {

    const { id } = useParams();
    const [client, setClient] = useState({});
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();

    const [auxClients, setAuxClients] = useState([]);

    useEffect(() => {
        setAuxClients(clients);
    }, []);


    useEffect(() => {
        const obtenerClientAPI = async () => {
            try {
                //Buscar en el State
                const auxCli = clients.filter(cli => cli.id == id);
                setClient(auxCli[0])

                /*
                //Buscar en la API
                const url = `${import.meta.env.VITE_API_URL}/products/${id}`;
                const resp = await fetch(url);
                const resul = await resp.json();
                const { data } = resul;
                setProduct(data);
                */

            } catch (error) {
                console.log(error);
            }
            setCargando(false);
        }
        obtenerClientAPI();
    }, []);

    return (
        <>{cargando ?
            <Spinner />
            :
            <>
                <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
                <p className="mt-3">Edita los datos de un Cliente</p>
                {client?.name ?

                    < Formulario
                        token={token}
                        client={client}
                        cargando={cargando}
                        clients={clients}
                        setClients={setClients}
                        auxClients={auxClients}
                        setAuxClients={setAuxClients}
                    />

                    : navigate('/clients')}
            </>
        }
        </>
    )
}
export default EditClient