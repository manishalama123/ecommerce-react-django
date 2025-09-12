// src/components/admin/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/admin/SideBar';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar/>
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;