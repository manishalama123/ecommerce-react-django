import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { baseRequest } from '../../utils/baseRequest'
import { useNavigate } from 'react-router-dom'
import { CategoryValidationSchema } from '../../utils/validate'
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast'

const AddCategoryPage = () => {
    const navigate = useNavigate();
    const [preview, setPreview] = useState(null);
    

    const {register, handleSubmit,watch, formState: { errors, isSubmitting}} = useForm({
        resolver: yupResolver(CategoryValidationSchema)
    })
    const imageFileField = watch('image'); 
    // --- EFFECT TO HANDLE IMAGE PREVIEW ---
    useEffect(() => {
        if (imageFileField && imageFileField.length > 0) {
            const file = imageFileField[0];
            const url = URL.createObjectURL(file);
            setPreview(url);
            return () => URL.revokeObjectURL(url);
        }
        setPreview(null);
    }, [imageFileField]);

    const onSubmit = async (data)=>{
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description || '');
        if(data.image && data.image[0]){
            formData.append('image', data.image[0])
        }
        try {
            const response = await baseRequest.post('/categories/', formData)
            console.log(response.data);
            toast.success("Category added successfully")
            navigate('/admin/category/list')
        } catch (error) {
            console.log("form error", error);
            
        }
    }
    const handleCancel = ()=>{
        navigate('/admin/category/list')
    }

  return (
    <div className="admin-panel-content">
        <form onSubmit={handleSubmit(onSubmit)} action="">
      <div className="header-bar flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Add New Category</h2>
        <div className="actions space-x-2">
          {/* You would replace these with your actual button components */}
          <button onClick={handleCancel} className="btn-cancel px-4 py-2 rounded border">Cancel</button>
          <button type='submit' disabled={isSubmitting} className="btn-save px-4 py-2 disabled:bg-slate-600 rounded text-white bg-blue-600">
                {isSubmitting ? "Submitting..." : "Add Category"}
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
            </div>

            {/* Parent Category/Subcategory and Status are removed as per your request */}
          </div>
        </div>

        {/* Right Column (Image and Quick Info) - Takes 1/3 of the space */}
        <div className="col-span-1 space-y-6">

          {/* Category Image Card */}
          <div className="card p-6 bg-white shadow rounded">
            <h3 className="text-lg font-medium mb-4">Category Image</h3>

            {/* Image Upload Area with Preview */}
            <div className="border-2 border-dashed border-gray-300 p-6 rounded text-center space-y-3">
              {/* Placeholder for Image Preview - conditionally rendered based on state */}
              
              {preview ?(
                <img
                src={preview}
                alt='Preview'
                className='w-full h-48 object-cover rounded-md'/>
              ):(
                <div className="image-preview h-32 w-full bg-gray-100 flex items-center justify-center mb-2 rounded overflow-hidden">
                {/* Replace this with an <img> tag when an image is selected */}
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              </div>

              
              )}
              <p className="text-sm text-gray-500">Upload category image</p>
              <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
              
              <input type="file"
              {...register('image')}
               id="image" className="hidden" accept="image/png, image/jpeg" />
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
  )
}

export default AddCategoryPage
