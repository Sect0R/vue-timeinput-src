<template>
  <div id="app">
    <input-block v-for="time in state" :key="time" :stateValue="time" :onTimeChange="onTimeChange"></input-block>
  </div>
</template>

<script>
import Input from "./Input.vue";
export default {
  name: 'app',
  data() {
    return {
      state: {
        time: '12:34',
        timeSeconds: '12:34:56',
        timeSecondsCustomColon: '12-34-56'
      }
    }
  },
  methods: {
    onTimeChange(event, value) {
      const newTime = value.replace(/-/g, ':');
      const time = newTime.substr(0, 5);
      const timeSeconds = newTime.padEnd(8, this.state.timeSeconds.substr(5, 3));
      const timeSecondsCustomColon = timeSeconds.replace(/:/g, '-');
    }
  },
  components: {
    inputBlock: Input
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
