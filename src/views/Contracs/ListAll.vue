<template>
    <div>
        <a id="btn-back-contracs-list-top" href="/contracs/update" class="btn" type="button"><font-awesome-icon id="fai-log-update-password" :icon="['fas', 'chevron-left']"/></a>
        <a id="btn-register-contracs-top" href="/contracs/create" class="btn" type="button"><font-awesome-icon id="fai-user-list" :icon="['fas', 'user-plus']"/></a>
    </div>
    <div class="col-12" id="form-business-all">
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
                <tr v-for="s in contracsAll" :value="s.id" :key="s.id">
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
                        <a id="il-cfg" title="Delete" type="submit" @click="businessDelete()"><router-link :to="{name: 'ContracsDelete', params: {id : s.id}}"><font-awesome-icon id="fai-list" :icon="['fas', 'trash']"/></router-link></a>
                    </td>
                </tr>
            </tbody>
        </table>                
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
            contracsAll : [],
            busineDelete : null,
        };
    },
    mounted() {
        this.listContracsAll();
        this.listDepartments();
        this.listRegimenAll();
    },
    computed: {       
    },
    methods: {
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
        async listContracsAll(){
            await axios.get(`http://localhost:8844/api/contracs/all`, {
                headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
                }
            })
            .then((Response) => {
                console.log('Contracs all: ',Response)
                this.contracsAll = Response.data;
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
#btn-back-contracs-list-top {
  margin-top: 10px;
  margin-bottom: 10px;
  align-content: left;
  justify-content: left;
  background-color: white;
  color: white;
  width: 30px;
}

#btn-register-contracs-top {
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #54426b;
  color: white;
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