import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Formulario from './Formulario';
import { Navigate, useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';


const EditProduct = ({ products, setProducts }) => {

    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();

    const [auxProducts, setAuxProducts] = useState([]);

    useEffect(() => {
        setAuxProducts(products);
    }, [])

    useEffect(() => {
        const obtenerProductoAPI = async () => {
            try {
                //Buscar en el State
                const auxPro = products.filter(prod => prod.id == id);
                setProduct(auxPro[0])

                /*
                //Buscar en la API
                const url = `${import.meta.env.VITE_API_URL}/products/${id}`;
                const resp = await fetch(url);
                const resul = await resp.json();
                const { data } = resul;
                setProduct(data);
                */

            } catch (error) {
                console.log(error);
            }
            setCargando(false);
        }
        obtenerProductoAPI();
    }, []);

    return (
        <>{cargando ?
            <Spinner />
            :
            <>
                <h1 className='font-black text-4xl text-blue-900'>Editar Producto</h1>
                <p className="mt-3">Edita los datos de un Producto</p>
                {product?.name ? (
                    < Formulario
                        product={product}
                        cargando={cargando}
                        products={products}
                        setProducts={setProducts}
                        auxProducts={auxProducts}
                        setAuxProducts={setAuxProducts}
                    />
                ) : navigate('/products')}
            </>}
        </>
    )
}

export default EditProduct