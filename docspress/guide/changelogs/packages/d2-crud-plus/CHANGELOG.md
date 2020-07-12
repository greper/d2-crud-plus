# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.12.1](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.12.0...d2-crud-plus@1.12.1) (2020-07-12)


### Bug Fixes

* 修复翻到最后一页，切换每页条数时，查询空白的问题 ([6e5300a](https://github.com/greper/d2-crud-plus/commit/6e5300a081b45053e53f945246014b599aea784d))


### Performance Improvements

* 查询表单重置按钮增加防抖自动查询 ([d03fd7b](https://github.com/greper/d2-crud-plus/commit/d03fd7be722c4c9927a25a86f5c42aaa13541cac))
* 查询示例优化 ([e39c043](https://github.com/greper/d2-crud-plus/commit/e39c0430062a7e3f65b4666b9d39961875e0c299))
* 查询增加防抖自动查询功能 ([e8430d3](https://github.com/greper/d2-crud-plus/commit/e8430d38ae74440229d31ba9ad5e6c7cbaae3e99))
* 列设置保存到本地 ([b482052](https://github.com/greper/d2-crud-plus/commit/b482052c9665987dca3f699c2b317e7707a24b1d))
* 示例全部改成新版带toolbar界面 ([6770fc9](https://github.com/greper/d2-crud-plus/commit/6770fc9980ba17083ffb414309ad8f6e15d6dbe1))
* 优化列过滤器 ([3775371](https://github.com/greper/d2-crud-plus/commit/37753713a135d4f019717f14f016c1a12c5990a0))
* extends解除d2crudplus依赖 ([66c5c70](https://github.com/greper/d2-crud-plus/commit/66c5c70bbf505e76296257c56debef0d5855b843))





# [1.12.0](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.11.4...d2-crud-plus@1.12.0) (2020-07-11)


### Features

* 新增工具条功能：刷新，查询展开，页面紧凑切换，列设置。内置分页组件可以启用 ([980ff30](https://github.com/greper/d2-crud-plus/commit/980ff30154453c8b1cd77f19f9efe6f7a20f9bef))


### Performance Improvements

* 日期format示例 ([03955b5](https://github.com/greper/d2-crud-plus/commit/03955b51113cf9f287e8d0ae8a5d165bee9da53b))





## [1.11.4](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.11.3...d2-crud-plus@1.11.4) (2020-07-07)


### Bug Fixes

* 修复dictRadio valuechange触发两次的问题 ([36d5325](https://github.com/greper/d2-crud-plus/commit/36d53251f73a7be1d06a84785d25f6903aff6bb7))
* 增加配置项updateTableDataAfterEdit，保存对话框后不插入数据到table中，通过刷新列表更新数据 ([6ee6f07](https://github.com/greper/d2-crud-plus/commit/6ee6f079f202a0ff053d318c251139d2aa1f0312))


### Performance Improvements

* 增加手动选择示例 ([be9b649](https://github.com/greper/d2-crud-plus/commit/be9b649c50ed091314e4a442be718ca2ec0008dc))
* 字典增加禁止缓存功能，url()方式取消字典缓存 ([ae5dce1](https://github.com/greper/d2-crud-plus/commit/ae5dce1a19e607ef0c294414518293a1685e6983))
* search 增加事件监听 ([28450de](https://github.com/greper/d2-crud-plus/commit/28450def69ffae2695c02acacb2ece804dd1e44d))





## [1.11.3](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.11.2...d2-crud-plus@1.11.3) (2020-07-02)

**Note:** Version bump only for package d2-crud-plus





## [1.11.2](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.11.1...d2-crud-plus@1.11.2) (2020-07-01)


### Bug Fixes

* 修复删除最后一页的最后一条数据后列表不刷新的bug ([a77e673](https://github.com/greper/d2-crud-plus/commit/a77e6731afc94ebe0914b8cbfbc4f51ec67f537c))


### Performance Improvements

* 手动调用addRow方法可以传入默认值 ([59b7a6f](https://github.com/greper/d2-crud-plus/commit/59b7a6f0f33d6cab9fafb3ab7bf02a47007d172c))





## [1.11.1](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.11.0...d2-crud-plus@1.11.1) (2020-07-01)


### Performance Improvements

* 动态添加分组示例 ([3bc9ccc](https://github.com/greper/d2-crud-plus/commit/3bc9ccc03d2a75eeec9f9fb0e3623a7a4000025a))





# [1.11.0](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.10.2...d2-crud-plus@1.11.0) (2020-06-30)


### Bug Fixes

* 修复多次触发formdatechange的bug ([0dadab9](https://github.com/greper/d2-crud-plus/commit/0dadab9973aeffc378f9b9cd762f78ae1ab4fd38))


### Features

* 表单支持分组 ([96f1b54](https://github.com/greper/d2-crud-plus/commit/96f1b54ff480b95461ac37556eeef66fd925a158))
* 更简单方便易用的组件禁用方式（disabled） ([b194ac1](https://github.com/greper/d2-crud-plus/commit/b194ac1f62d88ffd7d887cb8a56e55a4b5cf2511))
* 支持配置默认表单span ([9268d4a](https://github.com/greper/d2-crud-plus/commit/9268d4a1c19dcdf549deab965a07fa9904c4a010))





## [1.10.2](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.10.1...d2-crud-plus@1.10.2) (2020-06-29)


### Bug Fixes

* 删除旧版本兼容性提示 ([5a7aac1](https://github.com/greper/d2-crud-plus/commit/5a7aac14515b0a6a2d3e6f2f86770ae4a917396c))






## [1.10.1](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.10.0...d2-crud-plus@1.10.1) (2020-06-25)


### Bug Fixes

* 增加response处理配置 ([6890208](https://github.com/greper/d2-crud-plus/commit/68902085d0aa5d4ec419f517a1ee890f7d77a43d))






# [1.10.0](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.9.0...d2-crud-plus@1.10.0) (2020-06-24)


### Features

* 对话框增加自定义header slot ([0c25a93](https://github.com/greper/d2-crud-plus/commit/0c25a93e85f91b34c2cc2e6f5883e1ab284cbb0c))
* 列表数据结构支持自定义 ([30fd7a3](https://github.com/greper/d2-crud-plus/commit/30fd7a3576cc7345ecd1433b1ca7f5013e4957cf))


### Performance Improvements

* 增加pageRequest返回参数的配置 ([033f127](https://github.com/greper/d2-crud-plus/commit/033f12746f26059f403f4d0ddaecf39adf3a57a6))






# [1.9.0](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.8.4...d2-crud-plus@1.9.0) (2020-06-22)


### Features

* d2-admin 1.17版本同步 ([7037e4a](https://github.com/greper/d2-crud-plus/commit/7037e4ada20dd5b62c248349bd51f7014962877f))






## [1.8.4](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.8.3...d2-crud-plus@1.8.4) (2020-06-16)


### Bug Fixes

* 修复dictSelect配置options无效的bug ([a39cde6](https://github.com/greper/d2-crud-plus/commit/a39cde632585232b675df65e45dfd4791f8602a8))





## [1.8.3](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.8.2...d2-crud-plus@1.8.3) (2020-06-12)

**Note:** Version bump only for package d2-crud-plus





## [1.8.2](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.8.1...d2-crud-plus@1.8.2) (2020-06-10)


### Bug Fixes

* 修复文本域无法输入的问题 ([bddee2d](https://github.com/greper/d2-crud-plus/commit/bddee2d2283014a94d136ad7659dbebf2a17e24b))





## [1.8.1](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.8.0...d2-crud-plus@1.8.1) (2020-06-08)

**Note:** Version bump only for package d2-crud-plus





# [1.8.0](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.7.1...d2-crud-plus@1.8.0) (2020-06-08)


### Bug Fixes

* 增加选项的禁用配置，增加dictSwitch,部分ie兼容性问题修复 ([c91a04b](https://github.com/greper/d2-crud-plus/commit/c91a04bbdd201d117953048c56cca53ae66dad0d))


### Features

* 自定义事件监听支持 ([1f9fd39](https://github.com/greper/d2-crud-plus/commit/1f9fd39316375c6102279e1a7a65b33ae16a4733))





## [1.7.1](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.7.0...d2-crud-plus@1.7.1) (2020-06-04)


### Bug Fixes

* 修复文件上传进度条显示的bug，优化一些其他显示上的问题 ([53d54ba](https://github.com/greper/d2-crud-plus/commit/53d54bad45782ddc7a6970ad25c2811e137ff41b))






# [1.7.0](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.6.0...d2-crud-plus@1.7.0) (2020-06-03)


### Bug Fixes

* column.dict不再覆盖用户已经自定义的component.props.dict ([531de7e](https://github.com/greper/d2-crud-plus/commit/531de7e926b2428141f9b0cb89c400258945c60d))


### Features

* dict配置增加覆盖全局getRemoteDataFunc的方法，全局方法增加dict参数 ([22db385](https://github.com/greper/d2-crud-plus/commit/22db38591d7c285b0e50ce8b9cd6aedd0c5032f9))
* 优化字典获取自定义，修复bug，增加示例的行数 ([e94749d](https://github.com/greper/d2-crud-plus/commit/e94749de0ad885ee5feea6b1b6a2a2096f057a2c))
* 动态显示隐藏整个表单字段 ([3153602](https://github.com/greper/d2-crud-plus/commit/31536028be6ac052d4c5c9d5432807be4f46d1de))






# [1.6.0](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.5.2...d2-crud-plus@1.6.0) (2020-05-21)


### Bug Fixes

* 修复dict有时候获取不到data list的bug ([2a68822](https://github.com/greper/d2-crud-plus/commit/2a68822d74e6b805808fd652dfe58840caa43f5c))


### Features

* checkbox联动radio修改radio的选项功能示例，d2-crud的表单组件增加ref ([66d26bb](https://github.com/greper/d2-crud-plus/commit/66d26bb039cb0848936e41019883ec9a1ec1ce7d))





## [1.5.2](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.5.1...d2-crud-plus@1.5.2) (2020-05-17)


### Bug Fixes

* 修复d2p-file-uploader会覆盖上传参数的问题 ([d09a934](https://github.com/greper/d2-crud-plus/commit/d09a93406f5900c9649bd79c626abe6f5af4eb52))





## [1.5.1](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.5.0...d2-crud-plus@1.5.1) (2020-05-17)


### Bug Fixes

* 文档调整 ([423b3b4](https://github.com/greper/d2-crud-plus/commit/423b3b4655861d3d1e6fe5bdac79b9deaeb20cb9))






# [1.5.0](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.4.0...d2-crud-plus@1.5.0) (2020-05-16)


### Features

* 多文件上传显示优化，批量删除，上传文件参数优化 ([8946934](https://github.com/greper/d2-crud-plus/commit/89469349cdd6495ddd503f206ab110bf75dce60c))
* 多文件上传显示优化，批量删除，上传文件参数优化 ([91e2437](https://github.com/greper/d2-crud-plus/commit/91e243796221b706b0bb906aca5c00e59ed597fe))






# [1.4.0](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.3.2...d2-crud-plus@1.4.0) (2020-05-14)


### Features

* quill富文本编辑器 ([54c39cc](https://github.com/greper/d2-crud-plus/commit/54c39cc911f5a481894850ea227cdc627c5b0716))
* textArea支持 ([12f2c91](https://github.com/greper/d2-crud-plus/commit/12f2c91ea492b4b5f4b781c7826b0c6939e0db93))
* 支持本地服务器上传文件 ([1f319f2](https://github.com/greper/d2-crud-plus/commit/1f319f20afcee32c4527bfd0e10f263234723b3a))






## [1.3.2](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.3.1...d2-crud-plus@1.3.2) (2020-05-13)

**Note:** Version bump only for package d2-crud-plus






## [1.3.1](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.3.0...d2-crud-plus@1.3.1) (2020-04-08)


### Bug Fixes

* 优化表格有滚动条时高度计算导致双滚动条的bug ([4460d6c](https://github.com/greper/d2-crud-plus/commit/4460d6c5179d08bfe595b559cf844eadcf9f2fa8))





# [1.3.0](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.2.3...d2-crud-plus@1.3.0) (2020-04-07)


### Features

* 头像裁剪组件，图片行显示支持预览大图 ([348ec15](https://github.com/greper/d2-crud-plus/commit/348ec15b0eca5c55512b56134fb1086a36ba4d06))
