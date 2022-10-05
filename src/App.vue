<template>
  <navbarComp></navbarComp>    
  <router-view></router-view>
  <footerComp></footerComp> 
</template>

<script>
import navbarComp from './components/navbar.vue'
import footerComp from './components/footer.vue'

export default {
  name: 'App',
  components: {
    navbarComp,
    footerComp
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
