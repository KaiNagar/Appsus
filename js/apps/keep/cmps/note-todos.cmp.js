export default {
    props: ['info'],
    template: `
          <section class="note-body">
          <ul class="clean-list">
            <li v-for="todo in info.todos">{{ todo.txt }}</li>
          </ul>
          <input v-model="txtInput" type="text" placeholder="what to do.." @keyup.enter="addTodo">
      </section>
`,
    data() {
        return {
            txtInput: ''
        };
    },
    created() { },
    methods: {
        addTodo() {
            // const newNote = this.ad
            const todo = {
                isDone: false,
                txt: this.txtInput,
                doneAt: null,
            }
            newNote.info.todos.push(todo)
            this.txtInput = ''
        }
    },
    computed: {},
    unmounted() { },
};