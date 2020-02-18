
# 权限管理
RBAC权限管理模块


## 运行示例
d2-crud-plus-example中提供权限管理模块，位于`/src/business/modules/permission`下

### 1.启动后端【java】
[d2-crud-plus-server](https://github.com/greper/d2-crud-plus-server)
#### 1.1克隆项目
```shell
git clone https://github.com/greper/d2-crud-plus-server.git
# 导入idea或eclipse
```
#### 1.2导入sql
```
创建数据库`d2p_pm`
将`./sql/d2p_pm.sql` 导入数据库
```
#### 1.3修改数据库连接配置

```yaml
# ./api-service/src/main/resources/application.xml
spring:
  datasource:
    username: root
    password: root
    url: jdbc:mysql://localhost:3306/d2p_pm?characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=false&serverTimezone=Asia/Shanghai&allowMultiQueries=true
```
#### 1.4 启动api-server
```
run ApiServerApplication
```


### 2.启动d2-crud-plus-example
开启权限模块
```shell
/packages/d2-crud-plus-example#  npm run dev:pm

# 或者
# 修改.env.development文件：VUE_APP_PM_ENABLED=true
/packages/d2-crud-plus-example#  npm run dev
```


### 2.查看效果
登录 admin/admin 可以查看全部菜单  
登录 test/123456 只能查看资源和角色管理菜单，无法看到用户管理菜单

## 待完善
1.按钮权限判断
