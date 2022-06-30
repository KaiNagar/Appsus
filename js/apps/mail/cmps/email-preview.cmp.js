import { emailService } from "../services/email-service.js";
import emailExpandPreview from "./email-expand-preview.cmp.js";

export default {
    template: `
        <section ref="previewRef" class="email-preview">
            <div ref="shrinkRef" @click="readEmail" class="email-preview-shrink flex align-center space-around">
                <td @click="makeImp" class="starImp">☆</td>
                <!-- <td><input ref="star" type="checkbox"></td> -->
                <td class="bold">{{email.userName}}</td>
                <td :class="checkIfRead">{{email.subject}}</td>
                <td>{{emailBodyShort}}...</td>
                <td :class="checkIfRead" class="time">{{formattedTime}}</td>
            </div>
            <hr v-if="expand">
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
            isStarred:false
        };
    },
    methods: {
        readEmail() {
            this.expand = !this.expand
            this.$refs.previewRef.classList.add('email-red')
            let emailType
            this.email.isRead = true
            if (this.email.to) emailType = 'sent'
            else emailType = 'recived'
            emailService.updateEmail(emailType, this.email)
        },
        makeImp() {
            let val = this.$refs.star.val
            console.log(val);
        },
        delEmail(emailId) {
            this.$emit('delId', emailId)
        },
       
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
            return emailService.formattedTime(this.email.sentAt)
        }


    },
    created() {
        this.isRead = this.email.isRead

    },
    mounted() {
        if (this.isRead) this.$refs.previewRef.classList.add('email-red')

    },
    unmounted() { },
};