export default {
    props: ['info'],

    template: `
    <section>
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