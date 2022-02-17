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
        :class="{ width_input: showSeconds }"
        autocomplete="off">
        <button class="second-button" @click="showSecond($event)">Show seconds</button>
    </div> 
</template>

<script>

export default {
    props:['value'],
    data() { 
        return {
            showSeconds: false,
            length: 0
        }
    },
    methods: {
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

            if(event.keyCode === (32 || 13)) {
                return 
            }

            let positionCursor = input.selectionEnd;
            let newPositionCursor = positionCursor + 1;

            if((positionCursor === 5 && !this.showSeconds) || positionCursor === 8) {
                return
            }

            if(positionCursor === 0 && event.key <= 2) {
                value[positionCursor] = event.key
                input.value = value.join('')
                input.setSelectionRange(newPositionCursor,newPositionCursor)
                return input.value 
            } else if (positionCursor === 0 && event.key > 2) {
                value[positionCursor] = 0
                value[newPositionCursor] = event.key
                input.value = value.join('')
                input.setSelectionRange((newPositionCursor + 2),(newPositionCursor + 2))
                return input.value 
            }

            if(positionCursor === 2){
                input.setSelectionRange(newPositionCursor,newPositionCursor) 
            }

            if(positionCursor === 1 && event.key > 3){
                return 
            } else if(positionCursor === 1 && event.key <= 3) {
                value[positionCursor] = event.key
                input.value = value.join('')
                input.setSelectionRange((newPositionCursor + 1),(newPositionCursor + 1))
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
                input.setSelectionRange((newPositionCursor + 1),(newPositionCursor + 1))
                return input.value
            } else if (positionCursor  === 5 && event.key > 5) {
                value[newPositionCursor] = 0
                value[newPositionCursor + 1] = event.key
                input.value = value.join('')
                input.setSelectionRange((newPositionCursor + 1 ),(newPositionCursor + 1 ))
                return input.value
            }

            if(positionCursor === 4) {             
                value[positionCursor] = event.key
                input.value = value.join('')
                if(!this.showSeconds){
                    input.setSelectionRange(5,5)
                    return input.value
                } else {
                     input.setSelectionRange(newPositionCursor,newPositionCursor)    
                }
                return input.value
            } else if(positionCursor === 5) {
                return
            }
            if(positionCursor === 6 && event.key <= 5) {
                value[positionCursor] = event.key
                input.value = value.join('')
                input.setSelectionRange(newPositionCursor,newPositionCursor)
                return input.value
            } else if(positionCursor === 8) {
                input.setSelectionRange(0,0)
            }

            if(positionCursor === 7) {
                value[positionCursor] = event.key
                input.value = value.join('')
                input.setSelectionRange(newPositionCursor,newPositionCursor)
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

            if((position === 5 && !this.showSeconds && event.key === 'Delete') || (position === 8 && event.key === 'Delete')) {
                return
            }

            if(event.key === 'Backspace' && position !== 0 && value[position - 1] !== ':') {   
                let newPosition = position - 1;
                value[newPosition] = 0
                input.value = value.join('')
                input.setSelectionRange(newPosition,newPosition)
                return input.value   
            }else if(event.key === 'Delete' && value[position] !== ':') {   
                let newPosition = position - 1;
                input.setSelectionRange((newPosition + 1),(newPosition + 1))
                value[newPosition + 1] = 0
                input.value = value.join('')
                input.setSelectionRange((newPosition + 2),(newPosition + 2))
                return input.value   
            }else if (event.key === 'Backspace' && value[position + 1] !== ':'){
                let newPosition = position - 1;
                input.setSelectionRange(newPosition,newPosition)
            }else if (event.key === 'Delete' && value[position - 1] !== ':'){
                let newPosition = position + 1;
                return input.setSelectionRange(newPosition,newPosition)
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