import { emailService } from "../services/email-service.js";
import { router } from "../../../router.js";

export default {
    template: `
        <section v-if="email" class="email-details-full">
            <div class="details-info flex column">
                <div class="expand-actions">
                    <button @click="removeEmail">
                        <img src="./imgs/email-icons/trash.png" alt="Trash icon">
                    </button>
                    <button @click="back" title="Back To List">
                        <img src="./imgs/email-icons/back.png" alt="Back icon">
                    </button>
                </div>
                <div class="details-data flex column">
                    <span class="details-subject">{{email.subject}}</span>
                    
                    <div class="formatted-data flex align-center">
                        <span class="userName">{{email.userName}}</span>
                        <div class="email-settings flex space-between">
                            <span>{{emailFormat}}</span> 
                            <span>{{formattedTime}}</span> 
                        </div>
                    </div>
                    <div class="details-body">{{email.body}}</div>
                </div>
                <!-- <button @click="getN"></button> -->
                    <!-- <router-link class="next-email" :to="'/email/' + nextEmailId" title="Read Next Email">Next Email</router-link>
                    <router-link class="prev-email" :to="'/email/' + prevEmailId" title="Read Prev Email">Prev Email</router-link> -->
            </div>
        </section>
    `,

    data() {
        return {
            email: null,
            type: null,
            nextEmailId: null,
            prevEmailId: null,
        };
    },

    methods: {
        back() {
            this.$router.push('/email')
        },
        removeEmail() {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    emailService.removeEmail(this.type, this.email)
                    this.$emit('delId', this.email.id)
                    this.$router.push('/email')
                }
            })
        },

        getPrevEmailId() {
            emailService.getPrevId(this.email)
        },
    },

    computed: {
        emailFormat() {
            if (this.email.to) return `<${this.email.to}>`
            else if (this.email.from) return `<${this.email.from}>`
        },
        formattedTime() {
            return emailService.formattedTime(this.email.sentAt)
        }
    },

    created() {
        const id = this.$route.params.emailId
        emailService.getEmailById(id)
            .then(email => {
                this.email = email
                if (this.email.to) this.type = 'sent'
                else if (this.email.from) this.type = 'recived'
            })
    },
    // watch: {
    //     '$route.params.emailId': {
    //         handler() {
    //             if (!this.$route.params.emailId) return
    //             const id = this.$route.params.emailId
    //             emailService.getEmailById(id).then(email => {
    //                 this.email = email
    //                 emailService.getNextId(email)
    //                     .then(nextEmailId => {
    //                         console.log(nextEmailId);
    //                         this.nextEmailId = nextEmailId
    //                     })


    //             })
    //         },
    //         immediate: true
    //     }
    // },
}