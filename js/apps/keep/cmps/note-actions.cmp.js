export default {
    props: ['note'],
    template: `
    <section class="action-btns">
        <button class="pined-btn"><i class="fa-solid fa-thumbtack"></i></button>
        <button @click="removeNote" class="remove-note-btn"><i class="fa-solid fa-trash-can"></i></i></button>
    </section>
`,
    data() {
        return {
        }
    },
    created() { },
    methods: {
        removeNote() {
            this.$emit('remove', this.note)
        }
    },
    computed: {},
    unmounted() { },
};