import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";

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

    // react slick slider 
    var settings = {
        dots: false,             // No dots
        arrows: true,            // Show prev/next arrows
        infinite: true,          // Loop back to start
        speed: 500,             // Animation speed
        slidesToShow: 4,        // Show 4 products
        slidesToScroll: 1,      // Move 1 product at a time
        responsive: [
            {
              breakpoint: 1024, // tablets / small laptops
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 768, // big phones
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 480, // small phones
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            }
          ]
    };

    return (
        <div className='py-8 bg-white'>
            <div className='max-w-7xl mx-auto px-4'>
                <h1 className='text-3xl font-bold text-center text-gray-800 mb-8'>
                    Featured Products
                </h1>
                <Slider {...settings}>
                    {products.slice(0, 12).map(product => (
                        <div key={product.id} className="px-2 h-full">
                            <Link
                                to={`/product/${product.id}`}
                                className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col items-center text-center h-full block min-h-[300px] sm:min-h-[380px]">
                                <div className='h-36 w-full flex items-center justify-center mb-4'>
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="h-36 object-contain"
                                    />
                                </div>
                                <div className='h-14 mb-3 flex items-center'>
                                    <h2 className="text-sm font-semibold text-gray-700 line-clamp-2 leading-tight">
                                        {product.title}
                                    </h2>
                                </div>

                                <div className="flex items-center mb-3 mt-auto">
                                    <div className="flex items-center space-x-1">
                                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        <span className="text-sm font-medium text-slate-700">{product.rating.rate}</span>
                                        <span className="text-sm text-slate-500 ml-1">({product.rating.count})</span>
                                    </div>
                                </div>
                                
                                <div className="mt-2">
                                    <span className='text-lg font-bold text-gray-800'>${product.price}</span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Custom styles to ensure arrows are visible */}
            <style jsx>{`
                .slick-prev,
                .slick-next {
                    width: 30px;
                    height: 30px;
                    z-index: 1;
                }
                
                .slick-prev {
                    left: -40px;
                }
                
                .slick-next {
                    right: -40px;
                }
                
                .slick-prev:before,
                .slick-next:before {
                    color: #374151;
                    font-size: 24px;
                    font-weight: bold;
                }
                
                .slick-prev:hover:before,
                .slick-next:hover:before {
                    color: #f59e0b;
                }
            `}</style>
        </div>
    )
}

export default FeaturedSection;