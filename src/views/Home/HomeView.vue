<template lang="pug">
#HomePage.main
  .triangle
  span  111 年資訊系畢業專題
  p.sys 呼吸器<br>相關事件<br>預測系統
  //- p.name1 專題名稱：
  //- p.name2 具可解釋性之呼吸器相關事件患者預測
  img(:src="logo")
  el-button.btn(
    color="#fff699" 
    type="primary" 
    :icon="Right" 
    size="large" 
    @click="direct"
  ) 進入系統
</template>
<script>
import router from '@/router'
import { Right, Position, Delete } from '@element-plus/icons-vue'
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
      Delete,
      Right
    }
  },
})
</script>
<style scoped>
body {
  box-sizing: border-box;
  background-color: #27323A;
  text-align: center;
}

button {
  padding: 15px 20px;
  border-radius: 10px;
  border: 2px solid;
  font: 16px 'Open Sans', sans-serif;
  text-transform: uppercase;
  background: none;
  outline: none;
  cursor: pointer;
  -webkit-transition: all .5s;
  transition: all .3s;
}

/* btn-1 */
.btn {
  color: #27323A;
  border-color: #27323A;
  background: -webkit-linear-gradient(left, #27323A, #27323A) no-repeat;
  background: linear-gradient(to right, #27323A, #27323A) no-repeat;
  background-size: 0% 100%;
}
.btn:hover {
  background-size: 100% 100%;
  color: #fff699;
}
.el-button{
  /* color: #ffffff; */
  font-family: serif;
}
.triangle{
  width: 10px;
  height: 60vh;
  background-color: #ffffff;
  position: fixed;
  top: 20%;
  left: 15%;
  z-index: 100;
}
.main{
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100vw;
  height: 100vh;
  background-color: #8da3b7;
}
span{
  /* font-family: Serif; */
  font-size: 25px;
  color: #ffffff;
  position: fixed;
  top: 20%;
  left: 17%;
}
.sys{
  /* font-family: Serif; */
  font-size: 100px;
  color: #ffffff;
  position: fixed;
  top: 15%;
  left: 17%;
}
.name1{
  font-size: 25px;
  color: #ffffff;
  position: fixed;
  top: 52%;
  right: 15%;
}
.name2{
  font-size: 25px;
  color: #ffffff;
  position: fixed;
  top: 57%;
  right: 15%;
}
img{
  width: 20%;
  position: fixed;
  top: 1%;
  right: 40%;
}
.el-button{
  width: 15%;
  height: 8%;
  position: fixed;
  top: 70%;
  right: 15%;
}

.el-button--large {
  font-size: 22px;
}
</style>