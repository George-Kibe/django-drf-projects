"""_summary_

Raises:
    serializers.ValidationError: _description_
    serializers.ValidationError: _description_
    ValidationError: _description_

Returns:
    _type_: _description_
"""

from django.conf import settings
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .utils import Google, register_social_user
from .github import Github

class GoogleSignInSerializer(serializers.Serializer):
    access_token = serializers.CharField()
    
    def validate_access_token(self, access_token):
        google_user_data = Google.validate(access_token)
        try:
            userid = google_user_data["sub"]
        except Exception as e:
            raise serializers.ValidationError(f'Invalid or Expired Token {e}')
        if google_user_data["aud"] != settings.GOOGLE_CLIENT_ID:
            raise serializers.ValidationError('Could Not verify User')
        email = google_user_data["email"]
        first_name = google_user_data["given_name"]
        last_name = google_user_data["family_name"]
        return register_social_user(provider="google", email=email, first_name=first_name, last_name=last_name)

class GithubOauthSerializer(serializers.Serializer):
    code = serializers.CharField(min_length=2)
    def validate_code(self, code):
        access_token = Github.exchange_code_for_token(code)
        if access_token:
            user = Github.retrieve_github_user(access_token)
            full_name = user.get("name")
            email = user.get("email")
            first_name, last_name = full_name.split(" ", 1)
            provider = "github"
            print(email, first_name, last_name)
            return register_social_user(provider=provider, email=email, first_name=first_name, last_name=last_name)
        else:
            raise ValidationError("Invalid or Expired Code")
        