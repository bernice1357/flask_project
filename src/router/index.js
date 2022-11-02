import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@v/Home/HomeView.vue')
  },{
    path: '/patient_info',
    name: 'PatientInfo',
    component: () => import('@v/PatientInfo/PatientInfo.vue')
  },{
    path: '/expand',
    name: 'Expand',
    component: () => import('@v/Expand/ExpandView.vue')
  },{
    path: '/navPage',
    name: 'NavPage',
    component: () => import('@v/navPage/navPage.vue'),
    children:[
      {
        path: '/all_patients',
        name: 'AllPatients',
        component: () => import('@v/AllPatients/AllPatients.vue')
      },{
        path: '/summary',
        name: 'Summary',
        component: () => import('@v/SummaryPage/SummaryPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router