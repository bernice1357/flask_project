<template lang="pug">
#menu-view
  el-menu.main(
    mode="horizontal"
    @select="whichPath"
    active-text-color="#395679"
    text-color="#888888"
    :default-active="activePath"
  )
    el-menu-item.page(index="summary") 模型綜合分析
    el-menu-item.page(index="all_patients") 所有病患資訊
</template>
<script>
import { ref, onMounted } from 'vue'
export default({
  name: "menuView",
  emits:['currentPath'],
  setup(props, { emit }) {
    const activePath = ref('')
    const whichPath = (path)=> {//path: select的參數
      activePath.value = path
      emit('currentPath', path)
    }

    onMounted(()=>{
      activePath.value = 'all_patients'
      whichPath('all_patients')
    })
    return {
      whichPath,
      activePath
    }
  },
})
</script>
<style scoped>
.main{
  width: 30vw;
  right: 0;
}
</style>