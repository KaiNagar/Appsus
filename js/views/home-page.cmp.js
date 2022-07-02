import {router} from "../router.js"

export default {
    template: `
        <section class="home-page">
            <div class="home-img">
                <div class="home-title">
                    <h1>Appsus</h1>
                    <p>Three Apps in a single place</p>
                </div>
            </div>
            <div @click="appClicked('emails')" class="emails-img">
                <div class="app-title">
                    <h1>Emails</h1>
                    <p>Always be up to date</p>
                </div>
            </div>
            <div @click="appClicked('notes')" class="notes-img">
                <div class="app-title">
                    <h1>Notes</h1>
                    <p>Never forget what to do</p>
                </div>
            </div>
            <div @click="appClicked('books')" class="books-img">
                <div class="app-title">
                    <h1>Books</h1>
                    <p>Keep on learning</p>
                </div>
            </div>

        </section>
 
 `,
    props: [],
    components: {},
    data() {
        return {}
    },
    methods: {
        appClicked(app){
            switch(app){
                case 'books':
                    this.$router.push('/book')
                    break;
                case 'emails':
                    this.$router.push('/email')
                    break;
                case 'notes':
                    this.$router.push('/note')
                    break;
            }
        }
    },
    computed: {},
    created() { },
    unmounted() { },
}