import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchCart,
    addItemToCart, // You might need this from a different component, but good to have it here for context
    updateCartItem,
    removeCartItem,
} from '../redux/slice/cartSlice.js';

function CartPage() {
    const dispatch = useDispatch();
    const { cartItems, totalQuantity, totalPrice, totalItems, loading, error } = useSelector(state => state.cart);

    // Fetch the cart data when the component first mounts.
    useEffect(() => {
        // Only fetch if the loading state is 'idle' to prevent multiple fetches
        if (loading === 'idle') {
            dispatch(fetchCart());
        }
    }, [dispatch, loading]);

    // Handle button clicks to dispatch async thunks
    const handleIncrementQty = (itemId, currentQuantity) => {
        // This will call the API to update the quantity
        dispatch(updateCartItem({ id: itemId, quantity: currentQuantity + 1 }));
    };

    const handleDecrementQty = (itemId, currentQuantity) => {
        if (currentQuantity > 1) {
            // Only update if quantity is greater than 1
            dispatch(updateCartItem({ id: itemId, quantity: currentQuantity - 1 }));
        } else {
            // Remove the item if the quantity is 1 and the user decrements it
            dispatch(removeCartItem(itemId));
        }
    };

    const handleRemoveItem = (itemId) => {
        dispatch(removeCartItem(itemId));
    };

    const handleClearCart = () => {
        // You would need a new thunk for this, let's create a placeholder
        // dispatch(clearAllCartItems());
        alert("Clear Cart functionality requires a new thunk to be implemented.");
    };

    // --- Conditional Rendering for UI States ---
    if (loading === 'pending') {
        return <div className="p-4 text-center text-gray-500">Loading your cart...</div>;
    }

    if (error) {
        return <div className="p-4 text-center text-red-600">Error: {error}. Please try again.</div>;
    }

    if (cartItems?.length === 0) {
        return (
            <div className="p-4 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
                <Link to="/products" className="text-blue-600 hover:underline">
                    Continue Shopping
                </Link>
            </div>
        );
    }
    
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        {cartItems.map((item) => (
                            <div key={item.id} className="p-6 border-b border-gray-200">
                                <div className="flex items-center space-x-4">
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className="w-20 h-20 object-cover rounded-lg" 
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                                        <p className="text-gray-600">Category: {item.category}</p>
                                        <div className="flex items-center mt-2 gap-4">
                                            <span className="text-xl font-bold text-gray-900">${item.price}</span>
                                            <div className="flex items-center space-x-3">
                                                <button 
                                                    onClick={() => handleRemoveItem(item.id)} 
                                                    className="text-red-600"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <button 
                                            onClick={() => handleDecrementQty(item.id, item.quantity)} 
                                            className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                                        >
                                            <i data-lucide="minus" className="w-4 h-4">-</i>
                                        </button>
                                        <span className="text-lg font-semibold">{item.quantity}</span>
                                        <button 
                                            onClick={() => handleIncrementQty(item.id, item.quantity)} 
                                            className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                                        >
                                            <i data-lucide="plus" className="w-4 h-4">+</i>
                                        </button>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
                                        <button 
                                            onClick={() => handleRemoveItem(item.id)} 
                                            className="text-red-600 hover:text-red-800 mt-2"
                                        >
                                            <i data-lucide="trash-2" className="w-4 h-4"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="p-6">
                            <div className="flex justify-between items-center">
                                <Link to="/products" className="text-blue-600 hover:text-blue-800 font-medium">
                                    <i data-lucide="arrow-left" className="w-4 h-4 inline mr-2"></i>
                                    Continue Shopping
                                </Link>
                                <button
                                    onClick={handleClearCart}
                                    className="text-red-600 hover:text-red-800 font-medium"
                                >
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
                                <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
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
                                <span>${(totalPrice + 9.99 + 64.00).toFixed(2)}</span>
                            </div>
                        </div>
                        <Link 
                            to="/checkout" 
                            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors block text-center"
                        >
                            Proceed to Checkout
                        </Link>
                        <div className="text-center text-sm text-gray-500 mt-4">
                            <i data-lucide="shield-check" className="w-4 h-4 inline mr-1"></i>
                            Secure checkout with SSL encryption
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;