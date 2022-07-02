import { emailService } from "../services/email-service.js";
import emailExpandPreview from "./email-expand-preview.cmp.js";
import { eventBus } from "../../../services/eventBus-service.js"

export default {
    template: `
        <section ref="previewRef" class="email-preview">
            <div ref="shrinkRef" @click="readEmail" 
            class="email-preview-shrink flex align-center space-around">
                <td ref="starIcon" 
                @click="makeImp" 
                class="starImp" 
                title="Toggle Important">&#9733;
                </td>
                <td class="bold">{{email.userName}}</td>
                <td :class="checkIfRead">{{email.subject}}</td>
                <td>{{emailBodyShort}}...</td>
                <td ref="readIcon" 
                @click="toggleRead" 
                class="read-status" 
                title="Toggle Read">
                    <i v-if="!email.isRead" class="fa-regular fa-envelope"></i>
                    <i v-if="email.isRead"  class="fa-regular fa-envelope-open"></i>
                </td>
                <td :class="checkIfRead" class="time">{{formattedTime}}</td>
            </div>
            <hr v-if="expand">
            <email-expand-preview v-if="expand" 
            :email="email" 
            @delId="delEmail"/>
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
            starClick: false,
            emailType: null,
            readClick: false,
        };
    },

    methods: {
        readEmail() {
            if (this.readClick) {
                if (!this.email.isRead) this.$emit('updateCount', false)
                else this.$emit('updateCount', true)
            } else {
                if (!this.email.isRead) this.$emit('updateCount', true)
            }
            this.expand = !this.expand
            if (this.starClick || this.readClick) return
            this.starClick = false
            this.$refs.previewRef.classList.add('email-red')
            this.email.isRead = true
            emailService.updateEmail(this.emailType, this.email)
            this.starClick = false
            this.readClick = false
        },
        makeImp() {
            this.starClick = true
            this.expand = !this.expand
            if (this.email.isStarred) {
                this.$refs.starIcon.classList.remove('starImp-active')
                this.email.isStarred = false
                eventBus.emit('show-msg', { txt: `Set email from ${this.email.userName} not important`, type: 'success' });
            }
            else {
                this.$refs.starIcon.classList.add('starImp-active')
                this.email.isStarred = true
                eventBus.emit('show-msg', { txt: `Set email from ${this.email.userName} important`, type: 'success' });
            }
            emailService.updateEmail(this.emailType, this.email)
        },
        delEmail(emailId) {
            this.$emit('delId', emailId)
        },
        toggleRead() {
            this.readClick = true
            this.expand = !this.expand
            if (this.email.isRead) {
                this.email.isRead = false
                this.$refs.previewRef.classList.remove('email-red')
            } else {
                this.email.isRead = true
                this.$refs.previewRef.classList.add('email-red')
            }
            emailService.updateEmail(this.emailType, this.email)
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
            return emailService.formattedTime(this.email.sentAt)
        }
    },

    created() {
        this.isRead = this.email.isRead
        if (this.email.to) this.emailType = 'sent'
        else this.emailType = 'recived'
    },

    mounted() {
        if (this.isRead) this.$refs.previewRef.classList.add('email-red')
        if (this.email.isStarred) this.$refs.starIcon.classList.add('starImp-active')
    },
}