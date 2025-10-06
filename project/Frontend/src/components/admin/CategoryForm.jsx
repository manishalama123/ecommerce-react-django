import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import { CategoryValidationSchema } from '../../utils/validate';

const CategoryForm = ({
  initialData = null,
  onSubmit,
  isEditMode = false,
  submitButtonText = "Submit"
}) => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(initialData?.imageUrl || null);
  const [file, setFile] = useState(null);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: yupResolver(CategoryValidationSchema),
    defaultValues: initialData || {
      name: '',
      description: ''
    }
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
      setPreview(initialData.imageUrl);
    }
  }, [initialData, reset]);

  const handleFormSubmit = async (data) => {
    if (!isEditMode && !file) {
      toast.error("Please select an image");
      return;
    }
    await onSubmit(data, file);
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
    }
  };

  const handleCancel = () => {
    navigate('/admin/category/list');
  };

  return (
    <div className="admin-panel-content">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="header-bar flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            {isEditMode ? 'Edit Category' : 'Add New Category'}
          </h2>
          <div className="actions space-x-2">
            <button 
              type="button"
              onClick={handleCancel} 
              className="btn-cancel px-4 py-2 rounded border"
            >
              Cancel
            </button>
            <button 
              type='submit' 
              disabled={isSubmitting} 
              className="btn-save px-4 py-2 disabled:bg-slate-600 rounded text-white bg-blue-600"
            >
              {isSubmitting ? "Submitting..." : submitButtonText}
            </button>
          </div>
        </div>

        <div className="form-container p-6 grid grid-cols-3 gap-6">
          {/* Left Column (Category Information) - Takes 2/3 of the space */}
          <div className="col-span-2 space-y-6">
            <div className="card p-6 bg-white shadow rounded">
              <h3 className="text-lg font-medium mb-4">Category Information</h3>

              {/* Category Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name *
                </label>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  placeholder="Enter category name"
                  className="w-full border border-gray-300 p-2 rounded focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.name && <p className='text-red-600 text-sm mt-1'>{errors.name.message}</p>}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  {...register('description')}
                  id="description"
                  rows="4"
                  placeholder="Enter category description"
                  className="w-full border border-gray-300 p-2 rounded focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
                {errors.description && <p className='text-red-600 text-sm mt-1'>{errors.description.message}</p>}
              </div>
            </div>
          </div>

          {/* Right Column (Image and Quick Info) - Takes 1/3 of the space */}
          <div className="col-span-1 space-y-6">
            {/* Category Image Card */}
            <div className="card p-6 bg-white shadow rounded">
              <h3 className="text-lg font-medium mb-4">Category Image</h3>

              {/* Image Upload Area with Preview */}
              <div className="border-2 border-dashed border-gray-300 p-6 rounded text-center space-y-3">
                {preview ? (
                  <img
                    src={preview}
                    alt='Preview'
                    className='w-full h-48 object-cover rounded-md'
                  />
                ) : (
                  <div className="image-preview h-32 w-full bg-gray-100 flex items-center justify-center mb-2 rounded overflow-hidden">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                )}
                <p className="text-sm text-gray-500">Upload category image</p>
                <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>

                <input 
                  type="file"
                  id="image" 
                  className="hidden" 
                  accept="image/png, image/jpeg"
                  onChange={handleImageChange}
                />
                <label htmlFor="image" className="inline-block px-4 py-2 border rounded shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                  Choose File
                </label>
              </div>
            </div>

            {/* Quick Info Card (Short Note) */}
            <div className="card p-6 bg-white shadow rounded">
              <h3 className="text-lg font-medium mb-4">Quick Info</h3>
              <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                <li>Categories help organize products.</li>
                <li>You can create subcategories (optional logic).</li>
                <li>Setting an image makes the category appealing.</li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;