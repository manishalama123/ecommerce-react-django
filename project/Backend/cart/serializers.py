from rest_framework import serializers
from .models import *
from app.serializers import ProductSerializers

class CartItemSerializer(serializers.ModelSerializer):
    # ✅ This is for display purposes on GET requests
    product_details = ProductSerializers(source='product', read_only=True)
    
    # ✅ This is for creating/updating the cart item on POST/PUT
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_details', 'quantity', 'created_at']
        extra_kwargs = {
            'product': {'write_only': True}
        }

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    class Meta:
        model = Cart
        fields = ['id', 'items', 'created_at', 'updated_at']

