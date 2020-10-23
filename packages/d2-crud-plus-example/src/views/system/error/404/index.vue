<template>
  <div v-if="!this.isLogined()" class="page" >
    <p class="page_title">404 page not found</p>
    <div>
      <el-button class="d2-mt" @click="$router.replace({ path: '/' })">
        返回首页
      </el-button>
    </div>
  </div>
</template>
<script>
import util from '@/libs/util'
export default {
  created () {
    if (!this.isLogined()) {
      this.goLogin()
    }
  },
  methods: {
    isLogined () {
      const uuid = util.cookies.get('uuid')
      return !!uuid
    },
    goLogin () {
      const path = this.$route.path
      this.$router.replace({ path: '/login?redirect=' + path })
    }
  }
}
</script>
<style lang="scss" scoped>
.page {
  background: #303133;
  background-blend-mode: multiply,multiply;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .page_title {
    font-size: 20px;
    color: #FFF;
  }
}
</style>
