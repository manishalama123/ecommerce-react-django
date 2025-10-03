import React from 'react'
import { FaBox, FaFolder, FaShoppingCart, FaList, FaPlus, FaUsers } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const SideBar = () => {
  return (

    <div className="w-64 h-screen bg-white shadow-md p-5 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <FaBox /> ECOMMERCE
        </h1>
        <p className="text-sm text-gray-500">Admin Panel</p>
      </div>

      {/* Navigation */}
      <div className="flex-1">
        {/* Overview */}
        <div className="mb-6">
          <p className="text-gray-400 uppercase text-xs mb-2">Overview</p>
          <ul>
            <li className="mb-2">
              <Link to='/admin' className="flex items-center gap-2 w-full p-2 rounded-md bg-blue-100 font-medium">
                <FaList /> Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Products */}
        <div className="mb-6">
          <p className="text-gray-400 uppercase text-xs mb-2">Products</p>
          <ul>
            <li className="mb-2">
              <Link to='product/list' className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
                <FaList className="text-xl" />
                <span className="text-sm">Product List</span>
              </Link>
            </li>
            <li className="mb-2">
              <Link to='product/add' className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-gray-100">
                <FaPlus className="text-xl"  /> 
                <span className="text-sm">Add Product</span>
              </Link >
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <p className="text-gray-400 uppercase text-xs mb-2">Categories</p>
          <ul>
            <li className="mb-2">
              <Link to='category/list' className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-gray-100">
                <FaFolder /> 
                <span className="text-sm">Category List</span>
              </Link>
            </li>
            <li className="mb-2">
              <Link to='category/add' className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-gray-100">
                <FaPlus /> 
                <span className="text-sm">Add Category</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Orders */}
        <div className="mb-6">
          <p className="text-gray-400 uppercase text-xs mb-2">Orders</p>
          <ul>
            <li className="mb-2">
              <button className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-gray-100">
                <FaShoppingCart /> Order List
              </button>
            </li>
            <li className="mb-2">
              <button className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-gray-100">
                <FaPlus /> Add Order
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>

  )
}

export default SideBar
