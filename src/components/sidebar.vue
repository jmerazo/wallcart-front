<template>
    <body>
        <nav class="sidebar">
            <div class="sidebar-inner">
                <header class="sidebar-header">
                    <button
                        type="button"
                        class="sidebar-burger"
                        onclick="toggleSidebar()"
                    ></button>
                    <img src="@/assets/resources/log_xara.png" alt="Xara Software" class="sidebar-logo">
                </header>
                <nav class="sidebar-menu">
                    <button type="button" class="has-border">
                        <font-awesome-icon id="fai-sidebar" :icon="['fas', 'gear']"/>
                        <span>Settings</span>
                    </button>
                </nav>
            </div>
        </nav>        
    </body>
</template>

<script>
    export default {
    name: "sidebar-app",
    data(){
      return {
      }    
    },
    mounted() {
    }, 
    methods: { 
        toggleSidebar(){
            document.body.classList.toggle("open");
        }
    }
  }
</script>

<style>
* {
    box-sizing: border-box;
}

body{
    margin: 0;
}

button{
    background: transparent;
    border: 0;
    padding: 0;
    cursor: pointer;
}

.sidebar {
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
    width: 72px;
    height: 100%;
    background: #6d10db;
    transition: width 0.4s;
}

body.open .sidebar {
    width: 260px;
}

.sidebar-inner{
    position: absolute;
    top: 0;
    left: 0;
    width: 300px;
}

.sidebar-header{
    display: flex;
    align-items: center;
    height: 72px;
    padding: 0 1.25rem 0 0;
    background: rgba(0, 0, 0, 0.1);
}

.sidebar-burger {
    width: 72px;
    height: 72px;
    display: grid;
    place-items: center;
    background: url(@/assets/icons/menu.png) no-repeat center center;
}

.body.open .sidebar-burger {
    background: url(@/assets/icons/close.png) no-repeat no-repeat center center;
}

.sidebar-logo{
    height: 20px;
}

.sidebar-menu{
    display: grid;
}

.sidebar-menu > button {
    display: flex;
    gap: 25px;
    align-items: center;
    height: 60px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    font-weight: 200;
    letter-spacing: 2px;
    line-height: 1;
    padding: 0 25px;
}

.sidebar-menu > button.has-border {
    padding-bottom: 16px;
    margin-bottom: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.sidebar-menu > button > img {
    width: 24px;
    height: 24px;
}

.sidebar-menu > button > span {
    color: #f9f9f9;
}
</style>