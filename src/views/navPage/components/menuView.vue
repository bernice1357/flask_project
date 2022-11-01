<template lang="pug">
#menu-view
  el-menu.main(
    mode="horizontal"
    @select="whichPath"
    active-text-color="#a0cfff"
    text-color="#ffffff"
  )
    el-menu-item.page(index="summary") 模型綜合分析
    el-menu-item.page(index="all_patients") 所有病患資訊
</template>
<script>

export default({
  name: "menuView",
  emits:['currentPath'],
  setup(props, { emit }) {
    const whichPath = (path)=> {//select的參數
      emit('currentPath', path)
    }
    return {
      whichPath
    }
  },
})
</script>
<style scoped>
.main{
  background-color: #3B597D;
  width: 25vw;
  /* height: 30vh;
  margin-left: 10px;
  margin-top: 10px;
  border-radius: 10px; */
}

/* .page{
  font-size: var(--el-font-size-extra-large);
} */
</style>