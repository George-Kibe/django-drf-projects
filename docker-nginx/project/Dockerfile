FROM  python:3.11-alpine3.18
LABEL maintainer="georgekibe.vercel.app"

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /project

RUN pip install --upgrade pip

# Copy the requirements file into the container
COPY requirements.txt ./
# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
# Copy the rest of the application code into the container
COPY . .
# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run the application
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
