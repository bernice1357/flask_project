<template lang="pug">
#all-patients
  .header
    el-breadcrumb(:separator-icon="ArrowRight")
      el-breadcrumb-item(:to="{ path: '/home' }") 首頁
      el-breadcrumb-item 所有病患資訊
  el-table.table(
    border
    :data="tableData"
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
      prop="patientunitstayid" 
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
      prop="age"
      label="年齡"
      sortable
      :sort-by="['age']"
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
import { computed, ref, onMounted } from 'vue'
// import axios from 'axios';
export default({
  name: "AllPatients",
  setup() {
    // const tableData = ref([])
    // const getData = async()=>{
    //   tableData.value = await axios.post(
    //   'https://19bf-211-20-131-166.ngrok.io/patient/',
    //   {"id": 145867})//TODO:之後要改props.id
    //   tableData.value = tableData.value.data.data
    // }
    const tableData = [
      {tag: '12', patientunitstayid: 145867, gender: "Female", age: 54}
    ]
    const redirect = (row)=>{
      router.push({ path: '/patient_info', query: { id: row.patientunitstayid, status: row.tag } })
    }

    const search = ref('')
    const filterTableData = computed(() =>
      tableData.value.filter(
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

    onMounted(()=>{
      // getData()
    })

    return {
      filterTableData,
      search,
      filterStatus,
      redirect,
      Document,
      filterGender,
      tableData
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