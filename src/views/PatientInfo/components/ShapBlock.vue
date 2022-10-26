<template lang="pug">
#ShapBlock.shap
  h1.align 模型預測結果 
  h2.align 生存率：{{$route.query.status}}%
  img(:src="img")
</template>
<script>
import img from '@as/pic/lime.png'
import { onMounted } from 'vue'
export default({
  name: "ShapBlock",
  props:{
    status: Number,
    id: String
  },
  setup(props) {
    const shapColor = ()=>{
      document.getElementById("ShapBlock").style = 
        props.status >= 50 ? "background-color: #85ce61" : "background-color: #f89898"
    }
    onMounted(()=>{
      shapColor()
    })
    return {
      img,
      shapColor
    }
  },
})
</script>
<style scoped>
.shap{
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}

.align{
  margin: 15px;
  display: flex;
  justify-content: center; 
}

img {
  width: 80%;
  margin-left: 10%;
}
</style>