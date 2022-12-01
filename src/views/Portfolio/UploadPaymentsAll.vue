<template>            
    <div class="grid" id="form-upload-payments-nr">
      <form enctype="multipart/form-data" id="form-upload">
        <div class="row">
          <div class="col-12">
            <div id="upload-title">
              <h2 class="font-bold text-2xl">PAYMENTS NO RESTRICTIONS</h2>
            </div>    
            <div class="col-9" id="icon-and-text-upload">
              <font-awesome-icon 
                id="fai-log-excel" 
                :icon="['fas', 'file-excel']"
              />
              <label class="form-label font-semibold text-lg">Select file to upload:</label>
              <input 
                @change="onFileChange" 
                type="file" 
                class="form-control" 
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
            </div>
            <div class="col-2">
              <a id="btn-upload-payments" type="submit" class="btn" value="Store File" @click="uploadExFilePayments">Upload</a>
            </div>
          </div>
          
          <div v-show="payDuplicate.length != 0">
            <a id="btn-search-export" title="Export report" type="submit" class="btn" @click="expTable"><font-awesome-icon id="fai-export" :icon="['fas', 'file-export']"/></a> 
            <span class="font-bold text-2xl">NOT LOADED</span>
            <table class="table table table-striped table-hover">
              <thead class="thead-dark">
                  <tr id="tr-title">
                      <th>NIT</th>
                      <th>CONTRATO</th>
                      <th>CUENTA</th>
                      <th>FECHA CUENTA</th>
                      <th>FACTURA</th>
                      <th>VR ABONADO</th>
                      <th>FECHA ABONO</th>
                      <th>VR GLOSA</th>
                      <th>FECHA GLOSA</th>
                      <th style="color:brown">ERROR</th>                        
                  </tr>
              </thead>
              <tbody>                      
                  <tr v-for="pd in dataPaginatePD" :value="pd.nit" :key="pd.nit">
                      <td>{{pd.nit}}</td>
                      <td>{{pd.contrato}}</td>
                      <td>{{pd.cuenta}}</td>
                      <td>{{pd.fecha_cuenta}}</td>
                      <td>{{pd.factura}}</td>
                      <td>{{pd.valor_abonado}}</td>
                      <td>{{pd.fecha_abono}}</td>
                      <td>{{pd.glosa_aceptada}}</td>
                      <td>{{pd.fga}}</td>
                      <td style="color:brown;font-weight: bold;">Beads no exits</td>
                  </tr>
              </tbody>
            </table>

            <table class="table table table-striped table-hover" id="tableNone" style="display: none">
              <thead class="thead-dark">
                  <tr id="tr-title">
                      <th>NIT</th>
                      <th>CONTRATO</th>
                      <th>CUENTA</th>
                      <th>FECHA CUENTA</th>
                      <th>FACTURA</th>
                      <th>VR ABONADO</th>
                      <th>FECHA ABONO</th>
                      <th>VR GLOSA</th>
                      <th>FECHA GLOSA</th>
                      <th style="color:brown">ERROR</th>                        
                  </tr>
              </thead>
              <tbody>                      
                  <tr v-for="pd in dataPaginatePD" :value="pd.nit" :key="pd.nit">
                      <td>{{pd.nit}}</td>
                      <td>{{pd.contrato}}</td>
                      <td>{{pd.cuenta}}</td>
                      <td>{{pd.fecha_cuenta}}</td>
                      <td>{{pd.factura}}</td>
                      <td>{{pd.valor_abonado}}</td>
                      <td>{{pd.fecha_abono}}</td>
                      <td>{{pd.glosa_aceptada}}</td>
                      <td>{{pd.fga}}</td>
                      <td style="color:brown;font-weight: bold;">Beads no exits</td>
                  </tr>
              </tbody>
            </table>
            <div>
              <span style="font-weight: bold">Number of unloaded payments: {{this.countNU}}</span>
            </div>
            <div>
              <nav aria-label="Page navigation example" id="pagination-ages">
                <ul class="pagination">
                  <li class="page-item" @click="getPreviousPage"><a class="page-link" href="#">Previous</a></li>
                  <li v-for="page in totalPagesPD()" :key="page" @click="getDataPagesPD(page)" class="page-item"><a class="page-link" href="#">{{page}}</a></li>
                  <li class="page-item" @click="getNextPage"><a class="page-link" href="#">Next</a></li>
                </ul>
              </nav>  
            </div>
          </div>
          <!--div v-show="payUpload.length != 0">
            <span class="font-bold text-2xl">PAYMENTS LOADED SUCCESSFULLY</span>
            <table class="table table table-striped table-hover">
              <thead class="thead-dark">
                  <tr id="tr-title">
                      <th>NIT</th>
                      <th>CONTRATO</th>
                      <th>CUENTA</th>
                      <th>FECHA CUENTA</th>
                      <th>FACTURA</th>
                      <th>VR ABONADO</th>
                      <th>FECHA ABONO</th>
                      <th>VR GLOSA</th>
                      <th>FECHA GLOSA</th>
                      <th>SALDO</th>
                  </tr>
              </thead>
              <tbody>                      
                  <tr v-for="pd in dataPaginateUP" :value="pd.nit" :key="pd.nit">
                      <td>{{pd.nit}}</td>
                      <td>{{pd.contrato}}</td>
                      <td>{{pd.cuenta}}</td>
                      <td>{{pd.fecha_cuenta}}</td>
                      <td>{{pd.factura}}</td>
                      <td>{{pd.valor_abonado}}</td>
                      <td>{{pd.fecha_abono}}</td>
                      <td>{{pd.glosa_aceptada}}</td>
                      <td>{{pd.fga}}</td>
                      <td>{{pd.saldo}}</td>
                  </tr>
              </tbody>
            </table>
            <div>
              <nav aria-label="Page navigation example" id="pagination-ages">
                <ul class="pagination">
                  <li class="page-item" @click="getPreviousPage"><a class="page-link" href="#">Previous</a></li>
                  <li v-for="page in totalPagesUP()" :key="page" @click="getDataPagesUP(page)" class="page-item"><a class="page-link" href="#">{{page}}</a></li>
                  <li class="page-item" @click="getNextPage"><a class="page-link" href="#">Next</a></li>
                </ul>
              </nav>  
            </div>
          </div-->
        </div>
      </form>
    </div>         
