<template>
    <div class="grid">
        <div class="row search-business-gen">
            <div class="col-6">
                <span id="nit" class="font-bold">Nit</span>
                <input id="i-nit" v-model="nit" type="text" placeholder="Input nit business">
                <button type="submit" class="btn" id="btn-nit-gen" @click="generateState()">Generate</button>
            </div>

            <div class="col-6">
                <span id="nit" class="font-bold">Representante legal</span>
                <input type="text" id="i-nit" v-model="rep_legal" placeholder="Input name">
            </div>            
        </div>

        <div class="form-request">
            <div class="btn-export-state">
                <a id="btn-state-export" title="Export report" type="submit" class="btn" @click="downloadStateXLSX()"><font-awesome-icon id="fai-export-state" :icon="['fas', 'file-contract']"/></a> 
            </div>
            <table class="table table table-striped table-hover" id="agesTable">
                <thead class="thead-dark">
                    <tr id="tr-title">
                        <th>Fec. factura</th>
                        <th>Fec. Radicado</th>
                        <th>Factura</th>
                        <th>Valor</th>
                        <th>Abono</th>
                        <th>Glosa inicial</th>
                        <th>Glosa Aceptada</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="a in state" :value="a.nit" :key="a.nit">                        
                        <td v-show="a.saldo_s > 0">{{a.fecha_factura}}</td>
                        <td v-show="a.saldo_s > 0">{{a.fec_rad_factura}}</td>
                        <td v-show="a.saldo_s > 0">{{a.factura}}</td>
                        <td v-show="a.saldo_s > 0">{{a.valor}}</td>
                        <td v-show="a.saldo_s > 0">{{a.valor_abonado}}</td>
                        <td v-show="a.saldo_s > 0">{{a.glosa_inicial}}</td>
                        <td v-show="a.saldo_s > 0">{{a.glosa_aceptada}}</td>
                        <td v-show="a.saldo_s > 0">{{a.saldo_s}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  components: {
  },
  name: "GenerateRequest",
  data() {
    return {
        nit : '',
        state : [],
        rep_legal : ''
    };    
  },
  mounted() {
  },
  computed: {    
  },
  methods: {
    async downloadStateXLSX(){
        let dataToExport = {
            data : this.state,
            rep : this.rep_legal
        };
        console.log('Data export xlsx: ', dataToExport)
        
        await axios.post(`http://localhost:8844/api/utils/export/state`, dataToExport,{ responseType: 'blob'})
        .then((response) => {
            // create file link in browser's memory
            const href = URL.createObjectURL(response.data);

            // create "a" HTML element with href to file & click
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', `Collection_office_HJMH.xlsx`); //or any other extension
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
    async generateState(){
        await axios.get(`http://localhost:8844/api/utils/state/portfolio/${this.nit}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then((Response) => {
        this.state = Response.data;
      });
    }
  }
};
</script>

<style>
.grid{
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto auto;
}

.search-business-gen{
    margin-bottom: 50px;
}

#nit{
    margin-right: 20px;
}

#i-nit{
    text-align: center;
    margin-right: 20px;
}

#btn-nit-gen{
    background-color: brown;
    color: white;
}

.btn-export-state{
    justify-content: right;
    align-items: right;
}

#fai-export-state{
    width: 20px;
    height: 20px;
}
</style>