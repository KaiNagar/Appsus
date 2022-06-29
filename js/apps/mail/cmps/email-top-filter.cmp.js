export default {
    props: [],
    template: `
        <section class="email-top-filter text-center">
            <label for="email-search">search for email</label>
            <input @input="filter" v-model="filterBy.txt"  id="email-search" type="text">
        </section>
    `,
    components: {},
    data() {
        return {
            filterBy:{
              txt:'',
              date:0,
            }
        };
    },
    methods: {
        filter(){
            this.$emit('filtered',{...this.filterBy})
        }
    },
    computed: {},
    created() {},
    unmounted() {},
};