<template>
    <div class="header">
      <nav id="menu" class="navbar navbar-expand-lg bg-light">
          <div class="container-fluid">
            <div class="nav-start">
              <a class="navbar-brand" href="/" id="txt-nav-log">
                Sahara
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
                  <a class="nav-item nav-link btn btn-light" href="/dashboard" id="txt-nav">Home</a>
                </li>

                <li class="nav-item">
                  <a class="nav-item nav-link btn btn-light" href="/payments/reports" id="txt-nav">Searchs</a>
                </li>
  
                <li class="nav-item">
                  <a class="nav-item nav-link btn btn-light" href="/payments/upload" id="txt-nav">Uploads</a>
                </li>

                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Portfolio
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="/report/ages"><font-awesome-icon id="fai-drop" :icon="['fas', 'list-numeric']"/>Ages</a></li>
                    <li><a class="dropdown-item" href="/portfolio/reports"><font-awesome-icon id="fai-drop" :icon="['fas', 'magnifying-glass']"/>Search</a></li>
                    <li><a class="dropdown-item" href="/portfolio/upload"><font-awesome-icon id="fai-drop" :icon="['fas', 'file-upload']"/>Upload</a></li>
                    <li><a class="dropdown-item" href="/portfolio/consolidated"><font-awesome-icon id="fai-drop" :icon="['fas', 'file-signature']"/>Consolidated</a></li>
                    <li><a class="dropdown-item" href="/validity/report"><font-awesome-icon id="fai-drop" :icon="['fas', 'calendar']"/>Validity</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#">History</a></li>
                  </ul>
                </li>
                
                <li class="nav-item">
                  <div class="dropdown dropstart">
                    <button type="button" class="btn btn-light dropdown-toggle dropdown-toggle-split nav-item nav-link" id="btncircle" data-bs-toggle="dropdown">
                      <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" role="menu" aria-labelledby="btncircle">
                      <li v-show="uid"><h6 id="t-log">{{ this.names +' '+this.last_names }}</h6></li>
                      <li class="dropdown-divider"></li>
                      <li><a class="dropdown-item" href="/"><font-awesome-icon id="fai-log" :icon="['fas', 'columns']"/>Login</a></li>
                      <li v-show="this.rol != 1 && uid"><a class="dropdown-item" href="/user/panel"><font-awesome-icon id="fai-log" :icon="['fas', 'columns']"/>Panel</a></li>
                      <li v-show="this.rol == 1 && uid"><a class="dropdown-item" href="/user/panel/administrator"><font-awesome-icon id="fai-log" :icon="['fas', 'columns']"/>Panel</a></li>
                      <li class="dropdown-divider"></li>
                      <li><a class="dropdown-item" type="button" @click="logOut"><font-awesome-icon id="fai-log" :icon="['fas', 'right-from-bracket']"/>Log out</a></li>
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
import axios from 'axios'
  export default {
    name: "navbar-app",
    data(){
      return {
        names: "",
        last_names: "",
        rol: localStorage.getItem('rol'),
        uid: localStorage.getItem('user_id')
      }    
    },
    mounted() {
      this.userById();
    }, 
    methods: {
      async userById(){
        if(!this.uid){
            this.names = ""
        }else{
            await axios.get(`http://localhost:8844/api/user/${this.uid}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
            })
            .then((Response) => {
                console.log("Store response username: ", Response.data)
                this.names = Response.data[0].names;
                this.last_names = Response.data[0].last_names;
            });
        }
      },
      logOut() {
        localStorage.removeItem("token")
        localStorage.removeItem('user_id')
        localStorage.removeItem('rol')
        this.$router.push('/')
      }    
    }
  }
  </script>
  <style>
  .header {
    display: flex;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    background-color: #eeeeee;
    border-bottom: 1px solid #acacac;
  }

  #menu{
    width: 100%;
    left: 0;
    right: 0;
  }
  
  .navbar {
    width: 100%;
    margin-left: 30px;
    margin-right: 30px;
    background-color: #e2cefc;
  }
  
  #fai-log{
    margin-right: 5px;
  }
  
  #t-log{
    margin-left: 10px;
  }

  #fai-drop{
    width: 15px;
    height: 15px;
    margin-right: 5px;
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
    font-size: 1.8em;
    font-weight: bold;
  }
  
  #txt-nav {
    color: #000000;
    font-size: 1.1em;
  }

  #navbarDropdown {
    color: #000000;
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
</style>