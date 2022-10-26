<template lang="pug">
#home-page.main
  h1 home page
  el-table.table(
    :data="filterTableData" 
  )
    el-table-column(
    )
      
</template>
<script>
import router from '@router'
export default({
  name: "HomePage",
  setup() {
    const columnSetting = [
      {prop: "id", label: "病人編號"},
    ]
    const tableData = [
      {status: {type:'Danger', data: '12.34'}, id: '1'}
    ]
    const redirect = (row)=>{
      router.push({ path: '/patientInfo', query: { id: row.id } })
    }

    return {
      columnSetting,
      tableData,
      redirect
    }
  },
})
</script>
<style scoped>
.table{
  position: absolute;
  left: 10%;
}

/* .main{
  background-color:aqua;
} */
</style>