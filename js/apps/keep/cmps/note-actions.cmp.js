export default {
    props: ['note'],
    template: `
    <section class="action-btns">
        <button class="pined-btn">pinned</button>
        <button @click="remove" class="remove-note-btn">remove</button>
    </section>
`,
    data() {
        return {
        }
    },
    created() { },
    methods: {
        remove() {
            this.$emit('remove-note', this.note)
        }
    },
    computed: {},
    unmounted() { },
};