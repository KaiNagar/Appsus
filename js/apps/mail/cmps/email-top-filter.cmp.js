export default {
    template: `
        <section class="email-top-filter text-center">
            <input @input="filter" 
            v-model="filterBy.txt"  
            id="email-search" 
            type="text" 
            placeholder="Search in YippieKaiMail">
        </section>
    `,

    data() {
        return {
            filterBy: {
                txt: '',
                status: 'all',
            }
        };
    },

    methods: {
        filter() {
            console.log(this.filterBy);
            this.$emit('filtered', { ...this.filterBy })
        }
    },
};