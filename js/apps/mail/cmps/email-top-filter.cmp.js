export default {
    props: [],
    template: `
        <section class="email-top-filter text-center">
            <input @input="filter" v-model="filterBy.txt"  id="email-search" type="text" placeholder="Search in YippieKaiMail">
            <!-- <select @input="filter">
                <option value="all">All</option>
                <option value="read">Read</option>
                <option value="unread">Un Read</option>
            </select> -->
        </section>
    `,
    components: {},
    data() {
        return {
            filterBy:{
              txt:'',
              status:'all',
            }
        };
    },
    methods: {
        filter(){
            console.log(this.filterBy);
            this.$emit('filtered',{...this.filterBy})
        }
    },
    computed: {},
    created() {},
    unmounted() {},
};