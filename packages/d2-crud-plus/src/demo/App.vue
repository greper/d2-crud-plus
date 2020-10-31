<template>
  <div id="app"><test></test></div>
</template>

<script>
import Test from './test/index'
export default {
  name: 'app',
  components: {
    Test
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding:0px;
}

html,body{
  height:100%;
  margin:0px;
}
#app{
  height:100%
}
</style>
