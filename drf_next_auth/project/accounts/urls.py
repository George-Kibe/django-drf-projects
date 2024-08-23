from django.urls import path
from .views import RegisterUserView, VerifyUserEmail, LoginUserView, ProtectedProfileView

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('verify-email/', VerifyUserEmail.as_view(), name='email-verify'),
    path('login/', LoginUserView.as_view(), name='login'),
    path('profile/', ProtectedProfileView.as_view(), name='profile')
]

