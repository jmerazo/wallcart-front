<template>
    <div class="grid">
        <div>
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
                    <a type="submit" class="btn" id="btn-business-create" @click="addContracs">Create</a>
                </div>
            </div>
        </div>

        <div>
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
export default {
    components: {
    },
    name: "CSSGridTest"
}

</script>

<style>
.grid {
    display: grid;
    grid-template-columns: 350px 1500px;
    grid-template-rows: auto;
    margin: 30px;
}
</style>