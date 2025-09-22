# Commands

### starting an application 
```docker exec -it django_application python manage.py startapp movies```

# Django Commands

Start a new django project inside of a container
```
docker-compose run django django-admin startproject core .
python manage.py startapp inventory
python manage.py migrate
```
### Test Celery
```celery -A project worker --beat```
inside docker
```docker exec -it django_application celery -A project worker --beat```

### View celery information logs
```celery -A project worker --beat -l INFO```
inside docker
```docker exec -it django_application celery -A project worker --beat -l INFO```

### reset docker 
```docker stop $(docker ps -aq) docker rm -f $(docker ps -aq) docker network prune -f docker volume prune -f 
docker image prune -af
docker system prune -af --volumes
```