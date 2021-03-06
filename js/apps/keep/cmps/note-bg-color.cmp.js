export default {
    template: `
        <section class="color-palette">
            <div v-for="color in colors"
            :style="{ backgroundColor: color }"
            @click.capture="changeBgColor(color)"
            ></div>
        </section>
`,
    data() {
        return {
            colors: [
                '#9400D3',
                '#d0aaaa',
                '#008080',
                '#c96946',
                '#A9A9A9',
                '#ffa5a5',
                '#fff',
                '#f29164'
            ]
        }
    },
    methods: {
        changeBgColor(color) {
            this.$emit('bg-color', color)
        }
    },
};