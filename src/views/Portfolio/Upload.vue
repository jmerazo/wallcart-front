<template>
    <section id="upload-section">                 
      <div class="col-12" id="form-upload-payments">
        <form enctype="multipart/form-data" id="form-upload">
          <div class="row">
            <div id="upload-title">
              <h2 class="font-bold text-2xl">Upload File</h2>
            </div>    
            <div class="col-10" id="icon-and-text-upload">
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
              <a id="btn-upload" type="submit" class="btn" value="Store File" @click="uploadExFile">Upload</a>
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
            console.log("File: ", this.exFile)
            excFile.append('p-upload-excel', this.exFile)
            console.log("File: ", excFile)
            await axios.post(`http://localhost:8844/api/portfolio/upload-excel`, excFile, {
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

#btn-upload{
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