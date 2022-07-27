import { useNavigate } from 'react-router-dom'

const Product = ({ product }) => {
    const navigate = useNavigate();
    const { id, name, price_sale, price_order, stock } = product;
    return (
        <tr className='border hover:bg-gray-50'>
            <td className='text-center p-3'>{id}</td>
            <td className="text-center">{name}</td>
            <td className="text-center">{stock}</td>
            <td className='text-center p-3'>
                <p className=''><span className="text-gray-800 uppercase font-bold">Compra: </span>${price_order}</p>
                <p className=''><span className="text-gray-800 uppercase font-bold">Venta: </span>${price_sale}</p>

            </td>
            
            <td>
                <button
                    className='mt-3 bg-green-800 hover:bg-green-600 block w-full text-white p-2 uppercase font-bold text-xs'
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