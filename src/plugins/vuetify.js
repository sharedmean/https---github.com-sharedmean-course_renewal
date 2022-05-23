import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import ru from 'vuetify/es5/locale/ru';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
        locales: { ru },
        current: 'ru'
    },
    theme: {
        themes: {
            light: {
                primary: '#039BE5',
                // secondary: colors.amber.darken4
            },
            dark: {
                primary: '#039BE5',
                // secondary: colors.amber.darken4
            }
        }
    }
});