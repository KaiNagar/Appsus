import { storageService } from "../../../services/async-storage-service.js"
import { utilService } from "../../../services/util-service.js"

export const emailService = {
    getUser,
    getInboxEmails,
    getSentEmails,
    getsStarredEmails,
    updateEmail,
    setEmails,
    addEmail,
    _setData,
    getDraftsEmails,
}


const INBOX_MAIL_KEY = 'inboxM'
const SENT_MAIL_KEY = 'sentM'
const DRAFT_MAIL_KEY = 'draftM'
const STARRED_MAIL_KEY = 'starredM'
const USER_KEY = 'userK'


const loggedInUser = {
    email: 'stavkai@sprint3.com',
    fullName: 'Izuku Midoriya'
}

const sentEmailsData = [
    {
        id: utilService.makeId(),
        subject: 'We love anime!!',
        body: 'yo you have to check that last episode of heros academy it was insane!!!',
        isRead: false,
        isStarred: true,
        sentAt: 1656443147853,
        to: 'pukishuki@CA.com',
        userName: 'Puki'
    },
    {
        id: utilService.makeId(),
        subject: 'We love anime!!',
        body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit iure ipsum cumque voluptates, aspernatur, a praesentium similique labore quis tempore earum? Fugiat quae sit tempora nisi pariatur maxime exercitationem laboriosam.',
        isRead: false,
        isStarred: true,
        sentAt: 1656492967853,
        to: 'pukishuki@CA.com',
        userName: 'shuki'
    },
    {
        id: utilService.makeId(),
        subject: 'We love anime!!',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. In itaque corrupti natus porro nobis quidem dolorum fuga, sequi nisi consectetur consequuntur alias blanditiis veritatis quia aspernatur ut vitae laudantium mollitia?',
        isRead: false,
        isStarred: false,
        sentAt: 1656404967853,
        to: 'pukishuki@CA.com',
        userName: 'Puki'
    },
    {
        id: utilService.makeId(),
        subject: 'We love anime!!',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui ipsa in doloribus nemo adipisci aliquid inventore voluptatem impedit voluptatum ut, dolorem quisquam, reiciendis modi sint odit rerum officia velit dolores!',
        isRead: false,
        isStarred: false,
        sentAt: 1656402967853,
        to: 'pukishuki@CA.com',
        userName: 'Puki'
    },
]

const recivedEmailsData = [
    {
        id: utilService.makeId(),
        subject: 'We love coding!!',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla exercitationem provident incidunt, iusto, esse fugiat, quidem corrupti expedita reprehenderit beatae autem laudantium maiores voluptas sed libero repudiandae. Voluptatem, sit aliquid?',
        isRead: false,
        isStarred: false,
        sentAt: 1656443147853,
        from: 'yaronBoton@ca.com',
        userName: 'Yaron'
    },
    {
        id: utilService.makeId(),
        subject: 'We love coding!!',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla exercitationem provident incidunt, iusto, esse fugiat, quidem corrupti expedita reprehenderit beatae autem laudantium maiores voluptas sed libero repudiandae. Voluptatem, sit aliquid?',
        isRead: false,
        isStarred: true,
        sentAt: 1656443147853,
        from: 'yaronBoton@ca.com',
        userName: 'Yaron'
    },
    {
        id: utilService.makeId(),
        subject: 'We love coding!!',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla exercitationem provident incidunt, iusto, esse fugiat, quidem corrupti expedita reprehenderit beatae autem laudantium maiores voluptas sed libero repudiandae. Voluptatem, sit aliquid?',
        isRead: false,
        isStarred: false,
        sentAt: 1656443147853,
        from: 'yaronBoton@ca.com',
        userName: 'Biton'
    },
    {
        id: utilService.makeId(),
        subject: 'We love coding!!',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla exercitationem provident incidunt, iusto, esse fugiat, quidem corrupti expedita reprehenderit beatae autem laudantium maiores voluptas sed libero repudiandae. Voluptatem, sit aliquid?',
        isRead: false,
        isStarred: true,
        sentAt: 1656443147853,
        from: 'yaronBoton@ca.com',
        userName: 'Biton'
    },
]
const draftsEmailsData = [
    {
        id: utilService.makeId(),
        subject: null,
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla exercitationem provident incidunt, iusto, esse fugiat, quidem corrupti expedita reprehenderit beatae autem laudantium maiores voluptas sed libero repudiandae. Voluptatem, sit aliquid?',
        isRead: false,
        isStarred: false,
        sentAt: 1656443107853,
        from: null,
        userName: 'Yaron'
    },
    {
        id: utilService.makeId(),
        subject: null,
        body: ' iusto, esse fugiat, quidem coantium maiores vndae. Voluptatem, sit aliquid?',
        isRead: false,
        isStarred: false,
        sentAt: 1656443107853,
        from: null,
        userName: 'Yaron'
    },
]

_setData()

// const starredEmailsData = []
// _setStarredEmailsData()

// function _setStarredEmailsData() {
//     starredEmailsData.push(...sentEmailsData.filter(email => email.isStarred === true))
//     starredEmailsData.push(...recivedEmailsData.filter(email => email.isStarred === true))
// }

function _setData() {
    storageService.query(SENT_MAIL_KEY).then(emails => {
        if (!emails || !emails.length) {
            utilService.saveToStorage(SENT_MAIL_KEY, sentEmailsData)
        }
    })
    storageService.query(USER_KEY).then(settings => {
        if (!settings || !settings.length) {
            utilService.saveToStorage(USER_KEY, loggedInUser)
        }
    })
    storageService.query(INBOX_MAIL_KEY).then(emails => {
        if (!emails || !emails.length) {
            utilService.saveToStorage(INBOX_MAIL_KEY, recivedEmailsData)
        }
    })
    storageService.query(DRAFT_MAIL_KEY).then(emails => {
        if (!emails || !emails.length) {
            utilService.saveToStorage(DRAFT_MAIL_KEY, draftsEmailsData)
        }
    })
}



function addEmail(email) {
    storageService.query(SENT_MAIL_KEY).then(emails => {
        emails.unshift(email)
        utilService.saveToStorage(SENT_MAIL_KEY, emails)
        console.log(emails);
    })
}

function updateEmail(emailType, email) {
    let key
    if (emailType === 'sent') key = SENT_MAIL_KEY
    else key = INBOX_MAIL_KEY
    storageService.put(key, email)
}

function getUser() {
    return storageService.query(USER_KEY)
}

function getInboxEmails() {
    return storageService.query(INBOX_MAIL_KEY)
}

function getSentEmails() {
    return storageService.query(SENT_MAIL_KEY)
}

function getsStarredEmails() {
    return getInboxEmails().then(emails => {
        let sortedMails = []
        sortedMails.push(...emails.filter(email => email.isStarred === true))
        return getSentEmails().then(emails => {
            sortedMails.push(...emails.filter(email => email.isStarred === true))
            return sortedMails
        })
    })
}

function getDraftsEmails(){
    return storageService.query(DRAFT_MAIL_KEY)
}

function setEmails(filterType) {
    if (filterType === 'inbox') return getInboxEmails()
    if (filterType === 'sent') return getSentEmails()
    if (filterType === 'starred') return getsStarredEmails()
    if (filterType === 'drafts') return getDraftsEmails()
    if (filterType === 'trash') return Promise.resolve()
}