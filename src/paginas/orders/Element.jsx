import { useNavigate } from 'react-router-dom'

const Element = ({ order }) => {
    const navigate = useNavigate();
    const { id, total, hour } = order;
    return (
        <tr className='border hover:bg-gray-50'>
            <td className='text-xl text-center p-3'>{id}</td>
            <td className="text-xl text-center">{hour}</td>
            <td className="text-xl text-center">${total}</td>
            <td>
                <button
                    className='mt-3  bg-green-800 hover:bg-green-600 block w-full text-white py-2 uppercase font-bold text-xs'
                    type='button'
                    onClick={() => navigate(`/orders/${id}`)}
                >Ver Detalles</button>
            </td>
        </tr>
    )
}

export default Element
