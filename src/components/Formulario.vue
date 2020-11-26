<template>

  <section class="src-components-formulario">

    <div class="jumbotron">
      <h2>Pago Tarjeta Credito</h2>
      <hr />
      <br>

      <form novalidate autocomplete="off" @submit.prevent="enviar()">
          <!-- ------------------- -->
          <!--  CAMPO NOMBRE       -->
          <!-- ------------------- -->
          <div class="form-group">
                <label for="nombre">Nombre</label>
                <input 
                    type="text"
                    id="nombre"
                    class="form-control"
                    v-model="v.f.nombre.$model"
                >
                <!-- CARTELES DE VALIDACIÓN -->
                <div v-if="v.f.nombre.$error && v.f.nombre.$dirty" class="alert alert-danger mt-1">
                    <div v-if="v.f.nombre.required.$invalid">Este campo es requerido</div>
                    <div v-if="v.f.nombre.minLength.$invalid">Este campo debe tener al menos {{v.f.nombre.minLength.$params.min}} caracteres</div>
                    <div v-if="v.f.nombre.maxLength.$invalid">Este campo debe tener máximo {{v.f.nombre.maxLength.$params.max}} caracteres</div>
                </div>
          </div>

          <!-- ------------------- -->
          <!--  CAMPO DNI          -->
          <!-- ------------------- -->
          <div class="form-group">
                <label for="descripcion">DNI</label>
                <input 
                    type="text"
                    id="dni"
                    class="form-control"
                    v-model="v.f.dni.$model"
                >
               <!-- CARTELES DE VALIDACIÓN -->
                <div v-if="v.f.dni.$error && v.f.dni.$dirty" class="alert alert-danger mt-1">
                  <div v-if="v.f.dni.required.$invalid">Este campo es requerido</div>
                  <div v-if="v.f.dni.numeric.$invalid">Este campo debe ser numérico</div>
                  <div v-if="v.f.dni.maxLength.$invalid">Este campo debe tener máximo {{v.f.dni.maxLength.$params.max}} caracteres</div>
          </div>
          </div>
          <!-- --------------- -->
          <!--  CAMPO  PAGAR   -->
          <!-- --------------- -->
          <div class="form-group">
              <label for="pagar">Monto Total</label>
              <input 
                  type="text"
                  id="pagar"
                  class="form-control"
                  v-model="v.f.pagar.$model"
              >
              <!-- CARTELES DE VALIDACIÓN -->
              <div v-if="v.f.pagar.$error && v.f.pagar.$dirty" class="alert alert-danger mt-1">
                  <div v-if="v.f.pagar.required.$invalid">Este campo es requerido</div>
                  <div v-if="v.f.pagar.numeric.$invalid">Este campo debe ser numérico</div>
              </div>
          </div>

          <!-- ---------------     -->
          <!--  CAMPO PAGADO -->
          <!-- ---------------    -->
          <div class="form-group">
              <label for="importe">Monto efectuado</label>
              <input 
                  type="text"
                  id="pagado"
                  class="form-control"
                  v-model="v.f.pagado.$model"
              >
              <!-- CARTELES DE VALIDACIÓN -->
              <div v-if="v.f.pagado.$error && v.f.pagado.$dirty" class="alert alert-danger mt-1">
                  <div v-if="v.f.pagado.required.$invalid">Este campo es requerido</div>
                  <div v-if="v.f.pagado.numeric.$invalid">Este campo debe ser numérico</div>
              </div>
          </div>

          <!-- ------------ -->
          <!-- BOTÓN ENVÍO  -->
          <!-- ------------ -->
          <div class="form-group">
                <input 
                    type="submit"
                    :disabled="v.$invalid"
                    class="btn btn-success mt-4"
                    value="Enviar"
                >
          </div>
      </form>

    

    </div>

 

    <h3 v-if="!pagos.length && !pidiendo" class="alert alert-warning">
      No se encontraron pagos
    </h3>
    <div v-if="pagos.length" class="alert alert-info">
      <h2>Detalle de Pagos</h2>
      <hr />
      <br>


      <div class="table-responsive">
        <table class="table table-dark">
          <tr :style="{color:'cornflowerblue'}">
            <th>NOMBRE</th>
            <th>DNI</th>
            <th>MONTO TOTAL</th>
            <th>MONTO EFECTUADO</th>
            <th>FECHA</th>
            <th>SALDO</th>
          </tr>
          <tr v-for="(pagos,key) in pagos" :key="key">
            <td>{{pagos.nombre}}</td>
            <td>{{pagos.dni}}</td>
            <td>{{ponerSignoPesos(pagos.pagar)}}</td>
            <td>{{ponerSignoPesos(pagos.pagado)}}</td>
            <td>{{fyhLocal(pagos.createdAt)}}</td>
            <td :style="{'color': totalSaldo.color}">{{ponerSignoPesos(pagos.pagar - pagos.pagado)}}</td>
          </tr>
        </table>
      </div>        
    </div>

  </section>

