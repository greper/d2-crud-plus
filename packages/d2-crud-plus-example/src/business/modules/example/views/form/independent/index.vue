<template>
  <d2-container  >
    <template slot="header">组件独立使用
      <example-helper title="select" >
      </example-helper>
    </template>
    <el-form ref="form" :model="form" label-width="80px">
      <el-row>
        <el-col :span="5">
          <el-form-item label="树形选择">
            <d2p-tree-selector style="width:200px" v-model="form.tree"  :dict="getDict({ url: '/select/cascadeData',isTree:true})" :multiple="false"/>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="级联">
            <cascade-select style="width:200px" v-model="form.tree"  :dict="getDict({ url: '/select/cascadeData',isTree:true})" :elProps="cascadeElProps"/>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="value">
            <values-format v-model="form.tree" :dict="getDict({ url: '/select/cascadeData',isTree:true})"/>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="value">
            {{form.tree}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <el-form-item label="图片裁剪">
            <d2p-cropper-uploader v-bind="{type:'qiniu'}" ></d2p-cropper-uploader>
          </el-form-item>
        </el-col>
        <el-col :span="5">

        </el-col>
      </el-row>

    </el-form>
  </d2-container>
</template>

<script>
import { d2CrudPlus } from 'd2-crud-plus'
export default {
  name: 'independent',
  data () {
    return {
      getDict (dict) {
        return d2CrudPlus.util.dict.mergeDefault(dict)
      },
      form: {
        tree: 'zhinan'
      },
      cascadeElProps: {
        showAllLevels: false, // 仅显示最后一级
        props: {
          checkStrictly: true, // 可以不需要选到最后一级
          emitPath: false
        }
      },
      dictData: []
    }
  },
  methods: {
  }
}
</script>
