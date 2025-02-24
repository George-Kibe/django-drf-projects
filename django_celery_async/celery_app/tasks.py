"""
Celery Tasks
1. Task 1. Sample Test Task
2. Task 2. Send Mail Task
"""
from celery import shared_task
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from celery_project import settings

@shared_task(bind=True)
def fun(self):
    print("hello world")
    return "hello world"

@shared_task(bind=True)
def send_mail_func(self):
    users=get_user_model().objects.all()
    for user in users:
        mail_subject="Hello test From Celery Worker of Realhive"
        message="Hello test From Celery Worker of Realhive. Sample Email using Celery"
        to_email=user.email
        send_mail(
            subject=mail_subject,
            message=message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[to_email],
            fail_silently=True,
            )
    return "Task Successfull"