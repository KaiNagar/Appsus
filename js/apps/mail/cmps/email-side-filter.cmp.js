


export default {
    props: [],
    template: `
        <section class="email-side-filter">
            <h1>side filter</h1>
            <router-link class="compose-btn" to='/email/compose'>Compose</router-link>
            <div class="tabs-nav">
                <div @click="setType('inbox')" class="inbox-tab">Inbox</div>
                <div @click="setType('starred')" class="stared-tab">Starred</div>
                <div @click="setType('sent')" class="sent-tab">Sent</div>
                <div @click="setType('drafts')" class="drafts-tab">Drafts</div>
                <div @click="setType('trash')" class="trash-tab">Trash</div>
            </div>
        </section>
    `,
    components: {},
    data() {
        return {
            type: null
        };
    },
    methods: {
        setType(type) {
            this.type = type
            this.$emit('emailType', type)
        }
    },
    computed: {},
    created() { },
    unmounted() { },
};