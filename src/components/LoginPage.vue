<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
            
            
            <v-card class= "dialog">

                <v-card-text class="pt-7">
                    <v-row>
                        
                        <v-col class="pb-0">
                            <v-text-field
                                v-model.trim="username"
                                color="#2f1a54"
                                label="Логин"
                                outlined
                                :disabled="isLoading"
                                :error-messages="usernameErrors"
                                @input="$v.username.$touch()"
                                @blur="$v.username.$touch()"
                                @keyup.enter="submit()"
                                prepend-icon="mdi-account-arrow-right"
                                class="form-input"
                            >
                            </v-text-field>
                        </v-col>
                        
                        <v-col class="pb-0">
                            <v-text-field
                                v-model.trim="password"
                                color="#2f1a54"
                                label="Пароль"
                                type="password"
                                outlined
                                :disabled="isLoading"
                                :error-messages="passwordErrors"
                                @input="$v.password.$touch()"
                                @blur="$v.password.$touch()"
                                @keyup.enter="submit()"
                                prepend-icon="mdi-account-key"
                                class="form-input"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>

                   
                    <v-alert
                        v-model="alert"
                        outlined
                        type="error"
                        transition="scale-transition"
                        color="black"
                    >
                        {{errorMessage}}
                    </v-alert>
                </v-card-text>

                <v-card-actions>
                    <v-row justify="center">
                        <v-btn
                        class="ma-2"
                        outlined
                        color="#2f1a54"
                        @click="cancel()" :loading="isLoading"
                        >
                        Отмена
                        </v-btn>

                        <v-btn
                        class="ma-2"
                        outlined
                        color="#2f1a54"
                        @click="submit()" :loading="isLoading"
                        >
                        Войти
                        </v-btn>
                        
                
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import {validationMixin} from "vuelidate";
import {required} from "vuelidate/lib/validators";
import {AUTH_REQUEST} from "/src/store/actions/auth"

// C:\Users\BlackCat\Desktop\Finance\finance_client\src\store

export default {
    name: "LoginPage",
    mixins: [validationMixin],
    validations: {
        username: {
            required
        },
        password: {
            required
        }
    },
    data: () => {
        return {
            dialog: true,
            isLoading: false,
            username: '',
            password: '',
            errorMessage: null
        };
    },
    computed: {
        usernameErrors() {
            const errors = [];
            if (!this.$v.username.$dirty) return errors;
            !this.$v.username.required && 
                errors.push('Введите логин');
            return errors;
        },
        passwordErrors() {
            const errors = [];
            if (!this.$v.password.$dirty) return errors;
            !this.$v.password.required && 
                errors.push('Введите пароль');
            return errors;
        },
        userProfile(){
            return this.$store.getters.getProfile;
        },
        alert() {
            return !!this.errorMessage
        }
    },
    methods: {
        clearFields: function() {
            this.username = '',
            this.password = ''
        },
        cancel: function() {
            this.clearFields();
            this.$router.go(-1)
        },
        submit: function() {
            this.$v.$touch();
            if (this.$v.$invalid) return;
            else {
                this.auth();
            }
        },
        auth: function() {
            this.errorMessage = null;
            this.isLoading = true;

            const {username,password} = this;
            this.$store.dispatch(AUTH_REQUEST, {username,password})
            .then(() => {
                this.isLoading = false;
                this.$router.push('/main')
            })
            .catch((err) => {
                this.isLoading = false;
                if (this.$store.getters.authStatus === 'error') {
                    this.errorMessage = "Неверный логин или пароль";
                }
                else this.errorMessage = "Что-то пошло не так"
            });
        },
    },
};
</script>

<style lang="css" scoped>
    .dialog  {
        padding:20px;
        background: white;
    }
    .form-input >>> .error--text {
        color: black !important;
    }
    .v-application .error--text {
        color: black !important;
        caret-color: black !important;
    }

</style>