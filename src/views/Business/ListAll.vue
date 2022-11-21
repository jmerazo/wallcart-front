<template>
    <div class="row" id="form-business-gral">
        <h2 id="register-title" class="font-bold text-2xl">Business</h2>
        <label id="register-subtitle" class="font-semibold text-lg"> Information all </label><br>

        <div id="div-btn-back">
            <a id="btn-back-business" href="/business" class="btn" type="button" title="Back to business"><font-awesome-icon id="fai-business-list" :icon="['fas', 'chevron-left']"/></a>
        </div>

        <div class="col" id="form-business-list-all">
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
                    <tr v-for="s in dataPaginate" :value="s.id" :key="s.id">
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
        <nav aria-label="Page navigation example" id="pagination-business">
            <ul class="pagination">
                <li class="page-item" @click="getPreviousPage"><a class="page-link" href="#">Previous</a></li>
                <li v-for="page in totalPages()" :key="page" @click="getDataPages(page)" class="page-item"><a class="page-link" href="#">{{page}}</a></li>
                <li class="page-item" @click="getNextPage"><a class="page-link" href="#">Next</a></li>
            </ul>
        </nav> 
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
            businessAll : [],
            busineDelete : null,
            itemsPerPage: 30,
            dataPaginate: [],
            actualPage: 1
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
        totalPages() {
            return Math.ceil(this.businessAll.length / this.itemsPerPage)
        },
        getDataPages(numPage){
        this.actualPage = numPage;
        this.dataPaginate = [];
        let ini = (numPage * this.itemsPerPage) - this.itemsPerPage;
        let end = (numPage * this.itemsPerPage);
        this.dataPaginate = this.businessAll.slice(ini, end);
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
                this.$toast.success(`Business Create Successfull`, {
                  position: 'top-right',
                  duration: 8000
                })
                this.$router.push({name: 'Business'});
            })
            .catch((e) => {
                console.log(e)
                this.$toast.danger(`Error, not add`, {
                  position: 'top-right',
                  duration: 8000
                })
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
                this.getDataPages(1)
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
#btn-back-business{
    left: 20px;
}

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

#form-business-list-all{
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

#pagination-business{
    margin: 20px;
}
</style>