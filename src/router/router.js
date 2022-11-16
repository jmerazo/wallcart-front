import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import PanelAdmin from '@/views/Auth/Admin.vue';
import PaymentsList from '@/views/Payments/Payments.vue';
import PaymentsPanel from '@/views/Payments/Panel.vue'
import PaymentsReports from '@/views/Payments/Reports.vue'
import PaymentsUpload from '@/views/Payments/Upload.vue'
import ReportAges from '@/views/Payments/Ages.vue'
import PortfolioReports from '@/views/Portfolio/Reports.vue'
import UploadPayments from '@/views/Portfolio/UploadPayments.vue'
import UploadBeads from '@/views/Portfolio/UploadBeads.vue'
import ConsolidatedPortfolio from '@/views/Portfolio/Consolidated.vue'
import ValidityReport from '@/views/Payments/Validity.vue'
import Dashboard from '@/views/Dashboard.vue'

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
            auth: true
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
            auth: true
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
            auth: true
        }
    },
    {         
        path: '/report/ages',
        name: 'ReportAges',
        component: ReportAges,
        meta: {
            auth: false
        }
    },
    {         
        path: '/portfolio/reports',
        name: 'PortfolioReports',
        component: PortfolioReports,
        meta: {
            auth: false
        }
    },
    {         
        path: '/portfolio/upload/payments',
        name: 'UploadPayments',
        component: UploadPayments,
        meta: {
            auth: true
        }
    },
    {         
        path: '/portfolio/upload/beads',
        name: 'UploadBeads',
        component: UploadBeads,
        meta: {
            auth: true
        }
    },
    {         
        path: '/portfolio/consolidated',
        name: 'ConsolidatedPortfolio',
        component: ConsolidatedPortfolio,
        meta: {
            auth: false
        }
    },
    {         
        path: '/validity/report',
        name: 'ValidityReport',
        component: ValidityReport,
        meta: {
            auth: false
        }
    },
    {         
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
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