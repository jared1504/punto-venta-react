import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'

import LayoutSales from './paginas/sales/Layout'

import LayoutProducts from './paginas/products/Layout'
import Products from './paginas/products/Products'
import NewProduct from './paginas/products/NewProduct'
import EditProduct from './paginas/products/EditProduct'
import ViewProduct from './paginas/products/ViewProduct'

import LayoutClientes from './paginas/clients/Layout'
import NewClient from './paginas/clients/NewClient'
import Clients from './paginas/clients/Clients'
import EditClient from './paginas/clients/EditClient'
import ViewClient from './paginas/clients/ViewClient'
import Sale from './paginas/sales/Sale'
import Sales from './paginas/sales/Sales'

function App() {

  const [cargando, setCargando] = useState(false);
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem('products')) ?? []);
  //const [products, setProducts] = useState([]);
  const [auxProducts, setAuxProducts] = useState([]);
  const [clients, setClients] = useState([]);

  const [shoppingCart, setShoppingCart] = useState([]);

 

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    const obtenerProductosAPI = async () => {
      setCargando(true);
      try {
        const url = `${import.meta.env.VITE_API_URL}/products`;
        const resp = await fetch(url);
        const resul = await resp.json();
        setProducts(resul);
        setAuxProducts(resul);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    }
    if (products.length === 0) {
      obtenerProductosAPI();
    }

  }, []);

  useEffect(() => {
    const getClientsAPI = async () => {
      setCargando(true);
      try {
        const url = `${import.meta.env.VITE_API_URL}/clients`;
        const resp = await fetch(url);
        const resul = await resp.json();
        setClients(resul);


      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };

    if (clients.length === 0) {
      getClientsAPI();
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route element={<LayoutSales />} >
            <Route index
              element={
                <Sale
                  products={products}
                  setProducts={setProducts}
                  cargando={cargando}
                  setCargando={setCargando}
                  shoppingCart={shoppingCart}
                  setShoppingCart={setShoppingCart}
                />
              }
            />

            <Route path='sales'
              element={<Sales />}
            />

          </Route>
        </Route>

        <Route path="/products" element={<Layout />}>
          <Route element={<LayoutProducts />} >
            <Route index
              element=
              {<Products
                products={products}
                cargando={cargando}
                auxProducts={auxProducts}
                setAuxProducts={setAuxProducts}
              />}
            />

            <Route path='new'
              element=
              {<NewProduct
                products={products}
                setProducts={setProducts}
                cargando={cargando}
                setCargando={setCargando}
              />}
            />

            <Route path='edit/:id'
              element=
              {<EditProduct
                products={products}
                setProducts={setProducts}
              />}
            />

            <Route path=':id'
              element=
              {<ViewProduct
                products={products}
              />}
            />

          </Route>
        </Route>


        <Route path="/clients" element={<Layout />}>
          <Route element={<LayoutClientes />} >
            <Route index
              element=
              {<Clients
                clients={clients}
                setClients={setClients}
                cargando={cargando}
                setCargando={setCargando}
              />}
            />

            <Route path='new'
              element=
              {<NewClient
                clients={clients}
                setClients={setClients}
              />}
            />

            <Route path='edit/:id'
              element=
              {<EditClient
                clients={clients}
                setClients={setClients}
              />}
            />

            <Route path=':id'
              element=
              {<ViewClient
                clients={clients}
              />}
            />


          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
