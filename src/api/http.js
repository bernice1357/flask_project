import axios from 'axios';

// const api = axios.create({
//   baseURL: 'https://19bf-211-20-131-166.ngrok.io/',
//   headers: {
//       "Content-Type": "application/json",
//       accept: "application/json",
//   },
// });
// //patient/respiratoryCharting/

// async function GET(url, params) {
//   try {
//       const response = await api.get(url, params);
//       return response.data;
//   }
//   catch (error) {
//       return Promise.reject(error);
//   }
// }
// async function POST(url, params) {
//   try {
//       const response = await api.post(url, params);
//       return response;
//   }
//   catch (error) {
//       return Promise.reject(error);
//   }
// }
// async function PUT(url, params) {
//   try {
//       const response = await api.put(url, params);
//       return response.data;
//   }
//   catch (error) {
//       return Promise.reject(error);
//   }
// }
// export { GET, POST, PUT };

export default{
  getData(id){
    axios(
    {
      method: 'post',
      headers:{
        'Content-Type': 'application/json',
      },
      url: 'https://19bf-211-20-131-166.ngrok.io/patient/respiratoryCharting/',
      data: {
        "id": id,
        "field_name": "FiO2"
      },
    })
      .then((res)=>{
        console.log("res: "+JSON.stringify(res.data.data))
        return JSON.stringify(res.data.data)
      })
      .catch((err)=>{
        console.log("error: "+err)
      })
  }
}