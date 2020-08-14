FROM registry.cn-hangzhou.aliyuncs.com/d2-plus/nginx:1.15
EXPOSE 80
EXPOSE 443
ENV TZ=Asia/Shanghai
COPY ./config/nginx.conf /etc/nginx/nginx.conf
COPY ./reports/ /disk02/nginx/html/reports/
RUN dir /disk02/nginx/html/


