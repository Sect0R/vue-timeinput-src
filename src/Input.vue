<template>
        <div>
            <input type="text" :value="stateValue" :placeholder="defaultValue" id="time-field" @keyup="onChange($event, onTimeChange($event, value))">    
        </div>
</template>

<script>

const DEFAULT_COLON = ':';
const DEFAULT_VALUE_SHORT = `00${DEFAULT_COLON}00`;
const DEFAULT_VALUE_FULL = `00${DEFAULT_COLON}00${DEFAULT_COLON}00`;

export default {
    props: ["stateValue", "onTimeChange"],
    data() {
        return {
            value: '',
            showSecond: true,
            defaultValue: DEFAULT_VALUE_FULL,
            colon:DEFAULT_COLON,
            cursorPosition: 0
        }
    },
    methods: {
        isNumber(value) {
            const number = Number(value);
            return !isNaN(number) && String(value) === String(number);
        },
        formatTimeItem(value) {
            return `${value || ''}00`.substr(0, 2);
        },
        validateTimeAndCursor(showSecond = false, value = '', defaultValue = '', colon = DEFAULT_COLON, cursorPosition = 0) {
            const [oldH, oldM, oldS] = defaultValue.split(colon);

            let newCursorPosition = cursorPosition;
            let [newH, newM, newS] = value.split(colon);

            newH = this.formatTimeItem(newH);
            if (Number(newH[0]) > 2) {
                newH = oldH;
                newCursorPosition -= 1;
            } else if (Number(newH[0]) === 2) {
                if(Number(oldH[0]) === 2 && Number(newH[1] > 3)) {
                    newH = `2${oldH[1]}`;
                    newCursorPosition -= 2;
                } else if (Number(newH[1]) > 3) {
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
                if (Number(newS[0]) > 5) {
                    newS = oldS;
                    newCursorPosition -= 1;
                }
            }

            const validatedValue = showSecond ? `${newH}${colon}${newM}${colon}${newS}` : `${newH}${colon}${newM}`;

            return [validatedValue, newCursorPosition];
        }
    }
}
</script>

<style>
    #time-field {
        text-align: center;
        font-size: 20px;
        max-width: 100px;
        height: 35px;
    }
    .container {
        text-align: center;
    }
</style>