export const emailService = {
    getUser,
    getInboxEmails,
    getSentEmails,
    getstarredEmails,
    setEmails,

}

let emailNextId = 101

const loggedInUser = {
    email: 'stavkai@sprint3.com',
    fullName: 'Izuku Midoriya'
}

const sentEmailsData = [
    {
        id: emailNextId++, subject: 'We love anime!!',
        body: 'yo you have to check that last episode of heros academy it was insane!!!',
        isRead: false,
        isStarred: true,
        sentAt: 1656443147853,
        to: 'pukishuki@CA.com'
    },
    {
        id: emailNextId++, subject: 'We love anime!!',
        body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit iure ipsum cumque voluptates, aspernatur, a praesentium similique labore quis tempore earum? Fugiat quae sit tempora nisi pariatur maxime exercitationem laboriosam.',
        isRead: false,
        isStarred: true,
        sentAt: 1656492967853,
        to: 'pukishuki@CA.com'
    },
    {
        id: emailNextId++, subject: 'We love anime!!',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. In itaque corrupti natus porro nobis quidem dolorum fuga, sequi nisi consectetur consequuntur alias blanditiis veritatis quia aspernatur ut vitae laudantium mollitia?',
        isRead: false,
        isStarred: false,
        sentAt: 1656404967853,
        to: 'pukishuki@CA.com'
    },
    {
        id: emailNextId++, subject: 'We love anime!!',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui ipsa in doloribus nemo adipisci aliquid inventore voluptatem impedit voluptatum ut, dolorem quisquam, reiciendis modi sint odit rerum officia velit dolores!',
        isRead: false,
        isStarred: false,
        sentAt: 1656402967853,
        to: 'pukishuki@CA.com'
    },
]

const recivedEmailsData = [
    {
        id: emailNextId++, subject: 'We love coding!!',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla exercitationem provident incidunt, iusto, esse fugiat, quidem corrupti expedita reprehenderit beatae autem laudantium maiores voluptas sed libero repudiandae. Voluptatem, sit aliquid?',
        isRead: false,
        isStarred: false,
        sentAt: 1656443147853,
        from: 'yaronBoton@ca.com'
    },
    {
        id: emailNextId++, subject: 'We love coding!!',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla exercitationem provident incidunt, iusto, esse fugiat, quidem corrupti expedita reprehenderit beatae autem laudantium maiores voluptas sed libero repudiandae. Voluptatem, sit aliquid?',
        isRead: false,
        isStarred: true,
        sentAt: 1656443147853,
        from: 'yaronBoton@ca.com'
    },
    {
        id: emailNextId++, subject: 'We love coding!!',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla exercitationem provident incidunt, iusto, esse fugiat, quidem corrupti expedita reprehenderit beatae autem laudantium maiores voluptas sed libero repudiandae. Voluptatem, sit aliquid?',
        isRead: false,
        isStarred: false,
        sentAt: 1656443147853,
        from: 'yaronBoton@ca.com'
    },
    {
        id: emailNextId++, subject: 'We love coding!!',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla exercitationem provident incidunt, iusto, esse fugiat, quidem corrupti expedita reprehenderit beatae autem laudantium maiores voluptas sed libero repudiandae. Voluptatem, sit aliquid?',
        isRead: false,
        isStarred: true,
        sentAt: 1656443147853,
        from: 'yaronBoton@ca.com'
    },
]



function getUser() {
    return loggedInUser
}

function getInboxEmails() {
    return recivedEmailsData
}

function getSentEmails() {
    return sentEmailsData
}

function getstarredEmails() {
    let emails = getInboxEmails().filter(email => email.isStarred === true)
    emails.push(...getSentEmails().filter(email => email.isStarred === true))
    console.log(emails);
    return emails
}

function setEmails(filterType) {
    console.log(filterType);
    if (filterType === 'inbox') return getInboxEmails()
    if (filterType === 'sent') return getSentEmails()
    if (filterType === 'starred') return getstarredEmails()
}