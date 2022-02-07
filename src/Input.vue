<template>
<section class="container">
        <h2>Default input:</h2>
        <section>
        <div>
            <input type="text" :value="state.time" id="time-field" @input="onChange(onTimeChange($event, value))">    
        </div>
        </section>
        <h2>Show seconds:</h2>
        <section>
        <div>
            <input type="text" :value="state.timeSeconds" id="time-field" @input="onChange(onTimeChange($event, value))">    
        </div>
        </section>
        <h2>Custom colon:</h2>
        <section>
        <div>
            <input type="text" :value="state.timeSecondsCustomColon" id="time-field" @input="onChange(onTimeChange($event, value))">    
        </div>
        </section>
        <h2>Vue Material-UI:</h2>
        <section>
        <div>
            <input type="text" :value="state.timeSeconds" id="time-field" @input="onChange(onTimeChange($event, value))">    
        </div>
        </section>   
      </section>
</template>

<script>

export default {
    props: {
        onChange: {
            type: Function
        }
    },
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
        onTimeChange: function(event, value) {
            const newTime = value.replace(/-/g, ':');
            this.time = newTime.substr(0, 5);
            this.timeSeconds = newTime.padEnd(8, this.state.timeSeconds.substr(5, 3));
            this.timeSecondsCustomColon = timeSeconds.replace(/:/g, '-');
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