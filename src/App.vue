<template>
  <div id='app'>
    <vue-time-input
    v-model="value"
    ></vue-time-input>
  </div>
</template>

<script>
import Input from './VueTimeInput.vue';

export default {
  name: 'app',
  data() {
    return {
      value: '00:00:00',
    };
  },
  components: {
    VueTimeInput: Input,
  },
};
</script>

<style>
  #app {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
</style>
