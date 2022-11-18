<template>
        <div class="row" id="form-business-gral">
            <div class="col-3" id="form-business-ppal">
                <h2 id="register-title" class="font-bold text-2xl">Business</h2>
                <label id="register-subtitle" class="font-semibold text-lg"> Information </label><br>

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
                        <font-awesome-icon id="fai-search" :icon="['fas', 'layer-group']" />
                        <label class="form-label">Regimen</label>
                        <input type="text" v-model="regimen" class="form-control" id="form-business">
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
                        <font-awesome-icon id="fai-search" :icon="['fas', 'location-dot']" />
                        <label class="form-label">Ciudad</label>
                        <input type="text" v-model="ciudad" class="form-control" id="form-business">
                    </div>                                     

                    <div id="form-business-inputs">
                        <font-awesome-icon id="fai-search" :icon="['fas', 'location-dot']" />
                        <label class="form-label">Departamento</label>
                        <input type="text" v-model="departamento" class="form-control" id="form-business">
                    </div>
                    
                    <div id="btn-content">
                        <a type="submit" class="btn" id="btn-business-create" @click="addBusiness">Create</a>
                    </div>
                </div>
            </div>

            <div class="col-8" id="form-business-all">
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
                        <tr v-for="s in businessAll" :value="s.id" :key="s.id">
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
            municipios : [],
            departamentos : [],
            businessAll : [],
            busineDelete : null,
        };
    },
    mounted() {
        this.listBusinessAll();
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
                this.$router.push('/business');
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
            })
            .catch((e) => {
                console.log(e)
            })
        },
        async businessDelete(){
            this.busineDelete = this.$route.params.id;
            await axios.delete(`http://localhost:8888/api/business/delete/${this.busineDelete}`,{
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
                })
                .then((Response) => {
                    console.log(`Business ${this.busineDelete}`, Response)
                    this.$router.push('/business');
                })
                .catch((e) => {
                    console.log(`Error deleting ${this.busineDelete}`,e)
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