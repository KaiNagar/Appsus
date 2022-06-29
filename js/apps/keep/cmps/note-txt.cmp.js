export default {
    props: ['info'],
    template: `
    <section class="txt-note">
        <cite contenteditable = "true">{{info.txt}} </cite>
    </section>



`,
    name: 'note-txt!',
    data() {
        return {};
    },
    created() { },
    methods: {},
    computed: {},
    unmounted() { },
}