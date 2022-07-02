
export default {
    props: ['info'],
    template: `
         <section class="note-body">
            <textarea class="txt-input" cols="5" rows="10"
                type="text"
                ref="updatedTxt"
                @input="updateNote"
                placeholder="Dont forget to...">
                Save your thoughts, wherever you are
            </textarea>
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