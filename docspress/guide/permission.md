
# 权限管理
RBAC权限管理模块


## 1. 运行示例
d2-crud-plus-example中提供权限管理模块，位于`/src/business/modules/permission`下

### 1.1 启动后端【java】
[d2-crud-plus-server](https://github.com/greper/d2-crud-plus-server)
#### 1.1.1 克隆项目
```shell
git clone https://github.com/greper/d2-crud-plus-server.git
# 导入idea或eclipse
```
#### 1.1.2 创建数据库
```
创建数据库`d2p_pm`
server启动后会自动创建表
```
#### 1.1.3修改数据库连接配置

```yaml
# ./api-service/src/main/resources/application.xml
spring:
  datasource:
    username: root
    password: root
    url: jdbc:mysql://localhost:3306/d2p_pm?characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=false&serverTimezone=Asia/Shanghai&allowMultiQueries=true
```
#### 1.1.4 启动api-server
```
run ApiServerApplication
```


### 1.2 启动d2-crud-plus-example
开启权限模块
```shell
cd /packages/d2-crud-plus-example
npm run dev:pm

# 或者
# 修改.env.development文件：VUE_APP_PM_ENABLED=true
cd /packages/d2-crud-plus-example
npm run dev
```


### 1.3 查看效果
* 登录 admin/admin 可以查看全部菜单，拥有全部功能   
* 登录 test/123456 只能查看资源和角色管理菜单，无法看到用户管理菜单    
* 登录 readonly/123456 只能查看，不能编辑    
* 登录 authz/123456 只能查看与授权，不能编辑   

系统默认数据不允许修改，如需体验，请自行添加数据进行测试

## 2 按钮权限
### 2.1 directive控制
```html
// 支持数组
<el-button v-permission="'permission:role:add'">添加角色</el-button>
```
### 2.2 代码控制
```js
export default {
    created(){
        if(this.hasPermissions('permission:role:add')){ //支持数组
            console.log("您拥有添加权限")
        }
    }
}
```

## 3 权限模块如何接入到你的d2-admin项目中
 1. 在`.env`中配置`VUE_APP_PM_ENABLED = true`
 2. 复制example中 `src/business/modules/permission` 到你的d2-admin项目中
 3. 安装`permission`模块
```js
// 在main.js中加入
import '@/business/modules/permission' // 加载permission
```
 4.  在`/src/store/modules/d2admin/modules/account.js`中加入以下代码   
 用于注销时清空权限信息
```js {12-14}
    logout ({ commit, dispatch }, { confirm = false } = {}) {
      /**
       * @description 注销
       */
      async function logout () {
        // 删除cookie
        util.cookies.remove('token')
        util.cookies.remove('uuid')
        // 清空 vuex 用户信息
        await dispatch('d2admin/user/set', {}, { root: true })

        // 注销登录时清空permission信息
        commit('permission/clear', true, { root: true })

        // 跳转路由
        router.push({
          name: 'login'
        })
      }
```

  5. 登录请求由模拟改为请求真实后端
```js
  SYS_USER_LOGIN (data = {}) {
    // 模拟数据
    mock
      .onAny('/login')
      .reply(config => {
        const user = find(users, tools.parse(config.data))
        return user
          ? tools.responseSuccess(assign({}, user, { token: faker.random.uuid() }))
          : tools.responseError({}, '账号或密码不正确')
      })
    // 接口请求
    return requestForMock({
      url: '/login',
      method: 'post',
      data
    })
  }
```
修改为如下
```js
 SYS_USER_LOGIN (data = {}) {
    // 登录请求真实后端
    return request({
      url: '/login',   // 真实的后端地址 /api/login
      method: 'post',
      data
    })
  }
```

## 4 如何适配你自己的后端权限接口
请修改 `@/src/business/modules/permission/store/api.js`
```js
import { request } from '@/api/service'
export function getPermissions () {
  return request({
    url: '/auth/user/permissions',
    method: 'get'
  }).then(ret => {
    // 如果使用你自己的后端，需要在此处将返回结果改造为本模块需要的结构
    // 结构详情，请参考示例中打印的日志 ”获取权限数据成功：{...}“ （实际上就是“资源管理”页面中列出来的数据）
    return ret
  })
}

```

使用配套后端，无需改造，开箱即用，[d2-crud-plus-server](https://github.com/greper/d2-crud-plus-server)

## 5. 权限执行逻辑说明
更多详细信息请参考 `@/src/business/modules/permission/index.js`
```js
// 开启权限模块
if (isEnabled) {
  // 注册v-permission指令, 用于控制按钮权限
  Vue.use(permissionDirective)
  // 注册权限的store模块，用于存储当前权限数据
  store.registerModule('permission', storeModule)
  // 注册路由钩子
  // 通过路由守卫，在登录成功后拦截路由，从后台加载权限数据
  // 然后将权限数据转化为菜单和路由，添加到系统中
  registerRouterHook()
}
```
