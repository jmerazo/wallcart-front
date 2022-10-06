<template>
    <div class="header">
      <nav id="menu" class="navbar navbar-expand-lg bg-light">
          <div class="container-fluid">
            <div class="nav-start">
              <a class="navbar-brand" href="/" id="txt-nav-log">
               <img src="@/assets/resources/cob.png"
                width="90"
                height="60"/>
                Xara
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
                  <a class="nav-item nav-link btn btn-light" href="/" id="txt-nav">Inicio</a>
                </li>

                <li class="nav-item">
                  <a class="nav-item nav-link btn btn-light" href="#" id="txt-nav">Consultas</a>
                  <ul>
                    <li><a href="">Search</a></li>
                    <li><a href="">Parameters</a></li>
                  </ul>
                </li>
  
                <li class="nav-item">
                  <a class="nav-item nav-link btn btn-light" href="#" id="txt-nav">Reportes</a>
                </li>
                
                <li class="nav-item">
                  <div class="dropdown dropstart">
                    <button type="button" class="btn btn-light dropdown-toggle dropdown-toggle-split nav-item nav-link" id="btncircle" data-bs-toggle="dropdown">
                      <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" role="menu" aria-labelledby="btncircle">
                      <li><h6 id="t-log">User</h6></li>
                      <li class="divider"></li>
                      <li><a class="dropdown-item" type="button"><font-awesome-icon id="fai-log" :icon="['fas', 'right-from-bracket']"/>Log out</a></li>
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
    border-bottom: 1px solid #acacac;
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
    color: #000000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 1.8em;
    font-weight: bold;
  }
  
  #txt-nav {
    color: #000000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 1.1em;
  }
  
  .nav-start {
    justify-content: left;
    align-content: left;
  }
  
  #nav-end {
    align-content: right;
    justify-content: right;
  }

  #menu ul{list-style: none;}
  #menu a{text-decoration:none;}
  #menu > ul > li{
    display: block;
    margin-left:15px;
    position: relative;
  }
  #menu > ul > li > a{
    color:#a0a0a0;
    line-height: 40px;
    font-size: 15px;
    padding: 11px 20px;
    -webkit-transition: color 0.15s;
    -moz-transition: color 0.15s;
    -ms-transition: color 0.15s;
    -o-transition: color 0.15s;
    transition: color 0.15s;
  }
  #menu > ul > li > a:hover{color: #fff;}

  #menu > ul > li > ul{
    opacity: 0;
    visibility: hidden;
    padding: 15px 0 20px;
    background: #fafafa;
    text-align: left;
    position: absolute;
    top: 50%;
    left: 104%;	
    width: 180px;
    border-radius: 5px;
    -webkit-transition: all .3s .1s;
    -moz-transition: all .3s .1s;
    -ms-transition: all .3s .1s;
    -o-transition: all .3s .1s;
    transition: all .3s .1s;
    box-shadow: 0px 1px 3px rgba(0,0,0,0.4);
  }
  #menu > ul > li:hover > ul{
    opacity: 1;
    top: -50%;
    visibility: visible;
  }
  #menu > ul > li > ul:before {
    content: '';
    display: block;
    border-color: transparent #fafafa transparent transparent;
    border-style: solid;
    border-width: 10px;
    position: absolute;
    top: 35%;
    left: -10px;
    margin-left: -10px;
  }
  #menu > ul ul > li {position: relative;}
  #menu ul ul a{
    color: #323232;
    font-size: 13px;
    background: #fafafa;
    padding: 5px 8px 7px 16px;
    display: block;
    -webkit-transition: all 0.1s;
    -moz-transition: all 0.1s;
    -ms-transition: all 0.1s;
    -o-transition: all 0.1s;
    transition: all 0.1s;
  }
  #menu > ul > li > ul > li > ul:before {
    content: '';
    display: block;
    border-color: transparent #333 transparent transparent;
    border-style: solid;
    border-width: 10px;
    position: absolute;
    top: 23%;
    left: -20px;
  }
  #menu ul ul ul {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    top: -15px;
    left: 220px;
    padding: 16px 0 20px;
    background: #fafafa;
    text-align: left;
    width: 180px;
    border-radius: 5px;
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -ms-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
    box-shadow: 0px 1px 3px rgba(0,0,0,0.4);
  }
  #menu ul ul > li:hover > ul{
    opacity: 1;
    visibility: visible;
    left: 200px;
  }
  #menu ul ul a:hover{
    background: #0087db;
    color: #f0f0f0;
  }

</style>