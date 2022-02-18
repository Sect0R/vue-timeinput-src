<template>
  <div id='app'>
    <vue-time-input v-model="value"></vue-time-input>
    <button class='second-button' @click="print">
      Show
    </button>
  </div>
</template>

<script>
import Input from './VueTimeInput.vue';
export default {
  name: 'app',
  data() {
    return {
      value: '00:00',
    };
  },
  components: {
    VueTimeInput: Input,
  },
  methods: {
    print() {
      console.log(this.value);
    },
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
