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
    items = OrderItemSerializers(many=True)
    class Meta:
        model = Order
        fields = ['address', 'contact_no', 'email', 'payment_method', 'status', 'items', 'id', 'created_at', 'total_price']
    
    def create(self, validated_data):
        items_data = validated_data.pop('item')
        user = self.context['request'].user
        
        order = Order.objects.create(
            user = user,
            **validated_data
            
        )
        for item_data in items_data:
            product = items_data['product']
            price = product.price
            quantity = item_data['quantity']

            orderItem.objects.create(
                order = order,
                product = product,
                price = price,
                quantity = quantity
            )
        order.calculate_total()
        order.save()