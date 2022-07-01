
export default {
    props: ['info'],
    template: `
         <section class="note-body">
                <input type="text"
                ref="updatedTxt"
                @input="updateNote"
             />
        </section>
`,
    data() {
        return {

        }
    },
    created() { },
    methods: {
        updateNote() {
            let updatedTxt = this.$refs.updatedTxt.innerText
            this.$emit('update-note-info', { ...this.info, txt: updatedTxt })
        }
    },
    computed: {},
    unmounted() { },
}