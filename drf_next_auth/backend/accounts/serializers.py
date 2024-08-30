from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import smart_bytes, force_str
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from .utils import send_password_reset_email

User = get_user_model()

class UserSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=254)
    first_name = serializers.CharField(max_length=150, required=False, allow_blank=True)
    last_name = serializers.CharField(max_length=150, required=False, allow_blank=True)
    password = serializers.CharField(max_length=128, min_length=8, write_only=True)
    password2 = serializers.CharField(max_length=128, min_length=8, write_only=True)
    
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'password', 'password2')
     
    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords do not match")
        if not data.get('first_name') or not data.get('last_name'):
            raise serializers.ValidationError("First name and last name are required")
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError("Email already exists")
        return data
    
    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=254)
    password = serializers.CharField(max_length=128, write_only=True)
    full_name = serializers.CharField(max_length=255, read_only=True)
    access_token = serializers.CharField(max_length=255, read_only=True)
    refresh_token = serializers.CharField(max_length=255, read_only=True)
    
    class Meta:
        model = User
        fields = ('email', 'password', 'full_name', 'access_token', 'refresh_token')
        
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        request = self.context.get('request')
        user = authenticate(request, email=email, password=password)
        if not user:
            raise AuthenticationFailed('Invalid credentials. Try Again!')
        if not user.is_verified:
            raise serializers.ValidationError('Please verify your email to login')

        tokens = user.tokens()
        return {
            'email': user.email,
            'full_name': user.get_full_name,
            'access_token': str(tokens.get('access')),
            'refresh_token': str(tokens.get('refresh'))
        }
        
class PasswordResetSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=254)

    class Meta:
        fields = ('email',)

    def validate(self, attrs):
        email = attrs.get('email')
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uuidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            request = self.context.get('request')
            site_domain = get_current_site(request).domain
            relative_link = reverse('password-reset-confirm', kwargs={'uuidb64': uuidb64, 'token': token})
            absurl = 'http://' + site_domain + relative_link
            send_password_reset_email(user, absurl)
            return attrs
            
class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=128, min_length=8, write_only=True)
    confirm_password = serializers.CharField(max_length=128, min_length=8, write_only=True)
    uuidb64 = serializers.CharField(write_only=True)
    token = serializers.CharField(write_only=True)

    class Meta:
        fields = ('password', 'confirm_password', 'uuidb64', 'token')

    def validate(self, attrs):
        token = attrs.get('token')
        uuidb64 = attrs.get('uuidb64')
        password = attrs.get('password')
        confirm_password = attrs.get('confirm_password')
        # Check if passwords match
        if password != confirm_password:
            raise AuthenticationFailed('Passwords do not match')

        try:
            # Decode the user ID from the URL-safe base64 encoded string
            user_id = force_str(urlsafe_base64_decode(uuidb64))
            user = User.objects.get(id=user_id)

            # Check if the token is valid
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('Token is invalid or expired')
            user.set_password(password)
            user.save()
            return user
        except User.DoesNotExist:
            raise AuthenticationFailed('Invalid user')
        except Exception as e:
            raise AuthenticationFailed('An error occurred')

class LogoutUserSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()
    default_error_messages = {
        'bad_token': ('Token is invalid or expired')
    }
    def validate(self, attrs):
        self.token = attrs.get('refresh_token')
        return attrs
    def save(self, **kwargs):
        try:
            token = RefreshToken(self.token)
            token.blacklist()
        except TokenError:
            self.fail('bad_token')
