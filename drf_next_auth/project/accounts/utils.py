import random
from django.core.mail import EmailMessage
from .models import User, OneTimePassword
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags

def generate_otp():
    return random.randint(100000, 999999)

def send_otp_email(email):
    subject = 'OTP for Email Verification'
    # Load the HTML template and render it with context data
    otp = str(generate_otp())
    print("OTP: ", otp)
    user = User.objects.get(email=email)
    current_site = "realHiveAuth.com"
    html_message = render_to_string('accounts/otp_email.html', {
        'user': user.first_name,
        'otp': otp,
        'current_site': current_site,
    })
    from_email = settings.DEFAULT_FROM_EMAIL
    OneTimePassword.objects.create(user=user, code=otp)
     # Create the email
    email = EmailMessage(
        subject,
        html_message, 
        from_email,  # From email address
        [user.email],  # To email address
    )
    # Add the HTML version of the email
    email.content_subtype = 'html'  # Main content is now text/html
    email.send(fail_silently=True)