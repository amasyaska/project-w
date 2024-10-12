# project-w
Web application \
by Wombats, Inc.
# setup
1. ```git clone https://github.com/amasyaska/project-w.git```
2. create .env file in src/django-container, add SECRET_KEY, DJANGO_ALLOWED_HOSTS, DEBUG
   ```
   SECRET_KEY={your SECRET_KEY here}
   DJANGO_ALLOWED_HOSTS={your Django ALLOWED_HOSTS here, separated by space}
   DEBUG={True or False}
   ```
3. ```cd src```
4. ```docker compose build```
5. ```docker compose up -d```
6. go to ```localhost:8080```
# frontend
React
# backend
nginx + Django
