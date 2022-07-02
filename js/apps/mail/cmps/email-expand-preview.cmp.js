import { emailService } from "../services/email-service.js";

export default {
    template: `
        <section class="email-expand-preview">
            <div class="expand-header flex space-between align-center">
                <span class="emailTitle">{{email.subject}}</span>
                <div class="expand-actions">
                    <button @click="removeEmail" 
                    title="Remove Email">
                        <img src="./imgs/email-icons/trash.png" alt="Trash icon">
                    </button>
                    <button title="Read Full Email">
                        <router-link :to="'/email/' + email.id">
                            <img src="./imgs/email-icons/expand.png" alt="Expand icon">
                        </router-link>
                    </button>
                </div>
            </div>
            <span class="userInfo">{{email.userName}} 
                <span class="userMail">{{emailFormat}}</span> 
            </span>
            <p class="email-body-expand">{{email.body}}</p>
        </section>   
 `,

    props: ['email'],

    data() {
        return {
            type: null
        };
    },

    methods: {
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
                }
            })
        },
        readFullEmail() {
            console.log(this.email.id);
        }
    },

    computed: {
        emailFormat() {
            if (this.email.to) return `<${this.email.to}>`
            else if (this.email.from) return `<${this.email.from}>`
        }
    },

    created() {
        if (this.email.to) this.type = 'sent'
        else if (this.email.from) this.type = 'recived'
    },
};