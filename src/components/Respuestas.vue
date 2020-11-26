<template>

  <section class="src-components-ver">
    <div class="alert alert-warning">
      <h2>Respuestas</h2>
      <hr />
      <br>
      <div class="table-responsive">
        <table class="table table-dark">
          <tr :style="{color:'cornflowerblue'}">
            <th>PREGUNTA</th>
            <th>RESPUESTA</th>
          </tr>
          <tr v-for="(pregunta,key) in preguntas" :key="key">
            <td>{{pregunta.pregunta}}</td>
            <td>{{pregunta.respuestas}}</td>
          </tr>
        </table>
      </div>        
    </div>
  </section>

</template>

<script>

  export default  {
    name: 'src-components-ver',
    props: [],
    mounted () {
    },
    data () {
      return {
          preguntas : [
            { pregunta: 1, respuestas: ['a'] },
            { pregunta: 2, respuestas: ['b'] },
            { pregunta: 3, respuestas: ['c'] },
            { pregunta: 4, respuestas: ['a,c,e'] },
            { pregunta: 5, respuestas: ['b'] },
          ]
      }
    },
    methods: {
    },
    computed: {
    }
}


</script>

<style scoped>
  .src-components-ver {

  }
</style>

