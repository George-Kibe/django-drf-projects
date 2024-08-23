from django.urls import path
from .views import RegisterUserView, VerifyUserEmail, LoginUserView, ProtectedProfileView, PasswordResetView, PasswordResetConfirmView, SetNewPasswordView, LogoutUserView

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('verify-email/', VerifyUserEmail.as_view(), name='email-verify'),
    path('login/', LoginUserView.as_view(), name='login'),
    path('profile/', ProtectedProfileView.as_view(), name='profile'),
    path('password-reset/', PasswordResetView.as_view(), name='password-reset'),
    path('password-reset-confirm/<uuidb64>/<token>/',
         PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
    path('set-new-password/', SetNewPasswordView.as_view(), name='set-new-password'),
    path('logout/', LogoutUserView.as_view(), name='logout'),
    
]
