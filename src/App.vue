<template>
  <!--SidebarMenuAkahonVue 
    menuTitle="Xara" 
    profileName="Jeff Baeza" 
    profileRole="Administrator"
    :menuItems='[
      {link: "/",name: "Home", tooltip: "Dashboard", icon: "bx-home-alt" },
      {link: "/payments/reports",name: "Reports", tooltip: "Dashboard", icon: "bx-copy-alt" },
      {link: "#",name: "Queries", tooltip: "Dashboard", icon: "bx-search-alt" },
      {link: "/payments/upload",name: "Upload", tooltip: "Dashboard", icon: "bx-transfer-alt" },
      {link: "#",name: "Profile", tooltip: "Dashboard", icon: "bx-window-alt" }
    ]'
    isSearch='false'
    isExitButton="logOut"
  >
  </SidebarMenuAkahonVue-->
  <navBarApp></navBarApp> 
  <router-view></router-view>
</template>

<script>
//import SidebarMenuAkahonVue from 'vue-sidebar-menu-akahon'
import navBarApp from '@/components/navbar.vue'

export default {
  name: 'App',
  components: {
    //SidebarMenuAkahonVue
    navBarApp
},
  props: ['menuTitle', 'menuLogo', 'menuIcon', 'menuItems', 'profileName', 'profileRole', 'isSearch', 'isExitButton'],
  methods: {
    
  }
}
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  width: 100% !important;
  height: 100vh;
}
</style>
