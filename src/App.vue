<template>
  <div id='app'>
    <vue-time-input
    v-model="value"
    :getAttrs="addAttrs"
    @getTimeState="showSeconds = $event"
    ></vue-time-input>
    <button @click="showProps()">Click</button>
  </div>
</template>

<script>
import Input from './VueTimeInput.vue';

export default {
  name: 'app',
  data() {
    return {
      value: '00:00',
      showSeconds: false,
    };
  },
  components: {
    VueTimeInput: Input,
  },
  methods: {
    showProps() {
      console.log(this.showSeconds, this.value);
    },
    addAttrs(value) {
      return value;
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
