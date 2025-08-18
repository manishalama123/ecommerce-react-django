from django.shortcuts import render
from .serializers import RegisterSerializer, CustomTokenObtainPairSerializer
from rest_framework import generics
from .models import *
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView


class RegisterUserView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class LoginUserView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    permission_classes = [AllowAny]

