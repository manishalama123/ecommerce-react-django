import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import KhaltiCheckout from 'khalti-checkout-web';
import { baseRequest } from '../utils/baseRequest';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/slice/cartSlice';

const KhaltiPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const khaltiData = location?.state?.khaltiData;

  useEffect(() => {
    if (!khaltiData) {
      toast.error("No payment data found");
      navigate('/checkout');
      return;
    }

    let config = {
      publicKey: khaltiData.public_key,
      productIdentity: khaltiData.product_identity,
      productName: khaltiData.product_name,
      productUrl: "http://localhost:5173",
      eventHandler: {
        onSuccess(payload) {
          console.log("✅ Khalti Payment Success:", payload);
          
          // Verify payment with backend
          baseRequest.post('/khalti/verify/', {
            token: payload.token,
            amount: payload.amount,
            order_id: khaltiData.order_id
          })
          .then(response => {
            toast.success("Payment verified successfully!");
            dispatch(clearCart());
            navigate('/orders/list');
          })
          .catch(error => {
            console.error("Verification failed:", error);
            toast.error("Payment verification failed!");
            navigate('/checkout');
          });
        },
        onError(error) {
          console.log("❌ Khalti Error:", error);
          toast.error("Payment failed!");
          navigate('/checkout');
        },
        onClose() {
          console.log('Khalti widget closed');
          toast.error("Payment cancelled!");
          navigate('/checkout');
        }
      },
      paymentPreference: ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"],
    };

    let checkout = new KhaltiCheckout(config);
    checkout.show({ amount: khaltiData.amount });

  }, [khaltiData, navigate, dispatch]);

  if (!khaltiData) {
    return <p>No Khalti data available</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow rounded-xl p-10 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Processing Payment</h2>
        <p className="text-gray-600">Please complete your payment in the Khalti window...</p>
      </div>
    </div>
  );
};

export default KhaltiPayment;