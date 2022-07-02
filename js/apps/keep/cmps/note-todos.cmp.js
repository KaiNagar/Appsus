export default {
    props: ['info'],
    template: `
        <section class="note-body">
          <ul class="clean-list">
            <li v-for="(todo,idx) in info.todos">
              <div class="todo-content">
                <input 
                    :checked="todo.isDone"
                    @click="toggleIsDone(idx)"
                    id="checkbox"
                    type="checkbox"
                />
                <input class="txt-area"
                 type="text"
                 @input="updateTodoTxt(idx,$event.target.value)"
                 :value="todo.txt"
                :class="{checked:todo.isDone}"
                 />
        </div>
    </li>
</ul>
</section>
`,
    methods: {
        toggleIsDone(todoIdx) {
            const updatedInfo = { ...this.info }
            updatedInfo.todos = updatedInfo.todos.map(
                (todo, idx) => idx === todoIdx ? { ...todo, isDone: !todo.isDone } : todo
            )
            this.$emit('update-note-info', updatedInfo)
        },

        updateTodoTxt(todoIdx, txt) {
            console.log(todoIdx, txt);
            const updatedInfo = { ...this.info }
            updatedInfo.todos = updatedInfo.todos.map(
                (todo, idx) => idx === todoIdx ? { ...todo, txt } : todo
            )
            this.$emit('update-note-info', updatedInfo)

        }
    }

}