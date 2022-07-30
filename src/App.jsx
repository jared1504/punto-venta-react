import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'

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

import LayoutSales from './paginas/sales/Layout'
import NewSale from './paginas/sales/NewSale'
import Sales from './paginas/sales/Sales'
import ViewSale from './paginas/sales/ViewSale'

import LayoutOrders from './paginas/orders/Layout'
import NewOrder from './paginas/orders/NewOrder'
import Orders from './paginas/orders/Orders'
import ViewOrder from './paginas/orders/ViewOrder'
import Login from './paginas/login/Login'

function App() {

  const [cargando, setCargando] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) ?? {});
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')) ?? '');
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem('products')) ?? []);
  //const [products, setProducts] = useState([]);
  const [auxProducts, setAuxProducts] = useState([]);
  // const [sales, setSales] = useState([]);
  const [sales, setSales] = useState(JSON.parse(localStorage.getItem('sales')) ?? []);
  const [auxSales, setAuxSales] = useState([]);
  const [orders, setOrders] = useState(JSON.parse(localStorage.getItem('orders')) ?? []);
  const [auxOrders, setAuxOrders] = useState([]);
  const [clients, setClients] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [orderCart, setOrderCart] = useState([]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token));
  }, [token]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sales', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    const getProductsAPI = async () => {
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
      getProductsAPI();
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

  useEffect(() => {
    const getSalesAPI = async () => {//obtener todas la ventas de la API
      setCargando(true);
      try {
        const url = `${import.meta.env.VITE_API_URL}/sales`;
        const resp = await fetch(url);
        const resul = await resp.json();

        const { success, sales: array } = resul;
        if (success) {
          setSales(array);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (sales.length === 0) {
      getSalesAPI();
    }

  }, []);

  useEffect(() => {
    const getOrdersAPI = async () => {//obtener todos los pedidos de la API
      setCargando(true);
      try {
        const url = `${import.meta.env.VITE_API_URL}/orders`;
        const resp = await fetch(url);
        const resul = await resp.json();
        console.log(resul)
        const { success, orders: array } = resul;
        if (success) {
          setOrders(array);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (orders.length === 0) {
      getOrdersAPI();
    }

  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login'>
          <Route index
            element={
              <Login
                setUser={setUser}
                setToken={setToken}
              />
            }
          />
        </Route>

        <Route path='/' element={
          <Layout
            user={user}
            token={token}
            setUser={setUser}
            setToken={setToken}
          />
        }>
          <Route element={<LayoutSales />} >
            <Route index
              element={
                <NewSale
                  products={products}
                  setProducts={setProducts}
                  cargando={cargando}
                  setCargando={setCargando}
                  shoppingCart={shoppingCart}
                  setShoppingCart={setShoppingCart}
                  sales={sales}
                  setSales={setSales}
                  auxSales={auxSales}
                  setAuxSales={setAuxSales}
                />
              }
            />

            <Route path='sales'
              element={
                <Sales
                  sales={sales}
                  auxSales={auxSales}
                  setAuxSales={setAuxSales}
                />
              }
            />
            <Route path='sales/:id'
              element={
                <ViewSale
                  sales={sales}
                />
              }
            />

          </Route>
        </Route>

        <Route path='orders' element={
          <Layout
            user={user}
            token={token}
            setUser={setUser}
            setToken={setToken}
          />
        }>
          <Route element={<LayoutOrders />} >
            <Route path='new'
              element={
                <NewOrder
                  products={products}
                  orders={orders}
                  setOrders={setOrders}
                  auxOrders={auxOrders}
                  setAuxOrders={setAuxOrders}
                  orderCart={orderCart}
                  setOrderCart={setOrderCart}
                />
              }
            />

            <Route index
              element={
                <Orders
                  orders={orders}
                  auxOrders={auxOrders}
                  setAuxOrders={setAuxOrders}
                />
              }
            />
            <Route path=':id'
              element={
                <ViewOrder
                  orders={orders}
                />
              }
            />
          </Route>
        </Route>

        <Route path="products" element={
          <Layout
            user={user}
            token={token}
            setUser={setUser}
            setToken={setToken}
          />
        }>
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


        <Route path="clients" element={
          <Layout
            user={user}
            token={token}
            setUser={setUser}
            setToken={setToken}
          />
        }>
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
