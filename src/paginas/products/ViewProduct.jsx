import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import Spinner from '../../components/Spinner';

const ViewProduct = ({ products }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const getProductAPI = async () => {
      //Buscar en el State
      const auxPro = products.filter(prod => prod.id == id);
      setProduct(auxPro[0])
      /* 
      try {
        const url = `${import.meta.env.VITE_API_URL}/products/${id}`;
        const resp = await fetch(url);
        const resul = await resp.json();
        const{data}=resul;
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
      */
      setCargando(false);
    }
    getProductAPI();

  }, []);

  return (
    <div>
      {cargando ? <Spinner /> : (
        Object.keys(product).length === 0 ? <p>No hay resultado</p> : (
          <>
            <h1 className='font-black text-4xl text-blue-800'>Ver Producto</h1>
            <p className="mt-3">Información del producto</p>

            <p className="text-4xl text-gray-700 mt-10">
              <span className=" uppercase font-bold ">Producto: </span>
              {product.name}
            </p>

            <p className="text-2xl text-gray-600 mt-4">
              <span className="text-gray-800 uppercase font-bold ">Código: </span>
              {product.id}
            </p>
            <p className="text-2xl text-gray-600 mt-4">
              <span className="text-gray-800 uppercase font-bold ">Precio Compra: $</span>
              {product.price_order}
            </p>

            <p className="text-2xl text-gray-600 mt-4">
              <span className="text-gray-800 uppercase font-bold ">Precio Venta: $</span>
              {product.price_sale}
            </p>

            <p className="text-2xl text-gray-600 mt-4">
              <span className="text-gray-800 uppercase font-bold ">Stock: </span>
              {product.stock}
            </p>

            <button
              className='mt-10 text-xl bg-blue-800 hover:bg-blue-600 block w-full text-white p-3 uppercase font-bold '
              type='button'
              onClick={() => navigate(`/products/edit/${id}`)}
            >Editar Producto</button>
          </>
        )
      )}

    </div>
  )
}

export default ViewProduct