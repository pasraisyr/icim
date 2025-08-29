from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.utils import timezone
from datetime import datetime, timedelta, date
from django.core.files.storage import FileSystemStorage
from rest_framework.response import Response
from icims_backend.models import CustomUser
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from rest_framework import views, permissions, status
from rest_framework.permissions import IsAuthenticated

from icims_backend.serializers import ObtainTokenSerializer
from icims_backend.EmailBackEnd import JWTAuthentication
from icims_backend.EmailBackEnd import EmailBackEnd
from django.views.decorators.csrf import csrf_exempt


User = get_user_model()


class UserLoginAPI(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        try:
            # Handle both formats: {"user": {"email": ..., "password": ...}} and {"email": ..., "password": ...}
            user_data = request.data.get('user', request.data)
            print(user_data)
            if not user_data:
                return Response({'error': 'No user data provided'}, status=status.HTTP_400_BAD_REQUEST)
            
            email = user_data.get('username')
            password = user_data.get('password')
            
            print(f"Login attempt - Email: {email}, Password provided: {bool(password)}")
            
            if not email or not password:
                return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Check if user exists first
            try:
                user_obj = CustomUser.objects.get(email=email)
                print(f"User found: {user_obj.email}, User ID: {user_obj.id}")
            except CustomUser.DoesNotExist:
                print(f"User not found with email: {email}")
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
            
            # Authenticate user
            user = EmailBackEnd.authenticate(request, username=email, password=password)
            print(f"Authentication result: {user}")
            
            if user is not None:
                login(request, user)
                
                # Generate JWT token using the same method as ObtainTokenView
                jwt_token = JWTAuthentication.create_jwt(user)
                print(f"Login successful, token generated: {bool(jwt_token)}")
                
                return Response({
                    "token": jwt_token,
                    "username": user.username,
                    "user_id": user.id,
                    "user_type": user.user_type
                }, status=status.HTTP_200_OK)
            else:
                print("Authentication failed - invalid credentials")
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
                
        except Exception as e:
            print(f"Login error: {str(e)}")
            return Response({'error': f'Login failed: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ObtainTokenView(views.APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ObtainTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        username_or_email = serializer.validated_data.get('email')
        password = serializer.validated_data.get('password')

        user = User.objects.filter(username=username_or_email).first()
        if user is None:
            user = User.objects.filter(email=username_or_email).first()

        if user is None or not user.check_password(password):
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

        # Generate the JWT token
        jwt_token = JWTAuthentication.create_jwt(user)

        return Response({'token': jwt_token, 'username': user.username})