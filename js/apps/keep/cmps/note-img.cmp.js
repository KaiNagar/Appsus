export default {
    props: ['info'],

    template: `
    <section class="note-img" >
        <img :src="imgUrl" />
    </section>
`,
    data() {
        return {
        }
    },
    created() {
    },
    methods: {

    },
    computed: {
        imgUrl() {
            return './imgs/note-dog.avif'
        },

    },
    unmounted() { },
};