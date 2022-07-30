const ProductOrder = ({product}) => {
    const { amount, name, price_order } = product;
    const subtotal = amount * price_order;
    return (
        <tr className='border hover:bg-gray-50'>
            <td className='text-xl text-center p-3'>{amount}</td>
            <td className="text-xl text-center">{name}</td>
            <td className="text-xl text-center">${price_order}</td>
            <td className="text-xl text-center">${subtotal}</td>
        </tr>
    )
}

export default ProductOrder
