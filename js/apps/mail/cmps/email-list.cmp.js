import emailPreview from "./email-preview.cmp.js";

export default {
    props: ['emails'],
    template: `
    <section class="email-list">
        <table>
            <tbody>
                <tr v-for="email in emails" :key="email.id" class="email-preview-container">
                    <email-preview @delId="delEmail" @click="expand=!expand" :email="email" @open="select(email.id)"/>
                </tr>
            </tbody>
        </table>
    </section>
 `,
    components: {
        emailPreview,
    },
    data() {
        return {
            longBody: false,
        };
    },
    methods: {
        select(emailId) {
            console.log(emailId);
            this.$emit('selected', emailId)
        },
        expandPreview() {
            console.log('yo');
        },
        delEmail(emailId) {
            const idx = this.emails.findIndex(email => email.id === emailId)
            this.emails.splice(idx, 1)
        }
    },
    computed: {

    },
    created() {
        console.log(this.emails);
        setTimeout(() => {

        }, 1000);
    },
    unmounted() { },
};