import { storageService } from "../../../services/async-storage-service.js"
import { utilService } from "../../../services/util-service.js"

export const emailService = {
    getUser,
    getAllEmails,
    getInboxEmails,
    updateEmail,
    setEmails,
    addEmail,
    saveEmailDraft,
    removeEmail,
    formattedTime,
    getEmailById,
}


const INBOX_MAIL_KEY = 'inboxM'
const SENT_MAIL_KEY = 'sentM'
const DRAFT_MAIL_KEY = 'draftM'
const DELETED_MAIL_KEY = 'delM'
const USER_KEY = 'userK'


const loggedInUser = {
    email: 'tachoka@services.com',
    fullName: 'Izuku Midoriya'
}

const recivedEmailsData = [
    {
        id: utilService.makeId(),
        subject: 'Some guy cut me off in line!!!',
        body: 'to be honest i usually never send emails about bad costumers but this guy was super anoyying and i just had to inform you that\
         even your employs just stood there and did absolutely nothing!!!,\
         this is the last time i wil ever come back to \"Tachoka a place for dirt\", and i will buy my dirt somewhere else!\
         thank you or actually NOT! and goodBYE or actully just f*****g BYE!',
        isRead: false,
        isStarred: true,
        sentAt: 1656446147853,
        from: 'karenbigmac822@kmail.com',
        userName: 'Karen'
    },
    {
        id: utilService.makeId(),
        subject: 'some women peed on my car in your parking lot!',
        body: 'The other day i was comeing to buy some dirt like i do in ever 3rd subday of the 4th month in every 2 years!\
        gotta keep the dirt fresh, well anyway i was in a rush and i thought the line was open so i just grab my dirt and went to pay\
        but all of the sudden some crazy woman started screaming, later on i saw her PEEINGon the roof of my car!!\
        how did she even got there!!!\
        i ask you to ban here from your store for ever!!',
        isRead: false,
        isStarred: true,
        sentAt: 1656492967853,
        from: 'drdan342@kmail.com',
        userName: 'Dan'
    },
    {
        id: utilService.makeId(),
        subject: 'The dirt is smelly',
        body: 'hey there i just bought some dirt fro you guys and i did the thing which i always do with my dirt which i am not going to tell you guys\
        but anyway the dirt have a very bad smell and i can use it anymore\
        i would like you guys to send me a new bag of dirt ASAP as i trully need it now!!!\
        also you can take the old dirt.... but i wouldnt recommend that....',
        isRead: false,
        isStarred: false,
        sentAt: 1656304967853,
        from: 'aayesaa@kmail.com',
        userName: 'Din'
    },
    {
        id: utilService.makeId(),
        subject: 'love it!!!',
        body: 'just got home with the new dirt i just bought at your store!! \"Tachoka a place for dirt\"\
        and first of all the color is amazing!! never have i seen such a beautiful color, secondly my dogs instentlly started playing in it\
        you might see this as a bad thing but for me its great to see my dogs this happy!\
        thank you very much for once again, amazing products and amazing quality!',
        isRead: false,
        isStarred: false,
        sentAt: 1245402967853,
        from: 'nirkpolake@kmail.com',
        userName: 'Nir'
    },
    {
        id: utilService.makeId(),
        subject: 'software is not up to date',
        body: 'hey there first of all i tried updated your website but the minute i watched the code\
        i wanted to burn my laptop, WHO THE HELL WROTE THIS CODE!! this is freking garbage!, delete your websits now please and i will build you a new one\
        from scratch this time the right way!',
        isRead: false,
        isStarred: false,
        sentAt: 1245402967853,
        from: 'FSguy@kmail.com',
        userName: 'Aviv'
    },
    {
        id: utilService.makeId(),
        subject: 'Some guy cut me off in line!!!',
        body: 'to be honest i usually never send emails about bad costumers but this guy was super anoyying and i just had to inform you that\
         even your employs just stood there and did absolutely nothing!!!,\
         this is the last time i wil ever come back to \"Tachoka a place for dirt\", and i will buy my dirt somewhere else!\
         thank you or actually NOT! and goodBYE or actully just f*****g BYE!',
        isRead: false,
        isStarred: true,
        sentAt: 1656446147853,
        from: 'karenbigmac822@kmail.com',
        userName: 'Karen'
    },
    {
        id: utilService.makeId(),
        subject: 'some women peed on my car in your parking lot!',
        body: 'The other day i was comeing to buy some dirt like i do in ever 3rd subday of the 4th month in every 2 years!\
        gotta keep the dirt fresh, well anyway i was in a rush and i thought the line was open so i just grab my dirt and went to pay\
        but all of the sudden some crazy woman started screaming, later on i saw her PEEINGon the roof of my car!!\
        how did she even got there!!!\
        i ask you to ban here from your store for ever!!',
        isRead: false,
        isStarred: true,
        sentAt: 1656492967853,
        from: 'drdan342@kmail.com',
        userName: 'Dan'
    },
    {
        id: utilService.makeId(),
        subject: 'The dirt is smelly',
        body: 'hey there i just bought some dirt fro you guys and i did the thing which i always do with my dirt which i am not going to tell you guys\
        but anyway the dirt have a very bad smell and i can use it anymore\
        i would like you guys to send me a new bag of dirt ASAP as i trully need it now!!!\
        also you can take the old dirt.... but i wouldnt recommend that....',
        isRead: false,
        isStarred: false,
        sentAt: 1656304967853,
        from: 'aayesaa@kmail.com',
        userName: 'Din'
    },
    {
        id: utilService.makeId(),
        subject: 'love it!!!',
        body: 'just got home with the new dirt i just bought at your store!! \"Tachoka a place for dirt\"\
        and first of all the color is amazing!! never have i seen such a beautiful color, secondly my dogs instentlly started playing in it\
        you might see this as a bad thing but for me its great to see my dogs this happy!\
        thank you very much for once again, amazing products and amazing quality!',
        isRead: false,
        isStarred: false,
        sentAt: 1245402967853,
        from: 'nirkpolake@kmail.com',
        userName: 'Nir'
    },
    {
        id: utilService.makeId(),
        subject: 'software is not up to date',
        body: 'hey there first of all i tried updated your website but the minute i watched the code\
        i wanted to burn my laptop, WHO THE HELL WROTE THIS CODE!! this is freking garbage!, delete your websits now please and i will build you a new one\
        from scratch this time the right way!',
        isRead: false,
        isStarred: false,
        sentAt: 1245402967853,
        from: 'FSguy@kmail.com',
        userName: 'Aviv'
    },
    {
        id: utilService.makeId(),
        subject: 'Some guy cut me off in line!!!',
        body: 'to be honest i usually never send emails about bad costumers but this guy was super anoyying and i just had to inform you that\
         even your employs just stood there and did absolutely nothing!!!,\
         this is the last time i wil ever come back to \"Tachoka a place for dirt\", and i will buy my dirt somewhere else!\
         thank you or actually NOT! and goodBYE or actully just f*****g BYE!',
        isRead: false,
        isStarred: true,
        sentAt: 1656446147853,
        from: 'karenbigmac822@kmail.com',
        userName: 'Karen'
    },
    {
        id: utilService.makeId(),
        subject: 'some women peed on my car in your parking lot!',
        body: 'The other day i was comeing to buy some dirt like i do in ever 3rd subday of the 4th month in every 2 years!\
        gotta keep the dirt fresh, well anyway i was in a rush and i thought the line was open so i just grab my dirt and went to pay\
        but all of the sudden some crazy woman started screaming, later on i saw her PEEINGon the roof of my car!!\
        how did she even got there!!!\
        i ask you to ban here from your store for ever!!',
        isRead: false,
        isStarred: true,
        sentAt: 1656492967853,
        from: 'drdan342@kmail.com',
        userName: 'Dan'
    },
    {
        id: utilService.makeId(),
        subject: 'The dirt is smelly',
        body: 'hey there i just bought some dirt fro you guys and i did the thing which i always do with my dirt which i am not going to tell you guys\
        but anyway the dirt have a very bad smell and i can use it anymore\
        i would like you guys to send me a new bag of dirt ASAP as i trully need it now!!!\
        also you can take the old dirt.... but i wouldnt recommend that....',
        isRead: false,
        isStarred: false,
        sentAt: 1656304967853,
        from: 'aayesaa@kmail.com',
        userName: 'Din'
    },
    {
        id: utilService.makeId(),
        subject: 'love it!!!',
        body: 'just got home with the new dirt i just bought at your store!! \"Tachoka a place for dirt\"\
        and first of all the color is amazing!! never have i seen such a beautiful color, secondly my dogs instentlly started playing in it\
        you might see this as a bad thing but for me its great to see my dogs this happy!\
        thank you very much for once again, amazing products and amazing quality!',
        isRead: false,
        isStarred: false,
        sentAt: 1245402967853,
        from: 'nirkpolake@kmail.com',
        userName: 'Nir'
    },
    {
        id: utilService.makeId(),
        subject: 'software is not up to date',
        body: 'hey there first of all i tried updated your website but the minute i watched the code\
        i wanted to burn my laptop, WHO THE HELL WROTE THIS CODE!! this is freking garbage!, delete your websits now please and i will build you a new one\
        from scratch this time the right way!',
        isRead: false,
        isStarred: false,
        sentAt: 1245402967853,
        from: 'FSguy@kmail.com',
        userName: 'Aviv'
    },
    {
        id: utilService.makeId(),
        subject: 'love it!!!',
        body: 'just got home with the new dirt i just bought at your store!! \"Tachoka a place for dirt\"\
        and first of all the color is amazing!! never have i seen such a beautiful color, secondly my dogs instentlly started playing in it\
        you might see this as a bad thing but for me its great to see my dogs this happy!\
        thank you very much for once again, amazing products and amazing quality!',
        isRead: false,
        isStarred: false,
        sentAt: 1245402967853,
        from: 'nirkpolake@kmail.com',
        userName: 'Nir'
    },
    {
        id: utilService.makeId(),
        subject: 'software is not up to date',
        body: 'hey there first of all i tried updated your website but the minute i watched the code\
        i wanted to burn my laptop, WHO THE HELL WROTE THIS CODE!! this is freking garbage!, delete your websits now please and i will build you a new one\
        from scratch this time the right way!',
        isRead: false,
        isStarred: false,
        sentAt: 1245402967853,
        from: 'FSguy@kmail.com',
        userName: 'Aviv'
    },
    {
        id: utilService.makeId(),
        subject: 'love it!!!',
        body: 'just got home with the new dirt i just bought at your store!! \"Tachoka a place for dirt\"\
        and first of all the color is amazing!! never have i seen such a beautiful color, secondly my dogs instentlly started playing in it\
        you might see this as a bad thing but for me its great to see my dogs this happy!\
        thank you very much for once again, amazing products and amazing quality!',
        isRead: false,
        isStarred: false,
        sentAt: 1245402967853,
        from: 'nirkpolake@kmail.com',
        userName: 'Nir'
    },
    {
        id: utilService.makeId(),
        subject: 'software is not up to date',
        body: 'hey there first of all i tried updated your website but the minute i watched the code\
        i wanted to burn my laptop, WHO THE HELL WROTE THIS CODE!! this is freking garbage!, delete your websits now please and i will build you a new one\
        from scratch this time the right way!',
        isRead: false,
        isStarred: false,
        sentAt: 1245402967853,
        from: 'FSguy@kmail.com',
        userName: 'Aviv'
    },
]

