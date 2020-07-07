# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.4.6](https://github.com/greper/d2-crud/compare/d2-crud-x@2.4.3...d2-crud-x@2.4.6) (2020-07-07)


### Bug Fixes

* 增加配置项updateTableDataAfterEdit，保存对话框后不插入数据到table中，通过刷新列表更新数据 ([6ee6f07](https://github.com/greper/d2-crud/commit/6ee6f079f202a0ff053d318c251139d2aa1f0312))


### Performance Improvements

* 对话框确定按钮增加禁用和显示配置 ([eff0736](https://github.com/greper/d2-crud/commit/eff0736a491e6d6bbf4e2ef32e343db82c630674))
* crud-x 打开编辑对话框后发送 dialog-opened事件 ([2d6a4c2](https://github.com/greper/d2-crud/commit/2d6a4c2d1956305b10fe6eac16f9644c4fe31549))
* crud-x 打开编辑对话框后发送 dialog-opened事件 ([eeb12df](https://github.com/greper/d2-crud/commit/eeb12df19a3aa1c031c6196fb4c41cdc65d2ac16))





## [2.4.3](https://github.com/greper/d2-crud/compare/d2-crud-x@2.4.2...d2-crud-x@2.4.3) (2020-07-02)


### Bug Fixes

* 修复获取不到分组中的字段配置的问题 ([2a29a25](https://github.com/greper/d2-crud/commit/2a29a25111252e2a406da6ae97220cb65bea66f5))





## [2.4.2](https://github.com/greper/d2-crud/compare/d2-crud-x@2.4.1...d2-crud-x@2.4.2) (2020-07-01)


### Performance Improvements

* 手动调用addRow方法可以传入默认值 ([59b7a6f](https://github.com/greper/d2-crud/commit/59b7a6f0f33d6cab9fafb3ab7bf02a47007d172c))





## [2.4.1](https://github.com/greper/d2-crud/compare/d2-crud-x@2.4.0...d2-crud-x@2.4.1) (2020-07-01)


### Bug Fixes

* 修复fetchDetail在添加时异常问题 ([18899a4](https://github.com/greper/d2-crud/commit/18899a4760420e0d254f261938cda9c21adc6d99))


### Performance Improvements

* 动态添加分组示例 ([3bc9ccc](https://github.com/greper/d2-crud/commit/3bc9ccc03d2a75eeec9f9fb0e3623a7a4000025a))





# [2.4.0](https://github.com/greper/d2-crud/compare/d2-crud-x@2.3.1...d2-crud-x@2.4.0) (2020-06-30)


### Features

* 表单支持分组 ([96f1b54](https://github.com/greper/d2-crud/commit/96f1b54ff480b95461ac37556eeef66fd925a158))
* 更简单方便易用的组件禁用方式（disabled） ([b194ac1](https://github.com/greper/d2-crud/commit/b194ac1f62d88ffd7d887cb8a56e55a4b5cf2511))


### Performance Improvements

* 优化方法名 ([84766ac](https://github.com/greper/d2-crud/commit/84766acd8799f1238689ab707955eafa3b397ab8))
* 优化列表展示性能 ([96dd2bf](https://github.com/greper/d2-crud/commit/96dd2bff511a704fc29f12d4ed342566396014bf))
* d2-form-item抽取重构 ([aaf3564](https://github.com/greper/d2-crud/commit/aaf35642dcb5ce568a8b8e6fc2bac378bda112de))






## [2.3.1](https://github.com/greper/d2-crud/compare/d2-crud-x@2.3.0...d2-crud-x@2.3.1) (2020-06-25)


### Bug Fixes

* 删除无用的$d2CrudSize配置 ([8de9ef8](https://github.com/greper/d2-crud/commit/8de9ef83c3997442faacf0dcf9327be10357454e))
* 支持自定义d2-crud的标签名称 ([2e61b53](https://github.com/greper/d2-crud/commit/2e61b53d746cda80fc7ed1d63db5c1921b599bb2))






# [2.3.0](https://github.com/greper/d2-crud/compare/d2-crud-x@2.2.4...d2-crud-x@2.3.0) (2020-06-24)


### Bug Fixes

* 修复自定义按钮获取不到行数据的bug ([ca5a82e](https://github.com/greper/d2-crud/commit/ca5a82e2e79d14e13e45e8adafbdeed80a6533c5))
* 修复cell-data-change事件 ([304a242](https://github.com/greper/d2-crud/commit/304a24271e6c8085c77655c4aea7e5ed66040051))
* 修复slot方式修改数组数据会把行数据也改掉的bug ([bd8f14f](https://github.com/greper/d2-crud/commit/bd8f14f8d069d1335629cc3a044379102ad69bb8))


### Features

* 对话框全屏，标题slot ([2bd3dec](https://github.com/greper/d2-crud/commit/2bd3decf4816502c7413afa6106e3cb746846eb4))
* 对话框增加自定义header slot ([0c25a93](https://github.com/greper/d2-crud/commit/0c25a93e85f91b34c2cc2e6f5883e1ab284cbb0c))
* 支持d2-column递归组件 ([b536e21](https://github.com/greper/d2-crud/commit/b536e21a94e399ac403a24e8d5910000510c42a5))
* d2-crud多级表头重构,抽取d2-cell组件 ([0a11bf5](https://github.com/greper/d2-crud/commit/0a11bf5d5116bdb74cf33129e04efac0d53bb154))


### Performance Improvements

* 优化提交form ([90dab6b](https://github.com/greper/d2-crud/commit/90dab6bf6725ceb4dd22f8a0a664b000c4e9ef66))






## [2.2.4](https://github.com/greper/d2-crud/compare/d2-crud-x@2.2.3...d2-crud-x@2.2.4) (2020-06-17)


### Performance Improvements

* jsx示例 ([137f745](https://github.com/greper/d2-crud/commit/137f7458bdc37b36b18b9f60df67011fb4c9ab60))





## [2.2.3](https://github.com/greper/d2-crud/compare/d2-crud-x@2.2.2...d2-crud-x@2.2.3) (2020-06-16)


### Performance Improvements

* 行编辑演示 ([aec224f](https://github.com/greper/d2-crud/commit/aec224f87f1a41811d48205280c84c48cb7044a2))





## [2.2.2](https://github.com/greper/d2-crud/compare/d2-crud-x@2.2.1...d2-crud-x@2.2.2) (2020-06-12)

**Note:** Version bump only for package d2-crud-x





## [2.2.1](https://github.com/greper/d2-crud/compare/d2-crud-x@2.2.0...d2-crud-x@2.2.1) (2020-06-08)

**Note:** Version bump only for package d2-crud-x





# [2.2.0](https://github.com/greper/d2-crud/compare/d2-crud-x@2.1.0...d2-crud-x@2.2.0) (2020-06-08)


### Bug Fixes

* 增加选项的禁用配置，增加dictSwitch,部分ie兼容性问题修复 ([c91a04b](https://github.com/greper/d2-crud/commit/c91a04bbdd201d117953048c56cca53ae66dad0d))


### Features

* 自定义事件监听支持 ([1f9fd39](https://github.com/greper/d2-crud/commit/1f9fd39316375c6102279e1a7a65b33ae16a4733))





# [2.1.0](https://github.com/greper/d2-crud/compare/d2-crud-x@2.1.0-0...d2-crud-x@2.1.0) (2020-06-04)


### Bug Fixes

* 修复文件上传进度条显示的bug，优化一些其他显示上的问题 ([53d54ba](https://github.com/greper/d2-crud/commit/53d54bad45782ddc7a6970ad25c2811e137ff41b))






# 2.1.0-0 (2020-06-03)


### Features

* dict配置增加覆盖全局getRemoteDataFunc的方法，全局方法增加dict参数 ([22db385](https://github.com/greper/d2-crud/commit/22db38591d7c285b0e50ce8b9cd6aedd0c5032f9))
