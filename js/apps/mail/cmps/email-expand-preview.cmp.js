import { emailService } from "../services/email-service.js";

export default {
    template: `
        <section>
            <div class="expand-header flex space-between align-center">
                <h1>{{email.subject}}</h1>
                <div class="expand-actions">
                    <button @click="removeEmail">Delete</button>
                    <button @click="readFullEmail">Read More</button>
                </div>
            </div>
            <h2>{{email.userName}} {{emailFormat}}</h2>
            <p>{{email.body}}</p>
        </section>   
 `,
    props: ['email'],
    components: {},
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
                    this.$emit('delId',this.email.id)
                } 
              })
        },
        readFullEmail() {
            console.log(this.email);
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
    unmounted() { },
};