<template>
    <section id="upload-section">                 
      <div class="col-12" id="form-upload-payments">
        <form enctype="multipart/form-data" id="form-upload">
          <div class="row">
            <div class="col-12">
              <div id="upload-title">
                <h2 class="font-bold text-2xl">BEADS TO UPLOAD</h2>
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
                <a id="btn-upload-beads" type="submit" class="btn" value="Store File" @click="uploadExFileBeads">Upload</a>
              </div>
            </div>
            
            <div v-show="beadsDuplicate.length != 0">
              <span class="font-bold text-2xl">ALREADY EXITS, NOT LOADED</span>
              <table class="table table table-striped table-hover">
                <thead class="thead-dark">
                    <tr id="tr-title">
                        <th>NIT</th>
                        <th>CONTRATO</th>
                        <th>REGIMEN</th>
                        <th>MODALIDAD</th>
                        <th>CUENTA</th>
                        <th>FECHA_CUENTA</th>
                        <th>FEC RAD CUENTA</th>
                        <th>VR CUENTA</th>
                        <th style="color:brown">ERROR</th>                        
                    </tr>
                </thead>
                <tbody>                      
                    <tr v-for="pd in beadsDuplicate" :value="pd.nit" :key="pd.nit">
                        <td>{{pd.nit}}</td>
                        <td>{{pd.contrato}}</td>
                        <td>{{pd.regimen}}</td>
                        <td>{{pd.modalidad}}</td>
                        <td>{{pd.cuenta}}</td>
                        <td>{{pd.fecha_cuenta}}</td>
                        <td>{{pd.fec_rad_cuenta}}</td>
                        <td>{{pd.valor_cuenta}}</td>
                        <td style="color:brown">Already Exits</td>
                    </tr>
                </tbody>
              </table>
            </div>
            <div v-show="beadsUpload.length != 0">
              <span class="font-bold text-2xl">BEADS LOADED SUCESSFULLY</span>
              <table class="table table table-striped table-hover">
                <thead class="thead-dark">
                    <tr id="tr-title">
                      <th>NIT</th>
                      <th>CONTRATO</th>
                      <th>REGIMEN</th>
                      <th>MODALIDAD</th>
                      <th>CUENTA</th>
                      <th>FECHA_CUENTA</th>
                      <th>FEC RAD CUENTA</th>
                      <th>VR CUENTA</th>
                      <th style="color:forestgreen">UPLOAD</th>
                    </tr>
                </thead>
                <tbody>                      
                    <tr v-for="pd in beadsUpload" :value="pd.nit" :key="pd.nit">
                        <td>{{pd.nit}}</td>
                        <td>{{pd.contrato}}</td>
                        <td>{{pd.regimen}}</td>
                        <td>{{pd.modalidad}}</td>
                        <td>{{pd.cuenta}}</td>
                        <td>{{pd.fecha_cuenta}}</td>
                        <td>{{pd.fec_rad_cuenta}}</td>
                        <td>{{pd.valor_cuenta}}</td>
                        <td style="color:forestgreen">Loaded</td>
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
        beadsDuplicate: [],
        beadsUpload: []
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
        },
        async uploadExFileBeads() {
            const excFile = new FormData();
            console.log("File: ", this.exFile)
            excFile.append('p-upload-excel', this.exFile)
            console.log("File: ", excFile)
            await axios.post(`http://localhost:8844/api/portfolio/upload-excel/beads`, excFile, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*"
            }
            })
            .then((response) => {
                if(response){
                  this.beadsDuplicate = response.data.beadsNot;
                  this.beadsUpload = response.data.beadsSuccessfull;
                  this.$toast.danger(`Beads validate`, {
                  position: 'top-right',
                  duration: 8000
                });}else{
                    this.$toast.danger(`File upload fail`, {
                        position: 'top-right',
                        duration: 8000
                    })
                }
                console.log('Success')
            })
            .catch(()=>{
                console.log("Fail to upload!")
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