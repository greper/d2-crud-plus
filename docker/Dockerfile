FROM nginx:1.15
EXPOSE 80
EXPOSE 443
ENV TZ=Asia/Shanghai
ADD ./config/nginx.conf /etc/nginx/nginx.conf
ADD ./packages/d2-crud-plus-example/dist /disk02/nginx/html/D2CrudPlusExample/

