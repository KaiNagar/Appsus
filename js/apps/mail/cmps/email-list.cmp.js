import { emailService } from "../services/email-service.js";
import emailPreview from "./email-preview.cmp.js";

export default {
    props: ['emails'],
    template: `
    <section class="email-list">
        <table>
            <tbody>
                <tr v-for="email in emails" :key="email.id" class="email-preview-container">
                    
                    <email-preview :email="email" @open="select(email.id)"/>
                </tr>

            </tbody>
        </table>
            <!-- <li v-for="email in emails" :key="email.id" class="email-preview-container">

            </li>
        </ul> -->
    </section>
 `,
    components: {
        emailPreview,
    },
    data() {
        return {
            longBody: false
        };
    },
    methods: {
        select(emailId){
            this.$emit('selected',emailId)
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