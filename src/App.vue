<template>
  <div id="app" class="container-fluid mt-3">
    <div class="jumbotron">
      <h1>App Pagos TJ</h1>
      <br>
      <Navbar />
      <router-view />
    </div>
  </div>
</template>

<script>

import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  
}

h1 {
    color: blue;
}
</style>
