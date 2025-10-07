import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation } from "@tanstack/react-query";
import { baseRequest } from '../utils/baseRequest';
import { Check, X } from "lucide-react";
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/slice/cartSlice';

const KhaltiCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [countdown, setCountdown] = useState(5);
  const [searchParams] = useSearchParams();
  
  const pidx = searchParams.get('pidx');
  const status = searchParams.get('status');
  const purchase_order_id = searchParams.get('purchase_order_id');

  const { mutate, data: resData, isLoading, isError, error } = useMutation({
    mutationKey: ['khalti_verify'],
    mutationFn: async () => {
      const res = await baseRequest.get(`/khalti/callback/?pidx=${pidx}&status=${status}&purchase_order_id=${purchase_order_id}`);
      return res.data;
    }
  });

  useEffect(() => {
    if (pidx && status) {
      mutate();
    }
  }, [pidx, status, mutate]);

  // Countdown redirect
  useEffect(() => {
    if (resData || isError) {
      const interval = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      const timeout = setTimeout(() => {
        if (resData?.status === "success") {
          dispatch(clearCart());
          navigate("/");
        } else {
          navigate("/checkout");
        }
      }, 5000);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [resData, isError, navigate, dispatch]);

  const success = resData?.status === "success";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white shadow rounded-xl p-10 max-w-md w-full text-center">
        {isLoading && <p className="text-gray-600 mb-4">Verifying payment...</p>}
        {!isLoading && success && <Check className="mx-auto h-20 w-20 text-green-500 mb-4" />}
        {!isLoading && isError && <X className="mx-auto h-20 w-20 text-red-500 mb-4" />}
        {!isLoading && (
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {resData?.message || (isError ? "Payment verification failed." : "No payment data received.")}
          </h1>
        )}
        {!isLoading && (
          <p className="text-gray-600 mb-4">
            Redirecting in <span className="font-semibold">{countdown}</span> seconds...
          </p>
        )}
        {!isLoading && success && (
          <button
            onClick={() => {
              dispatch(clearCart());
              navigate("/");
            }}
            className="mt-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Go to Orders
          </button>
        )}
        {!isLoading && !success && (
          <button
            onClick={() => navigate("/checkout")}
            className="mt-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default KhaltiCallback;