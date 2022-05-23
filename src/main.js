import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import "@fontsource/open-sans";
import vuetify from './plugins/vuetify'
import DatetimePicker from 'vuetify-datetime-picker'

import router from './router'
import store from './store'


new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app')

Vue.config.productionTip = false
Vue.use(DatetimePicker)

