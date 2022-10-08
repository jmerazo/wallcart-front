<template>
    <section class="container">
        <form class="row">
          <h2 id="panel-admin-title">Panel</h2>
          <label></label>

            <router-link id="card-item-padmin" :to="{name: 'PaymentsReports'}" class="btn">
                <div class="card-body" id="card-body-item">                    
                    <font-awesome-icon id="fai-panel-payment" :icon="['fas', 'file-excel']"/>
                    Generate Reports
                </div>
            </router-link>

            <a class="btn" id="card-item-padmin" href="">
              <div class="card-body" id="card-body-item">
                <font-awesome-icon id="fai-panel-payment" :icon="['fas', 'file-arrow-up']"/>
                File Upload
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
      email:  this.$route.params.email,
      names: "",
      last_names: "",
      //uid: localStorage.getItem('id')
    }    
  }, 
  //setup(){    
  //  var state = store.state.user_log;
  //  console.log("User state: ", state)
  //  return { state };
  //},
  mounted() {
    //this.userById();   
    //console.log("Localstorage user: ", localStorage.getItem('user_id')); 
  },
  computed: {

  },
  methods: {
      
  }
};

</script>

<style>
.row {
  align-items: center;
  justify-items: center;
  justify-content: center;
}

#fai-panel-payment{
    width: 30px;
    height: 30px;
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
  background-color: #ab0d2f;
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