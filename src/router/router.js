import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import PanelAdmin from '@/views/Auth/Admin.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            auth: false
        }
    },
    {         
        path: '/panel-admin',
        name: 'PanelAdmin',
        component: PanelAdmin,
        meta: {
            auth: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token")
    if (to.matched.some(record => record.meta.auth)){
        if(!token){
          next('/')
        }
    }
    next()
  })


export default router