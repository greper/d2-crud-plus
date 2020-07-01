<template>
  <div class="d2p-ueditor">
    <script ref="script" :name="name" type="text/plain"></script>
  </div>
</template>

<script>
import LoadEvent from './utils/Event'
import { d2CrudPlus } from 'd2-crud-plus'

/**
 * ueditor富文本编辑器包装，支持v-model绑定
 */
export default {
  name: 'd2p-ueditor',
  mixins: [d2CrudPlus.input],
  props: {
    // 富文本
    value: {
      type: String,
      default: ''
    },
    // 编辑器配置
    // 请参考：http://fex.baidu.com/ueditor/#start-config
    config: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 编辑器名称
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      editor: undefined,
      mixedConfig: {
        UEDITOR_HOME_URL: `${process.env.BASE_URL}lib/UEditor/`,
        serverUrl: '/api/ueditor/',

        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 240,
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 关闭自动保存
        enableAutoSave: false,
        zIndex: 3001
      }
    }
  },
  watch: {
    disabled (value) {
      if (this.editor) {
        value ? this.editor.setDisabled() : this.editor.setEnabled()
      }
    },
    // 对外提供 v-model
    value (value) {
      this.$emit('change', value)
      if (this.editor.getContent() === value) {
        return
      }
      this.setValue(value)
    }
  },
  created () {
    this.initValue = this.value
  },
  mounted () {
    this._checkDependencies().then(() => {
      this.$refs.script ? this._initEditor() : this.$nextTick(() => this._initEditor())
    })
  },
  methods: {
    onInput (event) {
      this.currentValue = event
      this.$emit('input', event)
    },
    onChange (event) {
      this.$emit('change', event)
    },
    // 实例化编辑器
    _initEditor () {
      this.$refs.script.id = this.id = 'editor_' + Math.random().toString(16).slice(-6) // 这么做是为了支持 Vue SSR，因为如果把 id 属性放在 data 里会导致服务端和客户端分别计算该属性的值，而造成 id 不匹配无法初始化的 BUG
      Object.assign(this.mixedConfig, this.config)
      this.$emit('beforeInit', this.id, this.mixedConfig)
      this.editor = window.UE.getEditor(this.id, this.mixedConfig)
      this.editor.addListener('ready', () => {
        console.log('ueditor ready')
        if (this.status === 2) { // 使用 keep-alive 组件会出现这种情况
          this.editor.setContent(this.value)
        } else {
          this.status = 2
          this.$emit('ready', { vm: this, editor: this.editor })
          if (this.initValue) {
            console.log('initvalue ', this.initValue)
            this.editor.setContent(this.initValue)
          }
        }

        this.editor.addListener('contentChange', this.contentChangeHandler)
      })
    },
    // 检测依赖,确保 UEditor 资源文件已加载完毕
    _checkDependencies () {
      return new Promise((resolve, reject) => {
        // 判断ueditor.config.js和ueditor.all.js是否均已加载(仅加载完ueditor.config.js时UE对象和UEDITOR_CONFIG对象存在,仅加载完ueditor.all.js时UEDITOR_CONFIG对象存在,但为空对象)
        let scriptsLoaded = !!window.UE && !!window.UEDITOR_CONFIG && Object.keys(window.UEDITOR_CONFIG).length !== 0 && !!window.UE.getEditor
        if (scriptsLoaded) {
          resolve()
        } else if (window['$loadEnv']) { // 利用订阅发布，确保同时渲染多个组件时，不会重复创建script标签
          window['$loadEnv'].on('scriptsLoaded', () => {
            resolve()
          })
        } else {
          window['$loadEnv'] = new LoadEvent()
          // 如果在其他地方只引用ueditor.all.min.js，在加载ueditor.config.js之后仍需要重新加载ueditor.all.min.js，所以必须确保ueditor.config.js已加载
          this._loadConfig().then(() => this._loadCore()).then(() => {
            resolve()
            window['$loadEnv'].emit('scriptsLoaded')
          })
        }
      })
    },
    _loadConfig () {
      return new Promise((resolve, reject) => {
        if (window.UE && window.UEDITOR_CONFIG && Object.keys(window.UEDITOR_CONFIG).length !== 0) {
          resolve()
          return
        }
        let configScript = document.createElement('script')
        configScript.type = 'text/javascript'
        configScript.src = this.mixedConfig.UEDITOR_HOME_URL + 'ueditor.config.js'
        document.getElementsByTagName('head')[0].appendChild(configScript)
        configScript.onload = function () {
          if (window.UE && window.UEDITOR_CONFIG && Object.keys(window.UEDITOR_CONFIG).length !== 0) {
            resolve()
          } else {
            console.error('加载ueditor.config.js失败,请检查您的配置地址UEDITOR_HOME_URL填写是否正确!\n', configScript.src)
          }
        }
      })
    },
    _loadCore () {
      return new Promise((resolve, reject) => {
        if (window.UE && window.UE.getEditor) {
          resolve()
          return
        }
        let coreScript = document.createElement('script')
        coreScript.type = 'text/javascript'
        coreScript.src = this.mixedConfig.UEDITOR_HOME_URL + 'ueditor.all.min.js'
        document.getElementsByTagName('head')[0].appendChild(coreScript)
        coreScript.onload = function () {
          if (window.UE && window.UE.getEditor) {
            resolve()
          } else {
            console.error('加载ueditor.all.min.js失败,请检查您的配置地址UEDITOR_HOME_URL填写是否正确!\n', coreScript.src)
          }
        }
      })
    },
    contentChangeHandler () {
      this.$emit('input', this.editor.getContent())
    },
    // 设置内容
    _setContent (value) {
      if (value !== this.editor.getContent()) {
        this.editor.setContent(value)
      }
    },
    setValue (value) {
      switch (this.status) {
        case 0:
        case 1:
          this.initValue = value
          break
        case 2:
          this._setContent(value)
          break
      }
    }
  },
  beforeDestroy () {
    if (this.editor && this.editor.destroy) {
      this.editor.destroy()
    }
  }
}
</script>
<style lang="scss">
  .d2p-ueditor{
    .edui-default .edui-toolbar .edui-button, .edui-default .edui-toolbar .edui-splitbutton, .edui-default .edui-toolbar .edui-menubutton, .edui-default .edui-toolbar .edui-combox {
      line-height: normal;
    }
    .edui-editor{line-height: normal;box-sizing: border-box;}
  }
</style>
