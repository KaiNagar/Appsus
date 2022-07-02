export default {
    template: `
        <section class="about-page">
            <img ref ="backgroundImg" src="imgs/home-imgs/homeeeee.avif" alt="">
            <h1 ref="aboutTitle">Home</h1>
            <div class="headlines">
                <h2>3 Apps In 1 Place</h2>
                <h3>Go check it out!</h3> 
            </div>
        </section>
 
    `,
    props: [],
    components: {},
    data() {
        return {
            photos: [
                './imgs/home-imgs/homeeeee.avif',
                './imgs/home-imgs/emailhome.avif',
                './imgs/home-imgs/noteshome.avif',
                './imgs/home-imgs/books-home.jpg',
            ],
            titles: [
                'Home',
                'Emails',
                'Notes',
                'Books',
            ],
            num: 0
        }
    },
    methods: {},
    computed: {},
    created() {
        setInterval(() => {
            this.$refs.aboutTitle.innerText = this.titles[this.num]
            this.$refs.backgroundImg.src = this.photos[this.num]
            this.num++
            if (this.num === this.photos.length) this.num = 0
        }, 3500);
    },
    unmounted() { },
}