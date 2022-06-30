export default {
    props: ['info'],
    template: `
    <section class="txt-note">
         <h4 v-if="info.title">{{ info.title }}</h4>
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