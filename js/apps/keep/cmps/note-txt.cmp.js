export default {
    props: ['info'],
    template: `
    <section class="txt-note">
        <cite contenteditable = "true">{{info.txt}} </cite>
    </section>



`,
    data() {
        return {};
    },
    created() { },
    methods: {},
    computed: {},
    unmounted() { },
}