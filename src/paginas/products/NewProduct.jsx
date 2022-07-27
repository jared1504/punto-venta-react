import Formulario from './Formulario'

const NewProduct = (products, setProducts, cargando, setCargando) => {
    return (
        <div >
            <h1 className='font-black text-4xl text-blue-900'>Nuevo Producto</h1>
            <p className="mt-3 text-lg">Llena los siguientes campos para registrar un Producto</p>
            <Formulario
                products={products}
                setProducts={setProducts}
                cargando={cargando}
                setCargando={setCargando}
            />

        </div>
    )
}

export default NewProduct