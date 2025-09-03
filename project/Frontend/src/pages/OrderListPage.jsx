import React from "react";
import { useOrder } from "../api/fetchApi";


const OrderListPage = () => {
  const{data:orderlist, isLoading, isError, error} = useOrder();
  if(isLoading) return <p>loading...</p>
  if(isError) return <p>Error: {error.message}</p>
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h2 className="text-3xl font-bold mb-6 text-slate-700">Order List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-slate-200 bg-white rounded-lg shadow-sm">
          <thead className="bg-slate-100 text-slate-700 uppercase text-sm tracking-wider">
            <tr>
              <th className="px-6 py-3 border-b border-slate-200 text-left">Order ID</th>
              <th className="px-6 py-3 border-b border-slate-200 text-left">Customer</th>
              <th className="px-6 py-3 border-b border-slate-200 text-left">Items</th>
              <th className="px-6 py-3 border-b border-slate-200 text-left">Total ($)</th>
              <th className="px-6 py-3 border-b border-slate-200 text-left">Payment Method</th>
              <th className="px-6 py-3 border-b border-slate-200 text-left">Status</th>
              <th className="px-6 py-3 border-b border-slate-200 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="text-slate-600">
            {isLoading? "Loading":
            isError? <p>{error.message}</p>:
            orderlist?.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50 transition-colors duration-200">
                <td className="px-6 py-4 border-b border-slate-200 font-medium">{order.id}</td>
                <td className="px-6 py-4 border-b border-slate-200">
                  <p>{order.email}</p>
                  <p className="text-sm text-slate-400">{order.contact_number}</p>
                </td>
                <td className="px-6 py-4 border-b border-slate-200">
                  {order.items.map((item) => (
                    <div key={item.product} className="flex gap-2 items-center">
                      <p className="font-medium">{item.product_name}</p>
                      <span className="text-sm text-slate-500">x Qty: {item.quantity}</span>
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4 border-b border-slate-200">{order.total_price}</td>
                <td className="px-6 py-4 border-b border-slate-200 capitalize">{order.payment_method}</td>
                <td className="px-6 py-4 border-b border-slate-200">
                  {order.status.toLowerCase() === "paid" ? (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Completed
                    </span>
                  ) : (
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 border-b border-slate-200 text-sm text-slate-500">
                  {new Date(order.created_at).toLocaleString("en-US", {
                    timeZone: "Asia/Kathmandu",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderListPage;