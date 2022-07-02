export default {
    template: `
        <section class="main-header">
            <div>
                <img :src="logo" alt="">
            </div>
            <button @click="openMenu"  
            class="menu-btn">
                <img src="imgs/apps-icons/menu-icon.png" 
                title="Menu" alt="Menu icon">
            </button>
            <div ref="headerNav" class="nav-header flex column">
                <button @click="goTo('/')">
                    Home
                    <img src="imgs/apps-icons/home-icon.png" 
                    title="Go to home" alt="Home icon">
                </button>
                <button @click="goTo('/email')">
                    Emails
                    <img src="imgs/apps-icons/email-icon.png" 
                    title="Go to emails" alt="Email icon">
                </button>
                <button @click="goTo('/note')">
                    Notes
                    <img src="imgs/apps-icons/notes-icon.png" 
                    title="Go to notes" alt="Notes icon">
                </button>
                <button @click="goTo('/book')">
                    Books
                    <img src="imgs/apps-icons/books-icon.png" 
                    title="Go to books" alt="Books icon">
                </button>
                <button @click="goTo('/about')">
                    About
                    <img src="imgs/apps-icons/about-icon.png" 
                    title="Go to about" alt="About icon">
                </button>
            </div>
        </section>
    `,

    data() {
        return {
            logo: '',
            menuOpen: false,
        }
    },

    methods: {
        goTo(location) {
            this.$router.push(location)
            this.$refs.headerNav.style.top = '-100%'
            this.menuOpen = !this.menuOpen        
        },
        
        openMenu() {
            this.menuOpen = !this.menuOpen
            if (this.menuOpen) {
                this.$refs.headerNav.style.top = '4.7rem'
            } else {
                this.$refs.headerNav.style.top = '-100%'
            }
        }
    }
}