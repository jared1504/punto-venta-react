import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { formatDate, formatMoney } from '../../funtions/funtions';
import ProductSale from './ProductSale';

const ViewSale = ({ sales,user }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [sale, setSale] = useState({});
    const [shoppingCart, setShoppingCart] = useState([]);
    const { user_name, hour, total } = sale;
    const [fecha, setFecha] = useState('');
    useEffect(() => {//buscar la venta
        const getSale = async () => {
            const aux = sales.find(e => e.id == id);
            if (aux) {
                setSale(aux);
                setShoppingCart(aux.shoppingCart);
                setFecha(formatDate(aux.date));
            } else {//redireccionar si no se encontro la venta
                navigate('/sales');
            }
        }
        getSale();
    }, []);


    return (
        <>
            <h1 className='font-black text-4xl text-blue-800'>Detalle la Venta</h1>
            <p className="mt-3">Información de la venta</p>

            <p className="text-4xl text-gray-700 mt-5">
                <span className=" uppercase font-bold ">Número: </span>
                {id}
            </p>

            <p className="text-2xl text-gray-600 mt-4">
                <span className="text-gray-800 uppercase font-bold ">Fecha: </span>
                {fecha}
            </p>

            <p className="text-2xl text-gray-600 mt-4">
                <span className="text-gray-800 uppercase font-bold ">Hora: </span>
                {hour}
            </p>

            <p className="text-2xl text-gray-600 mt-4">
                <span className="text-gray-800 uppercase font-bold ">Cajero: </span>
                {user.name}
            </p>

            <p className="text-2xl text-gray-600 mt-4">
                <span className="text-gray-800 uppercase font-bold ">Total: </span>
                {formatMoney(total)}
            </p>

            <p className="text-3xl text-center text-gray-700 mt-10  uppercase font-bold">
                Detalle de los productos
            </p>

            <table className="w-full mt-5 table-auto shadow bg-white">
                <thead className="bg-blue-800 text-white">
                    <tr>
                        <th className="p-2">Cantidad</th>
                        <th className="p-2">Producto</th>
                        <th className="p-2">Precio</th>
                        <th className="p-2">Subtotal</th>
                    </tr>
                </thead>
                <tbody className="">
                    {shoppingCart.map((product) =>
                        <ProductSale
                            key={product.id}
                            product={product}
                        />
                    )}

                </tbody>
            </table>
        </>
    )
}

export default ViewSale