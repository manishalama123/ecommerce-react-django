import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Filter, Heart } from 'lucide-react';
import { addToCart } from '../redux/slice/CartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';


function ProductsPage({ product }) {

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleAddToCart = (product) => {

    dispatch(addToCart(product));
    toast.info('Added to the Cart')
  }

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(['all']);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products/');
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  // FILTERING
  useEffect(() => {
    let filtered = [...products];
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.category === selectedCategory);
      
    }
    if (selectedPriceRange !== 'all') {
      filtered = filtered.filter(product =>{
        const price = product.price;
        switch(selectedPriceRange){
          case 'under-50':
            return price<50;
          case '50-100':
            return price >= 50 && price <= 100;
          case '100-200':
            return price>=100 && price<= 200;
          case 'over-200':
            return price > 200;
          default:
            return true;
        }
      });
    }
    setFilteredProducts(filtered);


  }, [products, selectedCategory, selectedPriceRange]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  }
  const handlePriceRangeClick = (priceRange) => {
    setSelectedPriceRange(priceRange);
  }
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">All Products</h1>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-slate-600">
              Showing {filteredProducts.length} products
            </p>

            <div className="flex items-center space-x-4">
              <select className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="w-64 flex-shrink-0 hidden lg:block">
            <div className="bg-white p-6 rounded-lg border border-slate-200 sticky top-24">
              <h3 className="font-semibold text-slate-900 mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryClick('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg capitalize transition-colors ${selectedCategory === 'all'
                    ? 'bg-amber-100 text-amber-700'
                    : 'text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  All Products
                </button>
                <button
                  onClick={() => handleCategoryClick('Electronics')}
                  className={`w-full text-left px-3 py-2 rounded-lg capitalize transition-colors ${selectedCategory === 'Electronics'
                    ? 'bg-amber-100 text-amber-700'
                    : 'text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  Electronics
                </button>
                <button
                  onClick={() => handleCategoryClick('Accessories')}
                  className={`w-full text-left px-3 py-2 rounded-lg capitalize transition-colors ${selectedCategory === 'Accessories'
                    ? 'bg-amber-100 text-amber-700'
                    : 'text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  Accessories
                </button>
                <button
                  onClick={() => handleCategoryClick("Mens")}
                  className={`w-full text-left px-3 py-2 rounded-lg capitalize transition-colors ${selectedCategory === "Mens"
                    ? 'bg-amber-100 text-amber-700'
                    : 'text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  Mens
                </button>
                <button
                  onClick={() => handleCategoryClick("Womens")}
                  className={`w-full text-left px-3 py-2 rounded-lg capitalize transition-colors ${selectedCategory === "Womens"
                    ? 'bg-amber-100 text-amber-700'
                    : 'text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  Womens
                </button>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-slate-900 mb-4">Price Range</h3>
                <div className="space-y-2">
                <button 
                    onClick={() => handlePriceRangeClick('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedPriceRange === 'all'
                      ? 'bg-amber-100 text-amber-700'
                      : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    All Prices
                  </button>
                  <button 
                    onClick={() => handlePriceRangeClick('under-50')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedPriceRange === 'under-50'
                      ? 'bg-amber-100 text-amber-700'
                      : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Under $50
                  </button>
                  <button 
                    onClick={() => handlePriceRangeClick('50-100')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedPriceRange === '50-100'
                      ? 'bg-amber-100 text-amber-700'
                      : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    $50 - $100
                  </button>
                  <button 
                    onClick={() => handlePriceRangeClick('100-200')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedPriceRange === '100-200'
                      ? 'bg-amber-100 text-amber-700'
                      : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    $100 - $200
                  </button>
                  <button 
                    onClick={() => handlePriceRangeClick('over-200')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedPriceRange === 'over-200'
                      ? 'bg-amber-100 text-amber-700'
                      : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    $200+
                  </button>

                </div>
              </div>
              {/* Clear All Filters Button */}
              {(selectedCategory !== 'all' || selectedPriceRange !== 'all') && (
                <div className="mt-6">
                  <button 
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedPriceRange('all');
                    }}
                    className="w-full px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
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
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                    </div>
                  </div>

                  <button
                    onClick={() => console.log('Add to wishlist:', product.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
                  >
                    <Heart className="w-4 h-4 text-slate-600" />
                  </button>

                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-medium text-slate-700"></span>
                      </div>
                      <span className="text-xs text-slate-500 ml-1"></span>
                    </div>

                    <div className="block h-14">
                      <h3 className="text-sm font-semibold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors duration-200">
                        {product.title}
                      </h3>
                    </div>
                    <div className="block">
                      <h3 className="text-sm font-semibold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors duration-200">
                        {product.price}
                      </h3>
                    </div>




                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-all duration-200 text-xs font-medium flex items-center space-x-1">
                      <ShoppingCart className="w-3 h-3" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </Link>

              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductsPage;