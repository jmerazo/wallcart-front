<template>
    <div class="grid">
        <div id="form-business-ppal">
            <div>
                <a id="btn-business-all" href="/business/all" class="btn" type="button" title="List Business"><font-awesome-icon id="fai-business-list" :icon="['fas', 'house-medical']"/></a>
            </div>
            <h2 id="register-title" class="font-bold text-2xl">Empresas</h2>
            <label id="register-subtitle" class="font-semibold text-lg"> Agregar </label><br>

            <div id="form-business-all">
                <div id="form-business-inputs">
                    <font-awesome-icon id="fai-search" :icon="['fas', 'id-card']" />
                    <label class="form-label">Nit</label>
                    <input type="text" v-model="nit" class="form-control" id="form-business">
                </div>
                
                <div id="form-business-inputs">
                    <font-awesome-icon id="fai-search" :icon="['fas', 'signature']" />
                    <label class="form-label">Nombre</label>
                    <input type="text" v-model="nombre" class="form-control" id="form-business">
                </div>
                
                <div id="form-business-inputs">
                    <font-awesome-icon id="fai-search" :icon="['fas', 'layer-group']"/>
                    <label class="form-label">Regimen</label>
                    <select v-model="regimen" @change="listCities()" class="form-control" id="form-business">
                        <option value="" disabled selected>Select an regime...</option>
                        <!--option v-show="departamento" :value="departamento">{{this.departmentSearch}}</option-->
                        <option v-for="reg in regimens" :value="reg.cod_reg" :key="reg.cod_reg">{{reg.cod_reg + " - " + reg.nom_reg}}</option>
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
                        <option v-for="department in departments" :value="department.code" :key="department.code">{{department.name}}</option>
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
                    <a type="submit" class="btn" id="btn-business-create-b" @click.prevent="addBusiness()">Guardar</a>
                </div>
            </div>
        </div>

        <div id="form-business-all-search">
            <div id="form-search-business" class="row">
                <div class="col-2" id="search-business">
                    <font-awesome-icon id="fai-search" :icon="['fas', 'filter']"/><label class="form-label">Filtro </label>
                    <select v-model="filter" id="type" class="form-control">
                        <option value="" disabled selected>Seleccione una opción...</option>
                        <option value="nit">Nit</option>
                        <option value="nombre">Nombre Empresa</option>
                    </select>
                </div>

                <div class="col-2" id="search-business">
                    <font-awesome-icon id="fai-search" :icon="['fas', 'list-ol']" />
                    <label class="form-label">Nit / Nombre empresa</label>
                    <input v-on:keyup="searchBusiness()" v-model="params" type="text" class="form-control" placeholder="901123456-1">
                </div>
            </div>                

            <table class="table table table-striped table-hover">
                <thead class="table-dark">
                    <tr id="tr-title">
                        <th>Nit</th>
                        <th>Nombre</th>
                        <th>Regimen</th>
                        <th>Celular</th>
                        <th>Correo</th>
                        <th>Dirección</th>
                        <th>Ciudad</th>
                        <th>Departamento</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="s in businessSearch" :value="s.id" :key="s.id">
                        <td>{{ s.nit }}</td>
                        <td>{{ s.nombre }}</td>
                        <td>{{ s.cod_reg }}</td>
                        <td>{{ s.celular }}</td>
                        <td>{{ s.correo }}</td>
                        <td>{{ s.direccion }}</td>
                        <td>{{ s.ciudad }}</td>
                        <td>{{ s.departamento }}</td>
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
    name: "BusinessForm",
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
            businessSearch : [],
            busineDelete : null,
            filter : "",
            params : ""
        };
    },
    mounted() {
        this.listDepartments();
        this.listRegimenAll();
    },
    computed: {       
    },
    methods: {
        async searchBusiness(){
            await axios.get(`http://localhost:8844/api/business/filter/${this.filter}/${this.params}`, {
                headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
                }
            })
            .then((Response) => {
                this.businessSearch = Response.data;
            })
            .catch((e) => {
                console.log(e)
            })
        },
        async addBusiness(){
            console.log(this.year)
            const businessData = JSON.stringify({
                nit : this.nit,
                nombre : this.nombre,
                regimen : this.regimen,
                celular : this.celular,
                correo : this.correo,
                direccion : this.direccion,
                ciudad : this.ciudad,
                departamento : this.departamento
            })
            await axios.post(`http://localhost:8844/api/business/add`, businessData, {
                headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
                }
            })
            .then((Response) => {
                console.log(Response)
                if(Response.data.message == `Business ${this.nombre} with nit ${this.nit} Already exits`){
                    this.$toast.info(`${Response.data.message}`, {
                    position: 'top-right',
                    duration: 8000
                    })
                }

                if(Response.data.message != `Business ${this.nombre} with nit ${this.nit} Already exits`){
                    this.$toast.success(`Business ${Response.data.nombre} add Successfull`, {
                    position: 'top-right',
                    duration: 8000
                    })
                    this.nit = "";
                    this.nombre = "";
                    this.regimen = "";
                    this.celular = "";
                    this.correo = "";
                    this.direccion = "";
                    this.ciudad = "";
                    this.departamento = "";
                    this.$router.push({name: 'Business'}); 
                }              
            })
            .catch((e) => {
                console.log(e)
                this.$toast.danger(`Error, not add`, {
                  position: 'top-right',
                  duration: 8000
                })
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
            console.log('Department code: ', this.departamento)
            await axios.get(`http://localhost:8844/api/utils/cities/${this.departamento}`, {
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
.grid{
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 20px;
}

#form-business-ppal{
    margin-top: 4em;
    grid-column-start: 1;
    grid-column-end: 2;
    width: 300px;
}

#form-business-all{
    width: 300px;
}

#form-business-all-search{
    margin-top: 7em;
    grid-column-start: 2;
    grid-column-end: 3;
}

#btn-business-all{
    color: white;
    background-color: #14082E;
}

#form-search-business{
    margin-bottom: 20px;
    justify-content: left;
    top: 0px;
}

#search-business{
    text-align: left;
}

#form-business-inputs{
    text-align: left;
}

#btn-business-create-b{
    background-color: #14082E;
    color: white;
}

@media (max-width: 768px) {
    .grid {
        grid-template-columns: 1fr;
    }

    #form-business-ppal{
        grid-column-start: 1;
        grid-column-end: 2;
    }

    #form-business-all-search{
        grid-column-start: 1;
        grid-column-end: 2;
    }
}
</style>