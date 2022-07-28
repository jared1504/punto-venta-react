import { useNavigate } from 'react-router-dom'

const Product = ({ product }) => {
    const navigate = useNavigate();
    const { id, name, price_sale, stock } = product;
    return (
        <tr className='border hover:bg-gray-50'>
            <td className='text-xl text-center p-3'>{id}</td>
            <td className="text-xl text-center">{name}</td>
            <td className="text-xl text-center">{stock}</td>
            <td className='text-xl text-center p-3'>${price_sale}</td>
            <td>
                <button
                    className='mt-3  bg-green-800 hover:bg-green-600 block w-full text-white p-2 uppercase font-bold text-xs'
                    type='button'
                    onClick={() => navigate(`/products/${id}`)}
                >Ver</button>
                <button
                    className='mt-3 bg-blue-800 hover:bg-blue-600 block w-full text-white p-2 uppercase font-bold text-xs'
                    type='button'
                    onClick={() => navigate(`/products/edit/${id}`)}
                >Editar</button>
            </td>
        </tr>
    )
}
export default Product