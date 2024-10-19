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
   SQL_ENGINE=django.db.backends.postgresql
   SQL_DATABASE_NAME={your postgres database name}
   SQL_DATABASE_USER={your postgres user name}
   SQL_DATABASE_USER_PASSWORD={your postgres user password}
   SQL_HOST=db
   SQL_PORT=5432
   ```
3. create .env file in src/postgres-container, add SECRET_KEY, DJANGO_ALLOWED_HOSTS, DEBUG
   ```
   POSTGRES_USER={your postgres user name}
   POSTGRES_PASSWORD={your postgres user password}
   POSTGRES_DB={your postgres database name}
   ```
4. ```cd src```
5. ```docker compose build```
6. ```docker compose up -d```
7. go to ```localhost:8080```
# endpoints
\* – required field
- /api/user
   - GET | get user info
      - JSON: {id*}
   - POST | create user
     - JSON: {username*, password*, email*}
   - PUT | updates listed parameters
      - JSON: {username, password, email}
   - DELETE | deletes user
      - JSON {id*}
- /api/post
   - GET | get post info
      - JSON: {id*}
   - POST | create post
     - JSON: {user_id*, title*, content*, post_type*}
   - PUT | updates listed parameters
      - JSON: {title*, content*, post_type*}
   - DELETE | deletes user
      - JSON {id*}
- /api/login
   - POST | login user
      - JSON: {username*, password*}
- /api/logout
   - POST | logout user
      - JSON: {}

# frontend
React
# backend
nginx + Django
