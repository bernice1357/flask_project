import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'https://some-domain.com/api/',
//   timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'}
// });

export default{
  getData(){
    axios(
    {
      method: 'post',
      headers:{
        'Content-Type': 'application/json',
      },
      url: 'https://19bf-211-20-131-166.ngrok.io/patient/respiratoryCharting/',
      data: {
        "id": 145867,
        "field_name": "FiO2"
      },
    })
      .then((res)=>{
        console.log("res: "+res)
        console.log("success: "+res.patientunitstayid)
        // if(res.success){
        //   console.log("true")
        // }else{
        //   console.log("false")
        // }
        return 999
      })
      .catch((err)=>{
        console.log("error: "+err)
      })
    
  }
}

// export default http