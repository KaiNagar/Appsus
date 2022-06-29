import bookPreview from "./book-preview.cmp.js"

export default {
    props: ["books"],
    template: `
        <section class="books-list">
            <ul>
                <li v-for="book in books" :key="book.id" class="book-preview-container">
                    <book-preview :book="book" @open="select(book.id)" />
                    <div class="actions">
                        <router-link :to="'/book/'+book.id">More</router-link>
                    </div>
                </li>
            </ul>
        </section>
    `,
    components: {
        bookPreview,
    },
    methods: {
        select(bookId) {
            this.$emit("selected", bookId)
        }
    },
    created() {}

}