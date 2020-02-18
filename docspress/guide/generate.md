# 代码生成

## 项目地址【java】
https://github.com/greper/d2-crud-plus-server/code-generator
```shell
git clone https://github.com/greper/d2-crud-plus-server.git
# 导入idea或eclipse
```
## 代码生成
通过单元测试，生成代码   
### 1.编写单元测试，并运行
```
@SpringBootTest
class CodeGeneratorApplicationTests {
    @Autowired
    private GenerateService generateService;
    @Test
    void pm() {
        GenerateRequest request = GenerateRequest.builder()
                .moduleName("permission") //模块名
                .tableName("pm_user_role") //表名
                .parentPackage("com.veryreader.d2p.api.modules") //包名
                .tablePrefix("pm") //表前缀
                .apiUrlPrefix("") //前端接口前缀
                .logicDeleteField("del_flag") //逻辑删除
                .build();
        request.addFill("createTime", FieldFill.INSERT); //自动填充
        request.addFill("updateTime",FieldFill.INSERT_UPDATE); //自动填充
        generateService.generate(request);
    }
}
```
### 2.复制代码
代码将生成在`./code-generator/.generated/`目录下   
* `./code-generator/.generated/backend` java后端代码   
* `./code-generator/.generated/front` d2-crud-plus前端代码