<template>
    <div class="header">
      <nav class="navbar navbar-expand-lg bg-light">
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
                  <a class="nav-item nav-link btn btn-light" href="/" id="txt-nav">Home</a>
                </li>

                <li class="nav-item">
                  <a class="nav-item nav-link btn btn-light" href="#" id="txt-nav">Queries</a>
                  <ul>
                    <li><a href="">Search</a></li>
                    <li><a href="">Parameters</a></li>
                  </ul>
                </li>
  
                <li class="nav-item">
                  <a class="nav-item nav-link btn btn-light" href="#" id="txt-nav">Reports</a>
                </li>
                
                <li class="nav-item">
                  <div class="dropdown dropstart">
                    <button type="button" class="btn btn-light dropdown-toggle dropdown-toggle-split nav-item nav-link" id="btncircle" data-bs-toggle="dropdown">
                      <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" role="menu" aria-labelledby="btncircle">
                      <li><h6 id="t-log"></h6></li>
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

/* menu */

#menu ul {
 list-style:none;
 margin:0;
 padding:0;
}

/* items del menu */

#menu ul li {
 background-color:#2e518b;
}

/* enlaces del menu */

#menu ul a {
 display:block;
 color:#fff;
 text-decoration:none;
 font-weight:400;
 font-size:15px;
 padding:10px;
 font-family:"HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif;
 text-transform:uppercase;
 letter-spacing:1px;
}

/* items del menu */

#menu ul li {
 position:relative;
 float:left;
 margin:0;
 padding:0;
}

/* efecto al pasar el ratón por los items del menu */

#menu ul li:hover {
 background:#5b78a7;
}

/* menu desplegable */

#menu ul ul {
 display:none;
 position:absolute;
 top:100%;
 left:0;
 background:#eee;
 padding:0;
}

/* items del menu desplegable */

#menu ul ul li {
 float:none;
 width:150px
}

/* enlaces de los items del menu desplegable */

#menu ul ul a {
 line-height:120%;
 padding:10px 15px;
}

/* items del menu desplegable al pasar el ratón */

#menu ul li:hover > ul {
 display:block;
}

  </style>