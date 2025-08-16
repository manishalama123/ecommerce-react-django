from django.contrib import admin
from django.urls import path, include
from .views import *

urlpatterns = [
    path('products/',ProductList.as_view(), name='product_list' ),
    path('product/<int:pk>/',ProductDetail.as_view(), name='product_detail' ),
    path('product/add',ProductCreate.as_view(), name='product_add' ),
    path('product/delete/<int:pk>/',ProductDelete.as_view(), name='product_delete' ),

    path('categories/',CategoryList.as_view(), name='category_list' ),
    path('category/<int:pk>/',CategoryDetail.as_view(), name='category_detail' ),
    path('category/add',CategoryCreate.as_view(), name='category_add' ),
    path('category/delete/<int:pk>/',CategoryDelete.as_view(), name='category_delete' ),
    path('category/update/<int:pk>/',CategoryUpdate.as_view(), name='category_update' ),
]