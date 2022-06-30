export default {
    props: ['info'],
    template: `
     <section class="note-video">
      <iframe
         :src="url"
         frameborder="0" 
         allow="accelerometer;
          autoplay; 
         encrypted-media;
          gyroscope;
           picture-in-picture"
         allowfullscreen>
      </iframe> 
    </section>
`,
    data() {
        return {};
    },
    created() {
    },
    methods: {},
    computed: {
        url() {
            // return `https://www.youtube.com/embed/${this.info.videoId}`
        },
    },
    unmounted() { },
};