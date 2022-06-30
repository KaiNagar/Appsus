import { emailService } from "../services/email-service.js"
import emailList from "../cmps/email-list.cmp.js"
import topFilter from "../cmps/email-top-filter.cmp.js"
import sideFilter from "../cmps/email-side-filter.cmp.js"


export default {
    template: `
    <section v-if="emails" class="emails-app flex">

        <side-filter :unRed="unRedCount" @emailType="setType"/>
        <div class="main-email-container flex column">
            <top-filter @filtered="setFilter"/>
            <email-list @sortEmails="setSort"  :emails="emailsToDisplay"/>
        </div>
        <router-view></router-view>
        
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
            sideFilter: 'inbox',
            unRedCount: null,
            sortBy: null,
            sortDirection: true
        };
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        setType(type) {
            emailService.setEmails(type).then(emails => this.emails = emails)
        },
        setSort(val) {
            this.sortBy = val
            if (val === this.sortBy) this.sortDirection = !this.sortDirection
            emailService.setEmails(this.sideFilter).then(emails => {
                if (!this.sortBy) return this.emails = emails
                else if (this.sortBy === 'time') {
                    if (this.sortDirection) this.emails = emails.sort((mail1, mail2) => mail2.sentAt - mail1.sentAt)
                    else this.emails = emails.sort((mail1, mail2) => mail1.sentAt - mail2.sentAt)
                } else if (this.sortBy === 'userName') {
                    if (this.sortDirection) this.emails = emails.sort((mail1, mail2) => mail1.userName.localeCompare(mail2.userName))
                    else this.emails = emails.sort((mail1, mail2) => mail2.userName.localeCompare(mail1.userName))
                } else if (this.sortBy === 'body') {
                    if (this.sortDirection) this.emails = emails.sort((mail1, mail2) => mail1.body.localeCompare(mail2.body))
                    else this.emails = emails.sort((mail1, mail2) => mail2.body.localeCompare(mail1.body))
                } else if (this.sortBy === 'subject') {
                    if (this.sortDirection) this.emails = emails.sort((mail1, mail2) => mail1.subject.localeCompare(mail2.subject))
                    else this.emails = emails.sort((mail1, mail2) => mail2.subject.localeCompare(mail1.subject))
                }
            })
        }
    },
    computed: {
        emailsToDisplay() {
            if (!this.filterBy) {
                return this.emails
            }
            const regex = new RegExp(this.filterBy.txt, 'i')
            return this.emails.filter((email) => regex.test(email.to) ||
                regex.test(email.body) || regex.test(email.subject) ||
                regex.test(email.from) || regex.test(email.id))
        }
    },
    created() {
        emailService.setEmails(this.sideFilter).then(emails => {
            this.emails = emails
        }),
            emailService.getInboxEmails()
                .then(allMail => {
                    this.unRedCount = allMail.length
                    allMail.forEach(email => {
                        if (email.isRead) this.unRedCount--

                    })
                })
    },
    unmounted() { },
};