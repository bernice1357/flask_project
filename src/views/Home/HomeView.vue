<template lang="pug">
#HomePage
  img(:src="logo")
  el-button(type="primary" :icon="Position" @click="direct") 進入系統
</template>
<script>
import router from '@/router'
import { Position, Delete } from '@element-plus/icons-vue'
import logo from '@as/pic/logo/square.png'
export default({
  name: "HomePage",
  setup() {
    const direct = ()=>{
      router.push({ path: '/navPage'})
    }
    return {
      logo,
      direct,
      Position,
      Delete
    }
  },
})
</script>
<style scoped>
img{
  width: 50%;
  position: fixed;
  top: 10%;
  left: 25%;
  /* display:block; 
  margin:auto; */
}
.el-button{
  width: 44%;
  height: 10%;
  position: fixed;
  top: 60%;
  left: 28%;
}
</style>