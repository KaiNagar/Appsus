import emailPreview from "./email-preview.cmp.js";

export default {
    props: ['emails'],
    template: `
    <section class="email-list">
        <table>
            <tbody>
                <div>
                    <tr class=titles>
                        <td @click="sort('starred')" class="flex align-center">Imp<img src="./imgs/email-icons/sort.png" alt="Sort icon"></td>
                        <td @click="sort('userName')" class="flex align-center">Name<img src="./imgs/email-icons/sort.png" alt="Sort icon"></td>
                        <td @click="sort('subject')" class="flex align-center">Subject<img src="./imgs/email-icons/sort.png" alt="Sort icon"></td>
                        <td @click="sort('body')" class="flex align-center">Body<img src="./imgs/email-icons/sort.png" alt="Sort icon"></td>
                        <td @click="sort('time')" class="flex align-center">Date<img src="./imgs/email-icons/sort.png" alt="Sort icon"></td>
                    </tr>
                </div>
                <tr v-for="email in emails" :key="email.id" class="email-preview-container">
                    <email-preview @delId="delEmail"  :email="email"/>
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
        expandPreview() {
            console.log('yo');
        },
        delEmail(emailId) {
            const idx = this.emails.findIndex(email => email.id === emailId)
            this.emails.splice(idx, 1)
        },
        sort(val){
            this.$emit('sortEmails',val)
        }
       

    },
    computed: {

    },
    created() {
        setTimeout(() => {

        }, 1000);
    },
    unmounted() { },
};