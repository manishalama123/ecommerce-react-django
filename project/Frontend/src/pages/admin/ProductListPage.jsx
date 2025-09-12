import React, { useState } from 'react';

const initialProducts = [
  {
    id: '#1',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 99.99,
    stock: 25,
    status: 'Active',
    image: 'https://via.placeholder.com/40x40',
  },
  {
    id: '#2',
    name: 'Smart Watch',
    category: 'Electronics',
    price: 199.99,
    stock: 12,
    status: 'Active',
    image: 'https://via.placeholder.com/40x40',
  },
  {
    id: '#3',
    name: 'Running Shoes',
    category: 'Fashion',
    price: 79.99,
    stock: 0,
    status: 'Inactive',
    image: 'https://via.placeholder.com/40x40',
  },
  {
    id: '#4',
    name: 'Coffee Maker',
    category: 'Home & Kitchen',
    price: 149.99,
    stock: 8,
    status: 'Active',
    image: 'https://via.placeholder.com/40x40',
  },
];

const ProductListPage = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Products</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200">
          + Add Product
        </button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-grow">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M12.9 14.32a8 8 0 111.414-1.414l5.353 5.353a1 1 0 01-1.414 1.414l-5.353-5.353zM14 8a6 6 0 11-12 0 6 6 0 0112 0z" clipRule="evenodd" fillRule="evenodd" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200">
          Filter
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={product.image} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-500">ID: {product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fillRule="evenodd" d="M.458 10C1.732 5.618 6.425 2 10 2s8.268 3.618 9.542 8c-1.274 4.382-5.967 8-9.542 8S1.732 14.382.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/></svg>
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-900">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828L10.963 12.82l-3.23 3.23a.5.5 0 01-.707 0l-2.828-2.828a.5.5 0 010-.707l3.23-3.23 2.828-2.828zM15 13.5l2.5-2.5a.5.5 0 01.707.707l-3 3a.5.5 0 01-.707 0L14 14.293V13.5z"/></svg>
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 011 1v1h2a1 1 0 110 2H9v1h2a1 1 0 110 2H9v1h2a1 1 0 110 2H9v1a1 1 0 110 2H8v-1H6v1a1 1 0 11-2 0V11H2a1 1 0 110-2h2V7H2a1 1 0 110-2h2V3a1 1 0 011-1h4z" clipRule="evenodd"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductListPage;