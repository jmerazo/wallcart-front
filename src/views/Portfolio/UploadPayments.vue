<template>
    <section id="upload-section">                 
      <div class="col-12" id="form-upload-payments">
        <form enctype="multipart/form-data" id="form-upload">
          <div class="row">
            <div class="col-12">
              <div id="upload-title">
                <h2 class="font-bold text-2xl">PAYMENTS</h2>
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
                    <tr v-for="pd in payDuplicate" :value="pd.nit" :key="pd.nit">
                        <td>{{pd.nit}}</td>
                        <td>{{pd.contrato}}</td>
                        <td>{{pd.cuenta}}</td>
                        <td>{{pd.fecha_cuenta}}</td>
                        <td>{{pd.factura}}</td>
                        <td>{{pd.valor_abonado}}</td>
                        <td>{{pd.fecha_abono}}</td>
                        <td>{{pd.glosa_aceptada}}</td>
                        <td>{{pd.fga}}</td>
                        <td style="color:brown">Excede el saldo</td>
                    </tr>
                </tbody>
              </table>
            </div>
            <div v-show="payUpload.length != 0">
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
                    <tr v-for="pd in payUpload" :value="pd.nit" :key="pd.nit">
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
            </div>
          </div>
        </form>
      </div>      
    </section>     
  </template>
  
  <script>
  import axios from 'axios'
  export default {
    components: {
    },
    name: "UploadPayments",
    data() {
      return {
        exFile : null,
        payDuplicate: [],
        payUpload: []
      };    
    },
    mounted() {
    },
    computed: {
    },
    methods: {
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
            await axios.post(`http://localhost:8844/api/portfolio/upload-excel/payments`, excFile, {
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
                  this.$toast.success(`File upload successfull`, {
                  position: 'top-right',
                  duration: 8000
                });}else{
                  this.$toast.danger(`File upload fail`, {
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
  background-color: #ab0d2f;
  color: white;
  margin-top: 35px;
}

#form-upload-payments{
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