
# 权限管理
RBAC权限管理模块


## 运行示例
d2-crud-plus-example中提供权限管理模块，位于`/src/business/modules/permission`下

### 1.开启权限管理   
修改.env.*
```javascript
VUE_APP_PM_ENABLED=true
```

### 2.启动后端【java】
后端项目地址： https://github.com/greper/d2-crud-plus-server
#### 2.1克隆项目
```shell
git clone https://github.com/greper/d2-crud-plus-server.git
# 导入idea或eclipse
```
#### 2.2导入sql
```
创建数据库`d2p_pm`
将`./sql/d2p_pm.sql` 导入数据库
```
#### 2.3修改数据库连接配置
api-service/src/main/resources/application.xml
```yaml
spring:
  datasource:
    username: root
    password: root
    url: jdbc:mysql://localhost:3306/d2p_pm?characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=false&serverTimezone=Asia/Shanghai&allowMultiQueries=true
```
#### 2.4 启动api-server
```
run ApiServerApplication
```


### 3.启动d2-crud-plus-example
```shell
/packages/d2-crud-plus-example#  npm run dev
```

### 4.查看效果
登录 admin/admin 可以查看全部菜单  
登录 test/123456 只能查看资源和角色管理菜单，无法看到用户管理菜单

## 待完善
1.按钮权限判断