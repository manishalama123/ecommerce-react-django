import React from "react";
import { useNavigate } from "react-router-dom";
import CategoryListCard from "../../components/admin/CategoryListCard";
import { useCategories, useProducts } from "../../api/fetchApi";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseRequest } from "../../utils/baseRequest";

const CategoryListPage = () => {
  const { data: categories, error, isLoading } = useCategories();
  const {data: products} = useProducts();
  const navigate = useNavigate();
  const queryClinet = useQueryClient();

  //  DELETE Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) =>{
      await baseRequest.delete(`/categories/${id}/`)
    },
    onSuccess: ()=>{
      queryClinet.invalidateQueries(["categories"])
      toast.success("Category deleted successfully")
    },
    onError: (err)=>{
      console.error(err);
      toast.error("Failed to delete category")
    },
  })

  

  const handleDelete = (id)=> deleteMutation.mutate(id);

  // EDIT 
  const handleEdit = (cat) => {
    navigate(`/admin/product/list`)
  }
  
  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Add Category
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search categories..."
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Category Cards Grid */}
      {isLoading ? (
        <p>Loading....</p>
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {categories.map((cat) => {
            const productCount = products ? products.filter((p)=> p.category === cat.id).length : 0;
            return(
              <CategoryListCard key={cat.id} {...cat} 
              products={productCount}
              created={cat.created_at} 
              onEdit={()=>handleEdit(cat)} 
              onDelete={handleDelete} />
              
            )
            
})}
        </div>
      )}
    </div>
  );
};

export default CategoryListPage;
