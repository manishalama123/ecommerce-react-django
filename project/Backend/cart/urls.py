from django.urls import path
from . import views
urlpatterns = [
    path('', views.CartView.as_view(), name='cart-detail'),
    path('add/', views.AddToCartView.as_view(), name='add_to_cart'),
    path('update/<int:pk>/', views.UpdateCartItemView.as_view(), name='update-cart-item'),
    path('remove/<int:pk>/', views.RemoveCartItemView.as_view(), name='remove-cart-item'),
    path('clear/', views.ClearCartView.as_view(), name='clear-cart'),
]
