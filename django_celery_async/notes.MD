## Celery Setup Instructions
1. Create django project and celery application
2. Install celery and redis
3. Start redis on localhost
4. Create celery.py file alongside settings.py
5. Add celery configurations inside __init__.py of the project folder
6. Create tasks.py file and functions inside the applications
   
### Top see Celery Informtion
Run ```celery -A celery_project worker -l --pool=solo -l info``` or ```celery -A celery_project worker -l info```
PS: Replace celery_project with the project name

### Top see Celery Beat Informtion
Run ```celery -A celery_project beat -l --pool=solo -l info``` or ```celery -A celery_project beat -l info```
PS: Replace celery_project with the project name

### Install django_celery_results and django_celery_beat
```pip install django_celery_results django_celery_beat```
Then add them to installed apps under settings.py

### Add celery beat settings inside celery.py file

Ref Website: https://thecodespace.in/celery-in-django-celery-beat-explained-with-examples/