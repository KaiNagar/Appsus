import { router } from "../../../router.js";
import { emailService } from "../services/email-service.js";

export default {
    props: [],
    template: `
        <section class="email-side-filter">
            <!-- <h1>side filter</h1> -->
            <div @click="pushRouter" class="add-compose-action">
                <span class="plus"></span>
                <span class="compose">Compose</span> 
            </div>
            <div class="tabs-nav">
                <div @click="setType('inbox')" ref="inbox" class="tab inbox-tab"><img class="icon" src="./imgs/email-icons/inbox.png">Inbox</div>
                <div @click="setType('starred')" ref="starred" class="tab stared-tab"><img class="icon" src="./imgs/email-icons/starred.png">Starred</div>
                <div @click="setType('sent')" ref="sent" class="tab sent-tab"><img class="icon" src="./imgs/email-icons/sent.png">Sent</div>
                <div @click="setType('drafts')" ref="drafts" class="tab drafts-tab"><img class="icon" src="./imgs/email-icons/draft.png">Drafts</div>
                <div @click="setType('trash')" ref="trash" class="tab trash-tab"><img class="icon" src="./imgs/email-icons/trash.png">Trash</div>
            </div>
        </section>
    `,
    components: {},
    data() {
        return {
            type: null,
            refs: ['inbox', 'starred', 'sent', 'drafts', 'trash']
        };
    },
    methods: {
        setType(type) {
            this.type = type
            this.$emit('emailType', type)
            this.refs.forEach(ref => this.$refs[ref].classList.remove('active-tab'))
            let tab = this.$refs[type]
            tab.classList.add('active-tab')
        },
        pushRouter() {
            router.push('/email/compose')
        },

    },
    computed: {},
    created() { },
    unmounted() { },
};