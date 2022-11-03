<template lang="pug">
#navPage
  .navmenu
    router-link(to="/")
      img(:src="logo")
    menuView.menu(@current-path="directPath")
  .main
    router-view
</template>
<script>

import {ref} from 'vue'
import AllPatients from '@v/AllPatients/AllPatients.vue'
import SummaryPage from '@v/SummaryPage/SummaryPage.vue'
import menuView from '@v/navPage/components/menuView.vue'

import logo from '@as/pic/logo/line.png'
import router from '@router'
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
      router.push({path: `/${path}`})
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
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  width: 100vw;
  height: 59px;
  background-image: radial-gradient(transparent 1px,#ffffff 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
  -webkit-backdrop-filter: saturate(50%) blur(4px);
  border-bottom:1px rgb(222, 222, 230) solid;
}
img{
  position: absolute;
  top:0;
  left: 1%;
  width: 240px;
}
.menu{
  position: absolute;
  top:0;
  right:0;
}
.main{
  position: absolute;
  top: 8%;
  left: 5%;
  height: 80vh;
  width: 90vw;
}
</style>