import { emailService } from "../services/email-service.js";
import { router } from "../../../router.js";

export default {
    template: `
        <section v-if="email" class="email-details-full">
            <div class="details-info flex column">
                <div class="expand-actions flex align-center space-between">
                    <div class="labels flex">
                        <div v-for="(label,idx) in email.labels" class="labels-container">
                            <span class="label" 
                            :class="setLabelStyle(label)">
                                {{label}}
                                <button @click="removeLabel(idx)">x</button>
                            </span>
                        </div>
                    </div>
                    <div>
                        <button @click="removeEmail">
                            <img src="./imgs/email-icons/trash.png" alt="Trash icon">
                        </button>
                        <button @click="back" title="Back To List">
                            <img src="./imgs/email-icons/back.png" alt="Back icon">
                        </button>
                        <button @click="labelsOpen=!labelsOpen" title="Add label">
                            <img src="./imgs/email-icons/add.png" alt="">
                        </button>
                        <div class="label-list" v-if="labelsOpen">
                            <span @click="addLabel('Critical')" 
                            class="critical">
                                Critical
                            </span>
                            <span @click="addLabel('Family')" 
                            class="family">
                                Family
                            </span>
                            <span @click="addLabel('Work')" 
                            class="work">
                                Work
                            </span>
                            <span @click="addLabel('Friends')" 
                            class="friends">
                                Friends
                            </span>
                            <span @click="addLabel('Spam')" 
                            class="spam">
                                Spam
                            </span>
                            <span @click="addLabel('Memories')" 
                            class="memories">
                                Memories
                            </span>
                            <span @click="addLabel('Romantic')" 
                            class="romantic">
                                Romantic
                            </span>
                        </div>

                    </div>
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
            </div>
        </section>
    `,

    data() {
        return {
            email: null,
            type: null,
            nextEmailId: null,
            prevEmailId: null,
            labelsOpen:false,
        };
    },

    methods: {
        //back button to go back to the list of emails
        back() {
            this.$router.push('/email')
        },
        //remocing an email + swal modal
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
        // setting curr label background color
        setLabelStyle(label) {
            switch (label) {
                case 'Critical':
                    return 'critical';
                case 'Family':
                    return 'family';
                case 'Work':
                    return 'work';
                case 'Friends':
                    return 'friends'
                case 'Spam':
                    return 'spam'
                case 'Memories':
                    return 'memories';
                case 'Romantic':
                    return 'romantic'
            }
        },
        //removing a label to curr email
        removeLabel(labelIdx) {
            this.email.labels.splice(labelIdx, 1)
            emailService.updateEmail(this.type,this.email)
        },
        //adding a label to curr email
        addLabel(label){
            if(!this.email.labels) this.email.labels = []
            this.email.labels.push(label)
            emailService.updateEmail(this.type,this.email)
        }
    },

    computed: {
        //setting email format for page
        emailFormat() {
            if (this.email.to) return `<${this.email.to}>`
            else if (this.email.from) return `<${this.email.from}>`
        },
        //setting time format for page
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
}