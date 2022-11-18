<template>
    <section id="test2">
        <div class="row">
            <div class="col-3">
                <h2 id="register-title" class="font-bold text-2xl">Business</h2>
                <label id="register-subtitle" class="font-semibold text-lg"> Information </label><br>

                <div>
                    <font-awesome-icon id="fai-search" :icon="['fas', 'calendar']" />
                    <label class="form-label">Nit</label>
                    <input type="text" v-model="nit">

                    <font-awesome-icon id="fai-search" :icon="['fas', 'calendar']" />
                    <label class="form-label">Nombre</label>
                    <input type="text" v-model="nombre">

                    <font-awesome-icon id="fai-search" :icon="['fas', 'calendar']" />
                    <label class="form-label">Regimen</label>
                    <input type="text" v-model="regimen">

                    <font-awesome-icon id="fai-search" :icon="['fas', 'calendar']" />
                    <label class="form-label">Celular</label>
                    <input type="text" v-model="celular">

                    <font-awesome-icon id="fai-search" :icon="['fas', 'calendar']" />
                    <label class="form-label">Correo</label>
                    <input type="text" v-model="correo">

                    <font-awesome-icon id="fai-search" :icon="['fas', 'calendar']" />
                    <label class="form-label">Dirección</label>
                    <input type="text" v-model="direccion">

                    <font-awesome-icon id="fai-search" :icon="['fas', 'calendar']" />
                    <label class="form-label">Ciudad</label>
                    <input type="text" v-model="ciudad">

                    <font-awesome-icon id="fai-search" :icon="['fas', 'calendar']" />
                    <label class="form-label">Departamento</label>
                    <input type="text" v-model="departamento">
                </div>

            </div>
            <div class="col-9">
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="s in search" :value="s.id" :key="s.id">
                            <td>{{ s.nit }}</td>
                            <td>{{ s.factura }}</td>
                            <td>{{ s.num_cto }}</td>
                            <td>{{ s.fecha_pago }}</td>
                            <td>{{ s.valor_abonado }}</td>
                            <td>{{ s.glosas }}</td>
                            <td>{{ s.total_glosas }}</td>
                            <td>{{ s.observacion }}</td>
                        </tr>
                    </tbody>
                </table>                
            </div>
        </div>
    </section>
</template>

<script>
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
            date_end: null
        };
    },
    mounted() {

    },
    computed: {
    },
    methods: {
    }
};
</script>