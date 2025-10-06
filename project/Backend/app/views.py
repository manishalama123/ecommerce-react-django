from rest_framework import generics
from .models import *
from .serializers import *
from django_filters.rest_framework import DjangoFilterBackend # type: ignore
from rest_framework import filters
from rest_framework.permissions import IsAdminUser,IsAuthenticated,AllowAny
from rest_framework.response import Response
import hmac, hashlib, base64, uuid, json
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.conf import settings
import requests

# list and craete category
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializers
    permission_classes = [IsAdminUser]

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAdminUser()]


class CategoryRetriveDeleteUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializers
    permission_classes = [IsAdminUser]

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAdminUser()]


# product

class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializers
    permission_classes = [AllowAny]

    filter_backends = [DjangoFilterBackend,filters.SearchFilter,filters.OrderingFilter]
    filterset_fields = ['category__name']

    search_fields = ['name']
    ordering_fields = ['price','created_at']

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAdminUser()]

class ProductRetriveDeleteUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializers

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAdminUser()]

# generate signature(FOR ESEWA)
def generate_signature(key, message):
    key = key.encode('utf-8')
    message = message.encode('utf-8')
    hmac_sha256 = hmac.new(key, message, hashlib.sha256)
    digest = hmac_sha256.digest()
    signature = base64.b64encode(digest).decode('utf-8')
    return signature

# PAYMENT METHODS
class OrderCreateView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializers
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializers = self.get_serializer(data = request.data)
        serializers.is_valid(raise_exception = True)
        order = serializers.save()
        payment_method = request.data.get("payment_method")

        if payment_method == "cod":
            order.save()
            return Response({"message" : "Order placed successfully"})
        
        elif payment_method == "esewa":
            transaction_uuid = uuid.uuid4()
            tax_amount = 0
            total_amount = "{:.2f}".format(order.total_price + tax_amount)

            signed_field_names = "total_amount,transaction_uuid,product_code"
            secret_key = '8gBm/:&EnhH.1/q'
            data_to_sign = (
                f"total_amount={total_amount},"
                f"transaction_uuid={transaction_uuid},"
                f"product_code=EPAYTEST"
            )
            result = generate_signature(secret_key, data_to_sign)
            order.save()

            return Response({
                "order_id": order.id,
                "amount": order.total_price,
                "tax_amount": tax_amount,
                "total_amount": total_amount,
                "transaction_uuid": transaction_uuid,
                "product_delivery_charge": 0,
                "product_service_charge": 0,
                "product_code": "EPAYTEST",
                "signature": result,
                "signed_field_names": signed_field_names,
                "success_url": f"http://localhost:5173/esewa/success/{order.id}",
                "failure_url": "https://developer.esewa.com.np/failure"
            }, status=status.HTTP_201_CREATED)

        elif payment_method == "khalti":
            order.save()

            return Response({
                "order_id": order.id,
                "amount": int(order.total_price * 100),  # Khalti expects amount in paisa (Rs * 100)
                "public_key": settings.KHALTI_PUBLIC_KEY,
                "product_identity": f"ORDER-{order.id}",
                "product_name": f"Order #{order.id}",

            }, status=status.HTTP_201_CREATED)
            
        return Response({"message": "Invalid payment method"})

# HANDLES ESEWA TRANSACTION
@method_decorator(csrf_exempt, name='dispatch') 
class EsewaSuccessAPIView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        print("🚨 WEBHOOK CALLED!")
        order_id = request.data.get("order_id")
        data = request.data.get("data")

        if not order_id or not data:
            return Response(
                {"message": "Missing order_id or data"},
                status=status.HTTP_400_BAD_REQUEST
            )
        order = get_object_or_404(Order, id=order_id)

        try:
            decoded_data = base64.b64decode(data).decode("utf-8")
            data_dict = json.loads(decoded_data)
        except Exception as e:
            return Response(
                {"message": f"Failed to decode data: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )

        status_value = data_dict.get("status", "").upper()

        if status_value == "COMPLETE":
            order.status = "paid"
            order.save()
            return Response({"message": "Payment successful. Order completed."}, status=status.HTTP_200_OK)
        else:
            return Response({"message": f"Transaction status: {status_value}"}, status=status.HTTP_200_OK)

# HANDLES KHALTI TRANSACTIONS
@method_decorator(csrf_exempt, name='dispatch')
class KhaltiVerifyAPIView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        token = request.data.get('token')
        amount = request.data.get('amount')
        order_id = request.data.get('order_id')
        
        if not token or not amount or not order_id:
            return Response(
                {"message": "Missing required fields"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        order = get_object_or_404(Order, id=order_id)
        
        # Verify payment with Khalti
        url = "https://khalti.com/api/v2/payment/verify/"
        headers = {"Authorization": f"Key {settings.KHALTI_SECRET_KEY}"}
        payload = {
            "token": token,
            "amount": amount
        }
        
        try:
            response = requests.post(url, headers=headers, data=payload)
            response_data = response.json()
            
            if response.status_code == 200 and response_data.get('idx'):
                # Payment verified successfully
                order.status = 'paid'
                order.save()
                return Response({
                    "message": "Payment verified successfully",
                    "order_id": order.id
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    "message": "Payment verification failed",
                    "error": response_data
                }, status=status.HTTP_400_BAD_REQUEST)
                
        except Exception as e:
            return Response({
                "message": f"Error verifying payment: {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# ORDERSORTING         
class OrderListView(generics.ListAPIView):
    serializer_class = OrderSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Order.objects.all().order_by('-created_at')
        return Order.objects.filter(user=user).order_by('created_at')