<template lang="pug">
el-table(
  border
  :data="filterStaticData"
  :header-cell-style="headerStyle"
)
  el-table-column(
    prop="name"
    label="靜態資料欄位" 
    align="center"
  )
  el-table-column(
    prop="data"
    label="趨勢圖" 
    align="center"
  )
    template(#header)
      el-input(
        v-model="staticSearch" 
        clearable size="small" 
        placeholder="搜尋靜態欄位"
      )
</template>
<script>
import { computed, ref } from 'vue'
// import api from '@api/http.js'
export default({
  name: "staticData",
  props:{
    id: String
  },
  setup() {
    // const data = api.getData()
    const staticData = [
      {data:"0.08", name:"troponin-I"},
      {data:"0.3", name:"direct bilirubin"},
      {data:"2.45", name:"lactate"},
      {data:"0.5", name:"fibrinogen"},
      {data:"1.1", name:"CPK-MB INDEX"},
    ]

    const staticSearch = ref('')
    const filterStaticData = computed(() =>//動態
      staticData.filter(
        (data) =>
          !staticSearch.value ||
          data.name.toLowerCase().includes(staticSearch.value.toLowerCase())
      )
    )

    return {
      staticData,
      filterStaticData
    }
  }
})
</script>
