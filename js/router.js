import homePage from './views/home-page.cmp.js'
import aboutPage from './views/about-page.cmp.js'
import bookApp from "./apps/books/pages/book-app.cmp.js"
import bookDetails from './apps/books/pages/book-details.cmp.js'

import emailApp from './apps/mail/pages/email-app.cmp.js'
import emailCompose from './apps/mail/pages/email-compose.cmp.js'

import noteApp from './apps/keep/pages/note-app.cmp.js'


const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutPage
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    },
    {
        path: '/email',
        component: emailApp,
        children:[
            {
                path:'/email/compose',
                component:emailCompose
            }
        ],
    },
    {
        path: '/note',
        component: noteApp
    },

]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})