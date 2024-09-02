"""
    This is the code for the github authentication in the backend
"""
import requests
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed
class Github:
    @staticmethod
    def exchange_code_for_token(code):
        params_payload = {
            "client_id": settings.GITHUB_CLIENT_ID,
            "client_secret": settings.GITHUB_CLIENT_SECRET,
            "code": code
        }
        response = requests.post(
            "https://github.com/login/oauth/access_token",
            params = params_payload,
            headers={"Accept": "application/json"},
            timeout=20
        )
        res_payload = response.json()
        token = res_payload.get("access_token")
        return token
    @staticmethod
    def retrieve_github_user(access_token):
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Accept": "application/json"
        }
        try:
            response = requests.get(
                "https://api.github.com/user",
                headers=headers,
                timeout=20
            )
            if response.status_code == 200:
                user_data = response.json()
                print("User Data: ", user_data)
                return user_data
        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")
            return None
        except Exception as e:
            print(f"An error occurred: {e}")
            raise AuthenticationFailed(detail="Token is invalid or expired!")