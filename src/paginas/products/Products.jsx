import { useState, useEffect } from 'react'
import Spinner from '../../components/Spinner';
import Product from './Product';
import { Formik, Form, Field } from 'formik';
import Alerta from '../../components/Alerta';

const Products = ({
  products,
  cargando,
  auxProducts, 
  setAuxProducts
}) => {

  const [idProduct, setIdProduct] = useState(0);
  const [respAPI, setRespAPI] = useState(false);
  const [existeProducto, setExisteProducto] = useState(true);
  //const [auxProducts, setAuxProducts] = useState([]);

  useEffect(() => {
    setAuxProducts(products);
  }, []);

  const handleSubmit = async () => {
    setRespAPI(false);

    //Buscar producto por su id
    setIdProduct(id);

    if (idProduct) {
      if (idProduct.value !== '') {

        const filterArray = products.filter((pro) => pro.id == idProduct.value);
        if (filterArray.length === 1) {
          setAuxProducts(filterArray);
          setExisteProducto(true);
        } else {
          setAuxProducts(products);
          setExisteProducto(false);
        }
        /*
        try {
          const url = `${import.meta.env.VITE_API_URL}/products/${idProducto.value}`;
          const resp = await fetch(url);
          const resul = await resp.json();
          const { data } = await resul;
          setProductos([data]);
          setExisteProducto(true);

        } catch (error) {
          setExisteProducto(false);
          setProductos(auxProductos);
        }
        */
      } else {
        setAuxProducts(products);
      }

    }
  }

  return (
    <>{cargando ? <Spinner /> :
      (<>
        <h1 className='font-black text-4xl text-blue-900'>Productos</h1>
        <p className="mt-3">Administra tus productos</p>

        <Formik
          initialValues={{
            id: ''
          }}
          onSubmit={async (values, { resetForm }) => {
            await handleSubmit(values);
            resetForm();//limpiar formulario
          }}
        >
          {({ errors, touched }) => {

            return (
              <Form className='mt-2 mb-2 '>
                <div className=" grid grid-cols-3 gap-5">
                  <label
                    htmlFor="id"
                    className='p-3 text-bold text-gray-800 text-lg text-right '
                  >Buscar Producto:</label>
                  <Field
                    id="id"
                    type="number"
                    className="block w-full p-3 bg-gray-100 text-lg"
                    placeholder="Código del Producto"
                    name="id"
                  />

                  <input
                    type="submit"
                    value='Buscar Producto'
                    className=" w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
                  />
                </div>
                {existeProducto ? '' : (
                  <Alerta>El producto no existe</Alerta>
                )}
              </Form>

            )

          }}
        </Formik>

        <table className="w-full mt-5 table-auto shadow bg-white">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Código</th>
              <th className="p-2">Nombre</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="">
            {auxProducts.map(product => (
              <Product
                key={product.id}
                product={product}
              />
            ))}

          </tbody>
        </table>
      </>
      )}

    </>
  )
}

export default Products