### Summary Notes on integrating async Tasks to Django using celery
#### 1. Adding rabbitmq service
- RabbitMQ is a queueing server which allows you to queue various messages that can then be consumed by a worker task
#### 2. Adding Celery and Configuration
- ```pip install celery``` or Adding it to requirements.txt
- Reference website ```https://docs.celeryq.dev/en/stable/django/first-steps-with-django.html```
- Create a celery module inside the project configuration i.e. alongside settings.py
- Then you need to import this app in your proj/proj/__init__.py module. This ensures that the app is loaded when Django starts so that the @shared_task decorator (mentioned later) will use it:
- configure CELERY_BROKER_URL in settings.py. A typical example of a CELERY_BROKER_URL is like ```CELERY_BROKER_URL=amqp://mquser:mqpassword2025@mq:5672//``` which uses the default port which is 5672
- Create a worker service in docker compose.
- Create your tasks. Typically in tasks.py file inside your apps
- Run the command ```docker compose build``` and ```docker compose up```docker ps
  

#### Testing Tasks with an interactive Python shell
- ```docker compose run --rm backend sh -c "python manage.py shell"```