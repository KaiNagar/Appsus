export default {
    props: ['info'],

    template: `
    <section class="note-img" >
        <img :src="info.url" />
        <h4>{{ info.title }}</h4>
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