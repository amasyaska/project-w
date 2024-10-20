from nginx:stable

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

RUN mkdir /home/app/
RUN mkdir /home/app/staticfiles
WORKDIR /home/app

COPY ./staticfiles /home/app/staticfiles