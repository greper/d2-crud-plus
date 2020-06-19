<template>
  <d2-container class="page">
    <d2-page-cover>
      <d2-icon-svg class="logo" name="d2-admin"/>
      <template slot="footer">
        <div class="btn-group">
          <span class="btn-group__btn" @click="$open('https://github.com/greper/d2-crud-plus')">d2-crud-plus</span> |
          <span class="btn-group__btn" @click="$open('https://github.com/greper/d2-crud')">d2-crud-x</span>
<!--          <span class="btn-group__btn" @click="$open('https://alibaba.github.io/ice/scaffold?type=vue')">飞冰</span> |-->
<!--          <span class="btn-group__btn" @click="$open('https://juejin.im/user/57a48b632e958a006691b946/posts')">掘金</span> |-->
<!--          <span class="btn-group__btn" @click="$open('https://daily.fairyever.com')">日报</span> |-->
<!--          <el-popover :width="172" trigger="hover">-->
<!--            <p class="d2-mt-0 d2-mb-10">D2Projects</p>-->
<!--            <img src="./image/qr@2x.png" style="width: 172px;">-->
<!--            <span slot="reference" class="btn-group__btn btn-group__btn&#45;&#45;link">-->
<!--              <d2-icon name="weixin"/>-->
<!--              微信公众号-->
<!--            </span>-->
<!--            <p style="font-size: 12px; margin-top: 0px; margin-bottom: 0px;">-->
<!--              官方公众号，主要推送前端技术类文章、框架资源、学习教程，以及 D2 系列项目更新信息-->
<!--            </p>-->
<!--          </el-popover>-->
        </div>
        <d2-badge/>
        <d2-help-btn/>
      </template>
    </d2-page-cover>
  </d2-container>
</template>

<script>
import D2HelpBtn from './components/d2-help-btn/index'
import D2Badge from './components/d2-badge/index'
import D2PageCover from './components/d2-page-cover/index'
export default {
  components: {
    D2HelpBtn,
    D2Badge,
    D2PageCover
  }
}
</script>

<style lang="scss" scoped>
.page {

  .btn-group {
    color: $color-text-placehoder;
    font-size: 12px;
    margin-top: 10px;
    margin-bottom: 10px;
    .btn-group__btn {
      color: $color-text-sub;
      &:hover {
        color: $color-text-main;
      }
      &.btn-group__btn--link {
        color: $color-primary;
      }
    }
  }

}
</style>
