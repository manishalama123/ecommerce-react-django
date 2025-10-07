import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import OrderSummary from "../components/OrderSummary";
import { baseRequest } from "../utils/baseRequest";
import { toast } from "react-hot-toast"
import { clearCart } from "../redux/slice/cartSlice";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart)

  const mappedItems = cartItems.map(item => ({
    product: item.product,
    quantity: item.quantity
  }))
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {

    console.log("Mapped items for order:", mappedItems)

    // Fix: send mapped items, not raw cartItems
    const orderData = { ...data, items: mappedItems }
    console.log("Final orderData:", orderData)

    try {
      const response = await baseRequest.post('/order/create/', orderData);
      if (orderData.payment_method === "esewa") {
        navigate('/esewa', { state: { esewaData: response.data } })
      }
      else if (orderData.payment_method === "khalti") {
        window.location.href = response.data.payment_url;
      }
      else {
        toast.success("Order placed successfully!")
        // Clear cart only after successful order
        dispatch(clearCart())
      }
      console.log("Success:", response.data);
    } catch (error) {
      toast.error("Order failed!")
      console.log("❌ ERROR DATA:", error.response?.data)
    }
  }

  return (
    <div className="my-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Checkout
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" >
            {/* Email */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-slate-300"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Contact Number
              </label>
              <input
                {...register("contact_number")}
                type="text"
                placeholder="123-456-7890"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-slate-300"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Address</label>
              <textarea
                {...register("address")}
                placeholder="123 Main Street, City, Country"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-slate-300 resize-none"
                rows={3}
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Payment Method
              </label>
              <select
                {...register("payment_method")}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-slate-300"
              >
                <option value="cod">Cash on Delivery</option>
                <option value="esewa">eSewa</option>
                <option value="khalti">Khalti</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <OrderSummary
          showCheckoutButton={false}
        />
      </div>
    </div>
  );
};

export default CheckoutPage;
