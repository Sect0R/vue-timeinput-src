<template>
  <div class="input-block">
    <input
      type="text"
      ref="input"
      id="time-field"
      v-model="numberValue"
      @paste.prevent
      @keypress="onChange($event)"
      @keydown.delete="removeValue($event)"
      maxlength=""
      autocomplete="off"
    />
    <button class="second-button" @click="showSecond($event)">
      Show seconds
    </button>
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
  },
  methods: {
    showSecond(event) {
      this.showSeconds = !this.showSeconds;
      if (this.showSeconds) {
        (this.numberValue = '00:00:00');
      } else {
        this.numberValue = '00:00';
      }
      this.$emit('changeTime', this.numberValue);
      return this.showSeconds;
    },
    onChange(event) {
      event.preventDefault();
      const inputEl = this.$refs.input;
      const value = this.value.split('');
      const positionCursor = inputEl.selectionStart;
      const keyValue = event.key;
      let newPositionCursor = positionCursor + 1;

      if (positionCursor === this.maxLength || !/[\d]/.test(keyValue)) {
        return;
      }

      switch (true) {
        case positionCursor === 0 && keyValue <= 2:
          value[0] = keyValue;
          newPositionCursor;
          break;
        case positionCursor === 0 && keyValue > 2:
          value[0] = 0;
          value[1] = keyValue;
          newPositionCursor = 3;
          break;
        case positionCursor === 1 && keyValue > 3 && value[0] < 2:
          value[1] = keyValue;
          newPositionCursor = 3;
          break;
        case positionCursor === 1 && keyValue <= 3:
          value[1] = keyValue;
          newPositionCursor + 2;
          break;
        case positionCursor === 3 && keyValue <= 5:
          value[3] = keyValue;
          newPositionCursor;
          break;
        case positionCursor === 3 && keyValue > 5:
          value[3] = 0;
          value[4] = keyValue;
          newPositionCursor;
          break;
        case positionCursor === 4:
          value[4] = keyValue;
          newPositionCursor;
          break;
        case this.showSeconds && positionCursor === 5:
          newPositionCursor;
          break;
        case positionCursor === 6 && keyValue <= 5:
          value[6] = keyValue;
          newPositionCursor;
          break;
        case positionCursor === 6 && keyValue > 5:
          value[6] = 0;
          value[7] = keyValue;
          newPositionCursor;
          break;
        case positionCursor === 7:
          value[7] = keyValue;
          newPositionCursor;
          break;
      }

      this.numberValue = value.join('');
      this.$emit('changeTime', this.numberValue);

      this.$nextTick(() => {
        inputEl.setSelectionRange(newPositionCursor, newPositionCursor);
      });
    },
    removeValue(event) {
      event.preventDefault();
      const inputEl = this.$refs.input;
      const value = this.value.split('');
      const positionCursor = inputEl.selectionEnd;
      const keyValue = event.key;
      const newPositionCursor = positionCursor + 1;

      if (
        (positionCursor === 5 && !this.showSeconds && keyValue === 'Delete') ||
        (positionCursor === 8 && keyValue === 'Delete')
      ) {
        return;
      }

      switch (true) {
        case keyValue === 'Backspace' &&
        positionCursor !== 0 && value[positionCursor - 1] !== ':':
          let newPositionCursor = positionCursor - 1;
          value[newPositionCursor] = 0;
          newPositionCursor;
          break;
        case keyValue === 'Delete' &&
        value[positionCursor] !== ':':
          newPositionCursor = positionCursor - 1;
          newPositionCursor + 1;
          value[newPositionCursor + 1] = 0;
          newPositionCursor + 2;
          break;
        case keyValue === 'Backspace' &&
        value[positionCursor + 1] !== ':':
          newPositionCursor = positionCursor - 1;
          newPositionCursor;
          break;
        case keyValue === 'Delete' &&
        value[positionCursor - 1] !== ':':
          newPositionCursor = positionCursor + 1;
          newPositionCursor;
          break;
      }

      this.numberValue = value.join('');
      this.$emit('changeTime', this.numberValue);

      if (keyValue === 'Delete') {
        this.$nextTick(() => {
          inputEl.setSelectionRange(
              newPositionCursor,
              newPositionCursor,
          );
        });
      } else {
        this.$nextTick(() => {
          inputEl.setSelectionRange(
              newPositionCursor - 2,
              newPositionCursor - 2,
          );
        });
      };
    },
  },
};
</script>

<style>
</style>
