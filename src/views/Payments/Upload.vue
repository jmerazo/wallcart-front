<template>
    <section class="container">
    <router-link id="btn-back-payments-panel" :to="{name: 'PaymentsPanel'}" class="btn" type="button">
        <font-awesome-icon id="fai-log-update-password" :icon="['fas', 'chevron-left']"/>}
    </router-link>       
  
      <div class="row">      
        <div id="btn-back">
          <a title="Back" id="btn-back-users-create-top" href="/payments/panel" class="btn" type="button"><font-awesome-icon id="fai-log-update-password" :icon="['fas', 'chevron-left']"/></a>
          <a title="Panel administrator" id="btn-register-user-top" href="" class="btn" type="button"><font-awesome-icon :icon="['fas', 'columns']"/></a>       
        </div>
           
        <div class="col-12" id="form-register-user">
          <h2 id="register-title">Upload File</h2>
            <form action="" enctype="multipart/form-data">
            <div class="row">
    
                <div class="col-4">
                    <font-awesome-icon id="fai-log" :icon="['fas', 'file-excel']"/><label class="form-label">Select file to upload:</label>
                    <input @change="onFileChange" type="file" class="form-control" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
                </div>

                <div class="col-3">
                    <a id="btn-global" type="submit" class="btn" value="Store File" @click="uploadExFile">Upload</a>
                </div>

                <div class="col-12" id="form-search-list">
                    <table class="table table table-striped table-hover">
                        <thead class="thead-dark">
                        <tr id="tr-title">
                            <th class="text-red-500">Nit</th>
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
                        </tbody>
                    </table>                       
                </div>       
            </div>
        </form>
        </div>
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
        exFile : null
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
        async uploadExFile() {
            const excFile = new FormData();
            excFile.append('upload-excel', this.exFile)
            console.log('File: ', this.exFile);
            await axios.post(`http://localhost:8844/api/upload-excel`, excFile, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*"
            }
            })
            .then((response) => {
                if(response){
                    this.$toast.success(`File upload successfull`, {
                    position: 'top-right',
                    duration: 8000
                });}
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
.row {
  align-items: center;
  justify-items: center;
  justify-content: center;
}

#form-search-parameters{
  margin-top: 15px;
}

#btn-global{
  background-color: #ab0d2f;
  color: white;
}

#form-search-list{
  width: 100%;
  margin-top: 20px;
}

#fai-log{
  margin-right: 10px;
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