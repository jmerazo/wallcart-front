import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import PanelAdmin from '@/views/Auth/Admin.vue';
import PaymentsList from '@/views/Payments/Payments.vue';
import PaymentsPanel from '@/views/Payments/Panel.vue'
import PaymentsReports from '@/views/Payments/Reports.vue'
import PaymentsUpload from '@/views/Payments/Upload.vue'

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
        path: '/panel/admin',
        name: 'PanelAdmin',
        component: PanelAdmin,
        meta: {
            auth: false
        }
    },
    {         
        path: '/payments/all',
        name: 'PaymentsList',
        component: PaymentsList,
        meta: {
            auth: false
        }
    },
    {         
        path: '/payments/panel',
        name: 'PaymentsPanel',
        component: PaymentsPanel,
        meta: {
            auth: false
        }
    },
    {         
        path: '/payments/reports',
        name: 'PaymentsReports',
        component: PaymentsReports,
        meta: {
            auth: false
        }
    },
    {         
        path: '/payments/upload',
        name: 'PaymentsUpload',
        component: PaymentsUpload,
        meta: {
            auth: false
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