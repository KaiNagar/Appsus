export default {
    props: ['notes'],
    template: `
    <section class="note-filter">
        <button @click="showInput">
            search
        <i class="fa-solid fa-magnifying-glass"></i>
    </button>
        <input v-if="isInput"
         type="text"
          v-model="filterBy"
           @input="onFilterChange"
           placeholder="Search your note" />
    </section>
`,
    data() {
        return {
            filterBy: '',
            isInput: false
        };
    },
    created() { },
    methods: {
        onFilterChange() {
            this.$emit('set-filter', this.filterBy)
        },
        showInput() {
            this.isInput = !this.isInput
        },
    },
    computed: {},
    unmounted() { },
};