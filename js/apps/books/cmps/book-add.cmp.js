import { bookService } from "../services/book-service.js"

export default {
    template: `
        <section class="add-book-preview">
            <form @submit.prevent="showBooks">
                <h3 @click="showInput">+ Add New Book</h3>
                <div v-if="isInput" class="search">
                    <input class="book-add-input " v-model="value" id="book-add" list="new-books"  type="search"
                     placeholder="Search & Add New Book">
                    <button><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </form>
            <div v-if="newBooksList" class="new-books">
                <ul>
                    <li v-for="(book,idx) in newBooksList" :key="idx">
                        {{book.title}}
                        <button @click="addBook(idx)">+</button>
                    </li>
                </ul>
            </div>
        </section>
    `,

    data() {
        return {
            value: null,
            newBooksList: null,
            isInput: false
        }
    },

    methods: {
        showInput() {
            this.isInput = !this.isInput
        },
        showBooks() {
            bookService.getNewBooksList(this.value)
                .then(newBooksList => {
                    this.newBooksList = newBooksList
                })
        },
        addBook(idx) {
            this.$emit('addNewBook', this.newBooksList[idx])
            this.newBooksList = null
            this.value = null
        },

    },
}


