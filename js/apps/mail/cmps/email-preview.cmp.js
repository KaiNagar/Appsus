import { emailService } from "../services/email-service.js";

export default {
    template: `
        <section @click="readEmail" class="email-preview">
            
            <td @click="makeImp" :class="checkIfRead" class="starImp">☆</td>
                <td class="bold">{{email.userName}}</td>
                <td :class="checkIfRead">{{email.subject}}</td>
                <td>{{emailBodyShort}}...</td>
                <td :class="checkIfRead" class="time">{{email.id}}</td>
            
            <!-- <div class="email-short-info flex space-between">
                <p class="bold">{{email.userName}}</p>
                <p :class="checkIfRead">{{email.subject}}</p>
                <p>{{emailBodyShort}}...</p>
                <p @click="makeImp" :class="checkIfRead" class="starImp">☆</p>
                <p :class="checkIfRead" class="time">{{email.id}}</p>
            </div> -->
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