const sentEmailsData = [
    {
        id: utilService.makeId(),
        subject: 'Hey keren!',
        body: 'hey keren thank you for your honest review here at tachokka we try to help every single costumer as much as we can\
        but we do get here and there some people who fell un supported so if you do fell like this \
        i can offer you a copun for our store with 99.8% discount for the latest dirt we just brought\
        if you are intrested let me know please and i wil send it to you right away.\
        and lat thing please, dont pee on peoples cars in our parking lot or you will be BANNED for life!',
        isRead: false,
        isStarred: false,
        sentAt: 1656443145853,
        to: 'tachoka@services.com',
        userName: 'Tachoka@Help'
    },
    {
        id: utilService.makeId(),
        subject: 'Hey there Dan',
        body: 'thank you for reaching out to us and letting us know about the situation we 100% understand you and want to help you as much as we can\
        so pleae let us know how we can do that\
        for now there is a free dirt bag waiting for you in the local store + a gift card for car wash named \"Dani Danchu Detailing\"\
        he is very good trust me!\
        have a great day!',
        isRead: false,
        isStarred: true,
        sentAt: 1656443137853,
        to: 'tachoka@services.com',
        userName: 'Tachoka@Help'
    },
    {
        id: utilService.makeId(),
        subject: 'Hi Din..',
        body: 'We are not quite sure what you do with your dirt and we cant refund you or replace any kind of dirt with out\
        checking the old dirt before, also when you say that we wont like to take the old dirt we think its better for you to have it for now\
        and come to the store for further discussions....\
        i must repeat DO NOT BRING THE OLD DIRT WITH YOU!',
        isRead: false,
        isStarred: false,
        sentAt: 1656442147853,
        to: 'tachoka@services.com',
        userName: 'Tachoka@Help'
    },
    {
        id: utilService.makeId(),
        subject: 'Nir!! our favorite customer',
        body: 'once again we are very happy to her your dirt stories!!\
        it makes everyone here so happy, and you are very welcomed here when ever you want\
        in the name of all our employees we have a spacial surprise for you in the local store so make sure to \
        come pick it up ASAP also you might want to bring your dogs with you ;)',
        isRead: false,
        isStarred: true,
        sentAt: 1656443077853,
        to: 'tachoka@services.com',
        userName: 'Tachoka@Help'
    },
    {
        id: utilService.makeId(),
        subject: 'Hey guy the fullstack developer',
        body: 'thank you for your review about our website Guy we really like what you want to do with our website\
        but you prices are a bit too high for as right now is there any chance to talk about it?\
        we can also pay with dirt if you want, our dirt is the best dirt you can find out there and that is a 100% guarantee\
        please update us on how to move forward',
        isRead: false,
        isStarred: true,
        sentAt: 1656443057853,
        to: 'tachoka@services.com',
        userName: 'Tachoka@Help'
    },
]

