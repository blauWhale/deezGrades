FROM nginxinc/nginx-unprivileged:1.21.6

USER root

ENV JSFOLDER=/usr/share/nginx/html/static/js/*.js
COPY --chown=nginx ./nginx/start-nginx.sh /usr/bin/start-nginx.sh
# needed this to make React Router work properly 
RUN rm /etc/nginx/conf.d/default.conf
COPY --chown=nginx nginx/nginx.conf /etc/nginx/conf.d

WORKDIR /usr/share/nginx/html

COPY --chown=nginx build/ .

RUN chmod +x /usr/bin/start-nginx.sh

USER nginx

ENTRYPOINT [ "start-nginx.sh" ]
