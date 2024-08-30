from rest_framework import serializers
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed
from .utils import Google, register_social_user

class GoogleSignInSerializer(serializers.Serializer):
    access_token = serializers.CharField()
    
    def validate_access_token(self, access_token):
        google_user_data = Google.validate(access_token)
        try:
            userid = google_user_data["sub"]
        except Exception as e:
            raise serializers.ValidationError('Invalid or Expired Token')
        if google_user_data["aud"] != settings.GOOGLE_CLIENT_ID:
            raise serializers.ValidationError('Could Not verify User')
        email = google_user_data["email"]
        first_name = google_user_data["given_name"]
        last_name = google_user_data["family_name"]
        return register_social_user(provider="google", email=email, first_name=first_name, last_name=last_name)