import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { baseRequest } from '../../utils/baseRequest';
import { useCategories } from '../../api/fetchApi';
import ProductForm from '../../components/admin/ProductForm';

const EditProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { data: categories } = useCategories();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await baseRequest.get(`/products/${id}/`);
                // setProductData(response.data);
                const { image, ...cleanData } = response.data;
            
                setProductData({
                    ...cleanData,
                    imageUrl: image  // Rename to imageUrl for preview
                });
            } catch (error) {
                console.error("Error fetching product:", error);
                toast.error("Failed to load product");
                navigate('/admin/product/list');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, navigate]);

    const handleUpdateProduct = async (data, file) => {
        // If there's a new image, use FormData
        if (file) {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('category', data.category);
            formData.append('price', data.price);
            formData.append('quantity', data.quantity);
            formData.append("image", file);

            try {
                const response = await baseRequest.patch(`/products/${id}/`, formData);
                console.log(response.data);
                toast.success("Product updated successfully");
                navigate('/admin/product/list');
            } catch (error) {
                console.log("Update error", error.response?.data); // Log the actual error
                toast.error("Failed to update product");
            }
        } else {
            const { image, ...updateData } = data;
            try {
                const response = await baseRequest.patch(`/products/${id}/`, updateData);
                toast.success("Product updated successfully");
                navigate('/admin/product/list');
            } catch (error) {
                console.log("Update error", error.response?.data);
                toast.error("Failed to update product");
            }
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <ProductForm
            initialData={productData}
            onSubmit={handleUpdateProduct}
            isEditMode={true}
            submitButtonText="Update Product"
            categories={categories}
        />
    );
};

export default EditProductPage;