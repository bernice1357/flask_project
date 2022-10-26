<template lang="pug">
#ExpandPage
  .header
    h1 篩選欲顯示之特徵
    el-page-header.back(@back="onBack($route.query.id, $route.query.status)")
  .search
    el-form
      el-form-item(size="large")
        el-col.span(:span="2")
          span &ensp;靜態欄位
        el-col(:span="8")
          el-popover.input1(placement="bottom" :width="200" trigger="click")
            template(#reference)
              el-input(placeholder="靜態欄位" v-model="search" clearable)
            el-checkbox-group.table(v-for="item in filterData" v-model="checkResult")
              el-checkbox(:label="item.name")
        el-col.span(:span="2")
          span 動態欄位
        el-col(:span="8")
          el-popover.input2(placement="bottom" :width="200" trigger="click")
            template(#reference)
              el-input(placeholder="動態欄位" v-model="search" clearable)
            el-checkbox-group.table(v-for="item in filterData" v-model="checkResult")
              el-checkbox(:label="item.name")
    el-button.send(type="primary" @click="submit") 更新
  .result
    el-table.static(
      :data="staticData"
      border
    )
      el-table-column(
        v-for="item in staticColumn"
        :prop="item.prop"
        :label="item.label"
        align="center"
      )

    el-table.dynamic(
      :data="staticData"
      border
      :header-cell-style="headerStyle"
    )
      el-table-column(
        v-for="item in dynamicColumn"
        :prop="item.prop"
        :label="item.label" 
        align="center"
      )

</template>
<script>
import router from '@/router'
import { ref, computed } from 'vue'
export default({
  name: "ExpandPage",
  setup() {
    const checkResult = ref([])//checkbox選擇的結果
    const origin = [//原始資料
      {data:"0.08", name:"troponin-I"},
      {data:"0.3", name:"direct bilirubin"},
      {data:"2.45", name:"lactate"},
      {data:"0.5", name:"fibrinogen"},
      {data:"1.1", name:"CPK-MB INDEX"},
      {data:"66", name:"CPK1"},
      {data:"66", name:"CPK2"},
      {data:"66", name:"CPK3"},
      {data:"66", name:"CPK4"},
      {data:"66", name:"CPK5"},
    ]
    const staticColumn = [//表格欄位
      {prop:"name", label:"靜態資料欄位"},
      {prop:"data", label:"數值"},
    ]
    const dynamicColumn = [//表格欄位
      {prop:"name", label:"動態資料欄位"},
      {prop:"data", label:"數值"},
    ]
    const staticData = ref([])
    const dynamicData = ref([])
    const search = ref('')//關鍵字
    const filterData = computed(() =>//關鍵字篩選出來的欄位
      origin.filter(
        (data) =>
          !search.value ||
          data.name.toLowerCase().includes(search.value.toLowerCase())
      )
    )
    const submit = ()=>{
      staticData.value=[]
      for(let i=0; i<checkResult.value.length; i++){
        staticData.value.push(origin.find(({ name }) => name === checkResult.value[i]))
      }
    }
    const onBack = (id, status)=>{
      router.push({ path: '/patient_info', query: { id: id, status: status } })
    }

    return {
      filterData,
      staticData,
      dynamicData,
      origin,
      search,
      checkResult,
      staticColumn,
      dynamicColumn,
      submit,
      onBack,
    }
  },
})
</script>
<style scoped>

.send{
  position: absolute;
  right: 2%;
  top: 0%;
  width: 10%;
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
}
.dynamic{
  position: absolute;
  width: 45%;
  right: 2%;
}

.static{
  position: absolute;
  width: 45%;
  left: 2%;
}

.search{
  margin-top: 100px;
  width: 76%;
  height: 50px;
  position: absolute;
  top: 0%;
  left: 12%;
  border:5px black solid;;
}
</style>