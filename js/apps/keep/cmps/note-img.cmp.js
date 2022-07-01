export default {
    props: ['info'],

    template: `
    <section class="note.body">
        <img :src="info.url" />
    </section>
`,
    data() {
        return {
        }
    },
    created() {
        console.log(this.info.url);
    },
    methods: {

    },
    computed: {

    },
    unmounted() { },
};