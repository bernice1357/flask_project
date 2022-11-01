import axios from 'axios';
import { ElMessage } from 'element-plus'
const baseURL = 'https://19bf-211-20-131-166.ngrok.io'

export default{
  getData(id, field_name){
    axios(
    {
      method: 'post',
      headers:{
        'Content-Type': 'application/json'
      },
      url: baseURL + '/patient/respiratoryCharting/',
      data: {
        "id": id,
        "field_name": field_name
      },
    })
    .then((res)=>{
      // console.log(res.data.data)
      return res.data
    })
    .catch((err)=>{
      ElMessage({
        message: err.response.data.detail,
        duration: 5000,
        type: 'error',
      })
    })
  },
  patient(id){
    axios(
    {
      method: 'post',
      headers:{
        'Content-Type': 'application/json',
      },
      url: baseURL + '/patient/',
      data: {
        "id": id
      },
    })
    .then((res)=>{
      // console.log(res.data.data)
      return res.data.data
    })
    .catch((err)=>{
      ElMessage({
        message: err.response.data.detail,
        duration: 5000,
        type: 'error',
      })
    })
  },
  static(){
    axios.post(
      'https://19bf-211-20-131-166.ngrok.io/patient/lab/static/',
      {"id": 145867})
    console.log(1)
    // return res.data
    // .then((res)=>{
    //   console.log(1)
    //   // console.log(res.data)
    //   return res.data
    // })
    // .catch((err)=>{
    //   ElMessage({
    //     message: err.response.data.detail,
    //     duration: 5000,
    //     type: 'error',
    //   })
    // })
  }
}

// export default http