<template>
    <v-app>
        <SiteHeader />

        <v-main>
            <v-container fluid>
                <keep-alive :exclude = "['LoginPage']">
                    <router-view class="px-8" />
                </keep-alive>
            </v-container>
        </v-main>

        <SiteFooter />
    </v-app>
</template>

<script>
import SiteHeader from "@/components/SiteHeader"
import SiteFooter from "@/components/SiteFooter"
import { USER_REQUEST } from "./store/actions/user";

export default {
    name: "App",
    components: {
        SiteHeader,
        SiteFooter
    },
    created: function () {
        const token = localStorage.getItem('user-token')
        if (token) {
            this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        }
        
        if (this.$store.getters.isAuthenticated && !(this.$store.getters.isProfileLoaded)) {
            this.$store.dispatch(USER_REQUEST);
        }
    },
    data: () => ({
        //
    }),
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif !important;
}
.app {
  padding: 100px;
}
</style>