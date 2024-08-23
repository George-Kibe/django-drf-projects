from rest_framework.generics import GenericAPIView
from .serializers import UserSerializer, LoginSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .utils import send_otp_email
from .models import OneTimePassword

# Create your views here.
class RegisterUserView(GenericAPIView):
    serializer_class = UserSerializer
    
    def post(self, request):
        user_data = request.data
        serializer = self.serializer_class(data=user_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user = serializer.data
            print("User: ", user)
            send_otp_email(user['email'])
            return Response({
                "data": user,
                "message": "Greetings. Thanks for signing up. A passcode has been sent to your email"
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyUserEmail(GenericAPIView):
    
    def post(self, request):
        otp_code = request.data.get('otp')
        print("OTP:", otp_code)
        try:
            user_otp = OneTimePassword.objects.get(code=otp_code)
            print("OTP:", user_otp)
            user = user_otp.user
            if not user.is_verified:
                user.is_verified = True
                user.save()
                return Response({
                    'message': 'Email verified successfully'
                }, status=status.HTTP_200_OK)
            return Response({
                'message': 'Email already verified or Invalid Code'
            }, status=status.HTTP_400_BAD_REQUEST)
        except OneTimePassword.DoesNotExist:
            return Response({
                'message': 'Invalid OTP'
            }, status=status.HTTP_400_BAD_REQUEST)

class LoginUserView(GenericAPIView):
    serializer_class = LoginSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
# Restricted Access Class View
class ProtectedProfileView(GenericAPIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        """Authenticated API View

        Args:
            request (_type_): _description_

        Returns:
            user: return user object of the currently authenticated user
        """
        user = request.user
        # get full user information from user model
        user = UserSerializer(user).data
        return Response({
            "user": user,
            "message": 'This is a protected view',
            "info": "You are seeing this because you are authenticated",
        }, status=status.HTTP_200_OK)