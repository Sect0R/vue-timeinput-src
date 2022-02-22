<template>
  <div>
      <slot name="input">
        <input
          type="text"
          ref="input"
          v-model="numberValue"
          @paste.prevent
          @keypress.prevent="onChange($event)"
          @keydown.prevent.delete="removeValue($event)"
          :maxlength="maxLength"
          :autocomplete="getAttr('off')"
        />
      </slot>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'changeTime',
  },
  props: {
    value: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      numberValue: this.value,
      showSeconds: false,
    };
  },
  computed: {
    maxLength() {
      return this.numberValue.length;
    },
    showSecond() {
      return this.numberValue.length > 5;
  },
  methods: {
    getAttr(value) {
      return value;
    },
    onChange(event) {
      const inputEl = this.$refs.input;
      const value = this.value.split('');
      const positionCursor = inputEl.selectionStart;
      const keyValue = event.key;
      let newPositionCursor = positionCursor + 1;

      if (positionCursor === this.maxLength || !/[\d]/.test(keyValue)) {
        return;
      }

      switch (true) {
        case positionCursor === 0 && keyValue > 2:
          value[0] = 0;
          value[1] = keyValue;
          newPositionCursor = 3;
          break;
        case positionCursor === 1 && keyValue > 0 && value[0] < 2:
          value[1] = keyValue;
          newPositionCursor = 3;
          break;
        case positionCursor === 1 && keyValue <= 3 && value[0] >= 2:
          value[1] = keyValue;
          newPositionCursor = 3;
          break;
        case positionCursor === 3 && keyValue > 5:
          value[3] = 0;
          value[4] = keyValue;
          break;
        case positionCursor === 6 && keyValue <= 5:
          value[6] = keyValue;
          break;
        case positionCursor === 6 && keyValue > 5:
          value[6] = 0;
          value[7] = keyValue;
          break;
        case positionCursor === 7:
          value[7] = keyValue;
          break;
        default:
          if (positionCursor === 0 ||
              positionCursor === 3 ||
              positionCursor === 4) {
            value[positionCursor] = keyValue;
          }
          break;
      };

      this.numberValue = value.join('');
      this.$emit('changeTime', this.numberValue);

      this.$nextTick(() => {
        inputEl.setSelectionRange(newPositionCursor, newPositionCursor);
      });
    },
    removeValue(event) {
      const inputEl = this.$refs.input;
      const value = this.value.split('');
      const positionCursor = inputEl.selectionEnd;
      const keyValue = event.key;
      let newPositionCursor = positionCursor + 1;


      if (
        (positionCursor === 5 &&
         this.numberValue.length === 5 &&
         keyValue === 'Delete') ||
        (positionCursor === 8 && keyValue === 'Delete') ||
        (positionCursor === 0 && keyValue === 'Backspace')
      ) {
        return;
      }

      switch (keyValue) {
        case 'Backspace':
          if (positionCursor !== 0 && value[positionCursor - 1] !== ':') {
            newPositionCursor = positionCursor - 1;
            value[newPositionCursor] = 0;
            newPositionCursor = newPositionCursor;
          } else if (value[positionCursor + 1] !== ':') {
            newPositionCursor = positionCursor - 1;
            newPositionCursor = newPositionCursor;
          }
          break;
        case 'Delete':
          if (value[positionCursor] !== ':') {
            newPositionCursor = positionCursor - 1;
            newPositionCursor = newPositionCursor + 1;
            value[newPositionCursor] = 0;
            newPositionCursor = newPositionCursor + 1;
          } else if (value[positionCursor - 1] !== ':') {
            newPositionCursor = positionCursor + 1;
            newPositionCursor = newPositionCursor;
          }
          break;
      }

      this.numberValue = value.join('');
      this.$emit('changeTime', this.numberValue);

      this.$nextTick(() => {
        inputEl.setSelectionRange(newPositionCursor, newPositionCursor);
      });
    },
  },
};
</script>

<style>

</style>
