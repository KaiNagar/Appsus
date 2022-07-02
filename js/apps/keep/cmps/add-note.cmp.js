
export default {
    template: `
    <section class="add-note">
        <form @submit.prevent="createNote"
                class="add-note-form">
                <input
                v-model="value"
                :placeholder="placeholder"
                type="text"
               />
            <span id="text" 
                :class="{active:noteType === 'note-txt'}"
                @click="setNoteType('note-txt')">
                <i class="fa-solid fa-t"></i>
            </span>
            <span id="img" 
                @click="setNoteType('note-img')"
                :class="{active:noteType === 'note-img'}"
                type=file>
                <i class="fa-solid fa-image"></i>
            </span>

            <span id="todo" 
                @click="setNoteType('note-todos')"
                :class="{active:noteType === 'note-todos'}">
                <i class="fa-solid fa-list"></i>
            </span>

            <span id="video"
            @click="setNoteType('note-video')" 
            type=file
            :class="{active:noteType === 'note-video'}">
            <i class="fa-solid fa-video"></i>
            </span>

            <button>
                Add
            </button>
        </form>
    </section>
`,
    data() {
        return {
            noteType: 'note-txt',
            value: ''
        }
    },
    methods: {
        setNoteType(type) {
            this.noteType = type
        },

        createNote() {
            const { value } = this
            console.log(value)
            const info = {}

            if (this.noteType === 'note-txt') {
                info.txt = value
            }
            else if (this.noteType === 'note-img') {
                info.url = value.trim()
            }
            else if (this.noteType === 'note-video') {
                info.videoId = value.trim()
            }

            else if (this.noteType === 'note-todos') {
                info.todos = value.split(',').map(txt => ({
                    txt,
                    isDone: false
                }))
            }
            const newNote = {
                info,
                type: this.noteType
            }
            this.$emit('newNote', newNote)
            this.value = ''
        }
    },
    computed: {
        placeholder() {
            const type = this.noteType
            switch (type) {
                case 'note-txt':
                    return 'Enter text'
                case 'note-img':
                    return 'Enter image url'
                case 'note-video':
                    return 'Enter youtube video url'
                case 'note-todos':
                    return 'Enter todo followed by a comma, then another'
                default: return 'Add content to the new note...'
            }
        }
    },
}
