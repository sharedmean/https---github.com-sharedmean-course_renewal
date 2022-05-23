<template>
    <div>
        <v-app-bar
            height="50"
            id="navbar"
        >
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
        </v-app-bar>
    </div>
</template>

<script>
export default {
    
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
        font-size: 10px;
        padding: 0 2%;
    }

    #nav-item:hover {
        background-color:#4b2a86;
    }
</style>