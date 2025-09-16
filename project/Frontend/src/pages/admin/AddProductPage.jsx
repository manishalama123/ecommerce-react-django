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
  const { data: categories } = useCategories();
  console.log("Categories data:", categories);
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm({
    resolver: yupResolver(productFormValidationSchema)
  })

  const onSubmit = async (data) => {
    console.log("🚀 FORM SUBMITTED! Data:", data);
    try {
      const formData = new FormData();

      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('price', data.price);
      formData.append('quantity', data.quantity);

      if (data.image && data.image[0]) {
        formData.append('image', data.image[0])
      }
      console.log("📤 Sending request to backend...");

      const response = await baseRequest.post('/products/', formData)
      console.log(response.data);
      toast.success("Product added successfully")
      navigate('/admin/product/list')
    } catch (error) {
      console.log("Form eoor",error);
    }
    
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue('image', e.target.files);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-1 p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">Add New Product</h2>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <button
            type='button'
            onClick={() => navigate('/admin/product/list')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200">
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
                {...register('title')}
                type="text"
                id="productName"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* <div>
                <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
                  SKU *
                </label>
                <input
                  type="text"
                  id="sku"
                  placeholder="Enter SKU"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div> */}
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
                {errors.category && <p className="text-red-600 text-sm">{errors.category.message}</p>}
              </div>
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
                  placeholder="$ 0.00"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />{errors.price && <p className='text-red-600 text-sm mt-1'>{errors.price.message}</p>}
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

        {/* Status and Product Images */}
        <div className="col-span-1 space-y-6">
          {/* <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Status</h3>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div> */}

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Product Images</h3>

            {preview ? (
              <div className="space-y-2">
                <img
                  src={preview}
                  alt='Preview'
                  className='w-full h-48 object-cover rounded-md'
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    setValue('image', null);
                  }}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Remove image
                </button>
              </div>
            )
              :
              (
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <ImagePlus className="w-8 h-8" />
                  <p className="mt-2 text-sm text-gray-500">Drag images here or click to upload</p>
                  <p className="mt-1 text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                  <input
                    {...register("image")}
                    type="file"
                    onChange={handleFileChange}
                    className="mt-4 text-sm text-gray-700"
                    accept="image/png, image/jpeg, image/gif"
                  />
                  {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
                </div>
              )}




          </div>
        </div>
      </div>
    </form>
  );
};

export default AddProductPage;