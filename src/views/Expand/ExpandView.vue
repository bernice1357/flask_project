<template lang="pug">
#ExpandPage
  .header
    h1 篩選特徵欄位
    el-page-header.back(@back="onBack($route.query.id, $route.query.status)")
  .search
    el-form
      el-form-item(size="large")
        el-col.span(:span="2")
          span &ensp;靜態欄位
        el-col(:span="8")
          el-popover(
            placement="bottom" 
            :width="200" 
            trigger="click"
          )
            template(#reference)
              el-input(
                placeholder="靜態欄位" 
                v-model="search" 
                clearable
              )
            .checkbox
              el-checkbox-group(
                v-for="item in filterStatic" 
                v-model="staticResult"
              )
                el-checkbox(:label="item.name")
        el-col.span(:span="2")
          span 動態欄位
        el-col(:span="8")
          el-popover(
            placement="bottom" 
            :width="200" 
            trigger="click"
          )
            template(#reference)
              el-input(
                placeholder="動態欄位" 
                v-model="search" 
                clearable
              )
            .checkbox
              el-checkbox-group.table(
                v-for="item in filterDynamic" 
                v-model="dynamicResult"
              )
                el-checkbox(:label="item.name")
    el-button.send(type="primary" @click="submit") 更新
  .result
    el-table.static(
      :data="staticData"
      border
      :header-cell-style="headerStyle"
    )
      el-table-column(
        prop="name"
        label="靜態資料欄位"
        align="center"
      )
      el-table-column(
        prop="offset"
        label="分鐘"
        align="center"
      )
      el-table-column(
        prop="value"
        label="數值"
        align="center"
      )
    el-table.dynamic(
      :data="dynamicData"
      border
      :header-cell-style="headerStyle"
    )
      el-table-column(
        prop="name"
        label="動態資料欄位"
        align="center"
      )
      el-table-column(
        prop="offset"
        label="分鐘"
        align="center"
      )
      el-table-column(
        prop="value"
        label="數值"
        align="center"
      )
</template>
<script>
import router from '@/router'
import { ref, computed, onMounted } from 'vue'
import axios from 'axios';
export default({
  name: "ExpandPage",
  setup() {
    const headerStyle = {background:'#eef1f6',color:'#606266'}
    const staticResult = ref([])//checkbox選擇的結果
    const dynamicResult = ref([])//checkbox選擇的結果

    const staticColumn = [//表格欄位
      {prop:"name", label:"靜態資料欄位"},
      {prop:"data", label:"數值"},
    ]
    const staticOrigin = ref([])
    const getStatic = async()=>{
      staticOrigin.value = await axios.post(
      'https://19bf-211-20-131-166.ngrok.io/patient/lab/static/',
      {"id": 145867})//TODO:之後要改props.id
      staticOrigin.value = staticOrigin.value.data.data
    }

    const dynamicColumn = [//表格欄位
      {prop:"name", label:"動態資料欄位"},
      {prop:"data", label:"數值"},
    ]

    const dynamicOrigin = ref([
      {name:'FiO2'},
      {name:'PEEP'},
      {name:'Plateau Pressure'},
      {name:'systemicMean'},
      {name:'heartRate'},
      {name:'observationOffset'},
      {name:'systemicDiastolic'},
      {name:'respiration'},
      {name:'systemicSystolic'},
      {name:'dialysisTotal'},
      {name:'intakeOutputOffset'},
      {name:'intakeTotal'},
      {name:'netTotal'},
      {name:'outputTotal'}
    ])
    const respName = ['FiO2','PEEP','Plateau Pressure']
    const vitalName = ['systemicMean','heartRate','observationOffset','systemicDiastolic','respiration','systemicSystolic']
    const ioName = ['dialysisTotal','intakeOutputOffset','intakeTotal','netTotal','outputTotal']

    const getDynamic = async()=>{
      for(var i in dynamicResult.value){
        var res = []
        if(respName.indexOf(dynamicResult.value[i])+1){
          res = await axios.post(
          'https://19bf-211-20-131-166.ngrok.io/patient/respiratoryCharting/',
          {"id": 145867, "field_name":dynamicResult.value[i], "hour":false})

        }else if(vitalName.indexOf(dynamicResult.value[i])+1){
          res = await axios.post(
          'https://19bf-211-20-131-166.ngrok.io/patient/vitalPeriodic/',
          {"id": 145867, "field_name":dynamicResult.value[i], "hour":false})

        }else if(ioName.indexOf(dynamicResult.value[i])+1){
          res = await axios.post(
          'https://19bf-211-20-131-166.ngrok.io/patient/intakeOutput/',
          {"id": 145867, "field_name":dynamicResult.value[i], "hour":false})
        }
        res = res.data.data
        for(var j in res){
          res[j]['name']=dynamicResult.value[i]
        }
        dynamicData.value = dynamicData.value.concat(res);
      }
    }

    const search = ref('')//關鍵字
    const filterStatic = computed(() =>//關鍵字篩選出來的欄位
      staticOrigin.value.filter(
        (data) =>
          !search.value ||
          data.name.toLowerCase().includes(search.value.toLowerCase())
      )
    )
    const filterDynamic = computed(() =>//關鍵字篩選出來的欄位
      dynamicOrigin.value.filter(
        (data) =>
          !search.value ||
          data.name.toLowerCase().includes(search.value.toLowerCase())
      )
    )

    const staticData = ref([])
    const dynamicData = ref([])
    
    const submit = ()=>{
      //靜態
      staticData.value=[]
      for(let i=0; i<staticResult.value.length; i++){
        staticData.value.push(staticOrigin.value.find(({ name }) => name === staticResult.value[i]))
      }

      //動態
      // dynamicData.value=[]
      // for(let i=0; i<checkResult2.value.length; i++){
      //   dynamicData.value.push(dynamicOrigin.value.find(({ name }) => name === checkResult2.value[i]))
      // }
      getDynamic()
    }

    const onBack = (id, status)=>{
      router.push({ path: '/patient_info', query: { id: id, status: status } })
    }

    onMounted(()=>{
      getStatic()
    })

    return {
      filterStatic,
      filterDynamic,
      staticData,
      dynamicData,
      search,
      staticResult,
      dynamicResult,
      staticColumn,
      dynamicColumn,
      submit,
      onBack,
      headerStyle
    }
  },
})
</script>
<style scoped>
.send{
  position: absolute;
  right: 4%;
  top: 26%;
  width: 10%;
}

.checkbox{
  height: 400px;
  overflow: auto;
}

.back{
  position: absolute;
  left: 12%;
  width: 25%;
  height: 50px;
}

.span {
  text-align: center;
}

.header{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 60px;
  z-index: 4;
  background-image: radial-gradient(transparent 1px,#ffffff 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
  -webkit-backdrop-filter: saturate(50%) blur(4px);
  border-bottom:1px rgb(222, 222, 230) solid;
}

h1{
  margin: 0px;
  position: absolute;
  width:  100%;
  text-align: center;
  left: 0%;
  top: 17%;
}

.result{
  position: absolute;
  width: 80%;
  top: 30%;
  left: 10%;
  padding-bottom: 10px;
}
.dynamic{
  height: 500px;
  overflow: auto;
  position: absolute;
  width: 48%;
  right: 1%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.static{
  height: 500px;
  position: absolute;
  width: 48%;
  left: 0%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.dynamic:hover,.static:hover{
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.search{
  margin-top: 100px;
  width: 76%;
  height: 50px;
  position: absolute;
  top: 0%;
  left: 10%;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  /* border-bottom:1px rgb(25, 23, 23) solid;; */
}
</style>