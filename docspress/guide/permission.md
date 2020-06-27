
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
#### 1.2创建数据库
```
创建数据库`d2p_pm`
server启动后会自动创建表
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
* 登录 admin/admin 可以查看全部菜单，拥有全部功能   
* 登录 test/123456 只能查看资源和角色管理菜单，无法看到用户管理菜单    
* 登录 readonly/123456 只能查看，不能编辑    
* 登录 authz/123456 只能查看与授权，不能编辑   

系统默认数据不允许修改，如需体验，请自行添加数据进行测试

## 2 按钮权限
### 2.1 directive控制
```html
<el-button v-permission="'permission:role:add'">添加角色</el-button>
```
### 2.2 代码控制
```js
export default {
    created(){
        if(this.hasPermissions('permission:role:add')){
            console.log("您拥有添加权限")
        }
    }
}
```

## 3 权限模块如何接入到你的d2-admin项目中
 1. `.env`中配置`VUE_APP_PM_ENABLED = true`
 2. 复制example中 `src/business/modules/permission` 到你的d2-admin项目中
 3. 引入`permission`模块
```js
// src/business/modules/index.js 也可以在main.js中加入
import '@/business/modules/permission' // 加载permission
```
 4. 复制`src/router/router.hook.js` 
 5. 在`src/router/index.js` 的`beforeEach` 中加入以下代码
```js {12-17}
router.beforeEach(async (to, from, next) => {
  // 确认已经加载多标签页数据 https://github.com/d2-projects/d2-admin/issues/201
  await store.dispatch('d2admin/page/isLoaded')
  // 确认已经加载组件尺寸设置 https://github.com/d2-projects/d2-admin/issues/198
  await store.dispatch('d2admin/size/isLoaded')
 // 进度条
  NProgress.start()
  // 关闭搜索面板
  store.commit('d2admin/search/set', false)

  // 远程获取权限与菜单
  if (RouterHook.beforeEach) {
    const hookRet = await RouterHook.beforeEach(to, from, next)
    if (hookRet) {
      return
    }
  }
  // add end

  // 验证当前路由所有的匹配中是否需要有登录验证的
  if (to.matched.some(r => r.meta.auth)) {
    ...
  }
}
```
  6. 在`/src/store/modules/d2admin/modules/account.js`中加入以下代码
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
