<template>
    <section id="test2">                 
        <div id="form-search-data">
            <div class="row" id="form-search-parameters">
                <div class="col-4" id="align-text-fai">
                    <font-awesome-icon id="fai-search" :icon="['fas', 'calendar']"/><label class="form-label">Select date</label><br>
                    <input v-model="dateIn" type="date"><br>
                    <!--v-date-picker class="inline-block h-full" v-model="date" :masks="masks" mode='date' data="YYYY-MM-DD" :format="YYYY-MM-DD">
                        <template v-slot="{ inputValue, togglePopover }">
                            <div class="flex items-center">
                                <button
                                    class="p-2 bg-blue-100 border border-blue-200 hover:bg-blue-200 text-blue-600 rounded-l focus:bg-blue-500 focus:text-white focus:border-blue-500 focus:outline-none"
                                    @click="togglePopover()"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        class="w-4 h-4 fill-current"
                                    >
                                        <path
                                            d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
                                        ></path>
                                    </svg>
                                </button>
                                <input
                                :value="inputValue"
                                class="bg-white text-gray-700 w-full py-1 px-2 appearance-none border rounded-r focus:outline-none focus:border-blue-500"
                                readonly
                                />
                            </div>
                        </template>
                    </v-date-picker-->
                </div>

                <div class="col-2">
                    <a id="btn-search-report" type="submit" class="btn" @click="agesReport">Search</a>
                </div>
            </div>
           
            <a id="btn-search-export" title="Export report" type="submit" class="btn" @click="expReport"><font-awesome-icon id="fai-export" :icon="['fas', 'file-export']"/></a> 
            <div class="row" id="form-label-input">
                <img src="@/assets/resources/logoese.png" alt="Log ESE HJMH" id="img-report-ages">
                <h2 id="register-title" class="font-bold text-2xl">E.S.E Hospital José María Hernández</h2>
                <label id="register-subtitle" class="font-semibold text-lg">Nit: 891.200.679-1</label><br><br>
                <span class="font-semibold text-lg">Informe de cuentas por cobrar de empresas deudoras vencidas</span>
                <table class="table table table-striped table-hover">
                    <thead class="thead-dark">
                      <tr id="tr-title">
                          <th>Empresa / Nit</th>
                          <th>No Vencida</th>
                          <th>1 a 30 días</th>
                          <th>31 a 60 días</th>
                          <th>61 a 90 días</th>
                          <th>91 a 180 días</th>
                          <th>181 a 360 días</th>
                          <th>Más de 360 días</th>
                          <th>Saldo por cobrar</th>
                          <th>Glosas por cobrar</th>
                          <th>Por conciliar</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="a in ages" :value="a.nit" :key="a.nit">
                          <td><th v-if="a.cod_reg">{{a.cod_reg +" - "+a.nom_reg}}</th> {{a.nombre +" - Nit: "+a.nit}}</td>
                          <td>{{a.edad0}}</td>
                          <td>{{a.edad1}}</td>
                          <td>{{a.edad2}}</td>
                          <td>{{a.edad3}}</td>
                          <td>{{a.edad4}}</td>
                          <td>{{a.edad5}}</td>
                          <td>{{a.edad6}}</td>
                          <td>{{'p'}}</td>
                          <td>{{'p'}}</td>
                          <td>{{'p'}}</td>
                      </tr>
                    </tbody>
                  </table> 
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
name: "PanelPayments",
data() {
    return {
        date: null,
        dateIn: null,
        masks: {
            input: 'YYYY-MM-DD'
        },
        nit: null,
        nits: null,
        sale: null,
        ages: [],
        date_init: null,
        date_end: null
    };    
},
mounted() {
},
computed: {
},
methods: {
    expReport() {
        let data = XLSX.utils.json_to_sheet(this.search);
        const workbook = XLSX.utils.book_new();
        const filename = "report_payments";
        XLSX.utils.book_append_sheet(workbook, data, filename);
        XLSX.writeFile(workbook, `${filename}.xlsx`);
    },
    async agesReport() {
        await axios.get(`http://localhost:8844/api/report/ages/${this.dateIn}`, {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
        })
        .then((Response) => {
            this.ages = Response.data;
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

#img-report-ages{
    position: absolute;
    width: 100px;
    height: 55px;
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