import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'

import LayoutProducts from './paginas/products/Layout'
import Products from './paginas/products/Products'
import NewProduct from './paginas/products/NewProduct'
import EditProduct from './paginas/products/EditProduct'
import ViewProduct from './paginas/products/ViewProduct'


import LayoutSales from './paginas/sales/Layout'
import NewSale from './paginas/sales/NewSale'
import Sales from './paginas/sales/Sales'
import ViewSale from './paginas/sales/ViewSale'

import LayoutOrders from './paginas/orders/Layout'
import NewOrder from './paginas/orders/NewOrder'
import Orders from './paginas/orders/Orders'
import ViewOrder from './paginas/orders/ViewOrder'
import Login from './paginas/login/Login'

import { getOrdersAPI, getProductsAPI, getSalesAPI } from './funtions/GetDataAPI'

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
  const [shoppingCart, setShoppingCart] = useState([]);
  const [orderCart, setOrderCart] = useState([]);

  const getData = async () => {//asignar valores al state
    let aux;
    if (products.length === 0) {
      console.log('consulta')
      aux = await getProductsAPI(token);
      setProducts(aux);
    }

    if (sales.length === 0) {
      aux = await getSalesAPI(token);
      setSales(aux);
    }
    if (orders.length === 0) {
      aux = await getOrdersAPI(token);
      setOrders(aux);
    }


  }

  useEffect(() => {
    if (token !== '') {//El Usuario inicio sesión
      getData();//Obtener la data de la API
    }
  }, [])


  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token));
  }, [token]);
  /** */
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sales', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login'>
          <Route index
            element={
              <Login
                user={user}
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
            setProducts={setProducts}
            setSales={setSales}
            setOrders={setOrders}
          />
        }>
          <Route element={<LayoutSales />} >
            <Route index
              element={
                <NewSale
                  token={token}
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
            setProducts={setProducts}
            setSales={setSales}
            setOrders={setOrders}
          />
        }>
          <Route element={<LayoutOrders />} >
            <Route path='new'
              element={
                <NewOrder
                  token={token}
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
            setProducts={setProducts}
            setSales={setSales}
            setOrders={setOrders}
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
                token={token}
                products={products}
                setProducts={setProducts}
                cargando={cargando}
                setCargando={setCargando}
              />}
            />

            <Route path='edit/:id'
              element=
              {<EditProduct
                token={token}
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

      </Routes>
    </BrowserRouter>
  )
}

export default App
