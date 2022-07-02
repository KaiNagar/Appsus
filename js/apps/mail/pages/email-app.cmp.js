import { emailService } from "../services/email-service.js"
import emailList from "../cmps/email-list.cmp.js"
import topFilter from "../cmps/email-top-filter.cmp.js"
import sideFilter from "../cmps/email-side-filter.cmp.js"


export default {
    template: `
        <section v-if="emails" class="emails-app flex">
            <side-filter :unRead="unReadCount" 
            :percentage="percentage" 
            @emailType="setType"/>
            <div class="main-email-container flex column">
                <top-filter @filtered="setFilter"/>
                <email-list @updateCount="setCount"
                @sortEmails="setSort"   
                :emails="emailsToDisplay"/>
            </div>
            <router-view></router-view>
        </section>
    `,

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
            sortBy: null,
            sortDirection: true,
            allMail: null,
            unReadCount: null,
            percentage: Math.round(this.unRedCount / this.allMail * 100)
        };
    },

    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        setType(type) {
            emailService.setEmails(type).then(emails => this.emails = emails)
        },
        //this function is big but keep in mind this function can sort 6 different values in both directions
        //there most be a better why but i could think of one at this moment
        setSort(val) {
            //sort direction true means sorting from new to old/read to unread/importent to not
            //if false sorting the other way around
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
                } else if (this.sortBy === 'read') {
                    if (this.sortDirection) {
                        this.emails = emails.filter(email => email.isRead === true)
                        this.emails.push(...emails.filter(email => email.isRead === false))
                    } else {
                        this.emails = emails.filter(email => email.isRead === false)
                        this.emails.push(...emails.filter(email => email.isRead === true))
                    }
                } else if (this.sortBy === 'starred') {
                    if (this.sortDirection) {
                        this.emails = emails.filter(email => email.isStarred === true)
                        this.emails.push(...emails.filter(email => email.isStarred === false))
                    } else {
                        this.emails = emails.filter(email => email.isStarred === false)
                        this.emails.push(...emails.filter(email => email.isStarred === true))
                    }
                }
            })
        },
        setCount(diff) {
            if (diff) this.unReadCount--
            else this.unReadCount++
            this.percentage = Math.round(((this.allMail - this.unReadCount) / this.allMail) * 100)
            if (this.percentage < 0) this.percentage = 5
        },
    },

    computed: {
        emailsToDisplay() {
            if (!this.filterBy) {
                return this.emails
            }
            const regex = new RegExp(this.filterBy.txt, 'i')
            return this.emails.filter((email) => regex.test(email.to) ||
                regex.test(email.body) || regex.test(email.subject) ||
                regex.test(email.from) || regex.test(email.id) || regex.test(email.userName))
        }
    },

    created() {
        emailService.setEmails(this.sideFilter).then(emails => {
            this.emails = emails
        }),
            emailService.getInboxEmails()
                .then(allMail => {
                    this.allMail = allMail.length
                    this.unReadCount = allMail.length
                    allMail.forEach(email => {
                        if (email.isRead) this.unReadCount--
                    })
                    this.percentage = Math.round(((this.allMail - this.unReadCount) / this.allMail) * 100)
                })
    },
};