import { Formik, Form, Field } from 'formik';
import { useEffect, useState } from 'react';
import Product from './Product';
import Alerta from '../../components/Alerta';
import Success from '../../components/Success';
import Spinner from '../../components/Spinner';

const NewSale = ({ products, cargando, setCargando, shoppingCart, setShoppingCart, sales, setSales, auxSales, setAuxSales }) => {

    const [carrito, setCarrito] = useState(false);
    const [total, setTotal] = useState(0);
    const [stockSuficiente, setStockSuficiente] = useState(true);
    const [productFind, setProductFind] = useState(true);
    const [stockServidor, setStockServidor] = useState(false);
    const [messageServidor, setMessageServidor] = useState('');

    useEffect(() => {//mostrar carrito de compras
        if (shoppingCart.length) {//hay productos en el carrito
            setCarrito(true);
            let aux = 0;
            shoppingCart.forEach(pro => aux += pro.subtotal);
            setTotal(aux);
        } else {//No hay productos en el carrito
            setCarrito(false);
        }
    }, [shoppingCart]);

    const handleSubmit = async ({ id }) => { //buscar producto
        const proVenta = products.find(e => e.id === id); //encontrar el producto

        if (proVenta) {//se encontro el producto
            const { id, name, price_sale } = proVenta;
            const pro = shoppingCart.find(e => e.id === id); //encontrar si el producto ya esta en el carrito

            if (pro) {//el producto ya esta en el carrito
                const amount = pro.amount + 1;
                if (amount <= proVenta.stock) {//hay stock suficiente
                    setStockSuficiente(true);
                    pro.amount++;
                    pro.subtotal = pro.amount * pro.price_sale;
                    setShoppingCart(shoppingCart.map(pro => pro));//actualizar producto en el carrito
                } else {//No hay stock suficiente
                    setStockSuficiente(false);
                    setTimeout(() => {
                        setStockSuficiente(true);
                    }, 3000);
                }

            } else {//el producto no esta en el carrito
                const amount = 1;
                if (amount <= proVenta.stock) {//hay stock suficiente
                    setStockSuficiente(true);
                    const subtotal = amount * price_sale;
                    setShoppingCart([...shoppingCart, { id, name, price_sale, amount, subtotal }]);//agregar producto al carrito
                } else {//No hay stock suficiente
                    setStockSuficiente(false);
                }
            }
        } else {//no se encontro el producto
            setProductFind(false);//mostrar mensaje
            setTimeout(() => {
                setProductFind(true);
            }, 3000);
        }
    }

    const handleSale = async () => { //Generar Venta
        setStockSuficiente(true);
        if (shoppingCart.length) {//hay productos en el carrito
            const user_id = 1;//CAMBIAR CUANDO YA HAYA AUTENTICACION
            const valores = { user_id, shoppingCart };
            setCargando(true);//mostrar Spinner de carga
            try {
                const url = `${import.meta.env.VITE_API_URL}/sales/store`;
                const resp = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const resul = await resp.json();
                let { success, message, sale } = resul;
                setMessageServidor(message);
                setStockServidor(success);


                if (success) {//venta realizada con exito
                    //disminuir stock de los productos
                    shoppingCart.map(pro => {
                        let aux = products.find(e => e.id === pro.id);
                        aux.stock = aux.stock - pro.amount
                    });
                    //modificar la fecha que manda el servidor
                    sale.created_at = sale.created_at.substr(0, 10);
                    //agregar el carrito de compras 
                    sale.shoppingCart = shoppingCart;
                    const aux = [...sales, sale];
                    setSales(aux);//agregar la venta al state
                    setAuxSales([...auxSales, aux]);

                    //Limpiar carrito 
                    setShoppingCart([]);
                    setCarrito(false);
                }

                setTimeout(() => {//mostrar mensaje por 3 segundos
                    setStockServidor(false);
                    setMessageServidor('');
                }, 3000);

            } catch (error) {
                console.log(error);
            }
            setCargando(false);//quitar Spinner
        }
    }

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Nueva Venta</h1>
            <p className="mt-3">Genera un Venta</p>

            {/*Buscar producto */}
            <Formik
                initialValues={{ id: '' }}
                onSubmit={async (values, { resetForm }) => {
                    await handleSubmit(values);
                    resetForm();//limpiar formulario
                }}
            >
                {() => {
                    return (
                        <Form className='mt-2 mb-2 '>
                            <div className=" grid grid-cols-3 gap-5">
                                <label
                                    htmlFor="id"
                                    className='p-3 text-bold text-gray-800 text-lg text-right '
                                >Agregar Producto:</label>

                                <Field
                                    id="id" name="id" type="number"
                                    placeholder="Código del Producto"
                                    className="block w-full p-3 bg-gray-100 text-lg text-center"
                                />

                                <input
                                    type="submit" value='Agregar Producto'
                                    className=" w-full bg-blue-800  p-3 text-white uppercase font-bold text-lg cursor-pointer hover:bg-blue-600"
                                />
                            </div>
                        </Form>
                    )
                }}
            </Formik>
            {/*Fin Buscar producto*/}

            {/*Mostrar mensaje del servidor*/}
            {stockServidor && messageServidor !== '' ?
                <Success>{messageServidor}</Success>//mensaje de venta creada
                :
                !stockServidor && messageServidor !== '' && <Alerta>{messageServidor}</Alerta>//no hay stock en el servidor
            }

            {!stockSuficiente && <Alerta>No Hay Stock suficiente del producto</Alerta>}
            {!productFind && <Alerta>El producto no está registrado</Alerta>}

            {/*Carrito de compra */}
            {carrito && //verificar que hay producto en el carrito y mostrarlo
                <div className='mt-10'>
                    <p className="text-6xl mb-5 text-right">Total: <span className="font-bold">${total}</span></p>
                    {cargando ? <Spinner /> : (
                        <>
                            <Formik
                                initialValues={{ id: '' }}
                                onSubmit={async () => { await handleSale(); }}>
                                {() => {
                                    return (
                                        <Form >
                                            <input
                                                type="submit" value='Generar Venta'
                                                className=" w-full bg-green-600 py-5 text-white uppercase font-bold text-3xl cursor-pointer hover:bg-green-800"
                                            />
                                        </Form>
                                    )

                                }}
                            </Formik>

                            <table className="w-full mt-5 table-auto shadow bg-white">
                                <thead className="bg-blue-800 text-white">
                                    <tr>
                                        <th className="p-2">Cantidad</th>
                                        <th className="p-2">Nombre</th>
                                        <th className="p-2">Precio</th>
                                        <th className="p-2">Subtotal</th>
                                        <th className="p-2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {shoppingCart.map(product =>
                                        <Product
                                            key={product.id}
                                            product={product}
                                            shoppingCart={shoppingCart}
                                            setShoppingCart={setShoppingCart}
                                        />
                                    )}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            }
            {/*Fin carrito de compra */}
        </>
    )
}

export default NewSale