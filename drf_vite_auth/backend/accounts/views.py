from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.utils.encoding import smart_str, DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_decode
from .serializers import UserSerializer, LoginSerializer, PasswordResetSerializer, SetNewPasswordSerializer, LogoutUserSerializer, UpdateUserSerializer
from .utils import send_otp_email
from .models import OneTimePassword, User


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
        serializer = self.serializer_class(
            data=request.data, context={'request': request})
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

class UpdateUserView(GenericAPIView):
    serializer_class = UpdateUserSerializer
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        user = request.user
        print("User: ", user.email)
        print("User Bio: ", user.bio)
        serializer = self.serializer_class(
            instance=user, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetView(GenericAPIView):
    serializer_class = PasswordResetSerializer

    def post(self, request):
        serializer = self.serializer_class(
            data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            return Response({
                'message': 'Password reset link has been sent to your email'
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetConfirmView(GenericAPIView):
    def get(self, request, uuidb64, token):
        try:
            user_id = smart_str(urlsafe_base64_decode(uuidb64))
            user = User.objects.get(pk=user_id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({
                    'message': 'Token is invalid or expired'
                }, status=status.HTTP_400_BAD_REQUEST)
            return Response({
                'success': True,
                'message': 'Password reset link is valid'
            }, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({
                'message': 'User does not exist'
            }, status=status.HTTP_400_BAD_REQUEST)
        except DjangoUnicodeDecodeError:
            return Response({
                'message': 'Invalid or Expired Token'
            }, status=status.HTTP_400_BAD_REQUEST)


class SetNewPasswordView(GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(
            data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            return Response({
                'success': True,
                'message': 'Password reset successfully'
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutUserView(GenericAPIView):
    serializer_class = LogoutUserSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({
                'success': True,
                'message': 'User logged out successfully'
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
