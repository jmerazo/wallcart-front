<template>
    <div class="grid-contracs">
        <div id="form-contracs-register">
            <div>
                <a id="btn-contracs-list" href="/contracs/all" class="btn" type="button" title="List Contracs"><font-awesome-icon id="fai-contracs-list" :icon="['fas', 'file']"/></a>
            </div>
            <h2 id="register-title" class="font-bold text-2xl">Contracs</h2>
            <label id="register-subtitle" class="font-semibold text-lg"> Add new contrac</label><br>

            <div id="form-contracs-all">
                <div id="form-contracs-inputs">
                    <font-awesome-icon id="fai-search" :icon="['fas', 'sort-numeric-asc']" />
                    <label class="form-label">Número de contrato</label>
                    <input type="text" v-model="num_cto" class="form-control" id="form-contracs">
                </div>

                <div id="form-contracs-inputs">
                    <font-awesome-icon id="fai-search" :icon="['fas', 'id-card']" />
                    <label class="form-label">Nit</label>
                    <input type="text" v-model="nit" class="form-control" id="form-contracs">
                </div>
                
                <div id="form-contracs-inputs">
                    <font-awesome-icon id="fai-search" :icon="['fas', 'crutch']"/>
                    <label class="form-label">Modalidad</label>
                    <input type="text" v-model="modalidad_cto" class="form-control" id="form-contracs">
                </div>

                <div id="form-contracs-inputs">
                    <font-awesome-icon id="fai-log" :icon="['fas', 'barcode']"/>
                    <label class="form-label">Código servicio</label>
                    <input type="text" v-model="cod_serv_cto" class="form-control" id="form-contracs">
                </div>

                <div id="form-contracs-inputs">
                    <font-awesome-icon id="fai-search" :icon="['fas', 'turn-up']" />
                    <label class="form-label">Nivel</label>
                    <input type="text" v-model="nivel_cto" class="form-control" id="form-contracs">
                </div>                 

                <div id="form-contracs-inputs">
                    <font-awesome-icon id="fai-search" :icon="['fas', 'calendar']" />
                    <label class="form-label">Fecha inicio</label>
                    <input type="date" v-model="fec_ini_cto" class="form-control" id="form-contracs">
                </div>
                
                <div id="form-contracs-inputs">
                    <font-awesome-icon id="fai-search" :icon="['fas', 'calendar']" />
                    <label class="form-label">Fecha fin</label>
                    <input type="date" v-model="fec_fin_cto" class="form-control" id="form-contracs">
                </div>

                <div id="form-contracs-inputs">
                    <font-awesome-icon id="fai-log" :icon="['fas', 'money-bill']"/>
                    <label class="form-label">Valor del contrato</label>
                    <input type="number" v-model="valor_cto" class="form-control" id="form-contracs">
                </div>
                
                <div id="btn-content">
                    <a type="submit" class="btn" id="btn-contracs-create" @click="addContracs">Create</a>
                </div>
            </div>
        </div>

        <div id="form-contracs-search">
            <div id="form-search-contracs" class="row">
                <div class="col-2" id="search-contracs">
                    <font-awesome-icon id="fai-search" :icon="['fas', 'filter']"/><label class="form-label">Filter by: </label>
                    <select v-model="filter" id="type" class="form-control">
                        <option value="" disabled selected>Select option...</option>
                        <option value="nit">Nit</option>
                        <option value="num_cto">Contrato</option>
                    </select>
                </div>

                <div class="col-2" id="search-contracs">
                    <font-awesome-icon id="fai-search" :icon="['fas', 'list-ol']" />
                    <label class="form-label">Nit / Contrato</label>
                    <input v-on:keyup="searchContracs()" v-model="params" type="text" class="form-control" placeholder="901123456-1">
                </div>
            </div>                

            <table class="table table table-striped table-hover" id="table-search">
                <thead id="table-title">
                    <tr id="tr-title">
                        <th>Contrato</th>
                        <th>Nit</th>
                        <th>Empresa</th>
                        <th>Modalidad</th>
                        <th>Nivel</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th>Valor Contrato</th>
                        <th>Código</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="s in contracsSearch" :value="s.id" :key="s.id">
                        <td>{{ s.num_cto }}</td>
                        <td>{{ s.nit }}</td>
                        <td>{{ s.nombre }}</td>
                        <td>{{ s.modalidad_cto }}</td>
                        <td>{{ s.nivel_cto }}</td>
                        <td>{{ s.fec_ini_cto }}</td>
                        <td>{{ s.fec_fin_cto }}</td>
                        <td>{{ s.valor_cto }}</td>
                        <td>{{ s.cod_serv_cto }}</td>
                        <td>
                            <a id="il-cfg" title="Update" type="submit"><router-link :to="{name: 'BusinessUpdate', params: {id : s.id}}"><font-awesome-icon id="fai-list" :icon="['fas', 'user-pen']"/></router-link></a>
                            <a id="il-cfg" title="Delete" type="submit" @click="businessDelete()"><router-link :to="{name: 'BusinessDelete', params: {id : s.id}}"><font-awesome-icon id="fai-list" :icon="['fas', 'trash']"/></router-link></a>
                        </td>
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
    name: "AddContrac",
    data() {
        return {
            num_cto : null,
            nit : null,
            modalidad_cto : null,
            nivel_cto : null,
            fec_ini_cto : null,
            fec_fin_cto : null,
            valor_cto : null,
            cod_serv_cto : null,
            contrac_delete : "",
            contracsSearch : [],
            params : "",
            filter : ""
        };
    },
    mounted() {
    },
    computed: {       
    },
    methods: {
        async addContracs(){
            console.log(this.year)
            const contracsData = JSON.stringify({
                num_cto : this.num_cto,
                nit : this.nit,
                modalidad_cto : this.modalidad_cto,
                nivel_cto : this.nivel_cto,
                fec_ini_cto : this.fec_ini_cto,
                fec_fin_cto : this.fec_fin_cto,
                valor_cto : this.valor_cto,
                cod_serv_cto : this.cod_serv_cto
            })

            await axios.post(`http://localhost:8844/api/contracs/add`, contracsData, {
                headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
                }
            })
            .then((Response) => {
                console.log('Response data: ', Response)
                if(Response.data.message == `Contract ${this.num_cto} already exits`){
                    this.$toast.info(`Contract ${this.num_cto} already exits`, {
                    position: 'top-right',
                    duration: 8000
                    })
                }
                console.log(Response)
                this.$toast.success(`Contrac ${Response.data.num_cto} add Successfull`, {
                position: 'top-right',
                duration: 8000
                })
                this.num_cto = "";
                this.nit = "";
                this.modalidad_cto = "";
                this.nivel_cto = "";
                this.fec_ini_cto = "";
                this.fec_fin_cto = "";
                this.valor_cto = "";
                this.cod_serv_cto = "";
                this.$router.push({name: 'Contracs'});             
            })
            .catch((e) => {
                console.log(e)
                this.$toast.warning(`Error, not add`, {
                  position: 'top-right',
                  duration: 8000
                })
            })
        },
        async searchContracs(){
            await axios.get(`http://localhost:8844/api/contracs/filter/${this.filter}/${this.params}`, {
                headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
                }
            })
            .then((Response) => {
                this.contracsSearch = Response.data;
            })
            .catch((e) => {
                console.log(e)
            })
        },
        async businessDelete(){
            console.log('Business delete id: ', this.busineDelete)
            this.busineDelete = this.$route.params.id;
            await axios.delete(`http://localhost:8888/api/business/delete/${this.busineDelete}`,{
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
            })
            .then((Response) => {
                console.log(`Business ${this.busineDelete}`, Response)
                this.$router.push({name: 'Business'});
            })
            .catch((e) => {
                console.log(`Error deleting ${this.busineDelete}`,e)
            })
        }
    }
};
</script>

<style>
.grid-contracs {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 20px;
}

#form-contracs-register{
    margin-top: 5em;
    margin-left: 20px;
    grid-column-start: 1;
    grid-column-end: 2;
    width: 0.2fr;
}

#form-contracs-search{
    margin-top: 8em;
    margin-right: 20px;
    grid-column-start: 2;
    grid-column-end: 3;
}

#table-title{
    background-color: #5f4c69;
    color: white;
}

#btn-contracs-list{
    color: white;
    background-color: #5f4c69;
    margin-top: 15px;
    margin-bottom: 15px;
}

#search-contracs{
    text-align: left;
}

#form-search-contracs{
    margin-bottom: 20px;
    justify-content: left;
    top: 0px;
}

#form-contracs-inputs{
    text-align: left;
}

#btn-contracs-create{
    background-color: #5f4c69;
    color: white;
}

@media (max-width: 768px) {
    .grid {
        grid-template-columns: 1fr;
    }

    #form-contracs-register{
        grid-column-start: 1;
        grid-column-end: 2;
    }

    #form-contracs-search{
        grid-column-start: 1;
        grid-column-end: 2;
    }
}
</style>