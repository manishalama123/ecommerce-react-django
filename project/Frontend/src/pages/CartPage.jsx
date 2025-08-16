import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import { useSelector, useDispatch } from "react-redux";
import { incrementQty, decrementQty, removeItem, clearCart } from "../redux/slice/CartSlice";

function CartPage() {

    const { cartItems, totalPrice, totalQuantity, totalItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    // if (cartItems.length === 0) {
    //     return <div className="p-4">Your cart is empty.</div>;
    //   }
  return <>
   
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        { cartItems.length == 0 ? <>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart is Empty</h1>
                </div>
            </div>
        </div>
        </>:<>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {
                        cartItems.map((items) =>{
                            return <div key={items.id} className="p-6 border-b border-gray-200">
                        <div className="flex items-center space-x-4">
                            <img src= {items.image}
                                 alt="Wireless Headphones" className="w-20 h-20 object-cover rounded-lg" />
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900">{items.title}</h3>
                                <p className="text-gray-600">Category : {items.category}</p>
                                <div className="flex items-center mt-2 gap-4">
                                    <span className="text-xl font-bold text-gray-900">${items.price}</span>
                                    <div className="flex items-center space-x-3">
                                    <button onClick={()=> dispatch(removeItem(items.id))} className="text-red-600"  >
                                        Remove
                                    </button>
                               
                            </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <button onClick={()=> dispatch(decrementQty(items.id))} className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50" >
                                    <i data-lucide="minus" className="w-4 h-4">-</i>
                                </button>
                                <span id="qty-1" className="text-lg font-semibold">{items.quantity}</span>
                                <button onClick={()=> dispatch(incrementQty(items.id))} className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50" >
                                    <i data-lucide="plus" className="w-4 h-4">+</i>
                                </button>
                            </div>
                            
                            <div className="text-right">
                                <div className="text-xl font-bold text-gray-900">${items.price * items.quantity}</div>
                                <button className="text-red-600 hover:text-red-800 mt-2" >
                                    <i data-lucide="trash-2" className="w-4 h-4"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                        })
                    }

                    <div className="p-6">
                        <div className="flex justify-between items-center">
                            <a href="products.html" className="text-blue-600 hover:text-blue-800 font-medium">
                                <i data-lucide="arrow-left" className="w-4 h-4 inline mr-2"></i>
                                Continue Shopping
                            </a>
                            <button onClick={()=> dispatch(clearCart())} className="text-red-600 hover:text-red-800 font-medium" onclick="clearCart()">
                                <i data-lucide="trash-2" className="w-4 h-4 inline mr-2"></i>
                                Clear Cart
                            </button>
                        </div>
                    </div>
                </div>

                
            </div>

            <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                    
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal ({totalQuantity})</span>
                            <span className="font-semibold">${totalPrice}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Shipping</span>
                            <span className="font-semibold">$9.99</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Tax</span>
                            <span className="font-semibold">$64.00</span>
                        </div>
                        <hr className="border-gray-200" />
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span>${totalPrice + 9.99 + 64}</span>
                        </div>
                    </div>

                    <Link to="/checkout" className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4">
                        Proceed to Checkout
                    </Link>

                    <div className="text-center text-sm text-gray-500 mb-4">
                        <i data-lucide="shield-check" className="w-4 h-4 inline mr-1"></i>
                        Secure checkout with SSL encryption
                    </div>

                    <div className="border-t pt-4">
                        <p className="text-sm text-gray-600 mb-2">We accept:</p>
                        <div className="flex space-x-2">
                            <div className="w-8 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center">VISA</div>
                            <div className="w-8 h-6 bg-red-600 rounded text-white text-xs flex items-center justify-center">MC</div>
                            <div className="w-8 h-6 bg-blue-800 rounded text-white text-xs flex items-center justify-center">AMEX</div>
                            <div className="w-8 h-6 bg-yellow-500 rounded text-white text-xs flex items-center justify-center">PP</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>}

        <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400" 
                         alt="Camera Lens" className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">Professional Camera Lens</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-gray-900">$899.99</span>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add to Cart</button>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img src="https://images.pexels.com/photos/586996/pexels-photo-586996.jpeg?auto=compress&cs=tinysrgb&w=400" 
                         alt="Office Chair" className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">Ergonomic Office Chair</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-gray-900">$449.99</span>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add to Cart</button>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img src="https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=400" 
                         alt="Gaming Mouse" className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">Wireless Gaming Mouse</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-gray-900">$79.99</span>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add to Cart</button>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img src="https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400" 
                         alt="Coffee Maker" className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">Premium Coffee Maker</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-gray-900">$249.99</span>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  
  </>
}

export default CartPage
