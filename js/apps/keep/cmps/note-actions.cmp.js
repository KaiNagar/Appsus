import noteBgColor from "./note-bg-color.cmp.js"


export default {

    props: ['note'],
    template: `
    <section v-if="note" class="action-btns">
            <button class="pined-btn"><i class="fa-solid fa-thumbtack"></i></button>
            <button @click="removeNote" class="remove-note-btn">
                <i class="fa-solid fa-trash-can"></i></button>
            <a class="note-color-plata">
            <span>
                <i class="fa-solid fa-palette"></i>
            </span>
                <note-bg-color @color="changeBgColor" />
        </a>
    </section>
`,
    components: {
        noteBgColor,
    },
    data() {
        return {

        }
    },
    created() { },
    methods: {
        changeBgColor(color) {
            console.log('color');
            console.log(color);
        },
        removeNote() {
            console.log(this.note);
            this.$emit('remove-note', this.note)
        }
    },
    computed: {},
    unmounted() { },
};