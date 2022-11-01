<template lang="pug">
#navPage
  .navmenu
    //- router-link(to="/home")
    //-   img(:src="logo")
    menuView.menu(@current-path="directPath" :ellipsis="false")
    
  AllPatients.main(v-if="all")
  SummaryPage.main(v-if="summary")
</template>
<script>

import {ref} from 'vue'
import AllPatients from '@v/AllPatients/AllPatients.vue'
import SummaryPage from '@v/SummaryPage/SummaryPage.vue'
import menuView from '@v/navPage/components/menuView.vue'

import logo from '@as/pic/logo/line.png'
// import router from '@router'
export default({
  name: "navPage",
  components:{
    menuView,
    AllPatients,
    SummaryPage
  },
  setup() {
    const summary = ref(false)
    const all = ref(false)

    const directPath = (path) => {
      if(path==='summary'){
        summary.value=true
      }else{
        all.value=true
      }
      console.log('s',summary.value)
      console.log('a',all.value)
    }
    return {
      directPath,
      summary,
      all,
      logo,
    }
  },
})
</script>
<style scoped>
.navmenu{
  position: fixed;
  top:0;
  right:0;
  z-index: 15;
  border-bottom:1px #bcb5b5 solid;
  width: 100vw;
  height: 59px;

  /* background-image: radial-gradient(transparent 1px,#ffffff 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
  -webkit-backdrop-filter: saturate(50%) blur(4px);
  border-bottom:1px rgb(222, 222, 230) solid; */
}
img{
  position: absolute;
  top:0;
  left:0;
  width: 240px;
}
.menu{
  position: absolute;
  top:0;
  right:0;
}
.main{
  position: absolute;
  top: 20%;
  left: 0;
  height: 80vh;
  z-index: 10000;
}
</style>