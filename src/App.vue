<template lang="pug">
#App
  .navmenu
    menuView(@current-path="directPath")
  .main
    router-link(to="/summary")
    router-view
</template>
<script>
import allPatients from '@v/AllPatients/AllPatients.vue'
import menuView from '@c/menuView.vue'
import router from '@router'
export default({
  name: "App",
  components:{
    menuView,
    allPatients
  },
  setup() {
    const directPath = (path) => {
      router.push(`/${path}`)
    }
    return {
      directPath
    }
  },
})
</script>
<style scoped>
.navmenu{
  position: fixed;
  top:0;
  left:0;
  z-index: 15;
  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px; */
}
.main{
  position: absolute;
  top: 0;
  width: calc(100vw - 165px);
  left: 150px;
  height: 100vh;
}
</style>