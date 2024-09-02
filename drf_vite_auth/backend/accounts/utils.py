import random
from datetime import datetime
from django.core.mail import EmailMessage
from django.conf import settings
from django.template.loader import render_to_string
from .models import User, OneTimePassword


from_email = settings.DEFAULT_FROM_EMAIL
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
        'user': user,
        'otp': otp,
        'current_site': current_site,
        'current_year': datetime.now().year,
    })
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

def send_password_reset_email(user, reset_link):
    html_message = render_to_string('accounts/password_reset.html', {
        'user': user,
        'reset_link': reset_link,
        'current_year': datetime.now().year,
        'current_site': 'Your Site Name',  # Replace with your site name
    })
    subject = 'Password Reset Request'
    
    email = EmailMessage(
        subject,
        html_message,  # Plain text version
        from_email,  # Replace with your sender email
        [user.email],  # Recipient email address
    )
    email.content_subtype = 'html'  # Set content type to HTML
    email.send(fail_silently=True)