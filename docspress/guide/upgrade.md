# 版本升级
## 依赖包升级
如果你是使用d2-admin项目集成的d2-crud-plus    
修改package.json中依赖包的为最新版本  
然后执行`npm install` 或`yarn install` 即可   
* d2-crud-plus:xxx
* d2-crud-x:xxx
* d2p-extends:xxx

### changelog

* [d2-crud-x](./changelogs/packages/d2-crud-x/CHANGELOG.md)
* [d2-crud-plus](./changelogs/packages/d2-crud-plus/CHANGELOG.md)
* [d2-crud-extends](./changelogs/packages/d2-crud-extends/CHANGELOG.md)
* [d2-crud-plus-example](./changelogs/packages/d2-crud-plus-example/CHANGELOG.md)


## 以example作为启动项目如何升级
如果你是直接使用d2-crud-plus-example作为你的启动项目的    
并且想要同步example内的改动（比如权限模块）。

你需要在项目开始之前就做好准备，请按如下步骤进行。

1. 将d2-crud-plus-example复制出来，作为你的启动项目
2. 在开始任何改动之前，提交一次，然后打个分支，你可以命名叫:官方版，push到服务器。
3. 接下来你可以切换回开发分支进行你的项目开发。
4. 当官方有新的版本发布，你想同步的时候。
5. checkout官方版分支，复制最新版d2-crud-plus-example的文件全部覆盖，提交一次，push到服务器。
6. 然后切换回开发分支，从官方分支merge到你的开发分支。
7. 这样我们就把升级操作转化为merge操作。
8. 此时你只需要处理冲突即可。

最后建议尽量对官方代码少做改动，升级时冲突会少一点。    

当然以d2-admin项目作为启动项目时也可以按照此思想进行升级操作    

::: warning   
只有当你要同步example里的新改动（比如权限模块）的时候才需要如此升级    
如果只是想获得d2-crud-plus、d2-crud-x、d2p-extends的新功能时，那么只需要修改package.json的依赖版本即可。   
:::

## 使用了权限模块如何升级
思路跟example升级一样。只是把要升级的部分换成了permission模块。   
还要注意把权限模块安装的过程再过一遍，可能安装过程有新的修改