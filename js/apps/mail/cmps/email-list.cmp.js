import { eventBus } from "../../../services/eventBus-service.js";
import emailPreview from "./email-preview.cmp.js";

export default {
    template: `
        <section class="email-list">
            <table>
                <tbody>
                    <div>
                        <tr class=titles>
                            <td @click="sort('starred')" 
                            title="Sort By Importance" 
                            class="flex align-center">
                                Imp
                                <img src="./imgs/email-icons/sort.png" alt="Sort icon">
                            </td>
                            <td @click="sort('userName')" 
                            title="Sort By Name" 
                            class="flex align-center">
                                Name
                                <img src="./imgs/email-icons/sort.png" alt="Sort icon">
                            </td>
                            <td @click="sort('subject')" 
                            title="Sort By Subject" 
                            class="flex align-center">
                                Subject
                                <img src="./imgs/email-icons/sort.png" alt="Sort icon">
                            </td>
                            <td @click="sort('body')" 
                            title="Sort By Body" 
                            class="flex align-center">
                                Body
                                <img src="./imgs/email-icons/sort.png" alt="Sort icon">
                            </td>
                            <td @click="sort('read')" 
                            title="Sort By Read" 
                            class="flex align-center">
                                Read
                                <img src="./imgs/email-icons/sort.png" alt="Sort icon">
                            </td>
                            <td>Labels</td>
                            <td @click="sort('time')" 
                            title="Sort By Date" 
                            class="flex align-center">
                                Date
                                <img src="./imgs/email-icons/sort.png" alt="Sort icon">
                            </td>
                        </tr>
                    </div>
                    <tr v-for="email in emails" 
                    :key="email.id" 
                    class="email-preview-container">
                        <email-preview @delId="delEmail" 
                        @updateCount="sendCount"   
                        :email="email"/>
                    </tr>
                </tbody>
            </table>
        </section>
 `,

    props: ['emails'],

    components: {
        emailPreview,
    },

    data() {
        return {
            unsubscribe:null,
            longBody: false,
            click: false,
            note:null,
        }
    },

    methods: {
        delEmail(emailId) {
            const idx = this.emails.findIndex(email => email.id === emailId)
            eventBus.emit('show-msg', { txt: `Deleted email from ${this.emails[idx].userName}`, type: 'success' });
            this.emails.splice(idx, 1)
        },
        sort(val) {
            if (val === 'read') this.click = !this.click
            this.$emit('sortEmails', val)

        },
        sendCount(diff){
            this.$emit('updateCount',diff)
        },
    },
   //getnote
    created() {},
    
    unmounted() { },
}