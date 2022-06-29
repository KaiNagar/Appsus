import { utilService } from "../../../services/util-service.js";
import { emailService } from "../services/email-service.js";
import { router } from "../../../router.js";

export default {
    props: [],
    template: `
    <section ref="compose" class="compose-container">
        <form @submit.prevent="sendEmail">
            <div @click="hideCompose" class="compose-header flex space-between align-center">
                <h3 >New Message</h3>
                <div  class="compose-actions flex space-between align-center">
                    <span class="minimaized">➖</span>
                    <router-link class="exit-compose" to="/email">✖</router-link>
                </div>
            </div>
            <div class="compose-form flex column">
            <input required v-model="newEmail.userName" placeholder="Name:" type="text">
            <input required v-model="newEmail.to" placeholder="To:" type="email">
            <input required v-model="newEmail.subject" placeholder="Subject:" type="text">
            <textarea required v-model="newEmail.body" placeholder="Enter message here" cols="30" rows="10"></textarea>
        </div>
        <div class="btns-actions">
            <button>Send</button>
        </div>
    </form>
    <!-- <router-link to="/email" >Back</router-link> -->
    <!-- <router-link to="'/email'">Back<router-link> -->
    </section>
    `,
    components: {},
    data() {
        return {
            userEmail: null,
            newEmail: {
                id: utilService.makeId(),
                subject: null,
                userName: null,
                body: null,
                isRead: false,
                isStarred: false,
                sentAt: Date.now(),
                to: null,
            },
            isShow: true,
            draftInterval:null,
        };
    },
    methods: {
        sendEmail() {
            console.log(this.newEmail);
            emailService.addEmail(this.newEmail)
            router.push('/email')
        },
        hideCompose() {
            this.isShow = !this.isShow
            let compose = this.$refs.compose
            if (!this.isShow) compose.style.bottom = '-550px'
            else compose.style.bottom = '1rem'
        }
    },
    computed: {},
    created() {
        emailService.getUser().then(user => {
            this.userEmail = user.email
        }),
        this.draftInterval = setInterval(() => {
            // console.log(this.newEmail);
        }, 5000);
    },
    unmounted() { },
};