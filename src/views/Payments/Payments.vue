<template>
    <section class="container">
        <form class="ctn-form">          
          <div id="btn-back">
            <a id="btn-back-users-list-top" href="/panel/admin" class="btn" type="button"><font-awesome-icon id="fai-log-update-password" :icon="['fas', 'chevron-left']"/></a>
            <a id="btn-register-user-top" href="/" class="btn" type="button"><font-awesome-icon id="fai-user-list" :icon="['fas', 'user-plus']"/></a>       
          </div>
                            
          <div class="row">
            <div>
              <h2 id="list-users-title">Payments</h2>
            </div> 
            
              <div class="col-11" id="form-users-list">
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
                      <tr v-for="pay in dataPaginate" :value="pay.id" :key="pay.id">
                          <td>{{pay.nit}}</td>
                          <td>{{pay.factura}}</td>
                          <td>{{pay.num_cto}}</td>
                          <td>{{pay.fecha_pago}}</td>
                          <td>{{pay.valor_abonado}}</td>
                          <td>{{pay.glosas}}</td>
                          <td>{{pay.total_glosas}}</td>
                          <td>{{pay.observacion}}</td>
                      </tr>
                    </tbody>
                  </table>                    
              </div>
              <nav aria-label="Page navigation example" id="pag-payments">
                <ul class="pagination">
                  <li class="page-item" @click="getPreviousPage"><a class="page-link" href="#">Previous</a></li>
                  <li v-for="page in totalPages()" :key="page" @click="getDataPages(page)" class="page-item"><a class="page-link" href="#">{{page}}</a></li>
                  <li class="page-item" @click="getNextPage"><a class="page-link" href="#">Next</a></li>
                </ul>
              </nav>        
          </div>                               
        </form> 
    </section>
</template>

<script>
import axios from "axios";

export default {
  components: {
  },
  name: "PaymentsList",
  data() {
    return {
      payments: [],
      itemsPerPage: 50,
      dataPaginate: [],
      actualPage: 1
    };    
  },
  mounted() {
    this.paymentsList();
    this.getDataPages(1);
  },
  computed: {
  },
  methods: {
    totalPages() {
      return Math.ceil(this.payments.length / this.itemsPerPage)
    },
    getDataPages(numPage){
      this.actualPage = numPage;
      this.dataPaginate = [];
      let ini = (numPage * this.itemsPerPage) - this.itemsPerPage;
      let end = (numPage * this.itemsPerPage);
      this.dataPaginate = this.payments.slice(ini, end);
    },
    getPreviousPage(){
      if(this.actualPage > 1){
        this.actualPage--;
      }
      this.getDataPages(this.actualPage)
    },
    getNextPage(){
      if(this.actualPage < this.totalPages){
        this.actualPage++;
      }
      this.getDataPages(this.actualPage)
    },    
    async paymentsList(){
      await axios.get("http://localhost:8844/api/payments/all", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then((Response) => {
        console.log(Response.data);
        this.payments = Response.data;
      });
    }
  }
};

</script>

<style>
.row {
  align-items: center;
  justify-items: center;
  justify-content: center;
}

#pag-payments{
  margin-bottom: 30px;
  margin-top: 20px;
}


#il-cfg{
  margin-left: 5px;
}

#fai-list{
  color: rgb(0, 0, 0);
}

#td-action-users{
  width: 140px;
}

#tf-1{
  align-content: left;
  justify-content: left;
}

#tr-title {
  text-align: center;
}

#btn-back-users-list-top {
  margin-top: 10px;
  margin-bottom: 10px;
  align-content: left;
  justify-content: left;
  background-color: white;
  color: white;
  width: 30px;
}

#btn-register-user-top {
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #54426b;
  color: white;
}

#form-users-list{
  display: flex;
  padding-top: 10px;
  border: 1px solid #54426b; 
  border-radius: 20px; 
}

#list-users-title {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>