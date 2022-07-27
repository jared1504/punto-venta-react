import { useNavigate } from 'react-router-dom'

const Client = ({ client }) => {
    const navigate = useNavigate();
    const { id, name,phone,direction} = client;
    return (
        <tr className='border hover:bg-gray-50'>
            <td className='text-center p-3'>{id}</td>
            <td className="text-center">{name}</td>
            <td className="text-center">{phone}</td>
            <td className="text-center">{direction}</td>
            <td>
                <button
                    className='mt-3 bg-green-800 hover:bg-green-600 block w-full text-white p-2 uppercase font-bold text-xs'
                    type='button'
                    onClick={() => navigate(`/clients/${id}`)}
                >Ver</button>
                <button
                    className='mt-3 bg-blue-800 hover:bg-blue-600 block w-full text-white p-2 uppercase font-bold text-xs'
                    type='button'
                    onClick={() => navigate(`/clients/edit/${id}`)}
                >Editar</button>
            </td>

        </tr>
    )
}


export default Client