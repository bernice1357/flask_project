<template lang="pug">
#patient-info.all
  .header
    el-page-header.back(@back="onBack")
      template(#content)
        span.title 病人 {{$route.query.id}}

    el-button.expand(
      type="primary"
      @click="expandAll($route.query.id)"
    ) 資料篩選
  .content
    LimeBlock.lime(
      :status="$route.query.status"
      :id="$route.query.id"
    )
    basicData.table1(:id="$route.query.id")
    dynamicData.table2(:id="$route.query.id")
    staticData.table3(:id="$route.query.id")

</template>
<script>
import LimeBlock from './components/LimeBlock.vue'
import dynamicData from './components/dynamicData.vue'
import staticData from './components/staticData.vue'
import basicData from './components/basicData.vue'
import router from '@/router'

export default({
  name: "PatientInfo",
  components:{
    LimeBlock,
    dynamicData,
    staticData,
    basicData
  },
  setup() {
    const onBack = ()=>{
      router.push('/all_patients')
    }
    const headerStyle = {background:'#eef1f6',color:'#606266'}

    const expandAll = (id)=>{
      router.push({ path: '/expand', query: { id: id } })
    }

    return {
      onBack,
      expandAll,
      basicData,
      staticData,
      dynamicData,
      headerStyle,
    }
  },
})
</script>
<style scoped>
.all{
  left: 150px;
  width: calc(100vw - 150px);
}
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
.back{
  position: absolute;
  left: 12%;
  width: 25%;
  height: 50px;
}

.table1:hover,.table2:hover,.table3:hover,.lime:hover{
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.title{
  padding-top: 15px;
}

.el-table{
  border-radius: 10px;
  margin-bottom: 20px;
  height: 500px;
  overflow: auto;
} 

.table1,.table2,.table3{
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.content{
  margin-top: 80px;
  margin-bottom: 100px;
  width: 80%;
  position: absolute;
  left: 10%;
}

.expand{
  position: absolute;
  right: 13%;
  top: 25%;
}
</style>