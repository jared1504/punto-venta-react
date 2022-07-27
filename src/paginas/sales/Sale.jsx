import { Formik, Form, Field } from 'formik';
import { useEffect, useState } from 'react';
import Product from './Product';
import Alerta from '../../components/Alerta';
import Success from '../../components/Success';
import Spinner from '../../components/Spinner';

const Sale = ({ products, cargando, setCargando,shoppingCart, setShoppingCart }) => {
   
    const [carrito, setCarrito] = useState(false);
    const [total, setTotal] = useState(0);
    const [stockSuficiente, setStockSuficiente] = useState(true);
    const [stockServidor, setStockServidor] = useState(false);
    const [messageServidor, setMessageServidor] = useState('');

    useEffect(() => {//ver si hay producto en el carrito
        if (shoppingCart.length > 0) {
            setCarrito(true);
            let aux = 0;
            shoppingCart.forEach(pro => {
                aux += pro.subtotal;
            });
            setTotal(aux);
        } else {
            setCarrito(false);
        }

    }, [shoppingCart]);


    const handleSubmit = async ({ id }) => { //buscar producto
        const proVenta = products.find(pro => { return pro.id === id }); //encontrar el producto

        if (proVenta) {//se encontro el producto
            const { id, name, price_sale } = proVenta;
            const pro = shoppingCart.find(pro => { return pro.id === id }); //encontrar si el producto ya esta en el carrito

            if (pro) {//el producto ya esta en el carrito
                const amount = pro.amount + 1;

                if (amount <= proVenta.stock) {//hay stock suficiente
                    setStockSuficiente(true);
                    const subtotal = amount * price_sale;
                    const aux = shoppingCart.map(pro => {
                        if (pro.id == id) {
                            return { id, name, price_sale, amount, subtotal };
                        } else {
                            return pro;
                        }
                    });
                    setShoppingCart(aux);
                } else {//No hay stock suficiente
                    setStockSuficiente(false);
                }


            } else {//el producto no esta en el carrito
                const amount = 1;
                if (amount <= proVenta.stock) {//hay stock suficiente
                    setStockSuficiente(true);
                    const subtotal = amount * price_sale;
                    setShoppingCart([...shoppingCart, { id, name, price_sale, amount, subtotal }]);
                } else {//No hay stock suficiente
                    setStockSuficiente(false);
                }
            }
        } else {
            setStockSuficiente(true);
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

                const { success, message } = resul;
                setMessageServidor(message);
                setStockServidor(success);
                setTimeout(() => {
                    setStockServidor(false);
                    setMessageServidor('');
                }, 5000);

                if (success) {//venta realizada con exito

                    //disminuir stock de los productos
                    shoppingCart.map(pro => {
                        let aux = products.find(e => e.id === pro.id);
                        aux.stock = aux.stock - pro.amount
                    })

                    //Limpiar carrito 
                    setShoppingCart([]);
                    setCarrito(false);
                }
            } catch (error) {
                console.log(error);
            }
            setCargando(false);//quitar Spinner
        }
    }

    return (
        cargando ? <Spinner /> : (
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
                                        id="id"
                                        type="number"
                                        className="block w-full p-3 bg-gray-100 text-lg text-center"
                                        placeholder="Código del Producto"
                                        name="id"
                                    />

                                    <input
                                        type="submit"
                                        value='Agregar Producto'
                                        className=" w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg cursor-pointer hover:bg-blue-600"
                                    />
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
                {/*Fin Buscar producto*/}

                {/*Mostrar mensaje del servidor*/}
                {(stockServidor && messageServidor !== '') ? (
                    <Success>{messageServidor}</Success>
                ) : (
                    (!stockServidor && messageServidor !== '') && <Alerta>{messageServidor}</Alerta>
                )}

                {!stockSuficiente && <Alerta>No Hay Stock suficiente</Alerta>}

                {/*Carrito de compra */}
                {carrito && (

                    <div className='mt-10'>
                        <p className="text-6xl mb-5 text-right">Total: <span className="font-bold">${total}</span></p>

                        <Formik
                            initialValues={{ id: '' }}
                            onSubmit={async () => { await handleSale(); }}>
                            {() => {
                                return (
                                    <Form >
                                        <input
                                            type="submit" value='Generar Venta'
                                            className=" w-full bg-blue-800 py-5 text-white uppercase font-bold text-3xl cursor-pointer hover:bg-blue-600"
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
                                {shoppingCart.map(product => (
                                    <Product
                                        key={product.id}
                                        product={product}
                                        shoppingCart={shoppingCart}
                                        setShoppingCart={setShoppingCart}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
                }
                {/*Fin carrito de compra */}
            </>
        )
    )
}

export default Sale