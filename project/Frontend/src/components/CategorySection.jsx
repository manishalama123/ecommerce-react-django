import React from 'react'
import { useCategories } from '../api/fetchApi';

const CategorySection = () => {
    const { data: categories, isError, isLoading, error } = useCategories();

    return (
        <section className="my-8 px-4">
            <div className='max-w-7xl mx-auto px-4'>
                <div className="font-semibold text-center mb-4">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">Shop by Category</h2>
                </div>
    
                {isLoading ? (
                    <div className="text-center py-8">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-800 border-r-transparent"></div>
                        <p className="mt-2 text-gray-600">Loading categories...</p>
                    </div>
                ) : isError ? (
                    <div className="text-center text-red-600">
                        <p>Error loading categories: {error?.message}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-6 gap-2 md:gap-6">
                        {categories?.map((category, index) => (
                            <div key={index} className="relative h-32 md:h-48 rounded-lg md:rounded-xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
    
                                <div className="absolute bottom-0 left-0 right-0 p-1 md:p-4 text-white">
                                    <h3 className="text-xs md:text-lg font-bold capitalize mb-0.5 md:mb-1 drop-shadow-md">
                                        {category.name}
                                    </h3>
                                    <span className="text-[10px] md:text-sm flex items-center space-x-0.5 md:space-x-1 opacity-90 hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm rounded-full px-1.5 py-0.5 md:px-3 md:py-1 w-fit">
                                        <span className="hidden md:inline">Shop Now</span>
                                        <span className="md:hidden">Shop</span>
                                        <svg className="w-3 h-3 md:w-4 md:h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default CategorySection