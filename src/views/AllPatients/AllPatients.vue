<template lang="pug">
#all-patients
  .header
    h1 所有病患資訊
  el-table.table(
    border
    :data="filterTableData" 
  )
    el-table-column(
      align="center"
      prop="tag"
      label="病患生存機率"
      sortable
      :sort-by="['tag']"
      :filters="[{ text: 'Danger', value: 'danger' },{ text: 'Safe', value: 'safe'}]"
      :filter-method="filterStatus"
      filter-placement="bottom-end"
    )
      template(#default="scope")
        el-tag(
          :type="scope.row.tag > 50 ? 'success' : 'danger'"
          disable-transitions
        ) {{ scope.row.tag }}%

    el-table-column(
      prop="id" 
      label="病患編號" 
      align="center"
    )
    el-table-column(
      prop="gender"
      label="性別"
      :filters="[{ text: '男性', value: 'Male' },{ text: '女性', value: 'Female' }]"
      :filter-method="filterGender"
      filter-placement="bottom-end"
      align="center"
    )
    el-table-column(
      width="180"
      align="center"
    )
      template(#header)
        el-input(v-model="search" size="small" placeholder="搜尋病患編號")
      template(#default="scope")
        el-button(@click="redirect(scope.row)" type="primary" :icon="Document" link) 病患詳細資料
</template>
<script>
import router from '@router'
import { Document } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
export default({
  name: "AllPatients",
  setup() {
    const tableData = [
      {tag: '12', id: '002-10148', gender: "Female"},
      {tag: '51', id: '002-10328', gender: "Male"},
      {tag: '27', id: '002-10444', gender: "Female"},
      {tag: '54', id: '002-10665', gender: "Male"},
      {tag: '18', id: '002-10708', gender: "Male"},
      {tag: '90', id: '002-10724', gender: "Male"},
      {tag: '72', id: '002-10767', gender: "Male"},
      {tag: '18', id: '002-10777', gender: "Male"},
      {tag: '34', id: '002-10798', gender: "Male"},
      {tag: '16', id: '002-10891', gender: "Female"},
      {tag: '90', id: '002-11232', gender: "Male"},
      {tag: '90', id: '002-11232', gender: "Male"},
      {tag: '90', id: '002-11232', gender: "Male"},
      {tag: '90', id: '002-11232', gender: "Male"},
      {tag: '90', id: '002-11232', gender: "Male"},
      {tag: '90', id: '002-11232', gender: "Male"},
      {tag: '90', id: '002-11232', gender: "Male"},
    ]

    const redirect = (row)=>{
      router.push({ path: '/patient_info', query: { id: row.id, status: row.tag } })
    }

    const search = ref('')
    const filterTableData = computed(() =>
      tableData.filter(
        (data) =>
          !search.value ||
          data.id.toLowerCase().includes(search.value.toLowerCase())
      )
    )
    const filterGender = (value, row) => {
      return row.gender === value
    }
    const filterStatus = (value, row)=>{
      return value === 'danger' ? row.tag < 50 : row.tag >= 50
    }

    return {
      filterTableData,
      search,
      filterStatus,
      redirect,
      Document,
      filterGender,
    }
  },
})
</script>
<style scoped>
.header{
  position: fixed;
  top: 0;
  left: 150px;
  width: calc(100vw - 165px);
  height: 60px;
  z-index: 4;
  background-image: radial-gradient(transparent 1px,#ffffff 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
  -webkit-backdrop-filter: saturate(50%) blur(4px);
  border-bottom:1px rgb(222, 222, 230) solid;
}
.table{
  position: absolute;
  left: 15%;
  top: 15%;
  width: 70%;
  height: 75%;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
h1{
  margin: 0px;
  position: absolute;
  width:  100%;
  text-align: center;
  left: 0%;
  top: 17%;
}
</style>