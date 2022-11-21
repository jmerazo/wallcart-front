<template>
    <div>
        <a id="btn-contracs-list" href="/contracs/all" class="btn" type="button" title="List Contracs"><font-awesome-icon id="fai-business-list" :icon="['fas', 'fas', 'file']"/></a>
    </div>
    <div class="row" id="form-business-gral">
        <div class="col-3" id="form-business-ppal">
            <h2 id="register-title" class="font-bold text-2xl">Contracs</h2>
            <label id="register-subtitle" class="font-semibold text-lg"> Add new contrac</label><br>

            <div id="form-business-all">
                <div id="form-business-inputs">
                    <font-awesome-icon id="fai-search" :icon="['fas', 'id-card']" />
                    <label class="form-label">Número de contrato</label>
                    <input type="text" v-model="contrato" class="form-control" id="form-business">
                </div>

                <div id="form-business-inputs">
                    <font-awesome-icon id="fai-search" :icon="['fas', 'id-card']" />
                    <label class="form-label">Nit</label>
                    <input type="text" v-model="nit" class="form-control" id="form-business">
                </div>
                
                <div id="form-business-inputs">
                    <font-awesome-icon id="fai-search" :icon="['fas', 'layer-group']"/>
                    <label class="form-label">Regimen</label>
                    <select v-model="regimen" @change="listCities()" class="form-control" id="form-business">
                        <option value="" disabled selected>Select an regime...</option>
                        <!--option v-show="departamento" :value="departamento">{{this.departmentSearch}}</option-->
                        <option v-for="reg in regimens" :value="reg" :key="reg.cod_reg">{{reg.cod_reg + " - " + reg.nom_reg}}</option>
                    </select>
                </div>

                <div id="form-business-inputs">
                    <font-awesome-icon id="fai-search" :icon="['fas', 'mobile']" />
                    <label class="form-label">Celular</label>
                    <input type="number" v-model="celular" class="form-control" id="form-business">
                </div>                 

                <div id="form-business-inputs">
                    <font-awesome-icon id="fai-search" :icon="['fas', 'envelope']" />
                    <label class="form-label">Correo</label>
                    <input type="email" v-model="correo" class="form-control" id="form-business">
                </div>
                
                <div id="form-business-inputs">
                    <font-awesome-icon id="fai-search" :icon="['fas', 'map-location']" />
                    <label class="form-label">Dirección</label>
                    <input type="text" v-model="direccion" class="form-control" id="form-business">
                </div>

                <div id="form-business-inputs">
                    <font-awesome-icon id="fai-log" :icon="['fas', 'location-dot']"/><label class="form-label">Departments</label>
                    <select v-model="departamento" @change="listCities()" class="form-control" id="form-business">
                        <option value="" disabled selected>Select an department...</option>
                        <!--option v-show="departamento" :value="departamento">{{this.departmentSearch}}</option-->
                        <option v-for="department in departments" :value="department" :key="department.code">{{department.name}}</option>
                    </select>
                </div>

                <div id="form-business-inputs">
                    <font-awesome-icon id="fai-log" :icon="['fas', 'location-pin']"/><label class="form-label">Cities</label>
                    <select v-model="ciudad" class="form-control" id="form-business">
                    <option value="" disabled selected>Select an city...</option>
                    <!--option v-show="ciudad" :value="ciudad">{{this.citySearch}}</option-->
                    <option v-for="city in cities" :value="city.code" :key="city.code">{{city.name}}</option>
                    </select>
                </div>
                
                <div id="btn-content">
                    <a type="submit" class="btn" id="btn-business-create" @click="addBusiness">Create</a>
                </div>
            </div>
        </div>

        <div class="col-8" id="form-business-all">
            <div id="form-search-business" class="row">
                <div class="col-2" id="search-business">
                    <font-awesome-icon id="fai-search" :icon="['fas', 'filter']"/><label class="form-label">Filter by: </label>
                    <select v-model="filter" id="type" class="form-control">
                        <option value="" disabled selected>Select option...</option>
                        <option value="nit">Nit</option>
                        <option value="num_cto">Contrato</option>
                    </select>
                </div>

                <div class="col-2" id="search-business">
                    <font-awesome-icon id="fai-search" :icon="['fas', 'list-ol']" />
                    <label class="form-label">Nit / Contrato</label>
                    <input v-on:keyup="searchBusiness()" v-model="params" type="text" class="form-control" placeholder="901123456-1">
                </div>
            </div>                

            <table class="table table table-striped table-hover">
                <thead class="table-dark">
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
            nit : null,
            nombre : null,
            regimen : null,
            celular : null,
            correo : null,
            direccion : null,
            ciudad : null,
            departamento : null,
            cities : [],
            codeDepartment : null,
            codeCity : null,
            departments : [],
            regimens : [],
            busineDelete : null,
            contracsSearch : []
        };
    },
    mounted() {
        this.listBusinessAll();
        this.listDepartments();
        this.listRegimenAll();
    },
    computed: {       
    },
    methods: {
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
        async listBusinessAll(){
            await axios.get(`http://localhost:8844/api/business/all`, {
                headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
                }
            })
            .then((Response) => {
                console.log('Business: ', Response.data)
                this.businessAll = Response.data;
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
        },
        async listRegimenAll(){
            await axios.get(`http://localhost:8844/api/utils/regimen`, {
                headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
                }
            })
            .then((Response) => {
                console.log('Business: ', Response.data)
                this.regimens = Response.data;
            })
            .catch((e) => {
                console.log(e)
            })
        },
        async listDepartments(){
            await axios.get(`http://localhost:8844/api/utils/departments`, {
                headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
                }
            })
            .then((Response) => {
                console.log('Business: ', Response.data)
                this.departments = Response.data;
            })
            .catch((e) => {
                console.log(e)
            })
        },
        async listCities(){
            console.log('Department code: ', this.departamento.code)
            await axios.get(`http://localhost:8844/api/utils/cities/${this.departamento.code}`, {
                headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
                }
            })
            .then((Response) => {
                console.log('Cities: ', Response.data)
                this.cities = Response.data;
            })
            .catch((e) => {
                console.log(e)
            })
        }
    }
};
</script>

<style>
#form-business-gral{
    display: flex;
    width: 99%;
}

#form-business-ppal{
    justify-content: center;
    justify-items: center;
    align-items: center;
    text-align: center;
}

#form-business{
    width: 300px;
}

#form-business-all{
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 20px;
    top: 0;
}

#form-business-inputs{
    text-align: left;
}

#btn-business-create{
    background-color: #ab0d2f;
    color: white;
}

#btn-content{
    margin-top: 30px;
}
</style>