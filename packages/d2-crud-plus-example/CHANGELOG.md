# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.13.2](https://github.com/greper/d2-crud-plus/compare/v2.13.1...v2.13.2) (2020-11-04)


### Bug Fixes

* 前端分页没有更新的问题 ([bdced0c](https://github.com/greper/d2-crud-plus/commit/bdced0c8c47e270bc3733af5b61da20c422141dd))
* 修复独立使用ueditor时zindex在对话框之上的bug ([4827c11](https://github.com/greper/d2-crud-plus/commit/4827c11649ce77d9686055d153150e74aa36f87e))
* 修复pagination.pageSizes无法覆盖的bug ([88b65c4](https://github.com/greper/d2-crud-plus/commit/88b65c41e758aadffeb0dfc5c44c5cab5bd96e42))
* defaultSort无效的问题 ([b3c5677](https://github.com/greper/d2-crud-plus/commit/b3c56770ffaf3f2b5fa395c6b45e8c0d74da0afb))


### Performance Improvements

* 优化前端分页 ([fc26345](https://github.com/greper/d2-crud-plus/commit/fc2634512fa33964ca683a304c830de0aecabf9d))
* 优化依赖引入 ([9e80b0c](https://github.com/greper/d2-crud-plus/commit/9e80b0cd3e647bab610ad7721297772e52ce64f6))





## [2.13.1](https://github.com/greper/d2-crud-plus/compare/v2.13.0...v2.13.1) (2020-11-02)


### Bug Fixes

* 恢复误删的provider ([3ce7ce9](https://github.com/greper/d2-crud-plus/commit/3ce7ce99e61867e37b4b4377df2071e81f288847))





# [2.13.0](https://github.com/greper/d2-crud-plus/compare/v2.12.3...v2.13.0) (2020-11-01)


### Features

* 表单增加抽屉模式，优化表单打开动画，检测修改提醒保存 ([dde6933](https://github.com/greper/d2-crud-plus/commit/dde6933d603ee1c376f96a82a1a4d552d5bddb66))
* 行编辑增加表单校验 ([8d22629](https://github.com/greper/d2-crud-plus/commit/8d226294b31506aae39f4d85483946b4e9043c01))
* 行编辑支持 ([2ecefb9](https://github.com/greper/d2-crud-plus/commit/2ecefb9e27320babb2bd34bf6bf0b832ba5ebc43))





## [2.12.3](https://github.com/d2-projects/d2-admin/compare/v2.12.2...v2.12.3) (2020-10-31)

**Note:** Version bump only for package @d2-plus/d2-crud-plus-example





## [2.12.2](https://github.com/d2-projects/d2-admin/compare/v2.12.1...v2.12.2) (2020-10-31)

**Note:** Version bump only for package @d2-plus/d2-crud-plus-example





## [2.12.1](https://github.com/d2-projects/d2-admin/compare/v2.12.0...v2.12.1) (2020-10-31)


### Bug Fixes

* 修复ie 11打不开的问题 ([44a48b7](https://github.com/d2-projects/d2-admin/commit/44a48b78cdfbe05a185360ca9ed8603742da7c78))
* 修复phoneinput组件无法disabled的问题 ([93e22e6](https://github.com/d2-projects/d2-admin/commit/93e22e6ba4aad6f49f1b12deb7cf785f41bb5be5))
* 修复phoneinput组件无法disabled的问题 ([de6974d](https://github.com/d2-projects/d2-admin/commit/de6974d13314317579931e69fe34a30c06e82b48))
* 修复推迟加载后search报错的bug ([148d9fd](https://github.com/d2-projects/d2-admin/commit/148d9fd2207ef850f3ad5cfb26a24fab355dede7))
* 修复权限链接报404的问题 ([7c77efa](https://github.com/d2-projects/d2-admin/commit/7c77efae6616cfbedb853a581c0a46f2c616bd33))
* 修复非配置字段赋值的bug ([ddbd2e0](https://github.com/d2-projects/d2-admin/commit/ddbd2e0f0a773abaa2108562e8174b7da57dbfbb))
* 修复非配置字段赋值的bug ([9a3daaa](https://github.com/d2-projects/d2-admin/commit/9a3daaa2ba8bee34b4d82587a18127cd874591b3))


### Performance Improvements

* rowHandle默认改为minWidth ([d9edc6a](https://github.com/d2-projects/d2-admin/commit/d9edc6a162a736e5c1d0a9c3fcf642352965ea48))
* view模式的slot禁用示例 ([cf1da74](https://github.com/d2-projects/d2-admin/commit/cf1da74844595dfade6790860d06e9303666107c))
* 优化上传lib，增加上传时获取文件的参数 ([27b010a](https://github.com/d2-projects/d2-admin/commit/27b010ab59917e206fa67e897cdcb5170993eefc))
* 增加el-table的 events配置 ([88fb917](https://github.com/d2-projects/d2-admin/commit/88fb917863a5c9b4c029580438daec194c558cdc))
* 增加el-table的 events配置 ([d5dce3b](https://github.com/d2-projects/d2-admin/commit/d5dce3bd0d65225041acb2560422a2b6b615c0a8))
* 服务端排序实现 ([08f7ba5](https://github.com/d2-projects/d2-admin/commit/08f7ba55e8b412c3388fd95b2e59b912b140b61d))





# [2.12.0](https://github.com/d2-projects/d2-admin/compare/v1.1.0...v2.12.0) (2020-10-21)


### Bug Fixes

* break change dict-xxx的onReady方法参数的component改为{component:xx,data,setDictData} ([6489e34](https://github.com/d2-projects/d2-admin/commit/6489e3478304cf715c9c4dc5c216fbf7e5863e9d))
* exapndRow=true 报错的bug ([7d1740a](https://github.com/d2-projects/d2-admin/commit/7d1740a301ef4187eba31e446640fcd25a5307f6))
* meneTree判空 ([8c4c939](https://github.com/d2-projects/d2-admin/commit/8c4c939d750939d4ec7e4da6a6d4abd855c7ba29))
* paginationPrefix还是不能改成flex ([9379761](https://github.com/d2-projects/d2-admin/commit/9379761bfb27ae3f213a310be25f04becf1b347b))
* release文字修改 ([e31d42d](https://github.com/d2-projects/d2-admin/commit/e31d42d65f6dd7dca6913786953d8c12324818fc))
* release文字修改 ([37ef4b3](https://github.com/d2-projects/d2-admin/commit/37ef4b3edbdd1152c782943164075b562d8d8d86))
* tree-selector 支持单选 ([a521ad7](https://github.com/d2-projects/d2-admin/commit/a521ad7882c0c019a51be97236de1c28e65b7114))
* 七牛token不再支持复用 ([69c35be](https://github.com/d2-projects/d2-admin/commit/69c35be9cff2f3234e0f12e74b0621bee28c0461))
* 优化表格有滚动条时高度计算导致双滚动条的bug ([4460d6c](https://github.com/d2-projects/d2-admin/commit/4460d6c5179d08bfe595b559cf844eadcf9f2fa8))
* 修复 dict-switch 修改value为非boolean值时表单无法显示正确值的bug ([f378624](https://github.com/d2-projects/d2-admin/commit/f378624d48f35202a9507f5255822ab762b1a3a3))
* 修复d2Crud与d2CrudX样式冲突的问题 ([b6593ac](https://github.com/d2-projects/d2-admin/commit/b6593ac6f88d65e706f90530438fbe6abe536ec8))
* 修复d2Crud与d2CrudX样式冲突的问题 ([2fbcd29](https://github.com/d2-projects/d2-admin/commit/2fbcd29290845928480a9de8fff78bad1e816c71))
* 修复d2p-file-uploader会覆盖上传参数的问题 ([d09a934](https://github.com/d2-projects/d2-admin/commit/d09a93406f5900c9649bd79c626abe6f5af4eb52))
* 修复dictRadio valuechange触发两次的问题 ([36d5325](https://github.com/d2-projects/d2-admin/commit/36d53251f73a7be1d06a84785d25f6903aff6bb7))
* 修复rowHandle:false 报错的问题 ([59fe2da](https://github.com/d2-projects/d2-admin/commit/59fe2da12493044bb9c0fb45076cbde596681e28))
* 修复vxe-table的一些bug ([0a8a52f](https://github.com/d2-projects/d2-admin/commit/0a8a52fd6d40e47f41502fbe050f8348e30e3377))
* 修复多次登录后顶部菜单重复出现的bug ([fba5843](https://github.com/d2-projects/d2-admin/commit/fba58434d5e0abec8d903f36909a349d71b4afb3))
* 修复头像上传后获取不到md5值的问题 ([27ff933](https://github.com/d2-projects/d2-admin/commit/27ff933c698dd64ff5cbbce8fbd7c6df1dc8dbc0))
* 修复平台下无角色无法给用户授权的bug ([e90d3a9](https://github.com/d2-projects/d2-admin/commit/e90d3a9de834e4fb6d99bab3da1b60296f9f6a5f))
* 修复懒加载之后上传组件没有动态切换的bug ([7fee033](https://github.com/d2-projects/d2-admin/commit/7fee03366753abbabee41fec40c38a840b00678f))
* 修复手机号输入组件没有加载的bug ([d43313a](https://github.com/d2-projects/d2-admin/commit/d43313ac20d1b8fd65eeafa2714202494dad9fae))
* 修复手机号输入组件没有加载的bug ([5ee4ea2](https://github.com/d2-projects/d2-admin/commit/5ee4ea2b280f4963ee18585850fb39b4af595669))
* 修复文件上传onPreview可自定义 ([be37294](https://github.com/d2-projects/d2-admin/commit/be372947d5a4281b661f01ca1f84a202691023e0))
* 修复文件上传进度条显示的bug，优化一些其他显示上的问题 ([53d54ba](https://github.com/d2-projects/d2-admin/commit/53d54bad45782ddc7a6970ad25c2811e137ff41b))
* 修复文本域无法输入的问题 ([bddee2d](https://github.com/d2-projects/d2-admin/commit/bddee2d2283014a94d136ad7659dbebf2a17e24b))
* 修复新的mock加载出错的问题 ([f16b557](https://github.com/d2-projects/d2-admin/commit/f16b557323d6ccf688890ae68571c8f936834e56))
* 修复新的mock无法删除记录的bug ([cbb6594](https://github.com/d2-projects/d2-admin/commit/cbb65944e75136054d29dd70b9b37d5e43fc938b))
* 修复查询工具条，重置按钮丢失的问题 ([6ab9c45](https://github.com/d2-projects/d2-admin/commit/6ab9c4579545733d4c38f735c87a0744af996b44))
* 修复树形选择器，单选返回值为数组的bug ([1b79cf7](https://github.com/d2-projects/d2-admin/commit/1b79cf7a71cb1ce9b1e2351abd7535adfc5fecab))
* 修复点号配置多级数据时查询的问题 ([95f6bdc](https://github.com/d2-projects/d2-admin/commit/95f6bdc74b1809a2fc2be6801e4f87989c5b2d70))
* 修复用户无法授予角色的bug ([367192b](https://github.com/d2-projects/d2-admin/commit/367192ba2ec0be35250470c4ac599aab0aeb6593))
* 修复用户没有添加按钮的bug ([41bf1bc](https://github.com/d2-projects/d2-admin/commit/41bf1bc8294aaafd54bc8867db66a16ce0620bae))
* 修复用户没有添加按钮的bug ([6572492](https://github.com/d2-projects/d2-admin/commit/6572492fdd6c0b3f8b8ffdfea65c2109b1fa3f1f))
* 修复编辑和添加rule有差异时的问题 ([cf1ec26](https://github.com/d2-projects/d2-admin/commit/cf1ec26d4dee2e3d3fd54d226350c074c8713273))
* 修复自定义按钮获取不到行数据的bug ([ca5a82e](https://github.com/d2-projects/d2-admin/commit/ca5a82e2e79d14e13e45e8adafbdeed80a6533c5))
* 修复表单上传url错误的问题 ([2d49985](https://github.com/d2-projects/d2-admin/commit/2d4998574436d0f6c90da942653debc42f73bc41))
* 修复请求地址出错的问题 ([bc9a6c0](https://github.com/d2-projects/d2-admin/commit/bc9a6c0bfad92675e03a3c036d8e387bb6ee30bf))
* 修复酒店示例多个翻页组件的问题 ([732e75e](https://github.com/d2-projects/d2-admin/commit/732e75e9ba1d40fabbceb2ace6421c2535c97d24))
* 修复静态菜单不显示的问题 ([09bd7bb](https://github.com/d2-projects/d2-admin/commit/09bd7bb5991403d60c8703c37cb4876415c6b54c))
* 修复首次加载表尾合计行无法显示的bug ([d4e1d4e](https://github.com/d2-projects/d2-admin/commit/d4e1d4e49ccbc92f5a00f8802c8075fb27b38431))
* 兼容ie11 ([bca62ee](https://github.com/d2-projects/d2-admin/commit/bca62eeb48ef53bd075028340f4634a341a88987))
* 减少vxetable的警告 ([8e30fb7](https://github.com/d2-projects/d2-admin/commit/8e30fb78d2596f402fbdea6e35a4956a58e82b76))
* 切换用户不更新权限的bug ([5b73a90](https://github.com/d2-projects/d2-admin/commit/5b73a90b418927f5f9f4dca48094ab93457a3cbe))
* 删除多余的路由 ([f859e2a](https://github.com/d2-projects/d2-admin/commit/f859e2a88a95a8edf803335e89d372f17a13ec62))
* 前端分页搜索示例 ([669d6bb](https://github.com/d2-projects/d2-admin/commit/669d6bbcb4635d79c3493b0e3724d469f211f00c))
* 增加自定义扩展组件demo ([33c02f0](https://github.com/d2-projects/d2-admin/commit/33c02f0baddbe5d93c41439387362972de46cac9))
* 增加选项的禁用配置，增加dictSwitch,部分ie兼容性问题修复 ([c91a04b](https://github.com/d2-projects/d2-admin/commit/c91a04bbdd201d117953048c56cca53ae66dad0d))
* 增加配置项updateTableDataAfterEdit，保存对话框后不插入数据到table中，通过刷新列表更新数据 ([6ee6f07](https://github.com/d2-projects/d2-admin/commit/6ee6f079f202a0ff053d318c251139d2aa1f0312))
* 懒加载优化，减小首次访问体积 ([d210a54](https://github.com/d2-projects/d2-admin/commit/d210a544c890c35d3f41af5067f24f9a3d8d4587))
* 懒加载示例 ([a2641d4](https://github.com/d2-projects/d2-admin/commit/a2641d471bc5b1acf4bac326c1045c00ed3ffdbd))
* 指定corejs版本 ([619da4d](https://github.com/d2-projects/d2-admin/commit/619da4d6c2c7482d68989e6c378ebd29fc335d05))
* 整理了expose方法，其中updateAfter方法名修改成editAfter ([eb9631f](https://github.com/d2-projects/d2-admin/commit/eb9631f65cd5dd5517a90071ca4159af69978786))
* 文件上传支持文件大小限制配置 ([af22fe1](https://github.com/d2-projects/d2-admin/commit/af22fe1fb36cc4d2406c1c4ecc310f5e829fb239))
* 文件上传组件，删除时没有改变value值的bug ([af264c7](https://github.com/d2-projects/d2-admin/commit/af264c74759cdd9d1955eb868041dbc13a83d4c6))
* 文档调整 ([423b3b4](https://github.com/d2-projects/d2-admin/commit/423b3b4655861d3d1e6fe5bdac79b9deaeb20cb9))
* 查询表单宽度可以不写px后缀 ([4be5c88](https://github.com/d2-projects/d2-admin/commit/4be5c8878483bbffc8da4b21bc5691d6a9d90671))
* 消除edge下权限清空的报错 ([65127d6](https://github.com/d2-projects/d2-admin/commit/65127d6864aa7dae4b0ddfd7975eb7815d3a4fa2))


### Features

* checkbox联动radio修改radio的选项功能示例，d2-crud的表单组件增加ref ([66d26bb](https://github.com/d2-projects/d2-admin/commit/66d26bb039cb0848936e41019883ec9a1ec1ce7d))
* d2-admin 1.17版本同步 ([7037e4a](https://github.com/d2-projects/d2-admin/commit/7037e4ada20dd5b62c248349bd51f7014962877f))
* d2-admin升级到1.17.0 ([ce5dfa0](https://github.com/d2-projects/d2-admin/commit/ce5dfa035f9f547854ae63ebee793722580e09c7))
* dict配置增加覆盖全局getRemoteDataFunc的方法，全局方法增加dict参数 ([22db385](https://github.com/d2-projects/d2-admin/commit/22db38591d7c285b0e50ce8b9cd6aedd0c5032f9))
* quill富文本编辑器 ([238760b](https://github.com/d2-projects/d2-admin/commit/238760b1c63385850721f3eb018c9f2ebe0595ec))
* quill富文本编辑器 ([54c39cc](https://github.com/d2-projects/d2-admin/commit/54c39cc911f5a481894850ea227cdc627c5b0716))
* search.show支持传入方法 ([3aa0353](https://github.com/d2-projects/d2-admin/commit/3aa0353162577374922beca1e8ce1faa5f7c0bef))
* textArea支持 ([12f2c91](https://github.com/d2-projects/d2-admin/commit/12f2c91ea492b4b5f4b781c7826b0c6939e0db93))
* 优化字典获取自定义，修复bug，增加示例的行数 ([e94749d](https://github.com/d2-projects/d2-admin/commit/e94749de0ad885ee5feea6b1b6a2a2096f057a2c))
* 动态显示隐藏整个表单字段 ([3153602](https://github.com/d2-projects/d2-admin/commit/31536028be6ac052d4c5c9d5432807be4f46d1de))
* 发布 ([37af76c](https://github.com/d2-projects/d2-admin/commit/37af76c91d205e772118aee50f87766b25804274))
* 取消单独的el-input，合并到renderCustomComponent ([a7b30cb](https://github.com/d2-projects/d2-admin/commit/a7b30cbc3dde40de04715a51914e92ad769569cc))
* 图片裁剪 ([13ace31](https://github.com/d2-projects/d2-admin/commit/13ace3104ef7ff4cba66867e4f4a78bf858d81e8))
* 多文件上传显示优化，批量删除，上传文件参数优化 ([91e2437](https://github.com/d2-projects/d2-admin/commit/91e243796221b706b0bb906aca5c00e59ed597fe))
* 头像裁剪组件，图片行显示支持预览大图 ([348ec15](https://github.com/d2-projects/d2-admin/commit/348ec15b0eca5c55512b56134fb1086a36ba4d06))
* 实验性支持vxe-table ([9b518c4](https://github.com/d2-projects/d2-admin/commit/9b518c46091a76a3bfc96d9c79ee763a26be9fa2))
* 富文本增加ueditor ([ee6e6f6](https://github.com/d2-projects/d2-admin/commit/ee6e6f6430e5aa2ebf3bcfe2987af56d512b5e96))
* 对话框增加自定义header slot ([0c25a93](https://github.com/d2-projects/d2-admin/commit/0c25a93e85f91b34c2cc2e6f5883e1ab284cbb0c))
* 操作列按钮排序 ([ee5c3b4](https://github.com/d2-projects/d2-admin/commit/ee5c3b459b72304bde40b6c80ee4d346eae90be6))
* 支持本地服务器上传文件 ([1f319f2](https://github.com/d2-projects/d2-admin/commit/1f319f20afcee32c4527bfd0e10f263234723b3a))
* 支持点号key的方式配置多级数据 ([927600d](https://github.com/d2-projects/d2-admin/commit/927600d0fefb4c281c2b797f29158ac792cca99c))
* 支持配置默认表单span ([9268d4a](https://github.com/d2-projects/d2-admin/commit/9268d4a1c19dcdf549deab965a07fa9904c4a010))
* 新增展开行功能，新增特殊列、固定列示例 ([0a2b60a](https://github.com/d2-projects/d2-admin/commit/0a2b60a6a0c9ece1e7391ce3b72eff0d5d0e8e7a))
* 新增展开行功能，新增特殊列、固定列示例 ([69bacf0](https://github.com/d2-projects/d2-admin/commit/69bacf00edf016968be723c7457d8002e30fc285))
* 新增工具条功能：刷新，查询展开，页面紧凑切换，列设置。内置分页组件可以启用 ([980ff30](https://github.com/d2-projects/d2-admin/commit/980ff30154453c8b1cd77f19f9efe6f7a20f9bef))
* 更简单方便易用的组件禁用方式（disabled） ([b194ac1](https://github.com/d2-projects/d2-admin/commit/b194ac1f62d88ffd7d887cb8a56e55a4b5cf2511))
* 查看功能 ([7d03e94](https://github.com/d2-projects/d2-admin/commit/7d03e94dc2ea6b67211ac554fe2f0ef3d8912a49))
* 查询框组件支持style 和 class配置 ([df1115b](https://github.com/d2-projects/d2-admin/commit/df1115bc6d850f453d401d1696cb1b264d0f8ad7))
* 组件ready事件 ([bfefdf3](https://github.com/d2-projects/d2-admin/commit/bfefdf31d03247a87d718114e30363801a98d96a))
* 表单支持分组 ([96f1b54](https://github.com/d2-projects/d2-admin/commit/96f1b54ff480b95461ac37556eeef66fd925a158))
* 重大优化 ([9b1009a](https://github.com/d2-projects/d2-admin/commit/9b1009a62383db653ac25f7f83b048dad0a40448))


### Performance Improvements

* checkbox radio增加按钮样式配置 ([602265b](https://github.com/d2-projects/d2-admin/commit/602265bdab4780f881298ac01e4215da9b15b860))
* column.show支持传入一个无参方法，form表单支持自定义排序 ([0500c40](https://github.com/d2-projects/d2-admin/commit/0500c40f6bc717d6ad3a0e680fe7e670b47494ea))
* crud-x 打开编辑对话框后发送 dialog-opened事件 ([2d6a4c2](https://github.com/d2-projects/d2-admin/commit/2d6a4c2d1956305b10fe6eac16f9644c4fe31549))
* dict onready事件支持修改过滤data ([bd5907d](https://github.com/d2-projects/d2-admin/commit/bd5907de509b84c6423673d42dc20cc24116de7d))
* e2e测试优化 ([a3f4962](https://github.com/d2-projects/d2-admin/commit/a3f49624c2921b058b37ad9f9c49a894f1b44c2b))
* el-form-item增加配置，form.itemProps ([a602cce](https://github.com/d2-projects/d2-admin/commit/a602cce96df65fc7decdbd98e2782e65cd66a9b0))
* extends升级一个小版本 ([161d0ec](https://github.com/d2-projects/d2-admin/commit/161d0ec8b4a2f437a5d474f18bf8c6bd8cb8a2df))
* extends解除d2crudplus依赖 ([66c5c70](https://github.com/d2-projects/d2-admin/commit/66c5c70bbf505e76296257c56debef0d5855b843))
* form传递方式改为provide/inject方式 ([158a225](https://github.com/d2-projects/d2-admin/commit/158a225be45aabd5a29de812ea1f00320212a26f))
* helper增加render方式 ([56a2c14](https://github.com/d2-projects/d2-admin/commit/56a2c14f69ab600f8c1ad310e7e6dc4d96ea2618))
* jsx示例 ([a4995c6](https://github.com/d2-projects/d2-admin/commit/a4995c6b366f105d8b93daac37f71186ebf0b011))
* jsx示例 ([ed497e0](https://github.com/d2-projects/d2-admin/commit/ed497e0bde749661515de9824849f9516c06a184))
* jsx示例 ([137f745](https://github.com/d2-projects/d2-admin/commit/137f7458bdc37b36b18b9f60df67011fb4c9ab60))
* radio增加border配置 ([640ca4c](https://github.com/d2-projects/d2-admin/commit/640ca4cf877ade9bb97c7dff593b6cc9ae396da9))
* rowhandle btn 图标支持传入一个方法 ([90bca1c](https://github.com/d2-projects/d2-admin/commit/90bca1c64f8f9c3f6128f5adcf4ed21e0edf4beb))
* search 增加事件监听 ([28450de](https://github.com/d2-projects/d2-admin/commit/28450def69ffae2695c02acacb2ece804dd1e44d))
* toobar 和 search 增加文本配置，可以自定义展示文本 ([13e0183](https://github.com/d2-projects/d2-admin/commit/13e0183e4dd435f7647bb43a0b182d794fe98ab6))
* ueditor支持全局配置 ([3880215](https://github.com/d2-projects/d2-admin/commit/3880215328957763f90df3d139d602c875ebce2f))
* valuesformat增加点击事件 ([d3d6cb7](https://github.com/d2-projects/d2-admin/commit/d3d6cb7c363fd54e839f6e4fe001c906ee3b17df))
* 云文件上传增加私有bucket上传支持 ([be33142](https://github.com/d2-projects/d2-admin/commit/be33142c77faaec2a188af41d5ca5150a7e58a29))
* 优化列过滤器 ([3775371](https://github.com/d2-projects/d2-admin/commit/37753713a135d4f019717f14f016c1a12c5990a0))
* 优化导出，支持设置列宽 ([5ce5650](https://github.com/d2-projects/d2-admin/commit/5ce5650a7fcf8b699c493d8d787d99e840be60e4))
* 优化日历显示 ([6274715](https://github.com/d2-projects/d2-admin/commit/62747159a3f7173ffdf4794261f39b4499b5b1aa))
* 优化示例 ([17cf04a](https://github.com/d2-projects/d2-admin/commit/17cf04ae6ac283fea7603c3ce695797712a4149a))
* 优化示例展示效果，增加模拟请求延时 ([5eac157](https://github.com/d2-projects/d2-admin/commit/5eac1572836601b2ed6e4f2f4b5fdb3f3c884845))
* 使用crud-container替换掉d2-container ([facb28e](https://github.com/d2-projects/d2-admin/commit/facb28e801f1fa9eebc4d7a293ad32845f7d4aeb))
* 修复图片format 配置elProps的问题 ([39aba20](https://github.com/d2-projects/d2-admin/commit/39aba2065216e02254fadb92400e781abbd5fbb1))
* 修改lib/index 为install.js ([117c028](https://github.com/d2-projects/d2-admin/commit/117c0284a55ee32121656aafeb6a22391c56a995))
* 关闭cdn，打开速度好像快了很多 ([4fabcea](https://github.com/d2-projects/d2-admin/commit/4fabcea985eb6e9c21adebad8751ef8c96bbe149))
* 列设置保存到本地 ([b482052](https://github.com/d2-projects/d2-admin/commit/b482052c9665987dca3f699c2b317e7707a24b1d))
* 动态添加分组示例 ([3bc9ccc](https://github.com/d2-projects/d2-admin/commit/3bc9ccc03d2a75eeec9f9fb0e3623a7a4000025a))
* 升级依赖 ([a4b5635](https://github.com/d2-projects/d2-admin/commit/a4b5635b2ec88b940ac2c1a3eebf2187f875765e))
* 图片上传组件优化 ([c2d1cd0](https://github.com/d2-projects/d2-admin/commit/c2d1cd09438873cfdb60d8ff5fd49e8ef6506367))
* 增加d2-crud示例 ([509cac1](https://github.com/d2-projects/d2-admin/commit/509cac1ee86405f1626f754e1014b5aa456f5046))
* 增加动态添加表单字段示例 ([d931710](https://github.com/d2-projects/d2-admin/commit/d9317107e916f1014b8e0f21ad7648786d7f782f))
* 增加嵌套表格示例 ([5b9b3e0](https://github.com/d2-projects/d2-admin/commit/5b9b3e08ad17956742c5175fb1c5f59df185aa1b))
* 增加嵌套表格示例 ([aea1cff](https://github.com/d2-projects/d2-admin/commit/aea1cffcfd73ba1d7a8729a3b2a9bf095d389543))
* 增加手动选择示例 ([be9b649](https://github.com/d2-projects/d2-admin/commit/be9b649c50ed091314e4a442be718ca2ec0008dc))
* 增加批量删除示例 ([2907848](https://github.com/d2-projects/d2-admin/commit/290784891a55b898c5c90fe36eb5e44d31e1c138))
* 增加旧版示例 ([8bbe208](https://github.com/d2-projects/d2-admin/commit/8bbe2084b5ce7247ae6dc745b5e29042a792cec1))
* 增加非vModel组件展示的示例 ([2985545](https://github.com/d2-projects/d2-admin/commit/2985545b979798bbc2e629fcb48387246f24ab3d))
* 外部获取数据字典示例 ([53b29ae](https://github.com/d2-projects/d2-admin/commit/53b29ae981c2a12536fb09fd5fd598821882577e))
* 字典增加禁止缓存功能，url()方式取消字典缓存 ([ae5dce1](https://github.com/d2-projects/d2-admin/commit/ae5dce1a19e607ef0c294414518293a1685e6983))
* 数据支持嵌套对象 ([0bbe21f](https://github.com/d2-projects/d2-admin/commit/0bbe21fbc6c3ca4b88c8dc0e0a3e8b0258bb4b91))
* 数据支持嵌套对象 ([aaec065](https://github.com/d2-projects/d2-admin/commit/aaec0653bafb10d9845616763f7940c07050610f))
* 文档优化 ([5629114](https://github.com/d2-projects/d2-admin/commit/562911449d0399d989c7dddfd76f90ad4bc45322))
* 文档优化 ([1459201](https://github.com/d2-projects/d2-admin/commit/145920140d3396f995a2d8dc5d33796ac6c08dfc))
* 新增d2crud共存 ([e2d1d8c](https://github.com/d2-projects/d2-admin/commit/e2d1d8c60ef235719233ad16520f581ac6e44041))
* 日期format示例 ([03955b5](https://github.com/d2-projects/d2-admin/commit/03955b51113cf9f287e8d0ae8a5d165bee9da53b))
* 权限菜单管理改造成el-table的树形管理 ([b4120af](https://github.com/d2-projects/d2-admin/commit/b4120afd1af8db669524d7e8d2dde0a63accb994))
* 查看按钮优化为默认显示 ([07b1112](https://github.com/d2-projects/d2-admin/commit/07b11123f98a86a0441a2642538bc14429ba96bc))
* 查询增加防抖自动查询功能 ([e8430d3](https://github.com/d2-projects/d2-admin/commit/e8430d38ae74440229d31ba9ad5e6c7cbaae3e99))
* 查询框按钮样式可配置 ([ccde74f](https://github.com/d2-projects/d2-admin/commit/ccde74f6871795a40e10e6ec5481d534b4dd8f47))
* 查询的title可配置，升级phonenumberinput ([eacb97c](https://github.com/d2-projects/d2-admin/commit/eacb97c7f17a2fef13de3c5dddf0923448a4408e))
* 查询示例优化 ([e39c043](https://github.com/d2-projects/d2-admin/commit/e39c0430062a7e3f65b4666b9d39961875e0c299))
* 树形组件单独示例 ([8a16ef9](https://github.com/d2-projects/d2-admin/commit/8a16ef97ecd0de4640d420412307c51606ea04ac))
* 每页条数设置增加本地保存 ([f687297](https://github.com/d2-projects/d2-admin/commit/f687297ace1d70b9d406cb59f06fa78be2aa8263))
* 示例全部改成新版带toolbar界面 ([6770fc9](https://github.com/d2-projects/d2-admin/commit/6770fc9980ba17083ffb414309ad8f6e15d6dbe1))
* 组件独立使用示例 ([5de8d79](https://github.com/d2-projects/d2-admin/commit/5de8d79041046925ebad0f7029f615f68a59deb0))
* 继续完善e2e测试，修复一堆测出来的bug ([5351022](https://github.com/d2-projects/d2-admin/commit/5351022fbfd52400239700ff8123e94b5f14cd7c))
* 继续完善e2e测试，修复一堆测出来的bug ([fe7446e](https://github.com/d2-projects/d2-admin/commit/fe7446e94468d7a5561213e7bed01bec065210e7))
* 自动染色功能 ([c955c92](https://github.com/d2-projects/d2-admin/commit/c955c92948c92f30a94f24b4128a8af0527264f4))
* 行内禁用示例完善 ([dee1777](https://github.com/d2-projects/d2-admin/commit/dee177711fd20a027ec183aee5d7d2ac4329f5e9))
* 行组件disabled方法支持传参 ([1de28b0](https://github.com/d2-projects/d2-admin/commit/1de28b0d9fc426a2483b890ed922890bfcc6179a))
* 行编辑演示 ([aec224f](https://github.com/d2-projects/d2-admin/commit/aec224f87f1a41811d48205280c84c48cb7044a2))
* 表单增加默认值功能 ([41132df](https://github.com/d2-projects/d2-admin/commit/41132dfac320d7ecfed50b00eb8e37b7c6aa3c77))
* 表格滚动条美化 ([0979576](https://github.com/d2-projects/d2-admin/commit/09795765a09e7acf365bdfe23dd5e158267722f7))





## [1.17.7](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.17.6...@d2-plus/d2-crud-plus-example@1.17.7) (2020-10-12)


### Bug Fixes

* 修复查询工具条，重置按钮丢失的问题 ([6ab9c45](https://github.com/d2-projects/d2-admin/commit/6ab9c4579545733d4c38f735c87a0744af996b44))
* 删除多余的路由 ([f859e2a](https://github.com/d2-projects/d2-admin/commit/f859e2a88a95a8edf803335e89d372f17a13ec62))
* 前端分页搜索示例 ([669d6bb](https://github.com/d2-projects/d2-admin/commit/669d6bbcb4635d79c3493b0e3724d469f211f00c))
* 懒加载示例 ([a2641d4](https://github.com/d2-projects/d2-admin/commit/a2641d471bc5b1acf4bac326c1045c00ed3ffdbd))


### Performance Improvements

* 优化导出，支持设置列宽 ([5ce5650](https://github.com/d2-projects/d2-admin/commit/5ce5650a7fcf8b699c493d8d787d99e840be60e4))





## [1.17.6](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.17.5...@d2-plus/d2-crud-plus-example@1.17.6) (2020-09-27)


### Performance Improvements

* extends升级一个小版本 ([161d0ec](https://github.com/d2-projects/d2-admin/commit/161d0ec8b4a2f437a5d474f18bf8c6bd8cb8a2df))
* rowhandle btn 图标支持传入一个方法 ([90bca1c](https://github.com/d2-projects/d2-admin/commit/90bca1c64f8f9c3f6128f5adcf4ed21e0edf4beb))
* toobar 和 search 增加文本配置，可以自定义展示文本 ([13e0183](https://github.com/d2-projects/d2-admin/commit/13e0183e4dd435f7647bb43a0b182d794fe98ab6))
* 修复图片format 配置elProps的问题 ([39aba20](https://github.com/d2-projects/d2-admin/commit/39aba2065216e02254fadb92400e781abbd5fbb1))





## [1.17.5](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.17.4...@d2-plus/d2-crud-plus-example@1.17.5) (2020-09-16)

**Note:** Version bump only for package @d2-plus/d2-crud-plus-example





## [1.17.4](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.17.3...@d2-plus/d2-crud-plus-example@1.17.4) (2020-09-10)


### Bug Fixes

* 修复编辑和添加rule有差异时的问题 ([cf1ec26](https://github.com/d2-projects/d2-admin/commit/cf1ec26d4dee2e3d3fd54d226350c074c8713273))


### Performance Improvements

* 图片上传组件优化 ([c2d1cd0](https://github.com/d2-projects/d2-admin/commit/c2d1cd09438873cfdb60d8ff5fd49e8ef6506367))





## [1.17.3](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.17.2...@d2-plus/d2-crud-plus-example@1.17.3) (2020-09-09)


### Bug Fixes

* 修复 dict-switch 修改value为非boolean值时表单无法显示正确值的bug ([f378624](https://github.com/d2-projects/d2-admin/commit/f378624d48f35202a9507f5255822ab762b1a3a3))
* 修复平台下无角色无法给用户授权的bug ([e90d3a9](https://github.com/d2-projects/d2-admin/commit/e90d3a9de834e4fb6d99bab3da1b60296f9f6a5f))
* 修复用户无法授予角色的bug ([367192b](https://github.com/d2-projects/d2-admin/commit/367192ba2ec0be35250470c4ac599aab0aeb6593))


### Performance Improvements

* 修改lib/index 为install.js ([117c028](https://github.com/d2-projects/d2-admin/commit/117c0284a55ee32121656aafeb6a22391c56a995))





## [1.17.2](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.17.1...@d2-plus/d2-crud-plus-example@1.17.2) (2020-09-03)


### Bug Fixes

* 修复请求地址出错的问题 ([bc9a6c0](https://github.com/d2-projects/d2-admin/commit/bc9a6c0bfad92675e03a3c036d8e387bb6ee30bf))





## [1.17.1](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.17.0...@d2-plus/d2-crud-plus-example@1.17.1) (2020-09-01)


### Bug Fixes

* 消除edge下权限清空的报错 ([65127d6](https://github.com/d2-projects/d2-admin/commit/65127d6864aa7dae4b0ddfd7975eb7815d3a4fa2))


### Performance Improvements

* e2e测试优化 ([a3f4962](https://github.com/d2-projects/d2-admin/commit/a3f49624c2921b058b37ad9f9c49a894f1b44c2b))
* 关闭cdn，打开速度好像快了很多 ([4fabcea](https://github.com/d2-projects/d2-admin/commit/4fabcea985eb6e9c21adebad8751ef8c96bbe149))
* 增加d2-crud示例 ([509cac1](https://github.com/d2-projects/d2-admin/commit/509cac1ee86405f1626f754e1014b5aa456f5046))
* 文档优化 ([5629114](https://github.com/d2-projects/d2-admin/commit/562911449d0399d989c7dddfd76f90ad4bc45322))





# [1.17.0](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.16.1...@d2-plus/d2-crud-plus-example@1.17.0) (2020-08-25)


### Bug Fixes

* 修复点号配置多级数据时查询的问题 ([95f6bdc](https://github.com/d2-projects/d2-admin/commit/95f6bdc74b1809a2fc2be6801e4f87989c5b2d70))
* 修复用户没有添加按钮的bug ([41bf1bc](https://github.com/d2-projects/d2-admin/commit/41bf1bc8294aaafd54bc8867db66a16ce0620bae))
* 修复用户没有添加按钮的bug ([6572492](https://github.com/d2-projects/d2-admin/commit/6572492fdd6c0b3f8b8ffdfea65c2109b1fa3f1f))
* 减少vxetable的警告 ([8e30fb7](https://github.com/d2-projects/d2-admin/commit/8e30fb78d2596f402fbdea6e35a4956a58e82b76))


### Features

* 支持点号key的方式配置多级数据 ([927600d](https://github.com/d2-projects/d2-admin/commit/927600d0fefb4c281c2b797f29158ac792cca99c))





## [1.16.1](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.16.0...@d2-plus/d2-crud-plus-example@1.16.1) (2020-08-20)


### Bug Fixes

* exapndRow=true 报错的bug ([7d1740a](https://github.com/d2-projects/d2-admin/commit/7d1740a301ef4187eba31e446640fcd25a5307f6))


### Performance Improvements

* checkbox radio增加按钮样式配置 ([602265b](https://github.com/d2-projects/d2-admin/commit/602265bdab4780f881298ac01e4215da9b15b860))
* radio增加border配置 ([640ca4c](https://github.com/d2-projects/d2-admin/commit/640ca4cf877ade9bb97c7dff593b6cc9ae396da9))
* 增加嵌套表格示例 ([5b9b3e0](https://github.com/d2-projects/d2-admin/commit/5b9b3e08ad17956742c5175fb1c5f59df185aa1b))
* 增加嵌套表格示例 ([aea1cff](https://github.com/d2-projects/d2-admin/commit/aea1cffcfd73ba1d7a8729a3b2a9bf095d389543))
* 表单增加默认值功能 ([41132df](https://github.com/d2-projects/d2-admin/commit/41132dfac320d7ecfed50b00eb8e37b7c6aa3c77))





# [1.16.0](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.15.5...@d2-plus/d2-crud-plus-example@1.16.0) (2020-08-14)


### Features

* 取消单独的el-input，合并到renderCustomComponent ([a7b30cb](https://github.com/d2-projects/d2-admin/commit/a7b30cbc3dde40de04715a51914e92ad769569cc))
* 操作列按钮排序 ([ee5c3b4](https://github.com/d2-projects/d2-admin/commit/ee5c3b459b72304bde40b6c80ee4d346eae90be6))


### Performance Improvements

* 增加非vModel组件展示的示例 ([2985545](https://github.com/d2-projects/d2-admin/commit/2985545b979798bbc2e629fcb48387246f24ab3d))





## [1.15.5](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.15.4...@d2-plus/d2-crud-plus-example@1.15.5) (2020-08-13)


### Bug Fixes

* 整理了expose方法，其中updateAfter方法名修改成editAfter ([eb9631f](https://github.com/d2-projects/d2-admin/commit/eb9631f65cd5dd5517a90071ca4159af69978786))
* 查询表单宽度可以不写px后缀 ([4be5c88](https://github.com/d2-projects/d2-admin/commit/4be5c8878483bbffc8da4b21bc5691d6a9d90671))


### Performance Improvements

* 升级依赖 ([a4b5635](https://github.com/d2-projects/d2-admin/commit/a4b5635b2ec88b940ac2c1a3eebf2187f875765e))
* 外部获取数据字典示例 ([53b29ae](https://github.com/d2-projects/d2-admin/commit/53b29ae981c2a12536fb09fd5fd598821882577e))
* 继续完善e2e测试，修复一堆测出来的bug ([5351022](https://github.com/d2-projects/d2-admin/commit/5351022fbfd52400239700ff8123e94b5f14cd7c))
* 继续完善e2e测试，修复一堆测出来的bug ([fe7446e](https://github.com/d2-projects/d2-admin/commit/fe7446e94468d7a5561213e7bed01bec065210e7))






## [1.15.4](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.15.3...@d2-plus/d2-crud-plus-example@1.15.4) (2020-08-09)

**Note:** Version bump only for package @d2-plus/d2-crud-plus-example





## [1.15.3](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.15.2...@d2-plus/d2-crud-plus-example@1.15.3) (2020-08-06)

**Note:** Version bump only for package @d2-plus/d2-crud-plus-example





## [1.15.2](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.15.1...@d2-plus/d2-crud-plus-example@1.15.2) (2020-08-06)


### Bug Fixes

* 修复rowHandle:false 报错的问题 ([59fe2da](https://github.com/d2-projects/d2-admin/commit/59fe2da12493044bb9c0fb45076cbde596681e28))






## [1.15.1](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.15.0...@d2-plus/d2-crud-plus-example@1.15.1) (2020-08-06)


### Performance Improvements

* 自动染色功能 ([c955c92](https://github.com/d2-projects/d2-admin/commit/c955c92948c92f30a94f24b4128a8af0527264f4))





# [1.15.0](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.14.2...@d2-plus/d2-crud-plus-example@1.15.0) (2020-08-05)


### Features

* 发布 ([37af76c](https://github.com/d2-projects/d2-admin/commit/37af76c91d205e772118aee50f87766b25804274))





## [1.14.2](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.14.1...@d2-plus/d2-crud-plus-example@1.14.2) (2020-08-05)


### Bug Fixes

* break change dict-xxx的onReady方法参数的component改为{component:xx,data,setDictData} ([6489e34](https://github.com/d2-projects/d2-admin/commit/6489e3478304cf715c9c4dc5c216fbf7e5863e9d))
* 修复酒店示例多个翻页组件的问题 ([732e75e](https://github.com/d2-projects/d2-admin/commit/732e75e9ba1d40fabbceb2ace6421c2535c97d24))


### Performance Improvements

* dict onready事件支持修改过滤data ([bd5907d](https://github.com/d2-projects/d2-admin/commit/bd5907de509b84c6423673d42dc20cc24116de7d))
* valuesformat增加点击事件 ([d3d6cb7](https://github.com/d2-projects/d2-admin/commit/d3d6cb7c363fd54e839f6e4fe001c906ee3b17df))
* 数据支持嵌套对象 ([0bbe21f](https://github.com/d2-projects/d2-admin/commit/0bbe21fbc6c3ca4b88c8dc0e0a3e8b0258bb4b91))
* 数据支持嵌套对象 ([aaec065](https://github.com/d2-projects/d2-admin/commit/aaec0653bafb10d9845616763f7940c07050610f))
* 查看按钮优化为默认显示 ([07b1112](https://github.com/d2-projects/d2-admin/commit/07b11123f98a86a0441a2642538bc14429ba96bc))
* 行内禁用示例完善 ([dee1777](https://github.com/d2-projects/d2-admin/commit/dee177711fd20a027ec183aee5d7d2ac4329f5e9))
* 行组件disabled方法支持传参 ([1de28b0](https://github.com/d2-projects/d2-admin/commit/1de28b0d9fc426a2483b890ed922890bfcc6179a))





## [1.14.1](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.14.0...@d2-plus/d2-crud-plus-example@1.14.1) (2020-07-30)


### Performance Improvements

* 树形组件单独示例 ([8a16ef9](https://github.com/d2-projects/d2-admin/commit/8a16ef9))
* 组件独立使用示例 ([5de8d79](https://github.com/d2-projects/d2-admin/commit/5de8d79))






# [1.14.0](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.13.1...@d2-plus/d2-crud-plus-example@1.14.0) (2020-07-23)


### Features

* 查看功能 ([7d03e94](https://github.com/d2-projects/d2-admin/commit/7d03e94dc2ea6b67211ac554fe2f0ef3d8912a49))





## [1.13.1](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.13.0...@d2-plus/d2-crud-plus-example@1.13.1) (2020-07-23)


### Bug Fixes

* paginationPrefix还是不能改成flex ([9379761](https://github.com/d2-projects/d2-admin/commit/9379761bfb27ae3f213a310be25f04becf1b347b))


### Performance Improvements

* form传递方式改为provide/inject方式 ([158a225](https://github.com/d2-projects/d2-admin/commit/158a225be45aabd5a29de812ea1f00320212a26f))





# [1.13.0](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.12.5...@d2-plus/d2-crud-plus-example@1.13.0) (2020-07-21)


### Bug Fixes

* 修复vxe-table的一些bug ([0a8a52f](https://github.com/d2-projects/d2-admin/commit/0a8a52fd6d40e47f41502fbe050f8348e30e3377))


### Features

* 实验性支持vxe-table ([9b518c4](https://github.com/d2-projects/d2-admin/commit/9b518c46091a76a3bfc96d9c79ee763a26be9fa2))
* 重大优化 ([9b1009a](https://github.com/d2-projects/d2-admin/commit/9b1009a62383db653ac25f7f83b048dad0a40448))





## [1.12.5](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.12.4...@d2-plus/d2-crud-plus-example@1.12.5) (2020-07-18)


### Performance Improvements

* 每页条数设置增加本地保存 ([f687297](https://github.com/d2-projects/d2-admin/commit/f687297ace1d70b9d406cb59f06fa78be2aa8263))
* 增加批量删除示例 ([2907848](https://github.com/d2-projects/d2-admin/commit/290784891a55b898c5c90fe36eb5e44d31e1c138))
* ueditor支持全局配置 ([3880215](https://github.com/d2-projects/d2-admin/commit/3880215328957763f90df3d139d602c875ebce2f))





## [1.12.4](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.12.3...@d2-plus/d2-crud-plus-example@1.12.4) (2020-07-16)


### Performance Improvements

* 查询的title可配置，升级phonenumberinput ([eacb97c](https://github.com/d2-projects/d2-admin/commit/eacb97c7f17a2fef13de3c5dddf0923448a4408e))
* 增加旧版示例 ([8bbe208](https://github.com/d2-projects/d2-admin/commit/8bbe2084b5ce7247ae6dc745b5e29042a792cec1))
* helper增加render方式 ([56a2c14](https://github.com/d2-projects/d2-admin/commit/56a2c14f69ab600f8c1ad310e7e6dc4d96ea2618))





## [1.12.3](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.12.2...@d2-plus/d2-crud-plus-example@1.12.3) (2020-07-13)


### Bug Fixes

* 修复d2Crud与d2CrudX样式冲突的问题 ([b6593ac](https://github.com/d2-projects/d2-admin/commit/b6593ac6f88d65e706f90530438fbe6abe536ec8))
* 修复d2Crud与d2CrudX样式冲突的问题 ([2fbcd29](https://github.com/d2-projects/d2-admin/commit/2fbcd29290845928480a9de8fff78bad1e816c71))





## [1.12.2](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.12.1...@d2-plus/d2-crud-plus-example@1.12.2) (2020-07-13)


### Bug Fixes

* 修复首次加载表尾合计行无法显示的bug ([d4e1d4e](https://github.com/d2-projects/d2-admin/commit/d4e1d4e49ccbc92f5a00f8802c8075fb27b38431))





## [1.12.1](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.12.0...@d2-plus/d2-crud-plus-example@1.12.1) (2020-07-12)


### Performance Improvements

* 查询示例优化 ([e39c043](https://github.com/d2-projects/d2-admin/commit/e39c0430062a7e3f65b4666b9d39961875e0c299))
* 查询增加防抖自动查询功能 ([e8430d3](https://github.com/d2-projects/d2-admin/commit/e8430d38ae74440229d31ba9ad5e6c7cbaae3e99))
* 列设置保存到本地 ([b482052](https://github.com/d2-projects/d2-admin/commit/b482052c9665987dca3f699c2b317e7707a24b1d))
* 示例全部改成新版带toolbar界面 ([6770fc9](https://github.com/d2-projects/d2-admin/commit/6770fc9980ba17083ffb414309ad8f6e15d6dbe1))
* 优化列过滤器 ([3775371](https://github.com/d2-projects/d2-admin/commit/37753713a135d4f019717f14f016c1a12c5990a0))
* extends解除d2crudplus依赖 ([66c5c70](https://github.com/d2-projects/d2-admin/commit/66c5c70bbf505e76296257c56debef0d5855b843))





# [1.12.0](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.11.4...@d2-plus/d2-crud-plus-example@1.12.0) (2020-07-11)


### Features

* 新增工具条功能：刷新，查询展开，页面紧凑切换，列设置。内置分页组件可以启用 ([980ff30](https://github.com/d2-projects/d2-admin/commit/980ff30154453c8b1cd77f19f9efe6f7a20f9bef))


### Performance Improvements

* 日期format示例 ([03955b5](https://github.com/d2-projects/d2-admin/commit/03955b51113cf9f287e8d0ae8a5d165bee9da53b))





## [1.11.4](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.11.3...@d2-plus/d2-crud-plus-example@1.11.4) (2020-07-07)


### Bug Fixes

* 修复树形选择器，单选返回值为数组的bug ([1b79cf7](https://github.com/d2-projects/d2-admin/commit/1b79cf7a71cb1ce9b1e2351abd7535adfc5fecab))
* 修复dictRadio valuechange触发两次的问题 ([36d5325](https://github.com/d2-projects/d2-admin/commit/36d53251f73a7be1d06a84785d25f6903aff6bb7))
* 增加配置项updateTableDataAfterEdit，保存对话框后不插入数据到table中，通过刷新列表更新数据 ([6ee6f07](https://github.com/d2-projects/d2-admin/commit/6ee6f079f202a0ff053d318c251139d2aa1f0312))


### Performance Improvements

* 新增d2crud共存 ([e2d1d8c](https://github.com/d2-projects/d2-admin/commit/e2d1d8c60ef235719233ad16520f581ac6e44041))
* 增加手动选择示例 ([be9b649](https://github.com/d2-projects/d2-admin/commit/be9b649c50ed091314e4a442be718ca2ec0008dc))
* 字典增加禁止缓存功能，url()方式取消字典缓存 ([ae5dce1](https://github.com/d2-projects/d2-admin/commit/ae5dce1a19e607ef0c294414518293a1685e6983))
* crud-x 打开编辑对话框后发送 dialog-opened事件 ([2d6a4c2](https://github.com/d2-projects/d2-admin/commit/2d6a4c2d1956305b10fe6eac16f9644c4fe31549))
* search 增加事件监听 ([28450de](https://github.com/d2-projects/d2-admin/commit/28450def69ffae2695c02acacb2ece804dd1e44d))





## [1.11.3](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.11.2...@d2-plus/d2-crud-plus-example@1.11.3) (2020-07-02)

**Note:** Version bump only for package @d2-plus/d2-crud-plus-example





## [1.11.2](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.11.1...@d2-plus/d2-crud-plus-example@1.11.2) (2020-07-01)


### Performance Improvements

* 权限菜单管理改造成el-table的树形管理 ([b4120af](https://github.com/d2-projects/d2-admin/commit/b4120afd1af8db669524d7e8d2dde0a63accb994))





## [1.11.1](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.11.0...@d2-plus/d2-crud-plus-example@1.11.1) (2020-07-01)


### Performance Improvements

* 动态添加分组示例 ([3bc9ccc](https://github.com/d2-projects/d2-admin/commit/3bc9ccc03d2a75eeec9f9fb0e3623a7a4000025a))
* 增加动态添加表单字段示例 ([d931710](https://github.com/d2-projects/d2-admin/commit/d9317107e916f1014b8e0f21ad7648786d7f782f))





# [1.11.0](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.10.2...@d2-plus/d2-crud-plus-example@1.11.0) (2020-06-30)


### Features

* 表单支持分组 ([96f1b54](https://github.com/d2-projects/d2-admin/commit/96f1b54ff480b95461ac37556eeef66fd925a158))
* 更简单方便易用的组件禁用方式（disabled） ([b194ac1](https://github.com/d2-projects/d2-admin/commit/b194ac1f62d88ffd7d887cb8a56e55a4b5cf2511))
* 支持配置默认表单span ([9268d4a](https://github.com/d2-projects/d2-admin/commit/9268d4a1c19dcdf549deab965a07fa9904c4a010))





## [1.10.2](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.10.1...@d2-plus/d2-crud-plus-example@1.10.2) (2020-06-29)


### Bug Fixes

* 修复多次登录后顶部菜单重复出现的bug ([fba5843](https://github.com/d2-projects/d2-admin/commit/fba58434d5e0abec8d903f36909a349d71b4afb3))
* 修复静态菜单不显示的问题 ([09bd7bb](https://github.com/d2-projects/d2-admin/commit/09bd7bb5991403d60c8703c37cb4876415c6b54c))


### Performance Improvements

* 云文件上传增加私有bucket上传支持 ([be33142](https://github.com/d2-projects/d2-admin/commit/be33142c77faaec2a188af41d5ca5150a7e58a29))






## [1.10.1](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.10.0...@d2-plus/d2-crud-plus-example@1.10.1) (2020-06-25)

**Note:** Version bump only for package @d2-plus/d2-crud-plus-example






# [1.10.0](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.9.0...@d2-plus/d2-crud-plus-example@1.10.0) (2020-06-24)


### Bug Fixes

* 修复新的mock加载出错的问题 ([f16b557](https://github.com/d2-projects/d2-admin/commit/f16b557323d6ccf688890ae68571c8f936834e56))
* 修复新的mock无法删除记录的bug ([cbb6594](https://github.com/d2-projects/d2-admin/commit/cbb65944e75136054d29dd70b9b37d5e43fc938b))
* 修复自定义按钮获取不到行数据的bug ([ca5a82e](https://github.com/d2-projects/d2-admin/commit/ca5a82e2e79d14e13e45e8adafbdeed80a6533c5))


### Features

* 对话框增加自定义header slot ([0c25a93](https://github.com/d2-projects/d2-admin/commit/0c25a93e85f91b34c2cc2e6f5883e1ab284cbb0c))


### Performance Improvements

* 文档优化 ([1459201](https://github.com/d2-projects/d2-admin/commit/145920140d3396f995a2d8dc5d33796ac6c08dfc))
* 优化示例 ([17cf04a](https://github.com/d2-projects/d2-admin/commit/17cf04ae6ac283fea7603c3ce695797712a4149a))
* 优化示例展示效果，增加模拟请求延时 ([5eac157](https://github.com/d2-projects/d2-admin/commit/5eac1572836601b2ed6e4f2f4b5fdb3f3c884845))






# [1.9.0](https://github.com/d2-projects/d2-admin/compare/@d2-plus/d2-crud-plus-example@1.8.7...@d2-plus/d2-crud-plus-example@1.9.0) (2020-06-22)


### Features

* d2-admin 1.17版本同步 ([7037e4a](https://github.com/d2-projects/d2-admin/commit/7037e4ada20dd5b62c248349bd51f7014962877f))
* d2-admin升级到1.17.0 ([ce5dfa0](https://github.com/d2-projects/d2-admin/commit/ce5dfa035f9f547854ae63ebee793722580e09c7))






## [1.8.7](https://github.com/greper/d2-crud-plus/compare/@d2-plus/d2-crud-plus-example@1.8.6...@d2-plus/d2-crud-plus-example@1.8.7) (2020-06-17)


### Bug Fixes

* 修复手机号输入组件没有加载的bug ([d43313a](https://github.com/greper/d2-crud-plus/commit/d43313ac20d1b8fd65eeafa2714202494dad9fae))
* 修复手机号输入组件没有加载的bug ([5ee4ea2](https://github.com/greper/d2-crud-plus/commit/5ee4ea2b280f4963ee18585850fb39b4af595669))


### Performance Improvements

* jsx示例 ([a4995c6](https://github.com/greper/d2-crud-plus/commit/a4995c6b366f105d8b93daac37f71186ebf0b011))
* jsx示例 ([ed497e0](https://github.com/greper/d2-crud-plus/commit/ed497e0bde749661515de9824849f9516c06a184))
* jsx示例 ([137f745](https://github.com/greper/d2-crud-plus/commit/137f7458bdc37b36b18b9f60df67011fb4c9ab60))
* 优化日历显示 ([6274715](https://github.com/greper/d2-crud-plus/commit/62747159a3f7173ffdf4794261f39b4499b5b1aa))





## [1.8.6](https://github.com/greper/d2-crud-plus/compare/@d2-plus/d2-crud-plus-example@1.8.5...@d2-plus/d2-crud-plus-example@1.8.6) (2020-06-16)


### Performance Improvements

* 行编辑演示 ([aec224f](https://github.com/greper/d2-crud-plus/commit/aec224f87f1a41811d48205280c84c48cb7044a2))





## [1.8.5](https://github.com/greper/d2-crud-plus/compare/@d2-plus/d2-crud-plus-example@1.8.4...@d2-plus/d2-crud-plus-example@1.8.5) (2020-06-12)


### Bug Fixes

* 增加自定义扩展组件demo ([33c02f0](https://github.com/greper/d2-crud-plus/commit/33c02f0baddbe5d93c41439387362972de46cac9))





## [1.8.4](https://github.com/greper/d2-crud-plus/compare/@d2-plus/d2-crud-plus-example@1.8.3...@d2-plus/d2-crud-plus-example@1.8.4) (2020-06-12)


### Bug Fixes

* meneTree判空 ([8c4c939](https://github.com/greper/d2-crud-plus/commit/8c4c939d750939d4ec7e4da6a6d4abd855c7ba29))
* tree-selector 支持单选 ([a521ad7](https://github.com/greper/d2-crud-plus/commit/a521ad7882c0c019a51be97236de1c28e65b7114))
* 修复懒加载之后上传组件没有动态切换的bug ([7fee033](https://github.com/greper/d2-crud-plus/commit/7fee03366753abbabee41fec40c38a840b00678f))





## [1.8.3](https://github.com/greper/d2-crud-plus/compare/@d2-plus/d2-crud-plus-example@1.8.2...@d2-plus/d2-crud-plus-example@1.8.3) (2020-06-10)


### Bug Fixes

* 修复文本域无法输入的问题 ([bddee2d](https://github.com/greper/d2-crud-plus/commit/bddee2d2283014a94d136ad7659dbebf2a17e24b))





## [1.8.2](https://github.com/greper/d2-crud-plus/compare/@d2-plus/d2-crud-plus-example@1.8.1...@d2-plus/d2-crud-plus-example@1.8.2) (2020-06-09)


### Bug Fixes

* 切换用户不更新权限的bug ([5b73a90](https://github.com/greper/d2-crud-plus/commit/5b73a90b418927f5f9f4dca48094ab93457a3cbe))
* 懒加载优化，减小首次访问体积 ([d210a54](https://github.com/greper/d2-crud-plus/commit/d210a544c890c35d3f41af5067f24f9a3d8d4587))





## [1.8.1](https://github.com/greper/d2-crud-plus/compare/@d2-plus/d2-crud-plus-example@1.8.0...@d2-plus/d2-crud-plus-example@1.8.1) (2020-06-08)


### Bug Fixes

* 指定corejs版本 ([619da4d](https://github.com/greper/d2-crud-plus/commit/619da4d6c2c7482d68989e6c378ebd29fc335d05))





# [1.8.0](https://github.com/greper/d2-crud-plus/compare/@d2-plus/d2-crud-plus-example@1.7.1...@d2-plus/d2-crud-plus-example@1.8.0) (2020-06-08)


### Bug Fixes

* 兼容ie11 ([bca62ee](https://github.com/greper/d2-crud-plus/commit/bca62eeb48ef53bd075028340f4634a341a88987))
* 增加选项的禁用配置，增加dictSwitch,部分ie兼容性问题修复 ([c91a04b](https://github.com/greper/d2-crud-plus/commit/c91a04bbdd201d117953048c56cca53ae66dad0d))


### Features

* 组件ready事件 ([bfefdf3](https://github.com/greper/d2-crud-plus/commit/bfefdf31d03247a87d718114e30363801a98d96a))





## [1.7.1](https://github.com/greper/d2-crud-plus/compare/@d2-plus/d2-crud-plus-example@1.7.0...@d2-plus/d2-crud-plus-example@1.7.1) (2020-06-04)


### Bug Fixes

* 修复文件上传onPreview可自定义 ([be37294](https://github.com/greper/d2-crud-plus/commit/be372947d5a4281b661f01ca1f84a202691023e0))
* 修复文件上传进度条显示的bug，优化一些其他显示上的问题 ([53d54ba](https://github.com/greper/d2-crud-plus/commit/53d54bad45782ddc7a6970ad25c2811e137ff41b))
* 文件上传支持文件大小限制配置 ([af22fe1](https://github.com/greper/d2-crud-plus/commit/af22fe1fb36cc4d2406c1c4ecc310f5e829fb239))






# [1.7.0](https://github.com/greper/d2-crud-plus/compare/@d2-plus/d2-crud-plus-example@1.6.0...@d2-plus/d2-crud-plus-example@1.7.0) (2020-06-03)


### Bug Fixes

* release文字修改 ([e31d42d](https://github.com/greper/d2-crud-plus/commit/e31d42d65f6dd7dca6913786953d8c12324818fc))
* release文字修改 ([37ef4b3](https://github.com/greper/d2-crud-plus/commit/37ef4b3edbdd1152c782943164075b562d8d8d86))


### Features

* dict配置增加覆盖全局getRemoteDataFunc的方法，全局方法增加dict参数 ([22db385](https://github.com/greper/d2-crud-plus/commit/22db38591d7c285b0e50ce8b9cd6aedd0c5032f9))
* 优化字典获取自定义，修复bug，增加示例的行数 ([e94749d](https://github.com/greper/d2-crud-plus/commit/e94749de0ad885ee5feea6b1b6a2a2096f057a2c))
* 动态显示隐藏整个表单字段 ([3153602](https://github.com/greper/d2-crud-plus/commit/31536028be6ac052d4c5c9d5432807be4f46d1de))
* 富文本增加ueditor ([ee6e6f6](https://github.com/greper/d2-crud-plus/commit/ee6e6f6430e5aa2ebf3bcfe2987af56d512b5e96))






# [1.6.0](https://github.com/greper/d2-crud-plus/compare/@d2-plus/d2-crud-plus-example@1.5.4...@d2-plus/d2-crud-plus-example@1.6.0) (2020-05-21)


### Features

* checkbox联动radio修改radio的选项功能示例，d2-crud的表单组件增加ref ([66d26bb](https://github.com/greper/d2-crud-plus/commit/66d26bb039cb0848936e41019883ec9a1ec1ce7d))





## [1.5.4](https://github.com/greper/d2-crud-plus/compare/@d2-plus/d2-crud-plus-example@1.5.3...@d2-plus/d2-crud-plus-example@1.5.4) (2020-05-17)

**Note:** Version bump only for package @d2-plus/d2-crud-plus-example





## [1.5.3](https://github.com/greper/d2-crud-plus/compare/@d2-plus/d2-crud-plus-example@1.5.2...@d2-plus/d2-crud-plus-example@1.5.3) (2020-05-17)


### Bug Fixes

* 修复d2p-file-uploader会覆盖上传参数的问题 ([d09a934](https://github.com/greper/d2-crud-plus/commit/d09a93406f5900c9649bd79c626abe6f5af4eb52))





## [1.5.2](https://github.com/greper/d2-crud-plus/compare/@d2-plus/d2-crud-plus-example@1.5.1...@d2-plus/d2-crud-plus-example@1.5.2) (2020-05-17)


### Bug Fixes

* 文档调整 ([423b3b4](https://github.com/greper/d2-crud-plus/commit/423b3b4655861d3d1e6fe5bdac79b9deaeb20cb9))






## [1.5.1](https://github.com/greper/d2-crud-plus/compare/@d2-plus/d2-crud-plus-example@1.5.0...@d2-plus/d2-crud-plus-example@1.5.1) (2020-05-16)


### Bug Fixes

* 修复头像上传后获取不到md5值的问题 ([27ff933](https://github.com/greper/d2-crud-plus/commit/27ff933c698dd64ff5cbbce8fbd7c6df1dc8dbc0))





# [1.5.0](https://github.com/greper/d2-crud-plus/compare/@d2-plus/d2-crud-plus-example@1.4.0...@d2-plus/d2-crud-plus-example@1.5.0) (2020-05-16)


### Bug Fixes

* 修复表单上传url错误的问题 ([2d49985](https://github.com/greper/d2-crud-plus/commit/2d4998574436d0f6c90da942653debc42f73bc41))


### Features

* 多文件上传显示优化，批量删除，上传文件参数优化 ([91e2437](https://github.com/greper/d2-crud-plus/commit/91e243796221b706b0bb906aca5c00e59ed597fe))






# [1.4.0](https://github.com/greper/d2-crud-plus/compare/@d2-plus/d2-crud-plus-example@1.3.3...@d2-plus/d2-crud-plus-example@1.4.0) (2020-05-14)


### Features

* quill富文本编辑器 ([238760b](https://github.com/greper/d2-crud-plus/commit/238760b1c63385850721f3eb018c9f2ebe0595ec))
* quill富文本编辑器 ([54c39cc](https://github.com/greper/d2-crud-plus/commit/54c39cc911f5a481894850ea227cdc627c5b0716))
* textArea支持 ([12f2c91](https://github.com/greper/d2-crud-plus/commit/12f2c91ea492b4b5f4b781c7826b0c6939e0db93))
* 支持本地服务器上传文件 ([1f319f2](https://github.com/greper/d2-crud-plus/commit/1f319f20afcee32c4527bfd0e10f263234723b3a))
* 新增展开行功能，新增特殊列、固定列示例 ([0a2b60a](https://github.com/greper/d2-crud-plus/commit/0a2b60a6a0c9ece1e7391ce3b72eff0d5d0e8e7a))
* 新增展开行功能，新增特殊列、固定列示例 ([69bacf0](https://github.com/greper/d2-crud-plus/commit/69bacf00edf016968be723c7457d8002e30fc285))






## [1.3.3](https://github.com/greper/d2-crud-plus/compare/@d2-plus/d2-crud-plus-example@1.3.2...@d2-plus/d2-crud-plus-example@1.3.3) (2020-05-13)


### Bug Fixes

* 文件上传组件，删除时没有改变value值的bug ([af264c7](https://github.com/greper/d2-crud-plus/commit/af264c74759cdd9d1955eb868041dbc13a83d4c6))






## [1.3.2](https://github.com/greper/d2-crud-plus/compare/@d2-plus/d2-crud-plus-example@1.3.1...@d2-plus/d2-crud-plus-example@1.3.2) (2020-04-08)


### Bug Fixes

* 优化表格有滚动条时高度计算导致双滚动条的bug ([4460d6c](https://github.com/greper/d2-crud-plus/commit/4460d6c5179d08bfe595b559cf844eadcf9f2fa8))





## [1.3.1](https://github.com/greper/d2-crud-plus/compare/@d2-plus/d2-crud-plus-example@1.3.0...@d2-plus/d2-crud-plus-example@1.3.1) (2020-04-07)


### Bug Fixes

* 七牛token不再支持复用 ([69c35be](https://github.com/greper/d2-crud-plus/commit/69c35be9cff2f3234e0f12e74b0621bee28c0461))





# [1.3.0](https://github.com/greper/d2-crud-plus/compare/@d2-plus/d2-crud-plus-example@1.2.4...@d2-plus/d2-crud-plus-example@1.3.0) (2020-04-07)


### Features

* 图片裁剪 ([13ace31](https://github.com/greper/d2-crud-plus/commit/13ace3104ef7ff4cba66867e4f4a78bf858d81e8))
* 图片裁剪 ([bd213e4](https://github.com/greper/d2-crud-plus/commit/bd213e4366432084b5353c30c468218c5a2efe8a))
* 头像裁剪组件，图片行显示支持预览大图 ([348ec15](https://github.com/greper/d2-crud-plus/commit/348ec15b0eca5c55512b56134fb1086a36ba4d06))
