export default {
    props: ['notes'],
    template: `
    <section>
        <input type="text" v-model="filterBy" @input="onFilterChange" />
    </section>
`,
    data() {
        return {
            filterBy: ''
        };
    },
    created() { },
    methods: {
        onFilterChange() {
            this.$emit('set-filter', this.filterBy)
        },
    },
    computed: {},
    unmounted() { },
};