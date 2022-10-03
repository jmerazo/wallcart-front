<template>
    <div class="header">
      <nav class="navbar navbar-expand-lg bg-light">
          <div class="container-fluid">
            <div class="nav-start">
              <a class="navbar-brand" href="/" id="txt-nav-log">
               <img src="@/assets/resources/cob.png"
                width="90"
                height="60"/>
                WallCart
              </a>
            </div>
  
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#nav-end"
              aria-controls="nav-end"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
  
            <div class="collapse navbar-collapse" id="nav-end">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-item nav-link btn btn-light" href="/" id="txt-nav">Home</a>
                </li>
  
                <li class="nav-item">
                  <a class="nav-item nav-link btn btn-light" href="#" id="txt-nav">Passport</a>
                </li>
                
                <li class="nav-item">
                  <div class="dropdown dropstart">
                    <button type="button" class="btn btn-light dropdown-toggle dropdown-toggle-split nav-item nav-link" id="btncircle" data-bs-toggle="dropdown">
                      <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" role="menu" aria-labelledby="btncircle">
                      <li v-show="uid"><h6 id="t-log"></h6></li>
                      <li class="divider"></li>
                      <li v-show="uid"><a class="dropdown-item" type="button" @click="logOut"><font-awesome-icon id="fai-log" :icon="['fas', 'right-from-bracket']"/>Log out</a></li>
                    </ul>
                  </div>                                 
                </li>          
              </ul>
            </div>
          </div>          
        </nav>
      </div>
  </template>
  <script>
  export default {
    name: "navbar-app",
    data(){
      return {
      }    
    },
    mounted() {
    }, 
    methods: { 
    }
  }
  </script>
  <style>
  .header {
    display: flex;
    background-color: #ab0d2f;
    border-bottom: 1px solid #ab0d2f;
  }
  
  .navbar {
    width: 100%;
    margin-left: 30px;
    margin-right: 30px;
  }
  
  #fai-log{
    margin-right: 5px;
  }
  
  #t-log{
    margin-left: 10px;
  }
  
  #btncircle{
    width: 40px;
    height: 40px;
    padding: 6px 0px;
    border-radius: 35px;
    text-align: center;
    font-size: 12px;
    line-height: 1.42857;
    border: 1px solid #54426b;
  }
  
  #txt-nav-log{
    color: #54426b;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 1.8em;
    font-weight: bold;
  }
  
  #txt-nav {
    color: #54426b;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 1.1em;
    font-weight: bold;
  }
  
  .nav-start {
    justify-content: left;
    align-content: left;
  }
  
  #nav-end {
    align-content: right;
    justify-content: right;
  }
  </style>