const draftsEmailsData = [
    {
        id: utilService.makeId(),
        subject: 'please go get checked',
        body: 'i dont even know how to respond to that din omfg go get hecked i dont want to get nera that dirt\
        nor to yo, just never come back here please!!!!!',
        isRead: false,
        isStarred: false,
        sentAt: 1656443107853,
        from: null,
        userName: 'tachkento'
    },
    {
        id: utilService.makeId(),
        subject: 'karen you freking moron',
        body: 'karen you stupid bitch why the fuck would you pee on someone elses car ffs!!!\
        you moron i wish i could ban you for life damn it!!!!!!!',
        isRead: false,
        isStarred: false,
        sentAt: 1656443107853,
        from: null,
        userName: 'mekenatp'
    },
]

const deletedEmailsData = [
    {
        id: utilService.makeId(),
        subject: 'karen is a bitch!',
        body: 'karen you are banned please dont ever come back here!\
        your little present in the work shed was not welcomed\
        bye',
        isStarred: false,
        sentAt: 1656433147853,
        from: 'tachoka@services.com',
        userName: 'Tachoka@Help'
    },
    {
        id: utilService.makeId(),
        subject: 'Nir',
        body: 'hey there nir thank you for the great review i think you are very nice person and we might have a very long relationship\
        you can always share you feeling about our business with us \
        thank you for your support\
        Tachonka!',
        isStarred: false,
        sentAt: 1656440147853,
        from: 'tachoka@services.com',
        userName: 'Tachoka@Help'
    },
]

