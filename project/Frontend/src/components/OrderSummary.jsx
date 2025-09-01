import React from 'react'
import { useCart } from '../api/fetchApi';
import { Link } from 'react-router-dom';

const OrderSummary = ({showCheckoutButton=true}) => {
    const {data: cartData, isLoading, isError, error, refetch} = useCart();
    const cartItems = cartData?.items || [];
    const totalPrice = cartItems.reduce((sum, item)=> sum + (parseFloat(item.product_details.price)*item.quantity), 0);
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  return (
    <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Order Summary
            </h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Subtotal ({totalQuantity} items)
                </span>
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
                <span>${(totalPrice + 9.99 + 64).toFixed(2)}</span>
              </div>
            </div>
            {showCheckoutButton &&(
                <Link
              to="/checkout"
              className="w-full bg-slate-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-slate-700 transition-colors block text-center"
            >
              Proceed to Checkout
            </Link>
            )
            }
            
            <div className="text-center text-sm text-gray-500 mt-4">
              <i data-lucide="shield-check" className="w-4 h-4 inline mr-1"></i>
              Secure checkout with SSL encryption
            </div>
          </div>
        </div>
  )
}

export default OrderSummary;