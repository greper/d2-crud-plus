# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.17.1](https://github.com/greper/d2-crud-plus/compare/v2.17.0...v2.17.1) (2021-07-13)

**Note:** Version bump only for package d2-crud-plus





## [2.16.9](https://github.com/greper/d2-crud-plus/compare/v2.16.8...v2.16.9) (2021-06-18)


### Bug Fixes

* dict-xxx的el事件绑定 ([aa98cf6](https://github.com/greper/d2-crud-plus/commit/aa98cf690562325f40475e2750d25bf727ee4dce))





## [2.16.8](https://github.com/greper/d2-crud-plus/compare/v2.16.7...v2.16.8) (2021-06-16)


### Bug Fixes

* wangeditor 不能多个的问题 ([81a5211](https://github.com/greper/d2-crud-plus/commit/81a52114d971843e493a1afc1cb1c9f308614041))





## [2.16.7](https://github.com/greper/d2-crud-plus/compare/v2.16.6...v2.16.7) (2021-06-11)


### Bug Fixes

* updateRequest内抛异常会在上方debug显示错误记录的bug ([4a005da](https://github.com/greper/d2-crud-plus/commit/4a005da68e4f9384cf6637f83cea97f0397d8340))





## [2.16.6](https://github.com/greper/d2-crud-plus/compare/v2.16.3...v2.16.6) (2021-06-09)


### Bug Fixes

* 修复隐藏字段列显示时，valuesformat 的label不显示的bug ([ab0a730](https://github.com/greper/d2-crud-plus/commit/ab0a730a1fe1d38d423df9b573c5f9f986f997b0))





## [2.16.3](https://github.com/greper/d2-crud-plus/compare/v2.16.2...v2.16.3) (2021-04-28)

**Note:** Version bump only for package d2-crud-plus





## [2.16.2](https://github.com/greper/d2-crud-plus/compare/v2.16.1...v2.16.2) (2021-03-11)


### Bug Fixes

* text-area过长时，view模式超出显示的问题 ([ad8499b](https://github.com/greper/d2-crud-plus/commit/ad8499baa408234f63ef8d24a7f3e1f0fc5abb4e))





## [2.16.1](https://github.com/greper/d2-crud-plus/compare/v2.16.0...v2.16.1) (2021-02-22)


### Performance Improvements

* 支持重新加载crudOptions ([6d0ebdc](https://github.com/greper/d2-crud-plus/commit/6d0ebdc3856bab4b80bec38772ebebb8d9f99c97))





# [2.16.0](https://github.com/greper/d2-crud-plus/compare/v2.15.1...v2.16.0) (2021-02-11)

**Note:** Version bump only for package d2-crud-plus





# [2.15.0](https://github.com/greper/d2-crud-plus/compare/v2.14.0...v2.15.0) (2021-01-11)


### Bug Fixes

* [#124](https://github.com/greper/d2-crud-plus/issues/124) fetchDetail会经过valueBuilder处理 ([f995c10](https://github.com/greper/d2-crud-plus/commit/f995c10e432d28f36d928513a47a1a2878dc5d4a))
* [#129](https://github.com/greper/d2-crud-plus/issues/129) [#128](https://github.com/greper/d2-crud-plus/issues/128) 优化树形组件，支持ref字典操作 ([85f7627](https://github.com/greper/d2-crud-plus/commit/85f7627096f7aa0a0f4116e079068566907ca938))
* [#132](https://github.com/greper/d2-crud-plus/issues/132) 支持关闭tag动画 ([eda454d](https://github.com/greper/d2-crud-plus/commit/eda454d54c2293716fcbe5313df648230cb9ec31))
* 最后一页，切换每页条数时，current为小数的bug ([6f37a03](https://github.com/greper/d2-crud-plus/commit/6f37a031f6bca062864f02d4d873c346a0914610))


### Features

* showDialog 支持自定义mode，同时增加modeContext参数，支持mode=edit的同时可以有不同的处理 ([168face](https://github.com/greper/d2-crud-plus/commit/168facecae56b4c943777010763ce6c93480e69a))





# [2.14.0](https://github.com/greper/d2-crud-plus/compare/v2.13.6...v2.14.0) (2020-12-22)


### Features

* 操作列按钮折叠 ([661c55d](https://github.com/greper/d2-crud-plus/commit/661c55d82989fbe37dc9683864e174bcde0e53d3))
* crud配置异步从后台获取演示案例 ([c76922b](https://github.com/greper/d2-crud-plus/commit/c76922bf612cf02408f7be2b9bbcfbe0c873f1b6))
* getCrudOptions 支持异步 ([3d6536f](https://github.com/greper/d2-crud-plus/commit/3d6536ff783abe4f682029a67b75cd14fd499cf7))


### Performance Improvements

* 翻页按钮点击后，滚动条恢复到顶部 ([ab40ad5](https://github.com/greper/d2-crud-plus/commit/ab40ad573680955658416e8c9c58b804629e88c3))
* 树形组件优化，增加过滤，对话框内部滚动条，增加对话框关闭事件 ([87eda0f](https://github.com/greper/d2-crud-plus/commit/87eda0fe0ece60876920f2b436cbe74cab58b022))
* 正则表达式用例 ([21f5181](https://github.com/greper/d2-crud-plus/commit/21f5181d5b973bd5c355f5f3bf231ca5d88d7545))





## [2.13.6](https://github.com/greper/d2-crud-plus/compare/v2.13.5...v2.13.6) (2020-12-14)


### Bug Fixes

* 抽屉模式禁用拖拽和全屏，取消抽屉模式下的focus效果 ([bd3db8f](https://github.com/greper/d2-crud-plus/commit/bd3db8fc320c8b3150543632ae51162a47f30a21))
* 修复行slot获取不到index的bug ([880c0aa](https://github.com/greper/d2-crud-plus/commit/880c0aaa035b5a87ac4ef44f248cc37786272fce))





## [2.13.5](https://github.com/greper/d2-crud-plus/compare/v2.13.4...v2.13.5) (2020-12-01)

**Note:** Version bump only for package d2-crud-plus





## [2.13.4](https://github.com/greper/d2-crud-plus/compare/v2.13.3...v2.13.4) (2020-11-30)


### Bug Fixes

* search form 支持itemProps配置 ([110a38c](https://github.com/greper/d2-crud-plus/commit/110a38c695597c2ddcca45adbe2988c9e681c217))
* 修复关闭自动查询后，重置也不自动查询的问题 ([5defb7f](https://github.com/greper/d2-crud-plus/commit/5defb7f460ae16de4588b25ce9d89c52fb27ae24))
* 修复列设置无法感知变化的bug ([4062984](https://github.com/greper/d2-crud-plus/commit/4062984ed576065e8a75235f4577bedaf534c588))
* 修复某些组件修改值后无法触发校验的bug ([8dfc13f](https://github.com/greper/d2-crud-plus/commit/8dfc13f8fe99206faddd74f41be33f13ce74acc8))


### Performance Improvements

* 支持设置tag 主题 ([b57b2bd](https://github.com/greper/d2-crud-plus/commit/b57b2bdafa7ec6219c654e861590d14b80aa7418))
* 获取表单组件ref ([3ce3615](https://github.com/greper/d2-crud-plus/commit/3ce36151a4409bc72d4f8652f1fea41858171a02))
* 获取表单组件ref ([afd0040](https://github.com/greper/d2-crud-plus/commit/afd0040cdeb45dae03d723d448b17874f2ae03e9))





## [2.13.3](https://github.com/greper/d2-crud-plus/compare/v2.13.2...v2.13.3) (2020-11-15)


### Bug Fixes

* 支持关闭debug info 日志 ([e9f5bf9](https://github.com/greper/d2-crud-plus/commit/e9f5bf97150d6ed574a1b767ed9870b1f7fbdb63))


### Performance Improvements

* 去除多余的log ([8f789c1](https://github.com/greper/d2-crud-plus/commit/8f789c15f680e994d0397b2eb387e23eded510de))
* 优化crud-x的包大小 ([aa41b3b](https://github.com/greper/d2-crud-plus/commit/aa41b3bd10e0547c943eaad26c915d0c58ee9854))
* addRequest editRequest 可以返回null ([86d6381](https://github.com/greper/d2-crud-plus/commit/86d63812cf0747c95d379b7bc4d3dad572a4ddee))





## [2.13.2](https://github.com/greper/d2-crud-plus/compare/v2.13.1...v2.13.2) (2020-11-04)


### Bug Fixes

* 修复pagination.pageSizes无法覆盖的bug ([88b65c4](https://github.com/greper/d2-crud-plus/commit/88b65c41e758aadffeb0dfc5c44c5cab5bd96e42))
* defaultSort无效的问题 ([b3c5677](https://github.com/greper/d2-crud-plus/commit/b3c56770ffaf3f2b5fa395c6b45e8c0d74da0afb))
* dict.url()返回空则不请求数据字典 ([4183cd5](https://github.com/greper/d2-crud-plus/commit/4183cd514057d337381d9112c8a0e7823bf01e6f))


### Performance Improvements

* render增加scope ([c9664b0](https://github.com/greper/d2-crud-plus/commit/c9664b040c54f42b02fe8021611f0749966d6618))





## [2.13.1](https://github.com/greper/d2-crud-plus/compare/v2.13.0...v2.13.1) (2020-11-02)


### Bug Fixes

* 恢复误删的provider ([3ce7ce9](https://github.com/greper/d2-crud-plus/commit/3ce7ce99e61867e37b4b4377df2071e81f288847))





# [2.13.0](https://github.com/greper/d2-crud-plus/compare/v2.12.3...v2.13.0) (2020-11-01)


### Features

* 表单增加抽屉模式，优化表单打开动画，检测修改提醒保存 ([dde6933](https://github.com/greper/d2-crud-plus/commit/dde6933d603ee1c376f96a82a1a4d552d5bddb66))
* 行编辑支持 ([2ecefb9](https://github.com/greper/d2-crud-plus/commit/2ecefb9e27320babb2bd34bf6bf0b832ba5ebc43))


### Performance Improvements

* 优化排除lodash ([71d88c7](https://github.com/greper/d2-crud-plus/commit/71d88c7f8cfc2db7b23b3df584230ff6d2b01d81))





## [2.12.2](https://github.com/greper/d2-crud-plus/compare/v2.12.1...v2.12.2) (2020-10-31)

**Note:** Version bump only for package d2-crud-plus





## [2.12.1](https://github.com/greper/d2-crud-plus/compare/v2.12.0...v2.12.1) (2020-10-31)


### Bug Fixes

* 修复phoneinput组件无法disabled的问题 ([93e22e6](https://github.com/greper/d2-crud-plus/commit/93e22e6ba4aad6f49f1b12deb7cf785f41bb5be5))
* 修复列太多，列设置的确定按钮点不到的bug ([b12cefe](https://github.com/greper/d2-crud-plus/commit/b12cefea502f22eeb750870d6a7be84a253df265))
* 修复推迟加载后search报错的bug ([148d9fd](https://github.com/greper/d2-crud-plus/commit/148d9fd2207ef850f3ad5cfb26a24fab355dede7))
* 修复权限链接报404的问题 ([7c77efa](https://github.com/greper/d2-crud-plus/commit/7c77efae6616cfbedb853a581c0a46f2c616bd33))
* 修复非配置字段赋值的bug ([9a3daaa](https://github.com/greper/d2-crud-plus/commit/9a3daaa2ba8bee34b4d82587a18127cd874591b3))


### Performance Improvements

* dict 增加transfer配置 ([2ceb3fb](https://github.com/greper/d2-crud-plus/commit/2ceb3fb7e854435c4cf6adb5760f5d4eeb2d201f))
* rowhandle修改为minWidth ([9985c9a](https://github.com/greper/d2-crud-plus/commit/9985c9acb3230f473208f9eb42f97eace00dae9c))
* rowHandle默认改为minWidth ([d9edc6a](https://github.com/greper/d2-crud-plus/commit/d9edc6a162a736e5c1d0a9c3fcf642352965ea48))
* toolbar refresh配置false可以隐藏按钮 ([ae6a067](https://github.com/greper/d2-crud-plus/commit/ae6a06745f9cc3bff34b67285a0be6b36632f95e))
* 增加initColumnBefore方法 ([5860e7a](https://github.com/greper/d2-crud-plus/commit/5860e7a5651f8c1d0b376d2333c0e2b4f136f8a5))
* 增加无依赖示例 ([a3a0d77](https://github.com/greper/d2-crud-plus/commit/a3a0d7713fa14c9819f7426839b219c2c2a5a98b))
* 服务端排序实现 ([08f7ba5](https://github.com/greper/d2-crud-plus/commit/08f7ba55e8b412c3388fd95b2e59b912b140b61d))





# [2.12.0](https://github.com/greper/d2-crud-plus/compare/v1.1.0...v2.12.0) (2020-10-21)


### Bug Fixes

* break change dict-xxx的onReady方法参数的component改为{component:xx,data,setDictData} ([6489e34](https://github.com/greper/d2-crud-plus/commit/6489e3478304cf715c9c4dc5c216fbf7e5863e9d))
* column.dict不再覆盖用户已经自定义的component.props.dict ([531de7e](https://github.com/greper/d2-crud-plus/commit/531de7e926b2428141f9b0cb89c400258945c60d))
* format的提示优化 ([01f4a72](https://github.com/greper/d2-crud-plus/commit/01f4a722a3ab6213446aa3e406fc10758f2bfb29))
* format的提示优化 ([eaa41fd](https://github.com/greper/d2-crud-plus/commit/eaa41fd3847b3eddb0108f825d4170431e0838b7))
* 优化表格有滚动条时高度计算导致双滚动条的bug ([4460d6c](https://github.com/greper/d2-crud-plus/commit/4460d6c5179d08bfe595b559cf844eadcf9f2fa8))
* 修复 dict-switch 修改value为非boolean值时表单无法显示正确值的bug ([f378624](https://github.com/greper/d2-crud-plus/commit/f378624d48f35202a9507f5255822ab762b1a3a3))
* 修复cascade不显示label的bug ([d36495e](https://github.com/greper/d2-crud-plus/commit/d36495e7254c28a60158b0e992fd21318f3588f1))
* 修复d2p-file-uploader会覆盖上传参数的问题 ([d09a934](https://github.com/greper/d2-crud-plus/commit/d09a93406f5900c9649bd79c626abe6f5af4eb52))
* 修复dictRadio valuechange触发两次的问题 ([36d5325](https://github.com/greper/d2-crud-plus/commit/36d53251f73a7be1d06a84785d25f6903aff6bb7))
* 修复dictSelect配置options无效的bug ([a39cde6](https://github.com/greper/d2-crud-plus/commit/a39cde632585232b675df65e45dfd4791f8602a8))
* 修复dict有时候获取不到data list的bug ([2a68822](https://github.com/greper/d2-crud-plus/commit/2a68822d74e6b805808fd652dfe58840caa43f5c))
* 修复input查询框点击查询 执行两次查询的bug ([110e8b9](https://github.com/greper/d2-crud-plus/commit/110e8b9ff2200d894ef03c74ba781d41afc511d7))
* 修复rowHandle:false 报错的问题 ([59fe2da](https://github.com/greper/d2-crud-plus/commit/59fe2da12493044bb9c0fb45076cbde596681e28))
* 修复view.disabled取反的bug ([21dcbde](https://github.com/greper/d2-crud-plus/commit/21dcbde09381180bb0c83885cd5941ab705d3421))
* 修复view模式下0 值不展示的bug ([6b06680](https://github.com/greper/d2-crud-plus/commit/6b06680fd34b834334c40a675f1b8d78c98c402b))
* 修复vxe-table的一些bug ([0a8a52f](https://github.com/greper/d2-crud-plus/commit/0a8a52fd6d40e47f41502fbe050f8348e30e3377))
* 修复一个数据扁平化的bug ([6a53f14](https://github.com/greper/d2-crud-plus/commit/6a53f1484a906833bcff2d84542ab04ed05abd48))
* 修复一个无限翻页的bug ([8533007](https://github.com/greper/d2-crud-plus/commit/8533007eb370bd3c8123f626ed2b91472e9a579a))
* 修复分组下，查看span配置无效的bug ([765fc76](https://github.com/greper/d2-crud-plus/commit/765fc76b3b98c1f1b09ce660c8e23ec4589c783f))
* 修复删除最后一页的最后一条数据后列表不刷新的bug ([a77e673](https://github.com/greper/d2-crud-plus/commit/a77e6731afc94ebe0914b8cbfbc4f51ec67f537c))
* 修复多次触发formdatechange的bug ([0dadab9](https://github.com/greper/d2-crud-plus/commit/0dadab9973aeffc378f9b9cd762f78ae1ab4fd38))
* 修复嵌套表格点击删除按钮刷新页面的bug ([4db54b1](https://github.com/greper/d2-crud-plus/commit/4db54b1eba5dd703545147d1d0affacfebd8b7bf))
* 修复文件上传进度条显示的bug，优化一些其他显示上的问题 ([53d54ba](https://github.com/greper/d2-crud-plus/commit/53d54bad45782ddc7a6970ad25c2811e137ff41b))
* 修复文本域无法输入的问题 ([bddee2d](https://github.com/greper/d2-crud-plus/commit/bddee2d2283014a94d136ad7659dbebf2a17e24b))
* 修复查询工具条，重置按钮丢失的问题 ([6ab9c45](https://github.com/greper/d2-crud-plus/commit/6ab9c4579545733d4c38f735c87a0744af996b44))
* 修复查询工具条动态变更字段不生效的bug ([d5a51ad](https://github.com/greper/d2-crud-plus/commit/d5a51ad0e2a387e45aed6b99e1134601ba1619f7))
* 修复点号配置多级数据时查询的问题 ([d936775](https://github.com/greper/d2-crud-plus/commit/d9367758f90434a452d425012d6e9b244e8046f4))
* 修复点号配置多级数据时查询的问题 ([95f6bdc](https://github.com/greper/d2-crud-plus/commit/95f6bdc74b1809a2fc2be6801e4f87989c5b2d70))
* 修复级联懒加载时无法反显的bug ([ed840d3](https://github.com/greper/d2-crud-plus/commit/ed840d3af55fb9e6a54152b67c9eab23720c61ab))
* 修复编辑和添加rule有差异时的问题 ([cf1ec26](https://github.com/greper/d2-crud-plus/commit/cf1ec26d4dee2e3d3fd54d226350c074c8713273))
* 修复翻到最后一页，切换每页条数时，查询空白的问题 ([6e5300a](https://github.com/greper/d2-crud-plus/commit/6e5300a081b45053e53f945246014b599aea784d))
* 修复自动化测试出来的bug， 级联value format 显示的bug ([2658d2f](https://github.com/greper/d2-crud-plus/commit/2658d2fbc0e7c06ef760d2e8c12dd81e66fcd7f8))
* 修复隐藏操作列报错的bug ([0ab2d27](https://github.com/greper/d2-crud-plus/commit/0ab2d27cd970c4d804640682fef547181d8905a8))
* 修复隐藏操作列报错的bug ([1d353ad](https://github.com/greper/d2-crud-plus/commit/1d353ad9f41be5b82840b8c18f8aece3122bdc17))
* 兼容finally ([ce959f7](https://github.com/greper/d2-crud-plus/commit/ce959f7f1a17dc00bbb667f3c36d46e8d9c76daa))
* 列设置本地缓存可以设置key键值名称 ([c8665fa](https://github.com/greper/d2-crud-plus/commit/c8665fa76b62b1571645e1259b8a06183b9b28c1))
* 删除旧版本兼容性提示 ([5a7aac1](https://github.com/greper/d2-crud-plus/commit/5a7aac14515b0a6a2d3e6f2f86770ae4a917396c))
* 前端分页搜索示例 ([669d6bb](https://github.com/greper/d2-crud-plus/commit/669d6bbcb4635d79c3493b0e3724d469f211f00c))
* 增加response处理配置 ([6890208](https://github.com/greper/d2-crud-plus/commit/68902085d0aa5d4ec419f517a1ee890f7d77a43d))
* 增加选项的禁用配置，增加dictSwitch,部分ie兼容性问题修复 ([c91a04b](https://github.com/greper/d2-crud-plus/commit/c91a04bbdd201d117953048c56cca53ae66dad0d))
* 增加配置项updateTableDataAfterEdit，保存对话框后不插入数据到table中，通过刷新列表更新数据 ([6ee6f07](https://github.com/greper/d2-crud-plus/commit/6ee6f079f202a0ff053d318c251139d2aa1f0312))
* 懒加载示例 ([a2641d4](https://github.com/greper/d2-crud-plus/commit/a2641d471bc5b1acf4bac326c1045c00ed3ffdbd))
* 整理了expose方法，其中updateAfter方法名修改成editAfter ([eb9631f](https://github.com/greper/d2-crud-plus/commit/eb9631f65cd5dd5517a90071ca4159af69978786))
* 文档调整 ([423b3b4](https://github.com/greper/d2-crud-plus/commit/423b3b4655861d3d1e6fe5bdac79b9deaeb20cb9))
* 查询表单宽度可以不写px后缀 ([4be5c88](https://github.com/greper/d2-crud-plus/commit/4be5c8878483bbffc8da4b21bc5691d6a9d90671))


### Features

* checkbox联动radio修改radio的选项功能示例，d2-crud的表单组件增加ref ([66d26bb](https://github.com/greper/d2-crud-plus/commit/66d26bb039cb0848936e41019883ec9a1ec1ce7d))
* d2-admin 1.17版本同步 ([7037e4a](https://github.com/greper/d2-crud-plus/commit/7037e4ada20dd5b62c248349bd51f7014962877f))
* dict配置增加覆盖全局getRemoteDataFunc的方法，全局方法增加dict参数 ([22db385](https://github.com/greper/d2-crud-plus/commit/22db38591d7c285b0e50ce8b9cd6aedd0c5032f9))
* quill富文本编辑器 ([54c39cc](https://github.com/greper/d2-crud-plus/commit/54c39cc911f5a481894850ea227cdc627c5b0716))
* search.show支持传入方法 ([3aa0353](https://github.com/greper/d2-crud-plus/commit/3aa0353162577374922beca1e8ce1faa5f7c0bef))
* textArea支持 ([12f2c91](https://github.com/greper/d2-crud-plus/commit/12f2c91ea492b4b5f4b781c7826b0c6939e0db93))
* 优化字典获取自定义，修复bug，增加示例的行数 ([e94749d](https://github.com/greper/d2-crud-plus/commit/e94749de0ad885ee5feea6b1b6a2a2096f057a2c))
* 列表数据结构支持自定义 ([30fd7a3](https://github.com/greper/d2-crud-plus/commit/30fd7a3576cc7345ecd1433b1ca7f5013e4957cf))
* 动态显示隐藏整个表单字段 ([3153602](https://github.com/greper/d2-crud-plus/commit/31536028be6ac052d4c5c9d5432807be4f46d1de))
* 发布 ([37af76c](https://github.com/greper/d2-crud-plus/commit/37af76c91d205e772118aee50f87766b25804274))
* 多文件上传显示优化，批量删除，上传文件参数优化 ([8946934](https://github.com/greper/d2-crud-plus/commit/89469349cdd6495ddd503f206ab110bf75dce60c))
* 多文件上传显示优化，批量删除，上传文件参数优化 ([91e2437](https://github.com/greper/d2-crud-plus/commit/91e243796221b706b0bb906aca5c00e59ed597fe))
* 头像裁剪组件，图片行显示支持预览大图 ([348ec15](https://github.com/greper/d2-crud-plus/commit/348ec15b0eca5c55512b56134fb1086a36ba4d06))
* 实验性支持vxe-table ([9b518c4](https://github.com/greper/d2-crud-plus/commit/9b518c46091a76a3bfc96d9c79ee763a26be9fa2))
* 对话框增加自定义header slot ([0c25a93](https://github.com/greper/d2-crud-plus/commit/0c25a93e85f91b34c2cc2e6f5883e1ab284cbb0c))
* 支持本地服务器上传文件 ([1f319f2](https://github.com/greper/d2-crud-plus/commit/1f319f20afcee32c4527bfd0e10f263234723b3a))
* 支持点号key的方式配置多级数据 ([927600d](https://github.com/greper/d2-crud-plus/commit/927600d0fefb4c281c2b797f29158ac792cca99c))
* 支持配置默认表单span ([9268d4a](https://github.com/greper/d2-crud-plus/commit/9268d4a1c19dcdf549deab965a07fa9904c4a010))
* 新增工具条功能：刷新，查询展开，页面紧凑切换，列设置。内置分页组件可以启用 ([980ff30](https://github.com/greper/d2-crud-plus/commit/980ff30154453c8b1cd77f19f9efe6f7a20f9bef))
* 更简单方便易用的组件禁用方式（disabled） ([b194ac1](https://github.com/greper/d2-crud-plus/commit/b194ac1f62d88ffd7d887cb8a56e55a4b5cf2511))
* 查看功能 ([7d03e94](https://github.com/greper/d2-crud-plus/commit/7d03e94dc2ea6b67211ac554fe2f0ef3d8912a49))
* 查询框组件支持style 和 class配置 ([df1115b](https://github.com/greper/d2-crud-plus/commit/df1115bc6d850f453d401d1696cb1b264d0f8ad7))
* 自定义事件监听支持 ([1f9fd39](https://github.com/greper/d2-crud-plus/commit/1f9fd39316375c6102279e1a7a65b33ae16a4733))
* 表单支持分组 ([96f1b54](https://github.com/greper/d2-crud-plus/commit/96f1b54ff480b95461ac37556eeef66fd925a158))
* 重大优化 ([9b1009a](https://github.com/greper/d2-crud-plus/commit/9b1009a62383db653ac25f7f83b048dad0a40448))


### Performance Improvements

* checkbox radio增加按钮样式配置 ([602265b](https://github.com/greper/d2-crud-plus/commit/602265bdab4780f881298ac01e4215da9b15b860))
* column.show支持传入一个无参方法，form表单支持自定义排序 ([0500c40](https://github.com/greper/d2-crud-plus/commit/0500c40f6bc717d6ad3a0e680fe7e670b47494ea))
* crud-search增加slot ([f6b6b1d](https://github.com/greper/d2-crud-plus/commit/f6b6b1dcce1cdab47f20298b02070c991b58c9d0))
* dict onready事件支持修改过滤data ([bd5907d](https://github.com/greper/d2-crud-plus/commit/bd5907de509b84c6423673d42dc20cc24116de7d))
* dict onready事件支持修改过滤data ([661131b](https://github.com/greper/d2-crud-plus/commit/661131b5ccc9e32339a799665519d94c790a3b5b))
* extends解除d2crudplus依赖 ([66c5c70](https://github.com/greper/d2-crud-plus/commit/66c5c70bbf505e76296257c56debef0d5855b843))
* format.page.request支持方法自定义 ([95dc6f2](https://github.com/greper/d2-crud-plus/commit/95dc6f2f2883113b6f2dbc74a7df5cfa43bb9ce5))
* form传递方式改为provide/inject方式 ([158a225](https://github.com/greper/d2-crud-plus/commit/158a225be45aabd5a29de812ea1f00320212a26f))
* onready增加form参数 ([f31c788](https://github.com/greper/d2-crud-plus/commit/f31c788a17a77257241a5db829380cc32abe69b8))
* radio增加border配置 ([640ca4c](https://github.com/greper/d2-crud-plus/commit/640ca4cf877ade9bb97c7dff593b6cc9ae396da9))
* search 增加事件监听 ([28450de](https://github.com/greper/d2-crud-plus/commit/28450def69ffae2695c02acacb2ece804dd1e44d))
* search增加前置与后置slot ([bd0a032](https://github.com/greper/d2-crud-plus/commit/bd0a032f7292bb9d3bb023af21f3a101696e7a29))
* toobar 和 search 增加文本配置，可以自定义展示文本 ([13e0183](https://github.com/greper/d2-crud-plus/commit/13e0183e4dd435f7647bb43a0b182d794fe98ab6))
* values-format优化为，加载的时候不显示value值 ([21f1380](https://github.com/greper/d2-crud-plus/commit/21f13808a4baa5bc3e033a97a25ec2f2ba7f9cf7))
* valuesformat增加点击事件 ([d3d6cb7](https://github.com/greper/d2-crud-plus/commit/d3d6cb7c363fd54e839f6e4fe001c906ee3b17df))
* 优化一个错误提示 ([91c236a](https://github.com/greper/d2-crud-plus/commit/91c236a460cc08db03878a2eadbddeff801c7e78))
* 优化列过滤器 ([3775371](https://github.com/greper/d2-crud-plus/commit/37753713a135d4f019717f14f016c1a12c5990a0))
* 优化列过滤的emit两次的问题 ([dd4506f](https://github.com/greper/d2-crud-plus/commit/dd4506fdbd3d0a488c776c8c57fc5afad08e26d6))
* 优化字典获取错误提示 ([c881aed](https://github.com/greper/d2-crud-plus/commit/c881aed6f34e1925b8c501adcb98f0f3a020e284))
* 优化导出，支持设置列宽 ([5ce5650](https://github.com/greper/d2-crud-plus/commit/5ce5650a7fcf8b699c493d8d787d99e840be60e4))
* 使用crud-container替换掉d2-container ([facb28e](https://github.com/greper/d2-crud-plus/commit/facb28e801f1fa9eebc4d7a293ad32845f7d4aeb))
* 修复文档错误，新增initBefore，做一些清理工作 ([90567fa](https://github.com/greper/d2-crud-plus/commit/90567fa4ce7a8893c6c65c7c24c40259c4f1abc2))
* 列设置保存到本地 ([b482052](https://github.com/greper/d2-crud-plus/commit/b482052c9665987dca3f699c2b317e7707a24b1d))
* 动态添加分组示例 ([3bc9ccc](https://github.com/greper/d2-crud-plus/commit/3bc9ccc03d2a75eeec9f9fb0e3623a7a4000025a))
* 升级依赖 ([a4b5635](https://github.com/greper/d2-crud-plus/commit/a4b5635b2ec88b940ac2c1a3eebf2187f875765e))
* 图片上传组件优化 ([c2d1cd0](https://github.com/greper/d2-crud-plus/commit/c2d1cd09438873cfdb60d8ff5fd49e8ef6506367))
* 增加d2-crud示例 ([509cac1](https://github.com/greper/d2-crud-plus/commit/509cac1ee86405f1626f754e1014b5aa456f5046))
* 增加pageRequest返回参数的配置 ([033f127](https://github.com/greper/d2-crud-plus/commit/033f12746f26059f403f4d0ddaecf39adf3a57a6))
* 增加字典获取错误提示 ([067a3d2](https://github.com/greper/d2-crud-plus/commit/067a3d20fe7345ddad74801de3675de41b372224))
* 增加嵌套表格示例 ([5b9b3e0](https://github.com/greper/d2-crud-plus/commit/5b9b3e08ad17956742c5175fb1c5f59df185aa1b))
* 增加手动选择示例 ([be9b649](https://github.com/greper/d2-crud-plus/commit/be9b649c50ed091314e4a442be718ca2ec0008dc))
* 增加批量删除示例 ([2907848](https://github.com/greper/d2-crud-plus/commit/290784891a55b898c5c90fe36eb5e44d31e1c138))
* 外部获取数据字典示例 ([53b29ae](https://github.com/greper/d2-crud-plus/commit/53b29ae981c2a12536fb09fd5fd598821882577e))
* 字典增加禁止缓存功能，url()方式取消字典缓存 ([ae5dce1](https://github.com/greper/d2-crud-plus/commit/ae5dce1a19e607ef0c294414518293a1685e6983))
* 手动调用addRow方法可以传入默认值 ([59b7a6f](https://github.com/greper/d2-crud-plus/commit/59b7a6f0f33d6cab9fafb3ab7bf02a47007d172c))
* 数据支持嵌套对象 ([0bbe21f](https://github.com/greper/d2-crud-plus/commit/0bbe21fbc6c3ca4b88c8dc0e0a3e8b0258bb4b91))
* 数据支持嵌套对象 ([aaec065](https://github.com/greper/d2-crud-plus/commit/aaec0653bafb10d9845616763f7940c07050610f))
* 文档优化 ([5629114](https://github.com/greper/d2-crud-plus/commit/562911449d0399d989c7dddfd76f90ad4bc45322))
* 日期format示例 ([03955b5](https://github.com/greper/d2-crud-plus/commit/03955b51113cf9f287e8d0ae8a5d165bee9da53b))
* 查看按钮优化为默认显示 ([07b1112](https://github.com/greper/d2-crud-plus/commit/07b11123f98a86a0441a2642538bc14429ba96bc))
* 查询增加reset事件 ([5703af7](https://github.com/greper/d2-crud-plus/commit/5703af7d030aa49e79d6d103871d10bcdb8a2813))
* 查询增加防抖自动查询功能 ([e8430d3](https://github.com/greper/d2-crud-plus/commit/e8430d38ae74440229d31ba9ad5e6c7cbaae3e99))
* 查询框按钮样式可配置 ([ccde74f](https://github.com/greper/d2-crud-plus/commit/ccde74f6871795a40e10e6ec5481d534b4dd8f47))
* 查询框支持修改尺寸 ([dfa2852](https://github.com/greper/d2-crud-plus/commit/dfa28526a1a826281fd74a7a2033d137e71c427a))
* 查询的title可配置 ([4c3739a](https://github.com/greper/d2-crud-plus/commit/4c3739aefa18037332b5bc86c3743f4b63d76758))
* 查询示例优化 ([e39c043](https://github.com/greper/d2-crud-plus/commit/e39c0430062a7e3f65b4666b9d39961875e0c299))
* 查询表单重置按钮增加防抖自动查询 ([d03fd7b](https://github.com/greper/d2-crud-plus/commit/d03fd7be722c4c9927a25a86f5c42aaa13541cac))
* 每页条数设置增加本地保存 ([f687297](https://github.com/greper/d2-crud-plus/commit/f687297ace1d70b9d406cb59f06fa78be2aa8263))
* 示例全部改成新版带toolbar界面 ([6770fc9](https://github.com/greper/d2-crud-plus/commit/6770fc9980ba17083ffb414309ad8f6e15d6dbe1))
* 移除d2-icon依赖 ([2d8fdb4](https://github.com/greper/d2-crud-plus/commit/2d8fdb4292f7b26c7f9f8a7dbe9fbab9aca26119))
* 精简renderCustomComponent代码 ([bd544ce](https://github.com/greper/d2-crud-plus/commit/bd544ce9f120712d35ef056e27f1ead6f4a30238))
* 组件独立使用示例 ([5de8d79](https://github.com/greper/d2-crud-plus/commit/5de8d79041046925ebad0f7029f615f68a59deb0))
* 继续完善e2e测试，修复一堆测出来的bug ([fe7446e](https://github.com/greper/d2-crud-plus/commit/fe7446e94468d7a5561213e7bed01bec065210e7))
* 自动染色功能 ([c955c92](https://github.com/greper/d2-crud-plus/commit/c955c92948c92f30a94f24b4128a8af0527264f4))
* 行组件disabled方法支持传参 ([1de28b0](https://github.com/greper/d2-crud-plus/commit/1de28b0d9fc426a2483b890ed922890bfcc6179a))
* 表格滚动条美化 ([0979576](https://github.com/greper/d2-crud-plus/commit/09795765a09e7acf365bdfe23dd5e158267722f7))





## [1.16.7](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.16.6...d2-crud-plus@1.16.7) (2020-10-12)


### Bug Fixes

* 修复查询工具条，重置按钮丢失的问题 ([6ab9c45](https://github.com/greper/d2-crud-plus/commit/6ab9c4579545733d4c38f735c87a0744af996b44))
* 修复自动化测试出来的bug， 级联value format 显示的bug ([2658d2f](https://github.com/greper/d2-crud-plus/commit/2658d2fbc0e7c06ef760d2e8c12dd81e66fcd7f8))
* 前端分页搜索示例 ([669d6bb](https://github.com/greper/d2-crud-plus/commit/669d6bbcb4635d79c3493b0e3724d469f211f00c))
* 懒加载示例 ([a2641d4](https://github.com/greper/d2-crud-plus/commit/a2641d471bc5b1acf4bac326c1045c00ed3ffdbd))


### Performance Improvements

* 优化导出，支持设置列宽 ([5ce5650](https://github.com/greper/d2-crud-plus/commit/5ce5650a7fcf8b699c493d8d787d99e840be60e4))
* 修复文档错误，新增initBefore，做一些清理工作 ([90567fa](https://github.com/greper/d2-crud-plus/commit/90567fa4ce7a8893c6c65c7c24c40259c4f1abc2))





## [1.16.6](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.16.5...d2-crud-plus@1.16.6) (2020-09-27)


### Bug Fixes

* 修复隐藏操作列报错的bug ([0ab2d27](https://github.com/greper/d2-crud-plus/commit/0ab2d27cd970c4d804640682fef547181d8905a8))
* 修复隐藏操作列报错的bug ([1d353ad](https://github.com/greper/d2-crud-plus/commit/1d353ad9f41be5b82840b8c18f8aece3122bdc17))
* 兼容finally ([ce959f7](https://github.com/greper/d2-crud-plus/commit/ce959f7f1a17dc00bbb667f3c36d46e8d9c76daa))


### Performance Improvements

* toobar 和 search 增加文本配置，可以自定义展示文本 ([13e0183](https://github.com/greper/d2-crud-plus/commit/13e0183e4dd435f7647bb43a0b182d794fe98ab6))
* 移除d2-icon依赖 ([2d8fdb4](https://github.com/greper/d2-crud-plus/commit/2d8fdb4292f7b26c7f9f8a7dbe9fbab9aca26119))





## [1.16.5](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.16.4...d2-crud-plus@1.16.5) (2020-09-16)


### Performance Improvements

* 优化字典获取错误提示 ([c881aed](https://github.com/greper/d2-crud-plus/commit/c881aed6f34e1925b8c501adcb98f0f3a020e284))





## [1.16.4](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.16.3...d2-crud-plus@1.16.4) (2020-09-10)


### Bug Fixes

* format的提示优化 ([01f4a72](https://github.com/greper/d2-crud-plus/commit/01f4a722a3ab6213446aa3e406fc10758f2bfb29))
* format的提示优化 ([eaa41fd](https://github.com/greper/d2-crud-plus/commit/eaa41fd3847b3eddb0108f825d4170431e0838b7))
* 修复编辑和添加rule有差异时的问题 ([cf1ec26](https://github.com/greper/d2-crud-plus/commit/cf1ec26d4dee2e3d3fd54d226350c074c8713273))


### Performance Improvements

* 图片上传组件优化 ([c2d1cd0](https://github.com/greper/d2-crud-plus/commit/c2d1cd09438873cfdb60d8ff5fd49e8ef6506367))





## [1.16.3](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.16.2...d2-crud-plus@1.16.3) (2020-09-09)


### Bug Fixes

* 修复 dict-switch 修改value为非boolean值时表单无法显示正确值的bug ([f378624](https://github.com/greper/d2-crud-plus/commit/f378624d48f35202a9507f5255822ab762b1a3a3))


### Performance Improvements

* values-format优化为，加载的时候不显示value值 ([21f1380](https://github.com/greper/d2-crud-plus/commit/21f13808a4baa5bc3e033a97a25ec2f2ba7f9cf7))
* 精简renderCustomComponent代码 ([bd544ce](https://github.com/greper/d2-crud-plus/commit/bd544ce9f120712d35ef056e27f1ead6f4a30238))





## [1.16.2](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.16.1...d2-crud-plus@1.16.2) (2020-09-03)


### Performance Improvements

* 查询框支持修改尺寸 ([dfa2852](https://github.com/greper/d2-crud-plus/commit/dfa28526a1a826281fd74a7a2033d137e71c427a))





## [1.16.1](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.16.0...d2-crud-plus@1.16.1) (2020-09-01)


### Performance Improvements

* 增加d2-crud示例 ([509cac1](https://github.com/greper/d2-crud-plus/commit/509cac1ee86405f1626f754e1014b5aa456f5046))
* 增加字典获取错误提示 ([067a3d2](https://github.com/greper/d2-crud-plus/commit/067a3d20fe7345ddad74801de3675de41b372224))
* 文档优化 ([5629114](https://github.com/greper/d2-crud-plus/commit/562911449d0399d989c7dddfd76f90ad4bc45322))





# [1.16.0](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.15.7...d2-crud-plus@1.16.0) (2020-08-25)


### Bug Fixes

* 修复input查询框点击查询 执行两次查询的bug ([110e8b9](https://github.com/greper/d2-crud-plus/commit/110e8b9ff2200d894ef03c74ba781d41afc511d7))
* 修复点号配置多级数据时查询的问题 ([d936775](https://github.com/greper/d2-crud-plus/commit/d9367758f90434a452d425012d6e9b244e8046f4))
* 修复点号配置多级数据时查询的问题 ([95f6bdc](https://github.com/greper/d2-crud-plus/commit/95f6bdc74b1809a2fc2be6801e4f87989c5b2d70))


### Features

* 支持点号key的方式配置多级数据 ([927600d](https://github.com/greper/d2-crud-plus/commit/927600d0fefb4c281c2b797f29158ac792cca99c))





## [1.15.7](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.15.6...d2-crud-plus@1.15.7) (2020-08-20)


### Bug Fixes

* 修复view模式下0 值不展示的bug ([6b06680](https://github.com/greper/d2-crud-plus/commit/6b06680fd34b834334c40a675f1b8d78c98c402b))


### Performance Improvements

* checkbox radio增加按钮样式配置 ([602265b](https://github.com/greper/d2-crud-plus/commit/602265bdab4780f881298ac01e4215da9b15b860))
* radio增加border配置 ([640ca4c](https://github.com/greper/d2-crud-plus/commit/640ca4cf877ade9bb97c7dff593b6cc9ae396da9))
* 增加嵌套表格示例 ([5b9b3e0](https://github.com/greper/d2-crud-plus/commit/5b9b3e08ad17956742c5175fb1c5f59df185aa1b))





## [1.15.6](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.15.5...d2-crud-plus@1.15.6) (2020-08-14)


### Performance Improvements

* search增加前置与后置slot ([bd0a032](https://github.com/greper/d2-crud-plus/commit/bd0a032f7292bb9d3bb023af21f3a101696e7a29))





## [1.15.5](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.15.4...d2-crud-plus@1.15.5) (2020-08-13)


### Bug Fixes

* 修复cascade不显示label的bug ([d36495e](https://github.com/greper/d2-crud-plus/commit/d36495e7254c28a60158b0e992fd21318f3588f1))
* 整理了expose方法，其中updateAfter方法名修改成editAfter ([eb9631f](https://github.com/greper/d2-crud-plus/commit/eb9631f65cd5dd5517a90071ca4159af69978786))
* 查询表单宽度可以不写px后缀 ([4be5c88](https://github.com/greper/d2-crud-plus/commit/4be5c8878483bbffc8da4b21bc5691d6a9d90671))


### Performance Improvements

* 升级依赖 ([a4b5635](https://github.com/greper/d2-crud-plus/commit/a4b5635b2ec88b940ac2c1a3eebf2187f875765e))
* 外部获取数据字典示例 ([53b29ae](https://github.com/greper/d2-crud-plus/commit/53b29ae981c2a12536fb09fd5fd598821882577e))
* 继续完善e2e测试，修复一堆测出来的bug ([fe7446e](https://github.com/greper/d2-crud-plus/commit/fe7446e94468d7a5561213e7bed01bec065210e7))






## [1.15.4](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.15.3...d2-crud-plus@1.15.4) (2020-08-09)


### Bug Fixes

* 修复一个数据扁平化的bug ([6a53f14](https://github.com/greper/d2-crud-plus/commit/6a53f1484a906833bcff2d84542ab04ed05abd48))


### Performance Improvements

* crud-search增加slot ([f6b6b1d](https://github.com/greper/d2-crud-plus/commit/f6b6b1dcce1cdab47f20298b02070c991b58c9d0))





## [1.15.3](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.15.2...d2-crud-plus@1.15.3) (2020-08-06)

**Note:** Version bump only for package d2-crud-plus





## [1.15.2](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.15.1...d2-crud-plus@1.15.2) (2020-08-06)


### Bug Fixes

* 修复rowHandle:false 报错的问题 ([59fe2da](https://github.com/greper/d2-crud-plus/commit/59fe2da12493044bb9c0fb45076cbde596681e28))






## [1.15.1](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.15.0...d2-crud-plus@1.15.1) (2020-08-06)


### Bug Fixes

* 修复一个无限翻页的bug ([8533007](https://github.com/greper/d2-crud-plus/commit/8533007eb370bd3c8123f626ed2b91472e9a579a))


### Performance Improvements

* 自动染色功能 ([c955c92](https://github.com/greper/d2-crud-plus/commit/c955c92948c92f30a94f24b4128a8af0527264f4))





# [1.15.0](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.14.2...d2-crud-plus@1.15.0) (2020-08-05)


### Features

* 发布 ([37af76c](https://github.com/greper/d2-crud-plus/commit/37af76c91d205e772118aee50f87766b25804274))





## [1.14.2](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.14.1...d2-crud-plus@1.14.2) (2020-08-05)


### Bug Fixes

* break change dict-xxx的onReady方法参数的component改为{component:xx,data,setDictData} ([6489e34](https://github.com/greper/d2-crud-plus/commit/6489e3478304cf715c9c4dc5c216fbf7e5863e9d))
* 修复view.disabled取反的bug ([21dcbde](https://github.com/greper/d2-crud-plus/commit/21dcbde09381180bb0c83885cd5941ab705d3421))
* 修复分组下，查看span配置无效的bug ([765fc76](https://github.com/greper/d2-crud-plus/commit/765fc76b3b98c1f1b09ce660c8e23ec4589c783f))


### Performance Improvements

* dict onready事件支持修改过滤data ([bd5907d](https://github.com/greper/d2-crud-plus/commit/bd5907de509b84c6423673d42dc20cc24116de7d))
* dict onready事件支持修改过滤data ([661131b](https://github.com/greper/d2-crud-plus/commit/661131b5ccc9e32339a799665519d94c790a3b5b))
* format.page.request支持方法自定义 ([95dc6f2](https://github.com/greper/d2-crud-plus/commit/95dc6f2f2883113b6f2dbc74a7df5cfa43bb9ce5))
* onready增加form参数 ([f31c788](https://github.com/greper/d2-crud-plus/commit/f31c788a17a77257241a5db829380cc32abe69b8))
* valuesformat增加点击事件 ([d3d6cb7](https://github.com/greper/d2-crud-plus/commit/d3d6cb7c363fd54e839f6e4fe001c906ee3b17df))
* 数据支持嵌套对象 ([0bbe21f](https://github.com/greper/d2-crud-plus/commit/0bbe21fbc6c3ca4b88c8dc0e0a3e8b0258bb4b91))
* 数据支持嵌套对象 ([aaec065](https://github.com/greper/d2-crud-plus/commit/aaec0653bafb10d9845616763f7940c07050610f))
* 查看按钮优化为默认显示 ([07b1112](https://github.com/greper/d2-crud-plus/commit/07b11123f98a86a0441a2642538bc14429ba96bc))
* 行组件disabled方法支持传参 ([1de28b0](https://github.com/greper/d2-crud-plus/commit/1de28b0d9fc426a2483b890ed922890bfcc6179a))





## [1.14.1](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.14.0...d2-crud-plus@1.14.1) (2020-07-30)


### Performance Improvements

* 优化一个错误提示 ([91c236a](https://github.com/greper/d2-crud-plus/commit/91c236a))
* 组件独立使用示例 ([5de8d79](https://github.com/greper/d2-crud-plus/commit/5de8d79))






# [1.14.0](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.13.1...d2-crud-plus@1.14.0) (2020-07-23)


### Features

* 查看功能 ([7d03e94](https://github.com/greper/d2-crud-plus/commit/7d03e94dc2ea6b67211ac554fe2f0ef3d8912a49))





## [1.13.1](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.13.0...d2-crud-plus@1.13.1) (2020-07-23)


### Performance Improvements

* form传递方式改为provide/inject方式 ([158a225](https://github.com/greper/d2-crud-plus/commit/158a225be45aabd5a29de812ea1f00320212a26f))





# [1.13.0](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.12.5...d2-crud-plus@1.13.0) (2020-07-21)


### Bug Fixes

* 修复vxe-table的一些bug ([0a8a52f](https://github.com/greper/d2-crud-plus/commit/0a8a52fd6d40e47f41502fbe050f8348e30e3377))


### Features

* 实验性支持vxe-table ([9b518c4](https://github.com/greper/d2-crud-plus/commit/9b518c46091a76a3bfc96d9c79ee763a26be9fa2))
* 重大优化 ([9b1009a](https://github.com/greper/d2-crud-plus/commit/9b1009a62383db653ac25f7f83b048dad0a40448))





## [1.12.5](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.12.4...d2-crud-plus@1.12.5) (2020-07-18)


### Performance Improvements

* 每页条数设置增加本地保存 ([f687297](https://github.com/greper/d2-crud-plus/commit/f687297ace1d70b9d406cb59f06fa78be2aa8263))
* 增加批量删除示例 ([2907848](https://github.com/greper/d2-crud-plus/commit/290784891a55b898c5c90fe36eb5e44d31e1c138))





## [1.12.4](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.12.3...d2-crud-plus@1.12.4) (2020-07-16)


### Bug Fixes

* 列设置本地缓存可以设置key键值名称 ([c8665fa](https://github.com/greper/d2-crud-plus/commit/c8665fa76b62b1571645e1259b8a06183b9b28c1))


### Performance Improvements

* 查询的title可配置 ([4c3739a](https://github.com/greper/d2-crud-plus/commit/4c3739aefa18037332b5bc86c3743f4b63d76758))
* 优化列过滤的emit两次的问题 ([dd4506f](https://github.com/greper/d2-crud-plus/commit/dd4506fdbd3d0a488c776c8c57fc5afad08e26d6))





## [1.12.3](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.12.2...d2-crud-plus@1.12.3) (2020-07-13)

**Note:** Version bump only for package d2-crud-plus





## [1.12.2](https://github.com/greper/d2-crud-plus/compare/d2-crud-plus@1.12.1...d2-crud-plus@1.12.2) (2020-07-13)

**Note:** Version bump only for package d2-crud-plus





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
