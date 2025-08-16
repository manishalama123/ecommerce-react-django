import React from 'react';
import { ShoppingBag, Star, Truck, Shield } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative bg-gray-900 overflow-hidden">
      
      {/* Main Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-yellow-500 bg-opacity-20 rounded-full border border-yellow-400">
                <Star className="w-4 h-4 text-yellow-400 mr-2" />
                <span className="text-sm font-medium text-yellow-200">Trending Now</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Discover Your
                <span className="block text-yellow-400">
                  Perfect Style
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 max-w-lg">
                Shop the latest trends with unbeatable prices and premium quality. 
                Free shipping on orders over $50.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                <ShoppingBag className="w-5 h-5" />
                <span>Shop Now</span>
              </button>
              
              <button className="px-8 py-4 border-2 border-white border-opacity-30 hover:border-opacity-50 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white hover:bg-opacity-10">
                View Collections
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">50K+</div>
                <div className="text-sm text-gray-400">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">1000+</div>
                <div className="text-sm text-gray-400">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">99%</div>
                <div className="text-sm text-gray-400">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Content - Product Showcase */}
          <div className="relative h-96">
            {/* Floating Product Cards */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-80 h-80">
                
                {/* Main Product Card */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-64 bg-white rounded-2xl shadow-2xl p-6 z-10">
                  <div className="h-32 bg-gray-200 rounded-xl mb-4 flex items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Premium Jacket</h3>
                  <p className="text-yellow-600 font-bold text-lg">$89.99</p>
                  <div className="flex items-center mt-2">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  </div>
                </div>

                {/* Floating Card 1 */}
                <div className="absolute top-0 right-0 w-32 h-40 bg-white bg-opacity-90 rounded-xl shadow-xl p-3 transform rotate-12">
                  <div className="h-20 bg-gray-200 rounded-lg mb-2"></div>
                  <p className="text-xs font-medium text-gray-700">New Arrival</p>
                  <p className="text-sm font-bold text-yellow-600">$49.99</p>
                </div>

                {/* Floating Card 2 */}
                <div className="absolute bottom-0 left-0 w-32 h-40 bg-white bg-opacity-90 rounded-xl shadow-xl p-3 transform -rotate-12">
                  <div className="h-20 bg-gray-200 rounded-lg mb-2"></div>
                  <p className="text-xs font-medium text-gray-700">Best Seller</p>
                  <p className="text-sm font-bold text-yellow-600">$129.99</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default HeroSection;