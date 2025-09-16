import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { ImagePlus } from "lucide-react";
import { baseRequest } from '../../utils/baseRequest';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { productFormValidationSchema } from '../../utils/validate';
import { yupResolver } from '@hookform/resolvers/yup'
import { useCategories } from '../../api/fetchApi';

const AddProductPage = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const { data: categories } = useCategories();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(productFormValidationSchema)
  })

  const onSubmit = async (data) => {
    console.log("🚀 FORM SUBMITTED! Data:", data);
    
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('price', data.price);
    formData.append('quantity', data.quantity);
    formData.append("image", file);
    
    console.log("📤 Sending request to backend...");
    try {
      const response = await baseRequest.post('/products/', formData)
      console.log(response.data);
      toast.success("Product added successfully")
      navigate('/admin/product/list')
    } catch (error) {
      console.log("Form error", error);
    }
  }

  const handleImageChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-1 p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">Add New Product</h2>
        <button
          type='button'
          onClick={() => navigate('/admin/product/list')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200">
          Cancel
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Information */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Product Information</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Product Name *
              </label>
              <input
                {...register('title')}
                type="text"
                id="title"
                placeholder="Enter product name"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.title && (<p className='text-red-600 text-sm mt-1'>{errors.title.message}</p>)}
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register('description')}
                id="description"
                rows="3"
                placeholder="Enter product description"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
              {errors.description && <p className='text-red-600 text-sm mt-1'>{errors.description.message}</p>}
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category *
              </label>
              <select
                {...register('category')}
                id="category"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select category</option>
                {
                  categories?.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))
                }
              </select>
              {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price *
                </label>
                <input
                  {...register('price')}
                  type="number"
                  id="price"
                  step="0.01"
                  placeholder="$ 0.00"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.price && <p className='text-red-600 text-sm mt-1'>{errors.price.message}</p>}
              </div>
              
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  Stock Quantity *
                </label>
                <input
                  {...register('quantity')}
                  type="number"
                  id="quantity"
                  placeholder="0"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.quantity && <p className='text-red-600 text-sm mt-1'>{errors.quantity.message}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-slate-800 text-white disabled:bg-slate-600 rounded-md w-full py-3 hover:bg-slate-700 transition"
            >
              {isSubmitting ? "Submitting..." : "Add Product"}
            </button>
          </div>
        </div>

        {/* Product Images */}
        <div className="col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Product Images</h3>

            {preview ? (
              <img
                src={preview}
                alt='Preview'
                className='w-full h-48 object-cover rounded-md'
              />
            ) : (
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                <ImagePlus className="w-8 h-8" />
                <p className="mt-2 text-sm text-gray-500">Click to upload image</p>
              </div>
            )}
            
            <input
              {...register("image")}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-4 w-full text-sm text-gray-700"
            />
            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddProductPage;