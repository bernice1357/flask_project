<template lang="pug">
el-table(
  border
  :data="basicData"
  :header-cell-style="headerStyle"
  size="large"
  height=400
)
  el-table-column(
    prop="name"
    label="基本資料欄位"
    align="center"
  )
  el-table-column(
    prop="value"
    label="數值"
    align="center"
  )
</template>
<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
export default {
  name: 'basicData',
  props: {
    id: String,
  },
  setup(props) {
    const headerStyle = { background: '#395679', color: '#ffffff' }

    const basicData = ref([
      { value: '', name: '' },
      { value: '', name: '' },
      { value: '', name: '' },
      { value: '', name: '' },
      { value: '', name: '' },
      { value: '', name: '' },
      { value: '', name: '' },
      { value: '', name: '' },
    ])
    const apiData = ref([])

    const getData = async () => {
      apiData.value = await axios.post(' https://vae.fly.dev/patient/', {
        id: props.id,
      })
      apiData.value = apiData.value.data.data

      var index = 0
      for (var i in apiData.value) {
        basicData.value[index].name = i
        basicData.value[index].value = apiData.value[i]
        index++
      }
    }

    // })
    // const basicData = [
    //   {data:"Female", name:"Gender"},
    //   {data:"69", name:"Age"},
    //   {data:"57.1", name:"Admission Weight"},
    //   {data:"53.8", name:"Discharge Weight"},
    //   {data:"160", name:"Admission Height"},
    //   {data:"54", name:"Apache Score"},
    // ]

    onMounted(() => {
      getData()
    })

    return {
      basicData,
      headerStyle,
    }
  },
}
</script>
<style scoped>
.el-table--large {
  font-size: 20px;
}
</style>
