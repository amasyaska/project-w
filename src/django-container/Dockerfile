FROM python:3.10-slim-buster

WORKDIR /usr/src/app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# copy project
COPY . .

RUN pip install --upgrade pip
RUN pip install -r ./requirements.txt

EXPOSE 8000

WORKDIR /usr/src/app/djangowebserver

# ENTRYPOINT ["python", "./djangowebserver/manage.py", "runserver", "0.0.0.0:8000"]
ENTRYPOINT ["gunicorn", "djangowebserver.wsgi:application", "--bind", "0.0.0.0:8000"]
