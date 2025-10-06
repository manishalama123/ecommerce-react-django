import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { baseRequest } from '../../utils/baseRequest'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast'
import CategoryForm from '../../components/admin/CategoryForm'

const AddCategoryPage = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (imageFileField && imageFileField.length > 0) {
  //     const file = imageFileField[0];
  //     const url = URL.createObjectURL(file);
  //     setPreview(url);
  //     return () => URL.revokeObjectURL(url);
  //   }
  //   setPreview(null);
  // }, [imageFileField]);

  // const handleAddCategory = async (data, file) => {
  //   const formData = new FormData();
  //   formData.append('name', data.name);
  //   formData.append('description', data.description || '');
  //   if (data.image && data.image[0]) {
  //     formData.append('image', data.image[0])
  //   }
  //   try {
  //     const response = await baseRequest.post('/categories/', formData)
  //     console.log(response.data);
  //     toast.success("Category added successfully")
  //     navigate('/admin/category/list')
  //   } catch (error) {
  //     console.log("form error", error);

  //   }
  // };
  const handleAddCategory = async (data, file) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description || '');
    formData.append('image', file);

    try {
      const response = await baseRequest.post('/categories/', formData);
      console.log(response.data);
      toast.success("Category added successfully");
      navigate('/admin/category/list');
    } catch (error) {
      console.log("Form error", error);
      toast.error("Failed to add category");
    }
  };

  return (
    <CategoryForm
      onSubmit={handleAddCategory}
      isEditButtonText={false}
      submitButtonText="Add Category"
    />
  )
}

export default AddCategoryPage
