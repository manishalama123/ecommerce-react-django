import React from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { Outlet } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

function FrontendUser() {
  return (
    <div>
      <NavBar/>
      <Outlet/>
      <Footer/>
      <ToastContainer position="top-right" autoClose={2000}/>
    </div>
  )
}

export default FrontendUser;
