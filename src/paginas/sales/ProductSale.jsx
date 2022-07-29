import React, { useEffect } from 'react'

const ProductSale = ({ product }) => {
    const { amount, name, price_sale } = product;
    const subtotal = amount * price_sale;
    return (
        <tr className='border hover:bg-gray-50'>
            <td className='text-xl text-center p-3'>{amount}</td>
            <td className="text-xl text-center">{name}</td>
            <td className="text-xl text-center">${price_sale}</td>
            <td className="text-xl text-center">${subtotal}</td>
        </tr>
    )
}

export default ProductSale