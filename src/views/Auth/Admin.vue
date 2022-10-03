<template>
    <section class="container">
        <form class="row">
          <h2 id="panel-admin-title">Welcome</h2>
          <label></label>

            <a class="btn" id="card-item-padmin" href="/users/list">
              <div class="card-body" id="card-body-item">
                <font-awesome-icon id="fai-log" :icon="['fas', 'users']"/>
                Users
              </div>
            </a>

            <a class="btn" id="card-item-padmin" href="/areas/list">
              <div class="card-body" id="card-body-item">
                <font-awesome-icon id="fai-log" :icon="['fas', 'building']"/>
                Areas
              </div>
            </a>

            <a class="btn" id="card-item-padmin" href="">
              <div class="card-body" id="card-body-item">
                <font-awesome-icon id="fai-log" :icon="['fas', 'ticket']"/>
                Tickets
              </div>
            </a>
            <a class="btn" id="card-item-padmin" href="">
              <div class="card-body" id="card-body-item">
                <font-awesome-icon id="fai-log" :icon="['fas', 'person']"/>
                Persons
              </div>
            </a>
            <a class="btn" id="card-item-padmin" href="">
              <div class="card-body" id="card-body-item">
                <font-awesome-icon id="fai-log" :icon="['fas', 'passport']"/>
                Passports
              </div>
            </a>
        </form> 
    </section>
</template>

<script>
//import axios from "axios";

export default {

  components: {
  },
  name: "PanelAdmin",
  data(){
    return {
      username:  this.$route.params.email,
      names: "",
      last_names: "",
      uid: localStorage.getItem('id')
    }    
  }, 
  //setup(){    
  //  var state = store.state.user_log;
  //  console.log("User state: ", state)
  //  return { state };
  //},
  mounted() {
    this.userById();   
    console.log("Localstorage user: ", localStorage.getItem('user_id')); 
  },
  computed: {

  },
  methods: {
      
  }
};

</script>

<style>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
}

.row {
  align-items: center;
  justify-items: center;
  justify-content: center;
}

#panel-admin-title{
  align-content: left;
  justify-content: left;
}

#card-item-padmin {
  display: flex;
  font-weight: bold;
  align-items: center;
  justify-items: left;
  justify-content: left;
  background-color: #54426b;
  color: white;
  width: 150px;
  height: 100px;
  margin: 10px;
}

#card-body-item {
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
}
</style>