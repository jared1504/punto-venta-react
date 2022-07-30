const Product = ({ product, orderCart, setOrderCart }) => {

    const handleDeleteProduct = id => {
        const aux = orderCart.filter(e => e.id !== id);
        setOrderCart(aux);
    }

    const { id, amount, name, price_order, subtotal } = product;

    return (
        <tr className='border hover:bg-gray-50'>
            <td className='text-center p-3 text-xl'>{amount}</td>
            <td className="text-center text-xl">{name}</td>
            <td className="text-center text-xl">${price_order}</td>
            <td className='text-center text-xl p-3'>${subtotal} </td>
            <td>
                <button
                    className='px-2 bg-red-800 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs'
                    type='button'
                    onClick={() => handleDeleteProduct(id)}
                >Eliminar</button>
            </td>
        </tr>
    )
}

export default Product