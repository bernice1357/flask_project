<template lang="pug">
#LimeBlock.lime
  h1.align Lime 模型預測生存機率：{{$route.query.status}}%
  h3.align 針對單一病患資料做影響結果之前五重要特徵排序
  img(v-if="imgID" :src="getImg(imgID)")
</template>
<script>
import { ref, onMounted } from 'vue'
const getImg = (path) => require(`@as/pic/lime/${path}.png`)

export default {
  name: 'LimeBlock',
  props: {
    status: Number,
    id: String,
  },
  setup(props) {
    const imgID = ref('')
    const limeColor = () => {
      //TODO:這邊要改回來
      imgID.value = props.id
      document.getElementById('LimeBlock').style =//'background-color: #85ce61'
        props.status < 50
          ? 'background-color: #f89898'
          : 'background-color: #85ce61'
    }
    onMounted(() => {
      limeColor()
    })
    return {
      getImg,
      imgID
    }
  },
}
</script>
<style scoped>
.lime {
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}

.align {
  margin: 15px;
  display: flex;
  justify-content: center;
}

img {
  width: 80%;
  margin-left: 10%;
}
</style>