</template>
  
<script>
import axios from 'axios'
import * as XLSX from 'xlsx/xlsx.mjs';

export default {
  components: {
  },
  name: "UploadPayments",
  data() {
    return {
      exFile : null,
      payDuplicate: [],
      payUpload: [],
      itemsPerPage: 100,
      dataPaginatePD: [],
      actualPage: 1,
      dataPaginateUP: [],
      dateReport: new Date(),
      countNU: 0
    };    
  },
  mounted() {
  },
  computed: {
  },
  methods: {
    expTable(){
        var workbook = XLSX.utils.table_to_book(document.getElementById("tableNone"));
        const filename = `HJMH_PAYMENTS_NO_UPLOAD_${this.dateReport}`;
        XLSX.writeFile(workbook, `${filename}.xlsx`);
    },
    totalPagesPD() {
      return Math.ceil(this.payDuplicate.length / this.itemsPerPage)
    },
    getDataPagesPD(numPage){
      this.actualPage = numPage;
      this.dataPaginate = [];
      let ini = (numPage * this.itemsPerPage) - this.itemsPerPage;
      let end = (numPage * this.itemsPerPage);
      this.dataPaginatePD = this.payDuplicate.slice(ini, end);
    },
    totalPagesUP() {
      return Math.ceil(this.payUpload.length / this.itemsPerPage)
    },
    getDataPagesUP(numPage){
      this.actualPage = numPage;
      this.dataPaginate = [];
      let ini = (numPage * this.itemsPerPage) - this.itemsPerPage;
      let end = (numPage * this.itemsPerPage);
      this.dataPaginateUP = this.payUpload.slice(ini, end);
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
    onFileChange(e) {
        this.exFile = e.target.files[0];
        return this.exFile; 
        //var files = e.target.files || e.dataTransfer.files;
        //if (!files.length)
        //    return;
        //this.exFile(files[0]);
    },
    async uploadExFilePayments() {
        const excFile = new FormData();
        console.log("File: ", this.exFile)
        excFile.append('p-upload-excel', this.exFile)
        console.log("File: ", excFile)
        await axios.post(`http://localhost:8844/api/portfolio/upload-excel/payments/all`, excFile, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Access-Control-Allow-Origin": "*"
        }
        })
        .then((response) => {
            if(response){
              console.log('Response: ', response)
              this.payDuplicate = response.data.paymentNot;
              this.payUpload = response.data.paymentSuccessfull;
              this.getDataPagesPD(1)
              this.getDataPagesUP(1)
              this.countNU = response.data.paymentNot.length;
              this.$toast.success(`File upload successfull`, {
              position: 'top-right',
              duration: 8000
            });}else{
              this.$toast.warning(`File upload fail`, {
                  position: 'top-right',
                  duration: 8000
              })
            }
        })
        .catch((e)=>{
          this.$toast.danger(`File upload fail`, {
              position: 'top-right',
              duration: 8000
          })
          console.log("Fail to upload!",e)
        })
    }
  }
};
</script>
  
<style>
.grid{
  display: grid;
  grid-template-columns: 1980px;
  grid-template-rows: auto;
  margin: 30px;
}

#upload-section{
  display: flex;
  width: 99.3%;
  height: 96.3%;
}

#form-upload{
  margin-top: 30px;
}

#btn-upload-beads{
  background-color: #07a355;
  color: white;
  margin-top: 35px;
}

#btn-upload-payments{
  background-color: #14082E;
  color: white;
  margin-top: 35px;
}

#form-upload-payments-nr{
  justify-content: center;
  margin-top: 40px;
  display: flex;
  padding-left: 100px;
}

#upload-title{
  margin-bottom: 30px;
}

#fai-log-excel{
  margin-right: 10px;
  color: #07a355;
}

#icon-and-text-upload{
  text-align: left;
}
</style>