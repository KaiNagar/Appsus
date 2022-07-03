export default {

    template: `
    <section>
        <img v-if="info.url" :src="info.url" />
        <div v-else class="gif-img">
            <img src="./imgs/note-imgs/gifs/boom.gif" alt="" />
        </div>
    </section>
    `,

    props: ['info'],
    
    data() {
        return {

        }
    },
    created() {
    },
    methods: {

    },
    computed: {

    },
    unmounted() { },
}