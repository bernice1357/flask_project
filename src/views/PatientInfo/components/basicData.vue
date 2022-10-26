<template lang="pug">
el-table(
  border
  :data="basicData"
  :header-cell-style="headerStyle"
)
  el-table-column(
    v-for="item in basicColumn"
    :prop="item.prop"
    :label="item.label" 
    align="center"
  )
</template>
<script>
export default({
  name: "dynamicData",
  props:{
    id: String
  },
  setup() {
    const basicColumn = [
      {prop:"name", label:"基本資料欄位"},
      {prop:"data", label:"數值"},
    ]

    // const data = api.getData()
    const basicData = [
      {data:"Female", name:"Gender"},
      {data:"69", name:"Age"},
      {data:"57.1", name:"Admission Weight"},
      {data:"53.8", name:"Discharge Weight"},
      {data:"160", name:"Admission Height"},
      {data:"54", name:"Apache Score"},
    ]

    return {
      basicColumn,
      basicData
    }
  }
})
</script>
