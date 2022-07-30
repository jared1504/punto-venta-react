import { Formik, Form, Field } from 'formik';
import { useEffect, useState } from 'react';
import Alerta from '../../components/Alerta';
import Success from '../../components/Success';
import Spinner from '../../components/Spinner';
import { formatMoney } from '../../funtions/funtions';
import Product from './Product';



const NewOrder = ({ token, products, orders, setOrders, auxOrders, setAuxOrders, orderCart, setOrderCart }) => {
  const [cargando, setCargando] = useState(false);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState('');
  const [messageServidor, setMessageServidor] = useState('');
  const [productFind, setProductFind] = useState(false);
  const [product, setProduct] = useState({});
  const [messageMin, setMessageMin] = useState('');

  const [proAux, setProAux] = useState({});

  useEffect(() => {
    let a = 0;
    orderCart.forEach(e => a += e.subtotal);
    setTotal(a);
  }, [orderCart]);



  const handleSubmit = ({ codigo }) => { //buscar producto
    const pro = products.find(e => e.id === codigo); //encontrar el producto

    if (pro) {//se encontro el producto
      setProduct(pro);
      setProductFind(true);
      const { id } = pro;
      const aux = orderCart.find(e => e.id === id); //encontrar si el producto ya esta en el carrito
      setProAux(aux);

    } else {//no se encontro el producto
      setMessage('');
      setProduct({});
      setProductFind(false);
      setMessage('El producto no está registrado');
      setTimeout(() => {
        setProductFind(true);
        setMessage('');
      }, 3000);
    }
  }

  const addProduct = ({ amount }) => { //Generar pedido
    if (amount > 0) {//verificar que hay cantidad
      setMessageMin('');
      const aux = orderCart.filter(e => e.id !== product.id);

      const { id, name, price_order } = product;
      const subtotal = amount * price_order;
      setOrderCart([...aux, { id, name, price_order, amount, subtotal }]);//agregar producto al carrito
      setProductFind(false);

    } else {//mostrar mensaje de agregar minimo una pieza
      setMessageMin('cantidad no válida');
      setTimeout(() => {
        setMessageMin('');
      }, 2000);

    }

  }

  const handleOrder = async () => { //Generar Pedido
    if (orderCart.length) {//hay productos en el carrito
      const user_id = 1;//CAMBIAR CUANDO YA HAYA AUTENTICACION
      setCargando(true);//mostrar Spinner de carga
      try {
        const url = `${import.meta.env.VITE_API_URL}/orders/store`;
        const resp = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({ orderCart }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const resul = await resp.json();
        let { success, message, order } = resul;

        if (success) {//pedido realizado con exito
          //aumentar stock de los productos
          setMessageServidor(message);
          orderCart.map(pro => {
            let aux = products.find(e => e.id === pro.id);
            aux.stock = aux.stock + pro.amount
          });
          //agregar el carrito de pedido
          order.orderCart = orderCart;
          const aux = [...orders, order];
          setOrders(aux);//agregar el pedido al state
          setAuxOrders([...auxOrders, aux]);

          //Limpiar carrito 
          setOrderCart([]);
        }

        setTimeout(() => {//mostrar mensaje por 3 segundos
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
      <h1 className='font-black text-4xl text-blue-900'>Nuevo Pedido</h1>
      <p className="mt-3">Genera un Pedido</p>

      {/*Buscar producto */}
      <Formik
        initialValues={{ codigo: '' }}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();//limpiar formulario
        }}
      >
        {() => {
          return (
            <Form className='mt-2 mb-2 '>
              <div className=" grid grid-cols-3 gap-5">
                <label
                  htmlFor="codigo"
                  className='p-3 text-bold text-gray-800 text-lg text-right '
                >Buscar Producto:</label>

                <Field
                  id="codigo" name="codigo" type="number"
                  placeholder="Código del Producto"
                  className="block w-full p-3 bg-gray-100 text-lg text-center"
                />

                <input
                  type="submit" value='Buscar Producto'
                  className=" w-full bg-blue-800  p-3 text-white uppercase font-bold text-lg cursor-pointer hover:bg-blue-600"
                />
              </div>
            </Form>
          )
        }}
      </Formik>
      {/*Fin Buscar producto*/}


      {/*Agregar producto */}
      {productFind ?
        <Formik
          initialValues={{ amount: proAux?.amount ?? 0 }}
          onSubmit={async (values, { resetForm }) => {
            addProduct(values);
            resetForm();//limpiar formulario
          }}
        >
          {() => {
            return (
              <Form className='mt-2 mb-2 '>
                <div className=" grid grid-cols-3 gap-5">
                  <label
                    htmlFor="amount"
                    className='p-3 text-bold text-gray-800 text-lg text-right '
                  >Cantidad:</label>

                  <Field
                    id="amount" name="amount" type="number"
                    placeholder="Cantidad del Producto"
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
        : message !== '' &&
        <Alerta>{message}</Alerta>
      }
      {/*Fin Agregar producto*/}

      {messageMin !== '' && <Alerta>{messageMin}</Alerta>}

      {/*Mostrar mensaje del servidor*/}
      {messageServidor !== '' &&
        <Success>{messageServidor}</Success>//mensaje de Pedido Creado
      }


      {/*Carrito de pedido -> mostrar si hay productos agregados*/}
      {orderCart.length > 0 &&
        <div className='mt-10'>
          <p className="text-6xl mb-5 text-right">Total: <span className="font-bold">{formatMoney(total)}</span></p>
          {cargando ? <Spinner /> :
            <>
              <Formik
                initialValues={{ id: '' }}
                onSubmit={async () => { await handleOrder(); }}>
                {() => {
                  return (
                    <Form >
                      <input
                        type="submit" value='Generar Pedido'
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

                  {orderCart.map(product =>
                    <Product
                      key={product.id}
                      product={product}
                      orderCart={orderCart}
                      setOrderCart={setOrderCart}
                    />
                  )}
                </tbody>
              </table>
            </>
          }
        </div>
      }
      {/*Fin carrito de pedido */}
    </>
  )
}

export default NewOrder