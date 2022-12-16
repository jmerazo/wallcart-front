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
import Business from '@/views/Business/Business.vue'
import BusinessAll from '@/views/Business/ListAll.vue'
import BusinessUpdate from '@/views/Business/Update.vue'
import Contracs from '@/views/Contracs/Contracs.vue'
import ContracsUpdate from '@/views/Contracs/Update.vue'
import ContracsAll from '@/views/Contracs/ListAll.vue'
import ReportAgesNew from '@/views/Payments/AgesNew.vue'
import ValidityReportNew from '@/views/Payments/ValidityNew.vue'
import FlexboxTest from '@/views/Contracs/FlexboxTest.vue'
import CSSGridTest from '@/views/Contracs/CSSGridTest.vue'
import UploadPaymentsNR from '@/views/Portfolio/UploadPaymentsAll.vue'
import GenerateRequest from '@/views/Utils/GenerateRequest.vue'

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
        path: '/report/ages/new',
        name: 'ReportAgesNew',
        component: ReportAgesNew,
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
        path: '/portfolio/upload/payments/all',
        name: 'UploadPaymentsNR',
        component: UploadPaymentsNR,
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
        path: '/validity/report/new',
        name: 'ValidityReportNew',
        component: ValidityReportNew,
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
    },
    {         
        path: '/business',
        name: 'Business',
        component: Business,
        meta: {
            auth: true
        }
    },
    {         
        path: '/business/all',
        name: 'BusinessAll',
        component: BusinessAll,
        meta: {
            auth: true
        }
    },
    {         
        path: '/business/update/:id',
        name: 'BusinessUpdate',
        component: BusinessUpdate,
        meta: {
            auth: true
        }
    },
    {         
        path: '/business/delete/:id',
        name: 'BusinessDelete',
        meta: {
            auth: true
        }
    },
    {         
        path: '/contracs',
        name: 'Contracs',
        component: Contracs,
        meta: {
            auth: true
        }
    },
    {         
        path: '/contracs/all',
        name: 'ContracsAll',
        component: ContracsAll,
        meta: {
            auth: true
        }
    },
    {         
        path: '/contracs/update/:id',
        name: 'ContracsUpdate',
        component: ContracsUpdate,
        meta: {
            auth: true
        }
    },
    {         
        path: '/contracs/delete/:id',
        name: 'ContracsDelete',
        meta: {
            auth: true
        }
    },
    {
        path: '/flexbox',
        name: 'FlexboxTest',
        component: FlexboxTest,
        meta: {
            auth: false
        }
    },
    {
        path: '/cssgrid',
        name: 'CSSGridTest',
        component: CSSGridTest,
        meta: {
            auth: false
        }
    },
    {
        path: '/generate/state/portfolio',
        name: 'GenerateRequest',
        component: GenerateRequest,
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