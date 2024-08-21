import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {Provider} from 'react-redux'
import store from './Redux-Store/store'
import './css/beauty.css'

import {createBrowserRouter,
        createRoutesFromElements,
        Route,
        RouterProvider
} from 'react-router-dom'
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import HomeScreen from './Screen/CLIENT/HomeScreen';
import ProductScreen from './Screen/CLIENT/ProductScreen';
import LoginScreen from './Screen/CLIENT/LoginScreen';
import CartScreen from './Screen/CLIENT/CartScreen';
import RegistrationScreen from './Screen/CLIENT/RegistrationScreen';
import ShippingScreen from './Screen/CLIENT/ShippingScreen';
import PaymentScreen from './Screen/CLIENT/PaymentScreen';
import OrderScreen from './Screen/CLIENT/OrderScreen';
import PrivateRoute from './Component/PrivateRoute';
import PlaceOrderScreen from './Screen/CLIENT/PlaceOrderScreen';
import ProfileScreen from './Screen/CLIENT/ProfileScreen';

import AdminRoute from './Component/AdminRoute';
import OrderListScreen from './Screen/ADMIN/OrderListScreen';
import ProductListScreen from './Screen/ADMIN/ProductListScreen';
import UserListScreen from './Screen/ADMIN/UserListScreen';
import HelpScreen from './Screen/CLIENT/HelpScreen';
import Error404Screen from './Screen/CLIENT/Error404Screen';

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
       <Route index={true} path='/' element={<HomeScreen/>} />
       <Route path='/products/:id' element={<ProductScreen/>} />
       <Route path='/users/login' element={<LoginScreen/>} />
       <Route path='/cart' element={<CartScreen/>} />
       <Route path='/register' element={<RegistrationScreen/>}/>
       <Route path='/help' element={<HelpScreen/>}/>
       <Route path='*' element={<Error404Screen/>}/>
       

       <Route path='' element={<PrivateRoute/>}>
       <Route path='/shipping' element={<ShippingScreen/>}/>
       <Route path='/payment' element={<PaymentScreen/>}/>
       <Route path='/placeOrder' element={<PlaceOrderScreen/>}/>
       <Route path='/users/profile' element={<ProfileScreen/>} />
       <Route path='/orders/:id' element={<OrderScreen/>} />
       </Route>

       <Route path='' element={<AdminRoute/>}>
       <Route path='/admin/orderList' element={<OrderListScreen/>}/>
       <Route path='/admin/productList' element={<ProductListScreen/>}/>
       <Route path='/admin/userList' element={<UserListScreen/>}/>
     
       </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
   
    </Provider>
  </React.StrictMode>
);


