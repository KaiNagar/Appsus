export default {
    props: ['info'],
    template: `
          <section class="note-body">
          <ul class="clean-list">
            <li v-for="todo in info.todos">{{ todo.txt }}</li>
          </ul>
      </section>
`,
    data() {
        return {};
    },
    created() { },
    methods: {},
    computed: {},
    unmounted() { },
};