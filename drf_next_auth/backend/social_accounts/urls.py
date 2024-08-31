from django.urls import path
from .views import GoogleSignInView, GithubSignInView

urlpatterns = [
    path('google/', GoogleSignInView.as_view(), name='google_login'),
    path('github/', GithubSignInView.as_view(), name='github_login'),
]
