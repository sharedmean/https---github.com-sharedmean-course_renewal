<template>
    <div>
        <v-app-bar
            height="70"
            id="navbar"
            app
        >
            <!-- Логотип -->
            <v-img src="/Logo.png" id="logo"></v-img>

            <!-- Разделы -->
            <v-tabs background-color="transparent" color="white" centered>
                <v-tab id="nav-item" to="main">Домашняя страница</v-tab>
                
                <v-tab 
                id="nav-item" 
                @click="$router.push({name: 'profile'})"
                v-if="$store.getters.getProfile.role_id == 3 || $store.getters.getProfile.role_id == 2">
                    Личный кабинет
                </v-tab>

                <v-tab id="nav-item" 
                @click="$router.push({name: 'tutor'})"
                v-if="$store.getters.getProfile.role_id == 2">
                    Личный кабинет преподавателя
                </v-tab>

                <v-tab 
                id="nav-item"
                v-if="$store.getters.getProfile.role_id == 3 || $store.getters.getProfile.role_id == 2">
                    Переход в Moodle
                </v-tab>

                <v-tab id="nav-item"
                @click="$router.push({name: 'users'})"
                v-if="$store.getters.getProfile.role_id == 1">
                Слушатели
                </v-tab>

                <v-tab id="nav-item"
                @click="$router.push({name: 'organizations'})"
                v-if="$store.getters.getProfile.role_id == 1">
                Организации</v-tab>

                <v-tab id="nav-item"
                @click="$router.push({name: 'courses'})"
                v-if="$store.getters.getProfile.role_id == 1">
                Курсы</v-tab>
            </v-tabs>

            <!-- Кнопка входа -->
            <v-tooltip bottom v-if="$store.getters.getProfile.role_id == 0">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon 
                        v-bind="attrs"
                        v-on="on"
                        @click="$router.push({name: 'login'})"
                        size=40
                        color="white"
                    > 
                        mdi-login
                    </v-icon>
                </template>
                <span>Вход</span>
            </v-tooltip>

            <!-- Кнопка выхода -->
            
            <v-tooltip bottom v-if="$store.getters.getProfile.role_id != 0">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon 
                        v-bind="attrs"
                        v-on="on"
                        size=40
                        color="white"
                        @click="logout()"
                        
                    > 
                        mdi-logout
                    </v-icon>
                </template>
                <span>Выход</span>
            </v-tooltip>

        </v-app-bar>
    </div>
</template>

<script>
import {AUTH_LOGOUT} from "/src/store/actions/auth"
import store from '/src/store/index'

export default {

    data: () => {
        return {
            rights: store.getters.getProfile.role_id
        };
    },

    methods: {
       
        logout: function () {
            this.$store.dispatch(AUTH_LOGOUT)
                .then(() => {
                    this.$router.push( {name: 'main'} );
                })
        }
    },

  
}
</script>

<style scoped>
    #navbar {
        background: linear-gradient(12deg, rgba(0,0,4,1) 0%, rgba(75,42,134,1) 79%);
        box-shadow: 2px 2px 4px gray;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 5%;
    }
    #nav-item {
        color:white;
        font-size: 14px;
        padding: 0 2%;
    }

    #nav-item:hover {
        background-color:#4b2a86;
    }

    #logo{
        height: 50px;
        width: 100px;
    }
</style>