import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { baseRequest } from '../../utils/baseRequest';
import toast from 'react-hot-toast';
import CategoryForm from '../../components/admin/CategoryForm';



const EditCategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await baseRequest.get(`/categories/${id}/`);
        
        // Remove image from data and store separately for preview
        const { image, ...cleanData } = response.data;
        
        setCategoryData({
          ...cleanData,
          imageUrl: image
        });
      } catch (error) {
        console.error("Error fetching category:", error);
        toast.error("Failed to load category");
        navigate('/admin/category/list');
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id, navigate]);

  const handleUpdateCategory = async (data, file) => {
    if (file) {
      // New image uploaded - use FormData
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description || '');
      formData.append('image', file);

      try {
        const response = await baseRequest.patch(`/categories/${id}/`, formData);
        console.log(response.data);
        toast.success("Category updated successfully");
        navigate('/admin/category/list');
      } catch (error) {
        console.log("Update error", error.response?.data);
        toast.error("Failed to update category");
      }
    } else {
      // No new image - send JSON without image field
      const { image, ...updateData } = data;
      
      try {
        const response = await baseRequest.patch(`/categories/${id}/`, updateData);
        toast.success("Category updated successfully");
        navigate('/admin/category/list');
      } catch (error) {
        console.log("Update error", error.response?.data);
        toast.error("Failed to update category");
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <CategoryForm
      initialData={categoryData}
      onSubmit={handleUpdateCategory}
      isEditMode={true}
      submitButtonText="Update Category"
    />
  );
};

export default EditCategoryPage;