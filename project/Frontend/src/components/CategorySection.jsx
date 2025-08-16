import React, { useEffect, useState } from 'react'
import axios from 'axios';

const categoryImages = {
    electronics: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
    jewelery: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=400',
    "men's clothing": 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400',
    "women's clothing": 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=80&q=80',
};

const CategorySection = () => {
    const [categories, setcategories] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products/categories');
                setcategories(response.data);
                console.log('API categories:', response.data); // DEBUG
                console.log('Available images:', Object.keys(categoryImages)); // DEBUG
            }
            catch (err) {
                console.error('Error fetching products:', err);
            }
        };
        fetchProducts()
    }, [])

    return (
        <section className="my-8 px-4">
            <div className="font-semibold text-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Shop by Category</h2>
            </div>


            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((category, index) => (
                    <div key={index} className="relative h-48 rounded-xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        <img
                            src={categoryImages[category]}
                            alt={category}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                            <h3 className="text-lg font-bold capitalize mb-1 drop-shadow-md">
                                {category}
                            </h3>
                            <span className="text-sm flex items-center space-x-1 opacity-90 hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 w-fit">
                                <span>Shop Now</span>
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
                                </svg>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategorySection