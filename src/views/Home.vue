<template>
  <section class="container">     
    <div class="col-12" id="form-user-login">
      <form @submit.prevent="userLogin" class="row"> 
        <h2 id="login-title">Log in</h2>
        <label id="login-subtitle">Enter your credentials to login</label><br>

        <div class="row" id="row-form">
          <div>
            <font-awesome-icon id="fai-log" :icon="['fas', 'user']"/>
            <label class="form-label">Email</label>
            <input v-model="email" type="text" class="form-control" placeholder="example@wallcart.ex" required>
          </div>

          <div>
            <font-awesome-icon id="fai-log" :icon="['fas', 'unlock']"/>
            <label class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control" placeholder="wallcart123*" required>
          </div>

          <div class="col-4">
            <button id="btn-user-login" class="btn" type="submit">Send</button>
          </div>          
        </div> 
      </form>        
    </div>
  </section>     
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
          console.log("Rol: ", response.data.rol_id);
          console.log("Status: ", response.data.status);
          console.log("Email: ", response.data.email);        

          if(this.status == 1){
            if(this.rol == 1){
              console.log("Login username: ", this.un);
              this.$router.push({
                name: 'PanelAdmin',
                params: {email: this.un, rol_id: this.rol, status: this.status, user_id: this.userid},
              })
            }else{
              this.$router.push({
                name: 'Panel',
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
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
}

.row {
  align-items: center;
  justify-items: center;
  justify-content: center;
}

#row-form{
  margin-top: 20px;
}

#form-label{
  text-align: left;
}

#btn-user-login {
  margin-top: 20px;
  align-content: center;
  background-color: #54426b;
  color: white;
}

#form-user-login {
  padding-top: 10px;
  border: 1px solid #54426b;
  padding-bottom: 15px;
  border-radius: 15px;
  margin-right: 50px;
  width: 350px;
}

#login-title {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

#login-subtitle {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>