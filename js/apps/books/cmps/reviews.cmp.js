import { bookService } from "../services/book-service.js"

export default {
    template: `
        <section v-if="book" class="reviews-list">
            <h2>Reviews: </h2>
            <ol>
                <li v-for="(review,idx) in book.reviews" :key="idx">
                Name: {{review.name}}
                <br>
                Email: {{review.email}}
                <br>
                Rating: {{review.rating}}
                <br>
                Date: {{review.date}}  
                <br>
                Text: {{review.text}}
                <br>
                <button @click="removeReview(idx)">X</button>
                </li>
            </ol>
        </section>
    `,
        props: ['book'],

    data() {
        return {
            reviews: null,
        }
    },

    methods: {
        removeReview(idx) {
            if (confirm('Are you sure you want to delete this review?'))
                bookService.removeReview(this.book.id, idx).then(() => {
                    this.book.reviews.splice(idx, 1)
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
                    Toast.fire({
                        icon: 'success',
                        title: 'Deleted review successfully'
                    })
                })
        }
    },
}