import React from 'react';
import { useProducts } from '../../api/fetchApi';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { baseRequest } from '../../utils/baseRequest';
import toast from 'react-hot-toast';

const ProductListPage = () => {
  const navigate = useNavigate();
  const { data: products = [], isError, isLoading, error } = useProducts();
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams();
  const categoryIdParam = searchParams.get('category_id');
  const filterCategoryId = categoryIdParam ? parseInt(categoryIdParam, 10) : null;
  const productsToDisplay = products.filter((product) => {
    if (!filterCategoryId) {
      return true;
    }
    return product.category === filterCategoryId || product.category?.id === filterCategoryId;;
  });
  const pageTitle = filterCategoryId
    ? `Products in Category ID: ${filterCategoryId}` // Title when filtered
    : 'All Products'; // Title when viewing all

  
  const handleAddProduct = () => {
    navigate('/admin/product/add')
  }
  const {mutate: deleteProduct} = useMutation({
    mutationFn: async (id) => {
      await baseRequest.delete(`/products/${id}/`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['products']})
      toast.success("Product deleted successfully")
    },
    onError: (err) => {
      toast.error("An error occur")
      console.error(err)
    }
  })
  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError) return <div className="p-6 text-red-500">Error: {error.message}</div>;

  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{pageTitle}</h2>
        <button onClick={handleAddProduct} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200">
          + Add Product
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
            {productsToDisplay.length > 0 ? (
              productsToDisplay.map((product) => (
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category.name || product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">👁</button>
                      <button className="text-yellow-600 hover:text-yellow-900">✏️</button>
                      <button onClick={() => deleteProduct(product.id)} className="text-red-600 hover:text-red-900">🗑</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  {filterCategoryId
                    ? `No products found in category ID ${filterCategoryId}.`
                    : 'No products found.'
                  }
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
