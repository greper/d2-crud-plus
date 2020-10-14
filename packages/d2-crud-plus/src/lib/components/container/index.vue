<template>
  <div class="crud-container">
    <div class="body-wrapper">
      <div class="crud-c-header"><slot name="header"></slot></div>
      <div class="crud-c-body"> <slot></slot></div>
      <div class="crud-c-footer"> <slot name="footer"></slot></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'crud-container'
}
</script>

<style lang="scss">
.crud-container{
  height:100%;
  background: #fff;
  display: flex;
  position: relative;

  .body-wrapper{
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .crud-c-header{
    padding:15px;
    border-bottom: 1px solid #cfd7e5;
    background: #FFF;
  }
  .crud-c-body{
    padding:15px;
    flex-grow: 1;
    height: 100%;
    overflow: auto;
    position: relative;
  }

  &.page-compact{

    .crud-c-body{
      padding:0px;
      .d2-crud{
        .d2-crud-header{
          padding:10px;
        }
      }
    }
  }
}
.d2-theme-container-main-body{
  .crud-container{
    margin-right:20px;
    border: 1px solid #cfd7e5;
    border-top: none;
    border-bottom: none;
  }
}
</style>
