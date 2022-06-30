export default {
    props: ['info'],
    template: `
    <section class="note-body">
        <h3>{{info.title}}</h3>
          <p v-if="info.txt">{{ info.txt }}</p>
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