import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '../redux/slice/CartSlice';
import { useCategories, useProducts } from '../api/fetchApi';

function ProductsPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch categories and products (keeping original structure)
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data, isLoading, isError, error, refetch } = useProducts(selectedCategory === 'all' ? '' : selectedCategory);

  // Debug logs
  console.log('Selected Category:', selectedCategory);
  console.log('API Parameter:', selectedCategory === 'all' ? '' : selectedCategory);
  console.log('Products data:', data);

  const handleAddToCart = (e, product) => {
    e.preventDefault(); // Prevent navigation when clicking add to cart
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.info('Added to the Cart');
  };

  const handleCategoryClick = (category) => {
    console.log('Category clicked:', category); // Debug log
    setSelectedCategory(category);
    // Force refetch when category changes
    setTimeout(() => refetch(), 100);
  };

  const handleWishlist = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Add to wishlist:', productId);
    // Add your wishlist logic here
  };

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-red-600">Error loading products: {error?.message || 'Something went wrong'}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">All Products</h1>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0 hidden lg:block">
          <div className="bg-white p-6 rounded-lg border border-slate-200 sticky top-24">
            <h3 className="font-semibold text-slate-900 mb-4">Categories</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleCategoryClick('all')}
                className={`w-full text-left px-3 py-2 rounded-lg capitalize transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-amber-100 text-amber-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                All Products
              </button>

              {categoriesLoading ? (
                <div className="text-slate-500">Loading categories...</div>
              ) : (
                categories?.map((cat) => (
                  <button
                    key={cat.id || cat.name}
                    onClick={() => handleCategoryClick(cat.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg capitalize transition-colors ${
                      selectedCategory === cat.name
                        ? 'bg-amber-100 text-amber-700'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-slate-600">Loading products...</div>
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <p className="text-red-600">Error loading products: {error?.message || 'Something went wrong'}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
              >
                Try Again
              </button>
            </div>
          ) : !data || data.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600">No products found for the selected category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="relative group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-slate-100"
                >
                  <div className="block">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-48 object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleWishlist(e, product.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
                  >
                    <Heart className="w-4 h-4 text-slate-600" />
                  </button>

                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs text-slate-500">
                          {product.rating?.rate ? `${product.rating.rate}/5` : 'No rating'}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-sm font-semibold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors duration-200 line-clamp-2">
                      {product.title}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-slate-900">
                        ${product.price}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-all duration-200 text-xs font-medium flex items-center justify-center space-x-1"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;