from django.shortcuts import render
from .serializers import RegisterSerializer, CustomTokenObtainPairSerializer
from rest_framework import generics, status
from .models import *
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from google.oauth2 import id_token
from google.auth.transport import requests
from rest_framework_simplejwt.tokens import RefreshToken
User = get_user_model()

GOOGLE_CLIENT_ID = "603173519857-gs5o4k94j042ovod3mqg4itteen6tpah.apps.googleusercontent.com"

class RegisterUserView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class LoginUserView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    permission_classes = [AllowAny]

class GoogleLoginView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        token = request.data.get("token")
        if not token:
            return Response({"error": "Token is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)

            email = idinfo["email"]
            first_name = idinfo.get("given_name", "")
            last_name = idinfo.get("family_name", "")

            user, created = User.objects.get_or_create(
                email=email,
                defaults={"first_name": first_name, "last_name":last_name, "username":email.split("@")[0]},
            )
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "username": user.username,
                "email": user.email,
                "first_name": user.last_name,
                "role": "admin" if user.is_superuser else "staff" if user.is_staff else "user"
            })
        except ValueError:
            return Response({"error": "Invalid Google token"}, status=status.HTTP_400_BAD_REQUEST)