_setData()
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
    storageService.query(DELETED_MAIL_KEY).then(emails => {
        if (!emails || !emails.length) {
            utilService.saveToStorage(DELETED_MAIL_KEY, deletedEmailsData)
        }
    })
}

function getEmailById(id) {
    return getAllEmails()
        .then(allEmails => {
            const currEmail = allEmails.find(email => email.id === id)
            return currEmail
        })
}

function formattedTime(timeStamp) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Novr", "Dec"];
    let now = Date.now()
    let diff = now - timeStamp
    let day = 1000 * 60 * 60 * 24
    let clock = new Date(timeStamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    let date = `${new Date(timeStamp).getDate()} ${monthNames[new Date(timeStamp).getMonth()]}`
    let year = new Date(timeStamp).getFullYear().toString().slice(-2)
    if (diff < day) return clock
    else if (diff < day * 365) return date
    else if (diff > day * 365) return `${date},${year}`
}



function addEmail(email) {
    if (email.to === loggedInUser.email) {
        storageService.query(INBOX_MAIL_KEY).then(emails => {
            emails.unshift(email)
            utilService.saveToStorage(INBOX_MAIL_KEY, emails)

        })
    } else {
        storageService.query(SENT_MAIL_KEY).then(emails => {
            emails.unshift(email)
            utilService.saveToStorage(SENT_MAIL_KEY, emails)
        })
    }
}

