<template>
  <div id="app">
    <vue-input></vue-input>
  </div>
</template>

<script>
import Input from "./Input.vue";
export default {
  name: 'app',
  components: {
    vueInput: Input
  }
}
</script>

<style>
  #app {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
</style>