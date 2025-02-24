"""Celery Sample Views
"""
from django.shortcuts import render
from django.http import HttpResponse
from django_celery_beat.models import PeriodicTask,CrontabSchedule
from .tasks import fun, send_mail_func
# Create your views here.
def testView(request):
    fun.delay()
    return HttpResponse("Hello World! Done")


def send_mail_to_all_users(request):
    send_mail_func.delay()
    return HttpResponse("Email has been Sent Successfully")

def sendmailattime(request):
    schedule, created = CrontabSchedule.objects.get_or_create(hour=20,minute=35)
    #we need to give name dynamically. now i am manually adding like mail_task_1
    task = PeriodicTask.objects.create(crontab=schedule,
    name="mail_task_"+"1",task='celery_app.tasks.send_mail_func')
    return HttpResponse("succcess")