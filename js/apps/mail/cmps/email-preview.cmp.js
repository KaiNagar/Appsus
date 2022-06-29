// import emailService from "../services/email-service.js";

export default {
    template: `
        <section class="email-preview flex space-between">
            <div class="email-short-info flex">
                <p>{{userName}}</p>
                <p>{{email.subject}}</p>
                <p>{{emailBodyShort}}...</p>
            </div>
            <!-- <button>open</button> -->
        </section>
    `,
    props: ['email'],
    data() {
        return {

        };
    },
    methods: {},
    computed: {
        userName() {
            if (this.email.to) return this.email.to.split('@')[0]
            else if (this.email.from) return this.email.from.split('@')[0]
        },
        emailBodyShort() {
            console.log(this.email.body);
            return this.email.body.slice(0, 60)
        }
    },
    created() { },
    unmounted() { },
};