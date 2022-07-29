import { useState, useEffect } from 'react'
import Product from './Product';
import { Formik, Form, Field } from 'formik';
import Alerta from '../../components/Alerta';

const Products = ({ products, auxProducts, setAuxProducts }) => {


  const [existeProducto, setExisteProducto] = useState(true);

  useEffect(() => {
    setAuxProducts(products);
  }, []);

  const handleSubmit = async ({ id }) => {

    const pro = products.find(aux => { return aux.id === id }); //encontrar el producto

    if (pro) {//se encontro el producto
      setAuxProducts([pro]);
      setExisteProducto(true);
    } else {
      setAuxProducts(products);
      setExisteProducto(false);
    }
  }

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Productos</h1>
      <p className="mt-3">Administra tus productos</p>

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

                <label htmlFor="id" className='p-3 text-bold text-gray-800 text-lg text-right'>Buscar Producto:</label>
                <Field
                  id="id" type="number" placeholder="Código del Producto" name="id"
                  className="block w-full p-3 bg-gray-100 text-lg text-center"
                />

                <input
                  type="submit" value='Buscar Producto'
                  className=" w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
                />

              </div>

              {existeProducto ? '' : (
                <Alerta>El producto no está registrado</Alerta>
              )}

            </Form>
          )
        }}
      </Formik>

      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Precio</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody className="">
          {auxProducts.map(product => (
            <Product key={product.id} product={product} />
          ))}

        </tbody>
      </table>
    </>
  )
}

export default Products