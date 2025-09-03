import React, { useState,useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useMutation } from "@tanstack/react-query"
import { baseRequest } from '../utils/baseRequest'
import { Check, X } from "lucide-react";

const EsewaSuccessPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5)
    const [searchParams, setSearchParams] = useSearchParams()
    const data = searchParams.get('data')

    const { mutate, data: resData, isLoading, isError, error } = useMutation({
        mutationKey: ['order_success'],
        mutationFn: async (orderData) => {
            const res = await baseRequest.post('/esewa/success/', orderData)
            return res.data
        }
    })
    useEffect(() => {
        if (id && data) {
            mutate({ order_id: id, data: data })
        }
    }, [id, data, mutate])

    // Countdown redirect
    useEffect(() => {
        if (resData || isError) {
            const interval = setInterval(() => setCountdown((prev) => prev - 1), 1000);
            const timeout = setTimeout(() => navigate("/"), 3000);
            return () => {
                clearInterval(interval);
                clearTimeout(timeout);
            };
        }
    }, [resData, isError, navigate]);

    const success = resData?.message.toLowerCase().includes("success");
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
                        Redirecting to your orders page in <span className="font-semibold">{countdown}</span> seconds...
                    </p>
                )}
                {!isLoading && (
                    <button
                        onClick={() => navigate("/orders/list")}
                        className="mt-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                    >
                        Go Now
                    </button>
                )}
            </div>
        </div>
    )
}

export default EsewaSuccessPage
