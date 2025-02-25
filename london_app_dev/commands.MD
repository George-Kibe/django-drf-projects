### Create a Vite react application using docker 
```docker run --rm -it -v $(pwd):/code -w /code node:22.11 sh -c "npm create vite@latest frontend -- --template react && cd frontend/ && npm install"```


### Run Docker Compose build up with watch
```docker compose up --watch --build```

### Install modules in docker container mapping the changes on local machine
```docker compose run --rm -v $(pwd)/frontend:/frontend frontend sh -c "npm install axios"```

### PS
After installing above, stop the server and build with watch again

### Create a Django Project using docker
```docker compose run --rm backend sh -c "django-admin startproject project ."```

### Running docker 
```docker compose up --watch --build -d```