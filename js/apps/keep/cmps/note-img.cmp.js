export default {
    props: ['info'],

    template: `
    <section >
        <img :src="imgUrl" />

    </section>
`,
    data() {
        return {
            url: null
        }
    },
    created() {
        this.url = this.info.url
    },
    methods: {

    },
    computed: {
        imgUrl() {
            // return this.info.url
            console.log(this.info.url)
        }

    },
    unmounted() { },
};