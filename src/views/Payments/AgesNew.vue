<template>
    <section id="test2">                 
        <div id="form-search-data">
            <div class="row" id="form-search-parameters">
                <div class="col-4" id="align-text-fai">
                    <font-awesome-icon id="fai-search" :icon="['fas', 'calendar']"/><label class="form-label">Select date</label><br>
                    <input v-model="dateIn" type="date"><br>
                </div>

                <div class="col-2">
                    <a id="btn-search-report" type="submit" class="btn" @click="agesReport">Generate</a>
                </div>
            </div>
           
            <a id="btn-search-export" title="Export report" type="submit" class="btn" @click="downloadAgesXLSX"><font-awesome-icon id="fai-export" :icon="['fas', 'file-export']"/></a> 
            <div class="row" id="form-label-input">
                <img src="@/assets/resources/logoese.png" alt="Log ESE HJMH" id="img-report-ages">
                <h2 id="register-title" class="font-bold text-2xl">E.S.E Hospital José María Hernández</h2>
                <label id="register-subtitle" class="font-semibold text-lg">Nit: 891.200.679-1</label><br><br>
                <span class="font-semibold text-lg">Informe de cuentas por cobrar de empresas deudoras vencidas</span>
                <table class="table table table-striped table-hover" id="agesTable">
                    <thead class="thead-dark">
                        <tr id="tr-title">
                            <th>Régimen</th>
                            <th>Empresa / Nit</th>
                            <th>No Vencida</th>
                            <th>1 a 30 días</th>
                            <th>31 a 60 días</th>
                            <th>61 a 90 días</th>
                            <th>91 a 180 días</th>
                            <th>181 a 360 días</th>
                            <th>Más de 360 días</th>
                            <th>Saldo por cobrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="a in dataPaginate" :value="a.nit" :key="a.nit">
                            <th v-if="a.cod_reg">{{a.cod_reg +" - "+a.nom_reg}}</th>                           
                            <td>{{a.nombre +" - Nit: "+a.nit}}</td>
                            <td>{{a.edad0}}</td>
                            <td>{{a.edad1}}</td>
                            <td>{{a.edad2}}</td>
                            <td>{{a.edad3}}</td>
                            <td>{{a.edad4}}</td>
                            <td>{{a.edad5}}</td>
                            <td>{{a.edad6}}</td>
                            <td>{{a.edad0+a.edad1+a.edad2+a.edad3+a.edad4+a.edad5+a.edad6}}</td>
                        </tr>
                    </tbody>
                </table> 

                <table class="table table table-striped table-hover" id="tableNone">
                    <thead class="thead-dark">
                        <tr id="tr-title">
                            <th>Régimen</th>
                            <th>Empresa / Nit</th>
                            <th>No Vencida</th>
                            <th>1 a 30 días</th>
                            <th>31 a 60 días</th>
                            <th>61 a 90 días</th>
                            <th>91 a 180 días</th>
                            <th>181 a 360 días</th>
                            <th>Más de 360 días</th>
                            <th>Saldo por cobrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="a in ages" :value="a.nit" :key="a.nit">
                            <th v-if="a.cod_reg">{{a.cod_reg +" - "+a.nom_reg}}</th>                           
                            <td>{{a.nombre +" - Nit: "+a.nit}}</td>
                            <td>{{a.edad0}}</td>
                            <td>{{a.edad1}}</td>
                            <td>{{a.edad2}}</td>
                            <td>{{a.edad3}}</td>
                            <td>{{a.edad4}}</td>
                            <td>{{a.edad5}}</td>
                            <td>{{a.edad6}}</td>
                            <td>{{a.edad0+a.edad1+a.edad2+a.edad3+a.edad4+a.edad5+a.edad6}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <nav aria-label="Page navigation example" id="pagination-ages">
                <ul class="pagination">
                  <li class="page-item" @click="getPreviousPage"><a class="page-link" href="#">Previous</a></li>
                  <li v-for="page in totalPages()" :key="page" @click="getDataPages(page)" class="page-item"><a class="page-link" href="#">{{page}}</a></li>
                  <li class="page-item" @click="getNextPage"><a class="page-link" href="#">Next</a></li>
                </ul>
            </nav>          
        </div>     
    </section>     
</template>

<script>
import axios from "axios";
import * as XLSX from 'xlsx/xlsx.mjs';

export default {
components: {
},
name: "PanelPayments",
setup(){  
},
data() {
    return {
        dateIn: null,
        masks: {
            input: 'YYYY-MM-DD'
        },
        ages: [],
        itemsPerPage: 30,
        dataPaginate: [],
        actualPage: 1,
        dateReport: new Date()
    };    
},
mounted() {
},
computed: {
},
methods: {
    async downloadAgesXLSX(){
        let dataToExport = {
            data : this.ages
        };
        console.log('Data export xlsx: ', dataToExport)
        
        await axios.post(`http://localhost:8844/api/utils/export/ages`, dataToExport,{ responseType: 'blob'})
        .then((response) => {
            console.log('File export: ', response)
            // create file link in browser's memory
            const href = URL.createObjectURL(response.data);

            // create "a" HTML element with href to file & click
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', `Report_ages_HJMH_${this.dateIn}.xlsx`); //or any other extension
            document.body.appendChild(link);
            link.click();

            // clean up "a" element & remove ObjectURL
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        })
        .catch((e) => {
            console.log('Error export: ',e)
        })
    },
    expTable(){
        var workbook = XLSX.utils.table_to_book(document.getElementById("tableNone"));
        const filename = `HJMH_REPORT_AGES_TO_${this.dateIn}_DOWNLOAD_${this.dateReport}`;
        //const sn = `AGES_${this.dateIn}`;
        //XLSX.utils.book_append_sheet(workbook, data, sn);
        //XLSX.utils.sheet_add_aoa(workbook, [
        //    ["E.S.E Hospital José María Hernández"],
        //    ['Nit: 891.200.679-1'],                             // <-- Write 1 to cell B3
        //    ,                                // <-- Do nothing in row 4
        //    ["Informe de cuentas por cobrar de empresas deudoras vencidas"]  // <-- Write "abc" to cell E5
        //], { origin: "E1" });
        XLSX.writeFile(workbook, `${filename}.xlsx`);
    },
    totalPages() {
      return Math.ceil(this.ages.length / this.itemsPerPage)
    },
    getDataPages(numPage){
      this.actualPage = numPage;
      this.dataPaginate = [];
      let ini = (numPage * this.itemsPerPage) - this.itemsPerPage;
      let end = (numPage * this.itemsPerPage);
      this.dataPaginate = this.ages.slice(ini, end);
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
    expReport() {
        let data = XLSX.utils.json_to_sheet(this.ages);
        const workbook = XLSX.utils.book_new();
        const filename = `HJMH_REPORT_AGES_TO_${this.dateIn}_DOWNLOAD_${this.dateReport}`;
        const sn = `AGES_${this.dateIn}`;
        XLSX.utils.book_append_sheet(workbook, data, sn);
        XLSX.writeFile(workbook, `${filename}.xlsx`);
    },
    async agesReport() {
        await axios.get(`http://localhost:8844/api/report/ages/new/${this.dateIn}`, {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
        })
        .then((Response) => {
            this.ages = Response.data;
            this.getDataPages(1)
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

#pagination-ages{
    margin-bottom: 20px;
}

#tableNone{
    display: none;
}

#img-report-ages{
    position: absolute;
    width: 100px;
    height: 100px;
    top: 180px;
}

#btn-search-export{
    left: 500px;
    position: relative;
}

#fai-export{
    margin-right: 5px;
    height: 25px;
    width: 25px;
    color: #07a355;
}

#fai-search{
    margin-right: 5px;
}

#form-label-input{
    margin-top: 20px;
    justify-content: left;
}


#align-text-fai{
    text-align: left;
}

#form-search-data{
    margin: 20px;
}

#form-search-parameters{
  margin-top: 15px;
  justify-content: left;
}

#btn-search-report{
  background-color: #ab0d2f;
  color: white;
  margin-top: 35px;
}

#form-search-list{
  width: 100%;
  margin-top: 20px;
}
</style>