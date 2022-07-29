import { useEffect, useState } from 'react';
import { useParams , useNavigate } from 'react-router-dom';


const ViewProduct = ({ products }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      //Buscar en el State
      const auxPro = products.find(e => e.id == id);
      if (auxPro) {
        setProduct(auxPro);
      } else {
        navigate(`/products`);
      }
    }
    getProduct();

  }, []);

  return (
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
        type='button'  onClick={() => navigate(`/products/edit/${id}`)}
      >Editar Producto</button>
    </>
  )
}

export default ViewProduct