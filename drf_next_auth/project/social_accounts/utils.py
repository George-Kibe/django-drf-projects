from google.auth.transport import requests
from google.oauth2 import id_token
from accounts.models import User
from django.contrib.auth import authenticate
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed

class Google():
    @staticmethod
    def validate(token):
        try:
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), settings.GOOGLE_CLIENT_ID)
            if "accounts.google.com" in idinfo['iss']:
                return idinfo
        except ValueError:
            raise AuthenticationFailed('Invalid token')
        except Exception as e:
            raise AuthenticationFailed('Invalid token')

def login_social_user(email, password):
    user = authenticate(email=email, password=password)
    user_tokens = user.tokens()
    return {
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "tokens": user_tokens
    }

def register_social_user(provider, email, first_name, last_name):
    user = User.objects.filter(email=email)
    if user.exists():
        if provider == user[0].auth_provider:
            login_social_user(email, settings.SOCIAL_AUTH_PASSWORD)
        else:
            raise AuthenticationFailed(
                detail=f"Please continue your login process with Google{user[0].auth_provider}"
            )
    else:
        new_user = {
            "email": email,
            "first_name": first_name,
            "last_name": last_name,
            "auth_provider": provider,
            "password": settings.SOCIAL_AUTH_PASSWORD
        }
        registered_user = User.objects.create_user(**new_user)
        registered_user.is_verified = True
        registered_user.save()
        login_social_user(email=email, password=settings.SOCIAL_AUTH_PASSWORD)