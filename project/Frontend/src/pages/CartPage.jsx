import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Keep useDispatch for dispatching thunks for actions
import { ShoppingCart as ShoppingCartIcon, Minus, Plus, Trash2 } from 'lucide-react'; // Import Lucide icons

import {
    fetchCart,
    updateCartItem,
    removeCartItem,
} from '../redux/slice/cartSlice.js';
import { useCart } from '../api/fetchApi'; // Make sure this path is correct

function CartPage() {
    const dispatch = useDispatch();

    // ✅ Use useCart from React Query to fetch the data
    const { data: cartData, isLoading, isError, error, refetch } = useCart();

    // Use a derived state for cart items and totals from React Query's data
    const cartItems = cartData?.items || [];
    const totalPrice = cartItems.reduce((sum, item) => sum + (parseFloat(item.product_details.price)*item.quantity), 0);
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)
     // Assuming totalItems is just the count of unique products

    // When an item is updated or removed, we want to refetch the cart
    // This effect will re-run `useCart` query after a dispatch action if needed.
    // However, it's generally better to use onSuccess callbacks for mutations
    // in conjunction with queryClient.invalidateQueries(['cart']) for immediate updates.

    // Handle button clicks to dispatch async thunks
    const handleIncrementQty = async (item, currentQuantity) => {
        try {
            await dispatch(updateCartItem({ 
                id: item.id, 
                productId: item.product.id || item.product,
                quantity: currentQuantity + 1 })).unwrap();
            refetch(); // Refetch the cart data after successful update
        } catch (err) {
            console.error("Failed to increment quantity:", err);
            // Optionally show a toast error
        }
    };

    const handleDecrementQty = async (item, currentQuantity) => {
        if (currentQuantity > 1) {
            try {
                await dispatch(updateCartItem({ 
                    id: item.id, 
                    productId: item.product.id || item.product, 
                    quantity: currentQuantity - 1 
                })).unwrap();
                refetch();
            } catch (err) {
                console.error("Failed to decrement quantity:", err);
            }
        } else {
            handleRemoveItem(item.id);
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            await dispatch(removeCartItem(itemId)).unwrap();
            refetch(); // Refetch the cart data after successful removal
        } catch (err) {
            console.error("Failed to remove item:", err);
            // Optionally show a toast error
        }
    };

    const handleClearCart = () => {
        // This functionality needs a dedicated thunk that clears all items from the backend
        alert("Clear Cart functionality requires a new thunk to be implemented and dispatched.");
    };


    if (isLoading) {
        return <div className="p-4 text-center text-gray-500">Loading your cart...</div>;
    }
    if (isError) {
        return <div className="p-4 text-center text-red-600">Error: {error?.message || 'Something went wrong'}. Please try again.</div>;
    }

    // Check if cartItems is empty after loading
    if (cartItems.length === 0) {
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
                                        src={item.product_details.image} // Assuming item directly has image and title
                                        alt={item.product_details.title}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900">{item.product_details.title}</h3>
                                        <p className="text-gray-600">Category: {item.product_details.category}</p>
                                        <div className="flex items-center mt-2 gap-4">
                                            <span className="text-xl font-bold text-gray-900">${item.product_details.price}</span>
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
                                            onClick={() => handleDecrementQty(item, item.quantity)}
                                            className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="text-lg font-semibold">{item.quantity}</span>
                                        <button
                                            onClick={() => handleIncrementQty(item, item.quantity)}
                                            className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-bold text-gray-900">${(item.product_details.price * item.quantity)}</div>
                                        <button
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="text-red-600 hover:text-red-800 mt-2"
                                        >
                                            <Trash2 className="w-4 h-4" />
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
                                <span className="text-gray-600">Subtotal ({totalQuantity} items)</span>
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
                                <span>${(totalPrice + 9.99 + 64.00)}</span>
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