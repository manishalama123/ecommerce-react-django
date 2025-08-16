import React from 'react'
import { useSelector, useDispatch } from "react-redux";

import { NavLink, Link } from 'react-router-dom';
import { incrementQty, decrementQty, removeItem, clearCart } from "../redux/slice/CartSlice";
function CheckoutPage() {
    const { cartItems, totalPrice, totalQuantity, totalItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
  return <>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Checkout</h1>
            <div className="flex items-center space-x-4 text-sm">
                <span className="flex items-center space-x-2">
                    <span className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs">1</span>
                    <span className="font-medium">Information</span>
                </span>
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
                <span className="flex items-center space-x-2 text-slate-400">
                    <span className="w-6 h-6 border-2 border-slate-300 rounded-full flex items-center justify-center text-xs">2</span>
                    <span>Payment</span>
                </span>
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
                <span className="flex items-center space-x-2 text-slate-400">
                    <span className="w-6 h-6 border-2 border-slate-300 rounded-full flex items-center justify-center text-xs">3</span>
                    <span>Confirmation</span>
                </span>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           
            <div className="space-y-8">
              
                <div className="bg-white rounded-lg border border-slate-200 p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Contact Information</h3>
                    <form id="checkoutForm" className="space-y-4">
                        <div>
                            <label for="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                            <input type="email" id="email" name="email" required 
                                   className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"/>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id="newsletter" name="newsletter" className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-slate-300 rounded"/>
                            <label for="newsletter" className="ml-2 block text-sm text-slate-600">
                                Email me with news and offers
                            </label>
                        </div>
                    </form>
                </div>

      
                <div className="bg-white rounded-lg border border-slate-200 p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Shipping Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="firstName" className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                            <input type="text" id="firstName" name="firstName" required 
                                   className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"/>
                        </div>
                        <div>
                            <label for="lastName" className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                            <input type="text" id="lastName" name="lastName" required 
                                   className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"/>
                        </div>
                        <div className="md:col-span-2">
                            <label for="address" className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                            <input type="text" id="address" name="address" required 
                                   className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"/>
                        </div>
                        <div className="md:col-span-2">
                            <label for="apartment" className="block text-sm font-medium text-slate-700 mb-2">Apartment, suite, etc. (optional)</label>
                            <input type="text" id="apartment" name="apartment" 
                                   className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"/>
                        </div>
                        <div>
                            <label for="city" className="block text-sm font-medium text-slate-700 mb-2">City</label>
                            <input type="text" id="city" name="city" required 
                                   className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"/>
                        </div>
                        <div>
                            <label for="state" className="block text-sm font-medium text-slate-700 mb-2">State</label>
                            <select id="state" name="state" required 
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                                <option value="">Select State</option>
                                <option value="AL">Alabama</option>
                                <option value="CA">California</option>
                                <option value="FL">Florida</option>
                                <option value="NY">New York</option>
                                <option value="TX">Texas</option>
                            </select>
                        </div>
                        <div>
                            <label for="zipCode" className="block text-sm font-medium text-slate-700 mb-2">ZIP Code</label>
                            <input type="text" id="zipCode" name="zipCode" required 
                                   className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"/>
                        </div>
                        <div>
                            <label for="phone" className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                            <input type="tel" id="phone" name="phone" 
                                   className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"/>
                        </div>
                    </div>
                </div>

               
                <div className="bg-white rounded-lg border border-slate-200 p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Shipping Method</h3>
                    <div className="space-y-3">
                        <label className="flex items-center p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                            <input type="radio" name="shipping" value="standard" checked className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-slate-300"/>
                            <div className="ml-3 flex-1">
                                <div className="flex justify-between">
                                    <span className="font-medium text-slate-900">Standard Shipping</span>
                                    <span className="text-slate-600">Free</span>
                                </div>
                                <p className="text-sm text-slate-500">5-7 business days</p>
                            </div>
                        </label>
                        <label className="flex items-center p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                            <input type="radio" name="shipping" value="express" className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-slate-300"/>
                            <div className="ml-3 flex-1">
                                <div className="flex justify-between">
                                    <span className="font-medium text-slate-900">Express Shipping</span>
                                    <span className="text-slate-600">$15.00</span>
                                </div>
                                <p className="text-sm text-slate-500">2-3 business days</p>
                            </div>
                        </label>
                        <label className="flex items-center p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                            <input type="radio" name="shipping" value="overnight" className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-slate-300"/>
                            <div className="ml-3 flex-1">
                                <div className="flex justify-between">
                                    <span className="font-medium text-slate-900">Overnight Shipping</span>
                                    <span className="text-slate-600">$25.00</span>
                                </div>
                                <p className="text-sm text-slate-500">Next business day</p>
                            </div>
                        </label>
                    </div>
                </div>

       
                <div className="bg-white rounded-lg border border-slate-200 p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Payment Method</h3>
                    <div className="space-y-4">
                        <div>
                            <label for="cardNumber" className="block text-sm font-medium text-slate-700 mb-2">Card Number</label>
                            <input type="text" id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" required 
                                   className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"/>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label for="expiryDate" className="block text-sm font-medium text-slate-700 mb-2">Expiry Date</label>
                                <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY" required 
                                       className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"/>
                            </div>
                            <div>
                                <label for="cvv" className="block text-sm font-medium text-slate-700 mb-2">CVV</label>
                                <input type="text" id="cvv" name="cvv" placeholder="123" required 
                                       className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"/>
                            </div>
                        </div>
                        <div>
                            <label for="cardName" className="block text-sm font-medium text-slate-700 mb-2">Name on Card</label>
                            <input type="text" id="cardName" name="cardName" required 
                                   className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"/>
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
    </div>
  </>
}

export default CheckoutPage
