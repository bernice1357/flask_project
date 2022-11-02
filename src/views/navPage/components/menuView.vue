<template lang="pug">
#menu-view
  el-menu.main(
    mode="horizontal"
    @select="whichPath"
    active-text-color="#395679"
    text-color="#888888"
  )
    el-menu-item.page(index="summary") 模型綜合分析
    el-menu-item.page(index="all_patients") 所有病患資訊
</template>
<script>

export default({
  name: "menuView",
  emits:['currentPath'],
  setup(props, { emit }) {
    const whichPath = (path)=> {//path: select的參數
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
  /* background-color: #395679; */
  width: 30vw;
  right: 0;
  /* left: 70%; */
}
</style>