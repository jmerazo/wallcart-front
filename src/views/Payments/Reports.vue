<template>
    <section class="container">
    <router-link id="btn-back-payments-panel" :to="{name: 'PaymentsPanel'}" class="btn" type="button">
        <font-awesome-icon id="fai-log-update-password" :icon="['fas', 'chevron-left']"/>}
    </router-link>       
  
      <form class="row">      
        <div id="btn-back">
          <a title="Back" id="btn-back-users-create-top" href="/payments/panel" class="btn" type="button"><font-awesome-icon id="fai-log-update-password" :icon="['fas', 'chevron-left']"/></a>
          <a title="Panel administrator" id="btn-register-user-top" href="" class="btn" type="button"><font-awesome-icon :icon="['fas', 'columns']"/></a>       
        </div>
           
        <div class="col-12" id="form-register-user">
          <h2 id="register-title">Search data</h2>
          <label id="register-subtitle">Find By: </label><br>
  
          <div class="row">
  
            <div class="col-4">
              <font-awesome-icon id="fai-log" :icon="['fas', 'list-ol']"/><label class="form-label">Nit</label>
              <input v-on:keyup="searchNit()" v-model="nit" type="text" class="form-control" placeholder="Write the nit">
            </div>
  
            <div class="col-4">
              <font-awesome-icon id="fai-log" :icon="['fas', 'credit-card']"/><label class="form-label">Sale</label>
              <input v-on:keyup="searchSale()" v-model="sale" type="text" class="form-control" placeholder="Write the number sale">
            </div>
  
            <div class="col-4">
              <font-awesome-icon id="fai-log" :icon="['fas', 'calendar']"/><label class="form-label">Date</label>
              <input v-on:keyup="searchDate()" v-model="date" type="text" class="form-control">
            </div>

            <div class="row" id="form-search-parameters">
                <div class="col-3">
                    <font-awesome-icon id="fai-log" :icon="['fas', 'list-ol']"/><label class="form-label">Nit</label>
                    <input v-model="nits" type="text" class="form-control" placeholder="Write the nit">
                </div>
    
                <div class="col-3">
                    <font-awesome-icon id="fai-log" :icon="['fas', 'credit-card']"/><label class="form-label">Sale</label>
                    <input v-model="date_init" type="text" class="form-control" placeholder="Write the number sale">
                </div>
    
                <div class="col-3">
                    <font-awesome-icon id="fai-log" :icon="['fas', 'calendar']"/><label class="form-label">Date</label>
                    <input v-model="date_end" type="text" class="form-control">
                </div>

                <div class="col-3">
                    <a id="btn-search" type="submit" class="btn" @click="searchParameters">Search</a>
                </div>
            </div>

            <div class="col-12" id="form-search-list">
                  <table class="table table table-striped table-hover">
                    <thead class="thead-dark">
                      <tr id="tr-title">
                          <th>Nit</th>
                          <th>Factura</th>
                          <th>Num. Cto</th>
                          <th>Fecha Pago</th>
                          <th>V. Abonado</th>
                          <th>Glosas</th>
                          <th>Total</th>
                          <th>Observación</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="s in search" :value="s.id" :key="s.id">
                          <td>{{s.nit}}</td>
                          <td>{{s.factura}}</td>
                          <td>{{s.num_cto}}</td>
                          <td>{{s.fecha_pago}}</td>
                          <td>{{s.valor_abonado}}</td>
                          <td>{{s.glosas}}</td>
                          <td>{{s.total_glosas}}</td>
                          <td>{{s.observacion}}</td>
                      </tr>
                    </tbody>
                  </table>                       
              </div>       
          </div>
        </div>
      </form>       
    </section>     
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    components: {
    },
    name: "PanelPayments",
    data() {
      return {
        date: null,
        nit: null,
        nits: null,
        sale: null,
        search: [],
        date_init: null,
        date_end: null
      };    
    },
    mounted() {
    },
    computed: {
    },
    methods: {
        async searchNit() {
            await axios.get(`http://localhost:8844/api/payments/nit/${this.nit}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
            })
            .then((Response) => {
                this.search = Response.data;
            });
        },
        async searchSale() {
            await axios.get(`http://localhost:8844/api/payments/sales/${this.sale}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
            })
            .then((Response) => {
                this.search = Response.data;
            });
        },
        async searchDate() {
            await axios.get(`http://localhost:8844/api/payments/date/${this.date}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
            })
            .then((Response) => {
                this.search = Response.data;
            });
        },
        async searchParameters() {
            //const search = JSON.stringify({
            //    nit : this.nits,
            //    date_init : this.date_init,
            //    date_end : this.date_end
            //})

            //console.log('Data search: ', search);
            await axios.get(`http://localhost:8844/api/payments/search/${this.nits}/${this.date_init}/${this.date_end}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
            })
            .then((Response) => {
                this.search = Response.data;
            });
        }             
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

  #form-search-parameters{
    margin-top: 15px;
  }

  #btn-search{
    background-color: #ab0d2f;
    color: white;
  }

  #form-search-list{
    width: 100%;
    margin-top: 20px;
  }
  
  #btn-register-save {
    background-color: #54426b;
    color: white;
    margin-top: 15px;
  }

  #btn-back-payments-panel {
  margin-top: 10px;
  margin-bottom: 10px;
  align-content: left;
  justify-content: left;
  background-color: white;
  color: white;
  width: 30px;
}
  
  #form-register-user {
    padding: 20px;
    border: 1px solid #54426b;
    border-radius: 15px;
    margin-right: 50px;
    margin-bottom: 80px;
  }
  
  #register-title {
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
  #register-subtitle {
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  </style>