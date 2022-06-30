import { emailService } from "../services/email-service.js";
import emailExpandPreview from "./email-expand-preview.cmp.js";

export default {
    template: `
        <section  class="email-preview">
            <div @click="readEmail" class="email-preview-shrink flex align-center space-around">
                <td @click="makeImp" class="starImp">☆</td>
                <td class="bold">{{email.userName}}</td>
                <td :class="checkIfRead">{{email.subject}}</td>
                <td>{{emailBodyShort}}...</td>
                <td :class="checkIfRead" class="time">{{formattedTime}}</td>
            </div>
                <email-expand-preview v-if="expand" :email="email" @delId="delEmail"/>
        </section>
    `,
    props: ['email'],
    components: {
        emailExpandPreview,
    },
    data() {
        return {
            isRead: null,
            expand: false,
        };
    },
    methods: {
        readEmail() {
            this.expand = !this.expand
            let emailType
            this.email.isRead = true
            if (this.email.to) emailType = 'sent'
            else emailType = 'recived'
            emailService.updateEmail(emailType, this.email)
        },
        makeImp() {
            if (this.isRead) console.log('red');
            else console.log('star');
        },
        delEmail(emailId) {
            this.$emit('delId', emailId)
        }
    },
    computed: {
        emailBodyShort() {
            if (!this.email.body) {
                return
            }
            return this.email.body.slice(0, 60)
        },
        checkIfRead() {
            if (this.email.isRead) return
            return 'bold'
        },
        formattedTime() {
            return emailService.formattedTime(this.email.sentAt, this.email)
        }


    },
    created() {
        this.isRead = this.email.isRead
    },
    unmounted() { },
};