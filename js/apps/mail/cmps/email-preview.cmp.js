import { emailService } from "../services/email-service.js";

export default {
    template: `
        <section @click="readEmail" class="email-preview">
            
                <td @click="makeImp" class="starImp">☆</td>
                <td class="bold">{{email.userName}}</td>
                <td :class="checkIfRead">{{email.subject}}</td>
                <td>{{emailBodyShort}}...</td>
                <td :class="checkIfRead" class="time">{{email.id}}</td>
        </section>
    `,
    props: ['email'],
    data() {
        return {
            isRead: null,
        };
    },
    methods: {
        readEmail() {
            let emailType
            this.email.isRead = true
            if (this.email.to) emailType = 'sent'
            else emailType = 'recived'
            emailService.updateEmail(emailType, this.email)
        },
        makeImp() {
            if (this.isRead) console.log('red');
            else console.log('star');
        }
    },
    computed: {
        emailBodyShort() {
            if (!this.email.body) {
                console.log('yo');
                return
            }
            return this.email.body.slice(0, 60)
        },
        checkIfRead() {
            if (this.email.isRead) return
            return 'bold'
        },


    },
    created() {
        this.isRead = this.email.isRead
    },
    unmounted() { },
};