import { emailService } from "../services/email-service.js"
import emailList from "../cmps/email-list.cmp.js"
import topFilter from "../cmps/email-top-filter.cmp.js"
import sideFilter from "../cmps/email-side-filter.cmp.js"


export default {
    template: `
    <section class="emails-app">
        <h1>this is the main email app</h1>

        <top-filter @filtered="setFilter"/>

        <div class="main-email-container flex">
            <side-filter @emailType="setType"/>
            <email-list :emails="emailsToDisplay"/>
        </div>
        
    </section>
    `,
    props: [],
    components: {
        emailList,
        topFilter,
        sideFilter
    },
    data() {
        return {
            emails: null,
            filterBy: null,
            sideFilter: 'sent',
        };
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        setType(type) {
            console.log(type);
            this.sideFilter = type
        }
    },
    computed: {
        emailsToDisplay() {
            this.emails = emailService.setEmails(this.sideFilter)
            if (!this.filterBy) return this.emails
            const regex = new RegExp(this.filterBy.txt, 'i')
            return this.emails.filter((email) => regex.test(email.to) || regex.test(email.body) || regex.test(email.subject))
        }
    },
    created() {
        this.emails = emailService.setEmails(this.sideFilter)
        console.log(this.emails);
    },
    unmounted() { },
};