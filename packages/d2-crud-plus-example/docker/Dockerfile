FROM nginx:1.15
EXPOSE 80
EXPOSE 443
ENV TZ=Asia/Shanghai
COPY ./config/nginx.conf /etc/nginx/nginx.conf
COPY ./dist/ /disk02/nginx/html/D2CrudPlusExample/
RUN dir /disk02/nginx/html/D2CrudPlusExample/


