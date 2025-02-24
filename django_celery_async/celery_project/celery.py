from __future__ import absolute_import,unicode_literals
import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "celery_project.settings")
app = Celery("celery_project")

#we are using asia/kolkata time so we are making it False
app.conf.enable_utc=False
app.conf.update(timezone='Africa/Nairobi')

app.config_from_object("django.conf:settings", namespace="CELERY")

app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print(f"Request: {self.request!r}")
    

#celery beat settings
app.conf.beat_schedule = {
    # 'add-every-5-seconds':{
    #     'task':'celery_app.tasks.add',
    #     'schedule':5.0,
    #     'args':(16,16)
    # }
}