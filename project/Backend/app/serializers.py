from .models import *
from rest_framework import serializers
 
class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializers(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class OrderItemSerializers(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(
        queryset = Product.objects.all()
    )
    product_title = serializers.CharField(source = "product.title", read_only = True)

    class Meta:

        model = OrderItem
        fields = ['product', 'product_title', 'quantity']


class OrderSerializers(serializers.ModelSerializer):
    # nested serializer
    items = OrderItemSerializers(many=True)
    id = serializers.ReadOnlyField()
    created_at = serializers.ReadOnlyField()
    total_price = serializers.ReadOnlyField()
    status = serializers.CharField(default='pending')
    class Meta:
        model = Order
        fields = ['address', 'contact_number', 'email', 'payment_method', 'status', 'items', 'id', 'created_at', 'total_price']
    
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        user = self.context['request'].user
        
        order = Order.objects.create(
            user = user,
            **validated_data
            
        )
        for item_data in items_data:
            product = item_data['product']
            quantity = item_data['quantity']

            OrderItem.objects.create(
                order = order,
                product = product,
                price = product.price,
                quantity = quantity
            )
        order.calculate_total()
        order.save()
        return order