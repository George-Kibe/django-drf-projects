from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from .managers import UserManager
from rest_framework_simplejwt.tokens import RefreshToken

AUTH_PROVIDERS = {"email": "email", "google": "google", "github": "github"}
# Create your models here.
class User(AbstractBaseUser, PermissionsMixin): 
    email = models.EmailField(max_length=255, verbose_name=_("Email Address"), unique=True)
    first_name = models.CharField(max_length=30, verbose_name=_("First Name"), blank=True)
    last_name = models.CharField(max_length=30, verbose_name=_("Last Name"), blank=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(null=True, blank=True)
    auth_provider = models.CharField(max_length=50, choices=AUTH_PROVIDERS, default=AUTH_PROVIDERS.get("email"))

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    objects = UserManager()
    @property
    def get_full_name(self):
        """Generate full name for a user

        Returns:
            full name: a string of the user's first and last name
        """
        return f"{self.first_name} {self.last_name}".strip()
    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
    }
    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def __str__(self):
        return str(self.email)
    
class OneTimePassword(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=6, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = _("OTP")
        verbose_name_plural = _("OTPs")

    def __str__(self):
        return f"{str(self.user.email)}: {self.code}"