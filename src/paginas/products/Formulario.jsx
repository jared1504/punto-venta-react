
import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Alerta from '../../components/Alerta';
import Spinner from '../../components/Spinner';


const Formulario = ({ product, cargando, setCargando, products, setProducts }) => {

    const [respAPI, setRespAPI] = useState(false);
    const [idValido, setIdValido] = useState(true);
    const navigate = useNavigate();

    const newProductSchema = Yup.object().shape({
        id: Yup.number('El código debe ser númerico')
            .required('El código es obligatorio'),
        name: Yup.string()
            .required('El nombre es obligatorio'),
        price_sale: Yup.number('El precio debe ser númerico')
            .required('El precio de venta es obligatorio'),
        price_order: Yup.number('El precio debe ser númerico')
            .required('El precio de compra es obligatorio'),
        stock: Yup.number('El stock debe ser númerico')
            .required('El stock es obligatorio')
    })

    const handleSubmit = async (valores) => {
        setRespAPI(false);
        setCargando(true);
        try {
            if (product.id) {
                //editar cliente en la API
                const url = `${import.meta.env.VITE_API_URL}/products/${product.id}`;
                const resp = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                //editar cliente en State
                const arrayProductos = products.map(pro => {
                    if (pro.id == product.id) {
                        //previene que se cambie el id del producto
                        valores.id = pro.id;
                        return valores;
                    } else {
                        return pro;
                    }
                });

                setProducts(arrayProductos);
                navigate('/products');//redireccionar

            } else {
                //guardar cliente en la API
                console.log(JSON.stringify(valores))
                const url = `${import.meta.env.VITE_API_URL}/products/store`;
                const resp = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const resul = await resp.json();
                const { success, message } = resul;
                if (success) {
                    setRespAPI(true);

                    //guardar cliente en State
                    const arrayProducts = [...products.products, valores];
                    products.setProducts(arrayProducts);

                    navigate('/products');//redireccionar
                } else {
                    setIdValido(false);
                }
            }
        } catch (error) {
            console.log(error);
        }


    }

    return (
        cargando ? <Spinner /> : (
            <div className='bg-white mt-5 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
                <h1 className="text-gray-500 font-bold text-xl uppercase text-center">
                    {product?.name ? 'Acutalizar Producto' : 'Agregar Producto'}
                </h1>
                <Formik
                    initialValues={{
                        id: product?.id ?? "",
                        name: product?.name ?? "",
                        price_sale: product?.price_sale ?? "",
                        price_order: product?.price_order ?? "",
                        stock: product?.stock ?? "",
                    }}
                    enableReinitialize={true}//poner valores existentes
                    onSubmit={async (values, { resetForm }) => {
                        await handleSubmit(values);
                        if (respAPI) {
                            resetForm();//limpiar formulario
                        }

                    }}
                    validationSchema={newProductSchema}
                >
                    {({ errors, touched }) => {

                        return (
                            <Form className='mt-10'>
                                <div className="mb-4">
                                    <label
                                        htmlFor="id"
                                        className='text-gray-800 '
                                    >Código:</label>
                                    {product?.name ? (
                                        //editar -> no se puede cambiar el id
                                        <Field
                                            disabled
                                            id="id"
                                            type="number"
                                            className="mt-2 block w-full p-3 bg-gray-100"
                                            placeholder="Código del Producto"
                                            name="id"
                                        />
                                    ) : (
                                        //crear
                                        <Field
                                            id="id"
                                            type="number"
                                            className="mt-2 block w-full p-3 bg-gray-100"
                                            placeholder="Código del Producto"
                                            name="id"
                                        />
                                    )}

                                    {!idValido && <Alerta>El código ya es usado por otro Producto</Alerta>}
                                    {errors.id && touched.id ? (
                                        <Alerta>{errors.id}</Alerta>
                                    ) : null}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="name"
                                        className='text-gray-800 '
                                    >Nombre:</label>
                                    <Field
                                        id="name"
                                        type="text"
                                        className="mt-2 block w-full p-3 bg-gray-100"
                                        placeholder="Nombre del producto"
                                        name="name"
                                    />
                                    {errors.name && touched.name ? (
                                        <Alerta>{errors.name}</Alerta>
                                    ) : null}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="precio_order"
                                        className='text-gray-800 '
                                    >Precio compra:</label>
                                    <Field
                                        id="price_order"
                                        type="number"
                                        className="mt-2 block w-full p-3 bg-gray-100"
                                        placeholder="Precio de Compra"
                                        name="price_order"
                                    />
                                    {errors.price_order && touched.price_order ? (
                                        <Alerta>{errors.price_order}</Alerta>
                                    ) : null}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="price_sale"
                                        className='text-gray-800 '
                                    >Precio venta:</label>
                                    <Field
                                        id="price_sale"
                                        type="number"
                                        className="mt-2 block w-full p-3 bg-gray-100"
                                        placeholder="Precio de Venta"
                                        name="price_sale"
                                    />
                                    {errors.price_sale && touched.price_sale ? (
                                        <Alerta>{errors.price_sale}</Alerta>
                                    ) : null}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="stock"
                                        className='text-gray-800 '
                                    >Stock:</label>
                                    <Field
                                        id="stock"
                                        type="number"
                                        className="mt-2 block w-full p-3 bg-gray-100"
                                        placeholder="Stock del Producto"
                                        name="stock"
                                    />
                                    {errors.stock && touched.stock ? (
                                        <Alerta>{errors.stock}</Alerta>
                                    ) : null}
                                </div>


                                <input
                                    type="submit"
                                    value={product?.name ? 'Actualizar Producto' : 'Agregar Producto'}
                                    className="mt-5 w-full bg-blue-800 hover:bg-blue-600 cursor-pointer p-3 text-white uppercase font-bold text-lg"
                                />
                            </Form>

                        )

                    }}
                </Formik>
            </div>
        )
    )
}
Formulario.defaultProps = {
    product: {},
    cargando: false
}


export default Formulario