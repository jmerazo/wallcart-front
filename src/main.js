import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import Toaster from "@meforma/vue-toaster";
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import SidebarMenuAkahonVue from 'vue-sidebar-menu-akahon';
import './index.css'
import VueTailwind from 'vue3-tailwind'
import { TPagination } from 'vue3-tailwind/dist/vue3-tailwind.esm'
import VCalendar from 'v-calendar'
import 'v-calendar/dist/style.css';

// Import icons fortawesome
import { 
    faPenToSquare,
    faTrash,
    faUserPlus,
    faKey,
    faUserXmark,
    faUserCheck,
    faUserPen,
    faColumns,
    faAddressCard,
    faRightFromBracket,
    faUserLock,
    faUser,
    faUnlock,
    faIdCard,
    faEnvelope,
    faMobile,
    faCity,
    faLocationDot,
    faLocationPin,
    faListOl,
    faFileText,
    faClock,
    faCalendar,
    faBuilding,
    faPerson,
    faFile,
    faFileLines,
    faChevronLeft,
    faUsers,
    faTicket,
    faLightbulb,
    faPhone,
    faPassport,
    faUserGear,
    faPlus,
    faList,
    faCodeCommit,
    faSignature,
    faToggleOn,
    faToggleOff,
    faBook,
    faCreditCard,
    faFileExport,
    faFileExcel,
    faFileArrowUp,
    faGear,
    faFilter,
    faListNumeric,
    faMagnifyingGlass,
    faFileUpload,
    faFileSignature,
    faFileInvoice,
    faCashRegister,
    faHouse,
    faLayerGroup,
    faMapLocation,
    faHouseMedical,
    faSortNumericAsc,
    faCrutch,
    faBarcode,
    faTurnUp,
    faMoneyBill,
    faFilePdf
} from '@fortawesome/free-solid-svg-icons'
import { 
    faFacebook, 
    faInstagram, 
    faTwitter, 
    faYoutube 
} from '@fortawesome/free-brands-svg-icons';

library.add(
    faTrash,
    faUserPlus,
    faPenToSquare,
    faKey,
    faUserXmark,
    faUserCheck,
    faUserPen,
    faColumns,
    faAddressCard,
    faRightFromBracket,
    faUserLock,
    faUser,
    faUnlock,
    faIdCard,
    faEnvelope,
    faMobile,
    faCity,
    faLocationDot,
    faLocationPin,
    faListOl,
    faFileText,
    faClock,
    faCalendar,
    faBuilding,
    faPerson,
    faFile,
    faFileLines,
    faChevronLeft,
    faUsers,
    faTicket,
    faLightbulb,
    faFacebook,
    faTwitter,
    faInstagram,
    faYoutube,
    faPhone,
    faPassport,
    faUserGear,
    faPenToSquare,
    faPlus,
    faList,
    faCodeCommit,
    faSignature,
    faToggleOn,
    faToggleOff,
    faBook,
    faCreditCard,
    faFileExport,
    faFileExcel,
    faFileArrowUp,
    faGear,
    faFilter,
    faListNumeric,
    faMagnifyingGlass,
    faFileUpload,
    faFileSignature,
    faFileInvoice,
    faCashRegister,
    faHouse,
    faIdCard,
    faSignature,
    faLayerGroup,
    faMapLocation,
    faLocationDot,
    faHouseMedical,
    faSortNumericAsc,
    faCrutch,
    faBarcode,
    faTurnUp,
    faMoneyBill,
    faFilePdf
)

const settings = {
    't-pagination': {
      component: TPagination,
      props: {
        classes: {
          wrapper: 'table border-collapse text-center bg-white mx-auto shadow-sm',
          element: 'w-8 h-8 border border-gray-200 table-cell hover:border-blue-100',
          activeElement: 'w-8 h-8 border border-gray-200 border-blue-500 table-cell hover:border-blue-600',
          disabledElement: 'w-8 h-8 border border-gray-200 table-cell',
          ellipsisElement: 'w-8 h-8 border border-gray-200 hidden md:table-cell',
          activeButton: 'bg-blue-500 w-full h-full text-white hover:bg-blue-600 transition duration-100 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
          disabledButton: 'opacity-25 w-full h-full cursor-not-allowed transition duration-100 ease-in-out',
          button: 'hover:bg-blue-100 w-full h-full transition duration-100 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
          ellipsis: ''
        },
        variants: {
          rounded: {
            wrapper: 'bg-white mx-auto text-center flex space-x-2',
            element: 'w-8 h-8 rounded-full',
            activeElement: 'w-8 h-8 rounded-full',
            disabledElement: 'w-8 h-8 rounded-full',
            ellipsisElement: 'w-8 h-8 rounded-full hidden md:inline',
            activeButton: 'border border-blue-500 bg-blue-500 w-full h-full rounded-full text-white hover:bg-blue-600 transition duration-100 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
            disabledButton: 'border border-gray-200  opacity-25 w-full h-full rounded-full cursor-not-allowed transition duration-100 ease-in-out',
            button: 'border border-gray-200 hover:bg-blue-100 hover:border-blue-100 rounded-full w-full h-full transition duration-100 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
            ellipsis: ''
          }
        }
      }
    }
  }

createApp(App)
    .use(router)
    .use(Toaster)
    .use(VueTailwind, settings)
    .use(VCalendar, {})
    .component('font-awesome-icon', FontAwesomeIcon)
    .component('vue-sidebar-menu-akahon', SidebarMenuAkahonVue)
    .mount('#app')
