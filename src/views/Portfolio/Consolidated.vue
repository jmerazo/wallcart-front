<template>
    <section id="test2">                 
        <div id="form-search-data">
          <h2 id="register-title" class="font-bold text-2xl">Consolidated Cartera</h2>
          <label id="register-subtitle" class="font-semibold text-lg">Information</label><br>
  
          <div class="row" id="form-label-input">
          <a id="btn-export-consolidated" title="Export report" type="submit" class="btn" @click="expTable"><font-awesome-icon id="fai-export" :icon="['fas', 'file-export']"/></a>
          <div class="col-12" id="form-search-list">
            <table class="table table table-striped table-hover" id="consolidated">
                <thead class="table-dark">
                    <tr id="tr-title">
                        <th>NIT</th>
                        <th>NOMBRE EMPRESA</th>
                        <th>CÓDIGO</th>
                        <th>REGIMEN</th>
                        <th>CONTRATO</th>
                        <th>MODALIDAD</th>
                        <th>CUENTA</th>
                        <th>VALOR CTA</th>
                        <th>FEC CTA</th>
                        <th>FEC RAD CTA</th>
                        <th>FACTURA</th>
                        <th>FEC FRA</th>
                        <th>FEC RAD FRA</th>
                        <th>VALOR ABONADO</th>
                        <th>FECHA ABONO</th>
                        <th>GLOSA INICIAL</th>
                        <th>FEC GI</th>
                        <th>GLOSA ACEPTADA</th>
                        <th>FEC GA</th>
                        <th>SALDO</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="s in search" :value="s.id" :key="s.id">
                        <td>{{s.NIT}}</td>
                        <td>{{s.NOMBRE_EMPRESA}}</td>
                        <td>{{s.COD_REGIMEN}}</td>
                        <td>{{s.REGIMEN}}</td>
                        <td>{{s.CONTRATO}}</td>
                        <td>{{s.MODALIDAD}}</td>
                        <td>{{s.CUENTA}}</td>
                        <td>{{s.VR_CUENTA}}</td>
                        <td>{{s.FECHA_CUENTA}}</td>
                        <td>{{s.FEC_RAD_CTA}}</td>
                        <td>{{s.FACTURA}}</td>
                        <td>{{s.FECHA_FACTURA}}</td>
                        <td>{{s.FECHA_RAD_FRA}}</td>
                        <td>{{s.VR_ABONADO}}</td>
                        <td>{{s.FEC_ABONO}}</td>
                        <td>{{s.GLOSA_INICIAL}}</td>
                        <td>{{s.FEC_GI}}</td>
                        <td>{{s.GLOSA_ACEPTADA}}</td>
                        <td>{{s.FEC_GA}}</td>
                        <td>{{s.SALDO}}</td>
                    </tr>
                </tbody>
            </table>                       
        </div>
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
name: "ConsolidatedPortf",
data() {
    return {
        search: []
    };    
},
mounted() {
    this.consolidatedReport();    
},
computed: {
},
methods: {
    expTable(){
        var workbook = XLSX.utils.table_to_book(document.getElementById("consolidated"));
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
    expReport() {
        let data = XLSX.utils.json_to_sheet(this.search);
        const workbook = XLSX.utils.book_new();
        const filename = "report_payments";
        XLSX.utils.book_append_sheet(workbook, data, filename);
        XLSX.writeFile(workbook, `${filename}.xlsx`);
    },
    async consolidatedReport() {
        await axios.get(`http://localhost:8844/api/portfolio/consolidated`, {
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