</template>

<script>
  import { required, minLength, maxLength, numeric } from '@vuelidate/validators'
  import { reactive } from 'vue' 
  import { useVuelidate } from '@vuelidate/core'
  import filters from '../filters.js'

  export default  {
    name: 'src-components-formularioVue',
    props: [],
    mixins : [filters],
     mounted () {
        this.getDatosFormAxios()
    },
    setup () {
      const f = reactive({
        nombre : '',
        dni : '',
        pagar : '',
        pagado: '',
        
      })
      const rules = {
        f: {
          nombre: { 
            required,
            minLength: minLength(5),
            maxLength: maxLength(10)
          },
          dni: { 
            required,
            numeric,
            maxLength: maxLength(8)
          },
          pagar: { 
            required,
            numeric
          },
           pagado: { 
            required,
            numeric
          }
        }
      }
 
      const v = useVuelidate(rules, { f })
 
      return { f,v }
    },
     
    data () {
      return {
          url : 'https://5faa6410b5c645001602a795.mockapi.io/Recuperatorio',
          pidiendo: true,
          pagos: [],
          
      }
    },
    methods: {

        /* Envio de datos del formularioVue al backend */
        async sendDatosFormAxios(datos) {
            try {
              let res = await this.axios.post(this.url, datos, {'content-type': 'application/json'})
              console.log(res.data)
            }
            catch(error) {
              console.log('HTTP POST ERROR', error)
            }
        },

        /* Submit del form */
        async enviar() {
            this.v.$touch()
            if(!this.v.$invalid) {
              let form = this.f
              //console.log(form)
              await this.sendDatosFormAxios(form)
              this.resetForm()
              this.v.$reset()
            }
        },
        /* Pedido de datos almacenados en el backend */
        async getDatosFormAxios() {
            try {
              let res = await this.axios(this.url)
              console.log(res.data)
              this.pagos = res.data
            }
            catch(error) {
              console.log('HTTP GET ERROR', error)
            }
            finally {
              this.pidiendo = false
            }
        },
        
        /* valor inicial de los campos de datos del formularioVue */
        resetForm() {
            this.v.f.nombre.$model = ''
            this.v.f.dni.$model = ''
            this.v.f.pagar.$model = ''
            this.v.f.pagado.$model = ''
        }
    },
    computed: {
       totalSaldo() {
        let saldo = 0
        this.pagos.forEach(pagos => {
          saldo = pagos.pagar - pagos.pagado
        });
        return {
          saldo,
          color : (saldo>0)? 'red':
                  ( saldo==0?'green': (saldo<0?'blue':'magenta') )
        }
      },
      
    }
}


</script>

<style scoped lang="css">


  .jumbotron {
    background-color: rgb(35, 131, 134);
    color: rgb(255, 255, 255);
  }

  hr {
    background-color: #ddd;
  }

  pre {
    color: white;
  }

</style>
