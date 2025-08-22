import React, { useEffect } from 'react';
import { Route,Routes } from 'react-router-dom';
import FrontendUser from './pages/auth/FrontendUser';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CheckoutPage from './pages/CheckoutPage'
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import ProductPage from './pages/ProductPage';
import ProductsPage from './pages/ProductsPage';
import UserProfilePage from './pages/UserProfilePage';
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
function App() {
  
  return <>
    <Routes>
       
        <Route path="/" element={<FrontendUser />}>
          <Route index element={<HomePage />} />
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='cart' element={<CartPage/>}/>
          <Route path='/checkout' element={<CheckoutPage/>}/>
          <Route path='contact' element={<ContactPage/>}/>
          <Route path='product/:id' element={<ProductPage/>}/>
          <Route path='/products' element={<ProductsPage/>}/>
          <Route path='userprofile' element={<UserProfilePage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          
          <Route path='/login' element={<LoginPage/>}/>
        </Route>
      </Routes>

  </>
}

export default App;
