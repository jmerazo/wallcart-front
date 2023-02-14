<template>
  <div class="container">  
    <main>
      <div id="form-user-login">
        <form @submit.prevent="userLogin" class="row">
          <img src="@/assets/resources/alphav3.png" id="img-login"> 
          <h2 id="login-title" class="font-bold text-2xl">Log in</h2>
          <label id="login-subtitle">Enter your credentials to login</label><br>

          <div class="row" id="row-form">
            <div>
              <div id="icon-label-form">
                <font-awesome-icon id="fai-login" :icon="['fas', 'user']"/>
                <label class="form-label font-semibold">Email</label>
              </div>
              <input id="i-login-data" v-model="email" type="text" class="form-control" placeholder="example@alpha.com" required>
            </div>

            <div>
              <div id="icon-label-form">
                <font-awesome-icon id="fai-login" :icon="['fas', 'unlock']"/>
                <label class="form-label font-semibold">Password</label>
              </div>
              <input id="i-login-data" v-model="password" type="password" class="form-control" placeholder="alpha123*" required>
            </div>

            <div class="col-4">
              <button id="btn-user-login" class="btn" type="submit">Send</button>
            </div>

          </div> 
        </form> 

      </div>
    </main> 
  </div>    
</template>

<script>
import axios from "axios";

export default {
  components: {
  },
  name: "LoginApp",
  data() {
    return {
        email: "",
        password: "",
        error: false,
        rol: null,
        status: null,
        un: null,
        userid: null
    };    
  }, 
  methods: {
    async userLogin(){
      this.error = false;
      if(!this.email || !this.password){
        this.$toast.warning(`Fields cannot be empty`, {
          position: 'top-right',
          duration: 5000
        });
      }else{
        const user = JSON.stringify({
              email: this.email,
              password: this.password
        })
        await axios.post("http://localhost:8844/api-auth/user/auth", user, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer`
            }             
        }).then(async (response) => {
          localStorage.setItem('token', response.data.token);
          this.rol = response.data.rol_id;
          this.userid = response.data.id;
          this.status = response.data.status;
          this.un = response.data.email;
          localStorage.setItem('user_id', response.data.id);
          localStorage.setItem('rol', response.data.rol_id);     

          if(this.status == 1){
            if(this.rol == 1){
              console.log("Login username: ", this.un);
              this.$router.push({
                name: 'PaymentsReports',
                params: {email: this.un, rol_id: this.rol, status: this.status, user_id: this.userid},
              })
            }else{
              this.$router.push({
                name: 'PaymentsReports',
                params: {email: this.un, rol_id: this.rol, status: this.status, user_id: this.userid}
              })
            }
            this.$toast.success(`Welcome ${this.un}`, {
              position: 'top-right',
              duration: 5000
            });
          }else{
            console.log("User inactivate")
            this.email = "";
            this.password = "";
            this.salir();
          }
          
        })
        .catch(err =>{
          this.$toast.error(`Invalid username or password`, {
              position: 'top-right',
              duration: 5000
          });
          console.log(err)
          this.error = true;
        });        
      } 
    },
    salir() {
      localStorage.removeItem("token")
      this.$router.push('/')
    }    
  }
};
</script>

<style>
.container{
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
}

main{
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
}

#img-login{
  margin-bottom: 20px;
  margin-top: 20px;
  width: 190px;
  height: 170;
}

#fai-login{
  margin-right: 5px;
}

#icon-label-form{
  text-align: left;
}

#i-login-data{
  text-align: center;
}

#btn-user-login {
  margin-top: 20px;
  align-content: center;
  background-color: #090218;
  color: white;
}


</style>