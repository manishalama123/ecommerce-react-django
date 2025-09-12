import React from 'react';

const AddProductPage = () => {
  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">Add New Product</h2>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200">
            Cancel
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200">
            Save Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Information */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Product Information</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                Product Name *
              </label>
              <input
                type="text"
                id="productName"
                placeholder="Enter product name"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                rows="3"
                placeholder="Enter product description"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
                  SKU *
                </label>
                <input
                  type="text"
                  id="sku"
                  placeholder="Enter SKU"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category *
                </label>
                <select
                  id="category"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Select category</option>
                  {/* Add more options here */}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price *
                </label>
                <input
                  type="text"
                  id="price"
                  placeholder="$ 0.00"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  id="stock"
                  placeholder="0"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Status and Product Images */}
        <div className="col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Status</h3>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Product Images</h3>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.555 17.5a.75.75 0 01-.75-.75V7.25a.75.75 0 011.5 0v9.5a.75.75 0 01-.75.75zM12.5 17.5a.75.75 0 01-.75-.75V5.25a.75.75 0 011.5 0v11.5a.75.75 0 01-.75.75zM18.5 17.5a.75.75 0 01-.75-.75V9.25a.75.75 0 011.5 0v7.5a.75.75 0 01-.75.75z"/>
              </svg>
              <p className="mt-2 text-sm text-gray-500">
                Drag images here or click to upload
              </p>
              <p className="mt-1 text-xs text-gray-400">
                PNG, JPG, GIF up to 10MB
              </p>
              <button className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium py-1.5 px-3 rounded-md">
                Choose Files
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;