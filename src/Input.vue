<template>
    <div class="input-block">
        <input 
        type="text" 
        ref="input" 
        id="time-field"
        v-model="value"
        @paste.prevent
        @keypress="onChange($event)" 
        @keydown.delete="removeValue($event)"
        @focus="$event.preventDefault()"
        @click="focused($event)"
        :class="{ width_input: showSeconds }" 
        autocomplete="off">
        <button class="second-button" @click="showSecond($event)">Show seconds</button>
    </div> 
</template>

<script>

export default {
    data() { 
        return {
            value: '00:00',
            showSeconds: false
        }
    },
    methods: {
        focused(event) {
            event.preventDefault();
            event.stopPropagation();

            if(event.target.value === '00:00') {
                event.target.setSelectionRange(0,0)
            }
        },
        showSecond(event) {
            this.showSeconds = !this.showSeconds
            if(this.showSeconds) {
                return this.value = '00:00:00'
            }else {
                this.value = '00:00'
            }
            return this.showSeconds;
        },
        onChange(event) {
            event.preventDefault()
            const input = this.$refs.input;

            let inputValue = input.value;
            let value = inputValue.split('');

            const positionCursor = input.selectionEnd;
            
            let newPositionCursor = positionCursor + 1;

            if(positionCursor === 0 && event.key <= 2) {
                value[positionCursor] = event.key
                input.value = value.join('')
                input.setSelectionRange(1,1)
                return input.value 
            } else if (positionCursor === 0 && event.key > 2) {
                value[positionCursor] = 0
                value[newPositionCursor] = event.key
                input.value = value.join('')
                input.setSelectionRange(3,3)
                return input.value 
            }

            if(positionCursor === 1 && event.key > 3){
                return 
            } else if(positionCursor === 1 && event.key <= 3) {
                value[positionCursor] = event.key
                input.value = value.join('')
                input.setSelectionRange(3,3)
                return input.value
            }

            if(positionCursor === 3  && event.key <= 5 ) {
                value[positionCursor] = event.key
                input.value = value.join('')
                input.setSelectionRange(newPositionCursor,newPositionCursor)
                return input.value
            } else if (positionCursor === 3 && event.key > 5) {
                value[positionCursor] = 0
                value[newPositionCursor] = event.key
                input.value = value.join('')
                input.setSelectionRange(newPositionCursor,newPositionCursor)
                return input.value
            }
          
            if(positionCursor ===  5 && event.key <= 5 ) {
                value[newPositionCursor] = event.key
                input.value = value.join('')
                input.setSelectionRange((newPositionCursor + 1 ),(newPositionCursor + 1 ))
                return input.value
            } else if (positionCursor  === 5 && event.key > 5) {
                value[newPositionCursor] = 0
                value[newPositionCursor + 1] = event.key
                input.value = value.join('')
                input.setSelectionRange((newPositionCursor + 1 ),(newPositionCursor + 1 ))
                return input.value
            }
            
            if(positionCursor === 4) {
                value = inputValue.split('');
                value[4] = event.key
                input.value = value.join('')
                if(!this.showSeconds){
                      input.setSelectionRange(0,0)    
                } else {
                     input.setSelectionRange(5,5)    
                }
                return input.value
            }
            
            if(positionCursor === 0 && event.key > 2) {
                value[0] = 0
                input.value = value.join('')
                input.setSelectionRange(1,1)
                return input.value 
            } else if(positionCursor === 1 && event.key > 3){
                value[1] = 0
                input.value = value.join('')
                input.setSelectionRange(3,3)
                return input.value
            }else if(positionCursor === 3 && event.key > 5){
                value[4] = 0
                input.value = value.join('')
                input.setSelectionRange(4,4)
                return input.value
            }

            if(positionCursor === 7 && event.key <= 9) {
                value[7] = event.key
                input.value = value.join('')
                input.setSelectionRange(8,8)
                return input.value
            } else if(positionCursor === 8) {
                input.setSelectionRange(0,0)
            }

            
        },
        removeValue(event) {
            event.preventDefault()
            const input = this.$refs.input

            let inputValue = input.value
            let value = inputValue.split('');

            let position = input.selectionEnd;
            

            if(position !== 0 && value[position - 1] !== ':') {
                let newPosition = position - 1;
                value[newPosition] = 0
                input.value = value.join('')
                input.setSelectionRange(newPosition,newPosition)
                return input.value 
            }  else {
                let newPosition = position - 1;
                input.setSelectionRange(newPosition,newPosition)
            }
        }    
    }       
}
</script>

<style>
    #time-field {
        text-align: center;
        outline: none;
        font-size: 30px;
        max-width: 90px;
        height: 35px;
        margin-top: 30px;
        margin-bottom: 20px;
        border-radius: 5px;
        border: 3px solid #000;
    }
    .width_input {
        max-width: 125px !important;
    }
    #time-field:focus {
       border: 3px solid rgb(8 8 8 / 83%);
       box-shadow: 5px 3px 4px 2px grey; 
    }
    .input-block {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>