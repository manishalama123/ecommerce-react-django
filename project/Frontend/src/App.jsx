import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
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
import ProtectedRoute from './utils/ProtectedRoute';
import AuthRedirect from './utils/AuthRedirect';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import EsewaForm from './pages/EsewaForm';
import EsewaSuccessPage from './pages/EsewaSuccessPage';
import OrderListPage from './pages/OrderListPage';
import AdminRoute from './utils/AdminRoute';
import ProductListPage from './pages/admin/ProductListPage';
import AdminLayout from './layout/AdminLayout';
import AddProductPage from './pages/admin/AddProductPage';
import CategoryListPage from './pages/admin/CategoryListPage';
import AddCategoryPage from './pages/admin/AddCategoryPage';


function App() {

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth?.access);



  return <>
    <Routes>
      {/* Auth Redirect Routes */}
      <Route element={<AuthRedirect />}>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Route>
      <Route path="/" element={<FrontendUser />}>
        <Route index element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/products/:id' element={<ProductPage />} />
        <Route path='/products' element={<ProductsPage />} />




        {/* Protected Route */}
        <Route element={<ProtectedRoute />}>
          <Route path='/cart' element={<CartPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/userprofile' element={<UserProfilePage />} />
          <Route path='/order/list' element={<OrderListPage />} />
          <Route path='/esewa' element={<EsewaForm />} />
          <Route path='/esewa/success/:id' element={<EsewaSuccessPage />} />
        </Route>

      </Route>
      <Route path='/admin' element={<AdminRoute />}>
        <Route path='main' index element={<AdminLayout/>} />
        <Route path='product/list' element={<ProductListPage/>}/>
        <Route path='product/add' element={<AddProductPage/>}/>
        <Route path='category/list' element={<CategoryListPage/>}/>
        <Route path='category/add' element={<AddCategoryPage/>}/>
      </Route>
    </Routes>
    <Toaster position='top-center' />

  </>
}


export default App;
