import appHeader from "./cmps/app-header.cmp.js"
import userMsg from './cmps/user-msg.cmp.js'
import { router } from "./router.js"

// this is my project of emails app
// i hope you will find it easy to understand and navigate
// i do know the fa=ct that i did not use the carteria feture and if you will ask me why i really dont know,
//i started working and only a few hours later i saw that and i was too deep into the algorithem so i just kept going, project still works fine
//if i will have to redo it i will do so mych diffrent

const options = {
    template: `
        <section class="main flex main-wrapper">
            <app-header />

            <router-view />
            
            <user-msg />

        </section>
    `,

    components: {
        appHeader,
        userMsg,
    },
}

const app = Vue.createApp(options)
app.use(router)
app.mount("#app")
