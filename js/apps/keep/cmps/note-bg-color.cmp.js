export default {
    // props[]
    template: `
 <section class="colors">
    <div v-for="color in colors" 
    :style="{ backgroundColor: color }"
    @click="changeBgColor(color)">
</div>
 </section>
`,
    data() {
        return {
            colors: [
                '#FF1493',
                '#9400D3',
                '#D8BFD8',
                '#008080',
                '#000008B',
                '#A9A9A9',
            ]
        };
    },
    created() { },
    methods: {
        changeBgColor(color) {
            console.log(color);
            this.$emit('color', color)
        }
    },
    computed: {},
    unmounted() { },
};