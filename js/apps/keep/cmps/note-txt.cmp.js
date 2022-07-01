
export default {
    props: ['info'],
    template: `
    <section class="note-body">
          <p ref="updatedTxt" @input="updateNote" contenteditable="true" v-if="info.txt">{{ info.txt}}</p>
    </section>



`,
    name: 'note-txt!',
    data() {
        return {

        };
    },
    created() { },
    methods: {
        updateNote() {
            // if(!this.$refs.updatedTxt.innerText)this.$refs.updatedTxt.innerText = '-'
            let updatedTxt = this.$refs.updatedTxt.innerText
            this.$emit('newTxt', updatedTxt)
        }
    },
    computed: {},
    unmounted() { },
}