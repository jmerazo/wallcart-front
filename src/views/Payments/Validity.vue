<template>
    <section>
        <div id="form-validity">
            <h2 class="font-bold text-2xl">Validity</h2>
            <label class="font-semibold text-lg">From 1996 to the current validity</label><br>

            <div class="row">
                <div class="col-4" id="select-years">
                    <select v-model="year" class="form-control" id="validity-select">
                        <option disabled selected hidden value="">Select a year...</option>
                        <option value="y" v-for="y in yearsList()" :key="y">{{y}}</option>
                    </select>
                </div>           

                <div class="col-2">
                    <a id="btn-validity-report" type="submit" class="btn">Generate</a>
                </div>
            </div>            
        
            <a id="btn-export-consolidated" title="Export report" type="submit" class="btn" @click="expTable"><font-awesome-icon id="fai-export" :icon="['fas', 'file-export']"/></a>
            
            <div class="row" id="form-validity-list">
                
                <div class="col-12" id="form-search-list">
                    <table class="table table table-striped table-hover">
                    <thead class="thead-dark">
                        <tr id="tr-title">
                            <th>REGIMEN</th>
                            <th>NIT</th>
                            <th>ENTIDAD</th>
                            <th>VIGENCIA</th>
                            <th>VALOR</th>
                        </tr>
                    </thead>
                    <tbody>                      
                        <tr v-for="v in dataPaginate" :value="v.nit" :key="v.nit">
                            <td>{{v.nom_reg}}</td>
                            <td>{{v.nit}}</td>
                            <td>{{v.nombre}}</td>
                            <td>{{v.vigencia}}</td>
                            <td>{{v.valor}}</td>
                        </tr>
                    </tbody>
                    </table>
                    <table class="table table table-striped table-hover" id="table-validity-none">
                        <thead class="thead-dark">
                            <tr id="tr-title">
                                <th>REGIMEN</th>
                                <th>NIT</th>
                                <th>ENTIDAD</th>
                                <th>VIGENCIA</th>
                                <th>VALOR</th>
                            </tr>
                        </thead>
                        <tbody>                      
                            <tr v-for="v in validity" :value="v.nit" :key="v.nit">
                                <td>{{v.nom_reg}}</td>
                                <td>{{v.nit}}</td>
                                <td>{{v.nombre}}</td>
                                <td>{{v.vigencia}}</td>
                                <td>{{v.valor}}</td>
                            </tr>
                        </tbody>
                    </table>                    
                </div>
                <nav aria-label="Page navigation example" id="pag-validity">
                    <ul class="pagination">
                        <li class="page-item" @click="getPreviousPage"><a class="page-link" href="#">Previous</a></li>
                        <li v-for="page in totalPages()" :key="page" @click="getDataPages(page)" class="page-item"><a class="page-link" href="#">{{page}}</a></li>
                        <li class="page-item" @click="getNextPage"><a class="page-link" href="#">Next</a></li>
                    </ul>
                </nav> 
            </div>
        </div>                                
    </section>
</template>

<script>
import axios from "axios";
import * as XLSX from 'xlsx/xlsx.mjs';

export default {
  components: {
  },
  name: "PaymentsList",
  data() {
    return {
        currentYear: new Date().getFullYear(),
        endYear: 1996,
        validity: [],
        itemsPerPage: 100,
        dataPaginate: [],
        actualPage: 1,
        dateReport: new Date(),
        year: '',
        years: []
    };    
  },
  mounted() {
    this.validityList();
    this.getDataPages(1);
  },
  computed: {
    
  },
  methods: {
    yearsList(){
        for(this.endYear;this.endYear<=this.currentYear;this.endYear++){
            console.log(this.endYear)
            this.years = this.years.concat(this.endYear)
            console.log(this.years)
        }
        return this.years;
    },
    expTable(){
        var workbook = XLSX.utils.table_to_book(document.getElementById("table-validity-none"));
        const filename = `HJMH_REPORT_VALIDITY_TO_${this.currentYear}_DOWNLOAD_${this.dateReport}`;
        XLSX.writeFile(workbook, `${filename}.xlsx`);
    },
    totalPages() {
      return Math.ceil(this.validity.length / this.itemsPerPage)
    },
    getDataPages(numPage){
      this.actualPage = numPage;
      this.dataPaginate = [];
      let ini = (numPage * this.itemsPerPage) - this.itemsPerPage;
      let end = (numPage * this.itemsPerPage);
      this.dataPaginate = this.validity.slice(ini, end);
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
    async validityList(){
      await axios.get("http://localhost:8844/api/validity/report", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then((Response) => {
        this.validity = Response.data;
      });
    }
  }
};

</script>

<style>
#validity-select{
    width: 180px;
    margin-left: 50px;
}

#pag-validity{
  margin-bottom: 30px;
  margin-top: 20px;
}

#form-validity{
    padding-top: 50px;
}

#table-validity-none{
    display: none;
}

#btn-validity-report{
  background-color: #ab0d2f;
  color: white;
}
</style>