function removeEmail(emailType, delEmail) {
    let key
    if (emailType === 'sent') key = SENT_MAIL_KEY
    else if (!emailType) key = DRAFT_MAIL_KEY
    else key = INBOX_MAIL_KEY
    console.log(key, delEmail);
    if (!emailType) {
        storageService.query(DELETED_MAIL_KEY)
            .then(emails => {
                emails.unshift(delEmail)
                utilService.saveToStorage(DELETED_MAIL_KEY, emails)
                storageService.remove(key, delEmail.id)
            })
    } else {
        storageService.query(DELETED_MAIL_KEY)
            .then(emails => {
                let inDel = emails.some(email => email.id === delEmail.id)
                if (inDel) {
                    storageService.remove(DELETED_MAIL_KEY, delEmail.id)
                }
                emails.unshift(delEmail)
                utilService.saveToStorage(DELETED_MAIL_KEY, emails)
                storageService.remove(key, delEmail.id)
            })
    }
}

function updateEmail(emailType, updatedEmail) {
    storageService.query(DELETED_MAIL_KEY)
        .then(emails => {
            let inDel = emails.some(email => email.id === updatedEmail.id)
            if (inDel) {
                storageService.put(DELETED_MAIL_KEY, updatedEmail)
                return
            }
            storageService.query(DRAFT_MAIL_KEY)
                .then(emails => {
                    let inDrafts = emails.some(email => email.id === updatedEmail.id)
                    if (inDrafts) {
                        storageService.put(DRAFT_MAIL_KEY, updatedEmail)
                        return
                    } else {
                        let key
                        if (emailType === 'sent') key = SENT_MAIL_KEY
                        else key = INBOX_MAIL_KEY
                        storageService.put(key, updatedEmail)
                    }
                })

        })
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

function getDraftsEmails() {
    return storageService.query(DRAFT_MAIL_KEY)
}

function getDeletedEmails() {
    return storageService.query(DELETED_MAIL_KEY)
}

function getAllEmails() {
    return storageService.query(SENT_MAIL_KEY)
        .then(emails => {
            let allMail = []
            emails.forEach(email => allMail.push(email))
            return storageService.query(INBOX_MAIL_KEY)
                .then(emails => {
                    emails.forEach(email => allMail.push(email))
                    return allMail
                })
        })
}


function saveEmailDraft(newEmail) {
    storageService.query(DRAFT_MAIL_KEY).then(emails => {
        if (emails.some(email => email.id === newEmail.id)) {
            console.log(newEmail);
            storageService.put(DRAFT_MAIL_KEY, newEmail)
        } else storageService.post(DRAFT_MAIL_KEY, newEmail)
    })
}

function setEmails(filterType) {
    if (filterType === 'inbox') return getInboxEmails()
    if (filterType === 'sent') return getSentEmails()
    if (filterType === 'starred') return getsStarredEmails()
    if (filterType === 'drafts') return getDraftsEmails()
    if (filterType === 'trash') return getDeletedEmails()
}