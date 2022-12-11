<template lang="pug">
#App
  router-link(to="/")
  router-view 
</template>
<script>
export default({
  name: "App"
})
</script>
<style>
body{
  background-color: #cedae5;
}
#App {
  /* position: absolute;
  top: 0;
  left: 0; */
  height: 100vh;
  font-family: Serif, "宋體";
  /* background-color: rgb(54, 54, 82); */
}
</style>