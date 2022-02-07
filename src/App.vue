<template>
  <div id="app">
    <input-block></input-block>
  </div>
</template>

<script>
import Input from "./Input.vue";

const DEFAULT_COLON = ':';
const DEFAULT_VALUE_SHORT = `00${DEFAULT_COLON}00`;
const DEFAULT_VALUE_FULL = `00${DEFAULT_COLON}00${DEFAULT_COLON}00`;

export default {
  name: 'app',
  data() {
    return {
  
    }
  },
  methods: {
    isNumber: function(value) {
      const number = Number(value);
      return console.log(!isNaN(number) && String(value) === String(number));
    },
    formatTimeItem: function(value) {
      return `${value || ''}00`.substr(0, 2);
    },
    validateTimeAndCursor: function(
      showSecond = false,
      value = '',
      defaultValue = '',
      colon = DEFAULT_COLON,
      cursorPosition = 0
    ) {
      const [oldH, oldM, oldS] = defaultValue.split(colon);

      let newCursorPosition = Number(cursorPosition);
      let [newH, newM, newS] = String(value).split(colon);

      newH = this.formatTimeItem(newH);
      if (Number(newH[0]) > 2) {
          newH = oldH;
          newCursorPosition -= 1;
      } else if (Number(newH[0]) === 2) {
          if(Number(oldH[0]) === 2 && Number(newH[1]) > 3) {
              newH = `2${oldH[1]}`;
              newCursorPosition -= 2;
          } else if(Number(newH[1]) > 3) {
              newH = '23';
          }
      }

      newM = this.formatTimeItem(newM);
      if (Number(newM[0]) > 5) {
          newM = oldM;
          newCursorPosition -= 1;
      }

      if (showSecond) {
          newS = this.formatTimeItem(newS);
          if(Number(newS[0]) > 5) {
              newS = oldS;
              newCursorPosition -= 1;
          }
      }

      const validatedValue = showSecond ? `${newH}${colon}${newM}${colon}${newS}` : `${newH}${colon}${newM}`;

      return [validatedValue, newCursorPosition]; 
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
