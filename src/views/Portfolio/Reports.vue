<template>
    <section id="test2">                 
        <div id="form-search-data">
          <h2 id="register-title" class="font-bold text-2xl">Search data</h2>
          <label id="register-subtitle" class="font-semibold text-lg">Find By: </label><br>
  
          <div class="row" id="form-label-input">
            <div class="row" id="form-search-parameters">
                <div class="col-2" id="align-text-fai">
                    <font-awesome-icon id="fai-search" :icon="['fas', 'list-ol']"/><label class="form-label">Nit</label>
                    <input v-model="nits" type="text" class="form-control" placeholder="901123456-1">
                </div>
    
                <div class="col-2" id="align-text-fai">
                    <font-awesome-icon id="fai-search" :icon="['fas', 'calendar']"/><label class="form-label">Initial date</label>
                    <input v-model="date_init" type="text" class="form-control" placeholder="2022-01-01">
                </div>
    
                <div class="col-2" id="align-text-fai">
                    <font-awesome-icon id="fai-search" :icon="['fas', 'calendar']"/><label class="form-label">Final date</label>
                    <input v-model="date_end" type="text" class="form-control" placeholder="2022-12-31">
                </div>

                <div class="col-2">
                    <a id="btn-search-report" type="submit" class="btn" @click="searchParameters">Search</a>
                </div>
            </div>
            
            <div class="row" id="form-search-parameters">
                <span class="font-semibold text-lg">Filter:</span>
                <div class="col-2" id="align-text-fai">
                    <font-awesome-icon id="fai-search" :icon="['fas', 'filter']"/><label class="form-label">Filter by: </label>
                    <select v-model="filterParams" id="type" class="form-control">
                        <option value="" disabled selected>Select option...</option>
                        <option value="nit">Nit</option>
                        <option value="contrato">Contrato</option>
                        <option value="regimen">Regimen</option>
                        <option value="modalidad">Modalidad</option>
                        <option value="cuenta">Cuenta</option>
                        <option value="factura">Factura</option>
                        <option value="fecha_factura">Fecha factura</option>
                        <option value="fecha_radicacion">Fecha de radicación</option>
                        <option value="fecha_abono">Fecha de abono</option>
                        <option value="fecha_glosa_inicial">Fecha de glosa inicial</option>
                        <option value="fecha_glosa_aceptada">Fecha de glosa aceptada</option>
                    </select>
                </div>
    
                <div class="col-2" id="align-text-fai">
                    <font-awesome-icon id="fai-search" :icon="['fas', 'calendar']"/>
                    <input v-model="param" type="text" class="form-control" placeholder="searching">
                </div>

                <div class="col-2">
                    <a id="btn-search-report" type="submit" class="btn" @click="filterParameters">Search</a>
                </div>
            </div> 

          </div>
          <a id="btn-search-export" title="Export report" type="submit" class="btn" @click="expReport"><font-awesome-icon id="fai-export" :icon="['fas', 'file-export']"/></a>
          <div class="col-12" id="form-search-list">
            <table class="table table table-striped table-hover">
                <thead class="table-dark">
                    <tr id="tr-title">
                        <th>Nit</th>
                        <th>Contrato</th>
                        <th>Regimen</th>
                        <th>Modalidad</th>
                        <th>Cuenta</th>
                        <th>Factura</th>
                        <th>Fec. Fra</th>
                        <th>Fec. Rad</th>
                        <th>V. Total</th>
                        <th>V. Abonado</th>
                        <th>Fec. abono</th>
                        <th>GI</th>
                        <th>F.GI</th>
                        <th>GA</th>
                        <th>F.GA</th>
                        <th>V. Total</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="s in search" :value="s.id" :key="s.id">
                        <td>{{s.nit}}</td>
                        <td>{{s.contrato}}</td>
                        <td>{{s.regimen}}</td>
                        <td>{{s.modalidad}}</td>
                        <td>{{s.cuenta}}</td>
                        <td>{{s.factura}}</td>
                        <td type="date">{{s.fecha_factura}}</td>
                        <td type="date">{{s.fecha_radicacion}}</td>
                        <td>{{s.valor_total_factura}}</td>
                        <td>{{s.valor_abonado}}</td>
                        <td>{{s.fecha_abono}}</td>
                        <td>{{s.glosa_inicial}}</td>
                        <td>{{s.fecha_glosa_inicial}}</td>
                        <td>{{s.glosa_aceptada}}</td>
                        <td>{{s.fecha_glosa_aceptada}}</td>
                        <td>{{s.saldo}}</td>
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
        nit: null,
        nits: null,
        sale: null,
        search: [],
        date_init: null,
        date_end: null,
        filterParams: null,
        param: null
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
    async searchNit() {
        await axios.get(`http://localhost:8844/api/portfolio/nit/${this.nit}`, {
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
        await axios.get(`http://localhost:8844/api/portfolio/sales/${this.sale}`, {
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
        await axios.get(`http://localhost:8844/api/portfolio/date/${this.date}`, {
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
        await axios.get(`http://localhost:8844/api/portfolio/search/${this.nits}/${this.date_init}/${this.date_end}`, {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
        })
        .then((Response) => {
            this.search = Response.data;
        });
    },
    async filterParameters() {
        await axios.get(`http://localhost:8844/api/portfolio/params/${this.filterParams}/${this.param}`, {
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
.row {
  align-items: center;
  justify-items: center;
  justify-content: center;
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

#test2{
    display: flex;
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