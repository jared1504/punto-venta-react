import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Formulario from './Formulario';
import { Navigate, useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';


const EditProduct = ({ token, products, setProducts }) => {

    const { id } = useParams();
    const [product, setProduct] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const getProduct = () => {
            try {
                //Buscar en el State
                const auxPro = products.find(prod => prod.id == id);
                auxPro ? setProduct(auxPro) : navigate('/products');
            } catch (error) {
                console.log(error);
            }
        }
        getProduct();
    }, []);

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Editar Producto</h1>
            <p className="mt-3">Edita los datos de un Producto</p>

            < Formulario
                token={token}
                product={product}
                products={products}
                setProducts={setProducts}
            />

        </>
    )
}

export default EditProduct