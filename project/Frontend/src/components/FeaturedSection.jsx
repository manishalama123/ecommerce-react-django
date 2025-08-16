import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedSection = () => {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                setProducts(response.data)
            }
            catch (err) {
                console.error('Error loading ', err)
            }
        };
        fetchProduct();

    }, []);
    return (
        <div className='py-8 bg-white'>
            <h1 className='text-3xl font-bold text-center text-gray-800 mb-8'>
                Featured Products
            </h1>
            <div className='grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-6 gap-8 px-4 mx-auto'>
                {products.slice(0, 6).map(product => (

                    <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col items-center text-center">
                        <div className='h-40 w-full flex items-center justify-center mb-4'>
                            <img
                                src={product.image}
                                alt={product.title}
                                className="h-40 object-contain"
                            />
                        </div>
                        <div className='h-14'>
                            <h2
                                className="text-lg font-semibold text-gray-700 line-clamp-2">
                                {product.title}
                            </h2>

                        </div>

                        
                        <div className="flex items-center mb-2">
                            <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                <span className="text-xs font-medium text-slate-700">{product.rating.rate}</span>
                                <span className="text-xs text-slate-500 ml-1">({product.rating.count})</span>
                            </div>
                            
                        </div>
                        <div>
                            <span className='text-xl font-semibold'>${product.price}</span>
                        </div>
                        



                    </Link>

                ))}
            </div>
        </div>
    )
}

export default FeaturedSection;
