<template>
  <div>    
        <v-row style="margin-left:100px; margin-right: 100px">
            <v-col cols="6">
              <v-row v-if="$store.getters.getProfile.role_id==0" style=" padding:20px;">
                <v-card
                  class="mx-auto"
                  tile
                  width="100%"
                  style="margin-top: 10px; padding:20px;"
                >

                  <v-card-title>
                    <v-icon
                      large
                      left
                    >
                      mdi-web
                    </v-icon>
                    <span class="text-h4 font-weight-light">Добро пожаловать</span>
                  </v-card-title>

                  <v-row>
                    <v-col cols=12>
                        
                    
                      <v-img
                        height="100%"
                        src="../../public/main_7.jpg"
                      >
                        <v-row
                          align="end"
                          class="fill-height"
                        >
                           

                          <v-col class="py-0" >
                            <v-list-item
                              color="rgba(0, 0, 0, .4)"
                              dark
                            >
                              <v-list-item-content>
                                <v-list-item-title class="text-h6" style="color: #2f1a54 !important; text-align:right;">
                                  Для доступа к модулю ДПО войдите, <br>
                                  нажав на иконку в правом верхнем углу страницы.
                                </v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </v-col>
                        </v-row>
                      </v-img>
                    </v-col>
                  </v-row>
                </v-card>
              </v-row>

              <v-row v-if="$store.getters.getProfile.role_id!=0" style=" padding:20px;">
                <v-card
                  class="mx-auto"
                  tile
                  width="100%"
                  style="margin-top: 10px; padding:20px;"
                >
                
                  <v-img v-if="$store.getters.getProfile.role_id==1"
                    height="100%"
                    src="../../public/main_5.jpg"
                  >
                    <v-row
                      align="end"
                      class="fill-height"
                    >
                      <v-col
                        align-self="start"
                        class="pa-0"
                        cols="12"
                      >
                        <v-avatar
                          color="white"
                          size="162"
                          style="opacity: 0.8;"
                        >
                          <span style="font-size:66px; color:#4b2a86" >{{ $store.getters.getProfile.first_name[0] }}{{ $store.getters.getProfile.last_name[0] }}</span>
                        </v-avatar>
                      </v-col>

                      <v-col class="py-0">
                        <v-list-item
                          color="rgba(0, 0, 0, .4)"
                          dark
                        >
                          <v-list-item-content>
                            <v-list-item-title class="text-h5">
                              {{ $store.getters.getProfile.first_name }} {{ $store.getters.getProfile.last_name }}
                            </v-list-item-title>
                            <v-list-item-subtitle style="font-size: 17px">  Администратор </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-img>

                  <v-img v-if="$store.getters.getProfile.role_id==2"
                    height="100%"
                    src="../../public/main_6.png"
                  >
                    <v-row
                      align="end"
                      class="fill-height"
                    >
                      <v-col
                        align-self="start"
                        class="pa-0"
                        cols="12"
                      >
                        <v-avatar
                          color="white"
                          size="162"
                          style="opacity: 0.8;"
                        >
                          <span style="font-size:66px; color:#4b2a86" >{{ $store.getters.getProfile.first_name[0] }}{{ $store.getters.getProfile.last_name[0] }}</span>
                        </v-avatar>
                      </v-col>
                      <v-col class="py-0">
                        <v-list-item
                          color="rgba(0, 0, 0, .4)"
                          dark
                        >
                          <v-list-item-content>
                            <v-list-item-title class="text-h5">
                              {{ $store.getters.getProfile.first_name }} {{ $store.getters.getProfile.last_name }}
                            </v-list-item-title>
                            <v-list-item-subtitle style="font-size: 17px">  Преподаватель </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-img>

                  <v-img v-if="$store.getters.getProfile.role_id==3"
                    height="100%"
                    src="../../public/main_4.png"
                  >
                    <v-row
                      align="end"
                      class="fill-height"
                    >
                      <v-col
                        align-self="start"
                        class="pa-0"
                        cols="12"
                      >
                        <v-avatar
                          color="white"
                          size="162"
                          style="opacity: 0.8;"
                        >
                          <span style="font-size:66px; color:#4b2a86" >{{ $store.getters.getProfile.first_name[0] }}{{ $store.getters.getProfile.last_name[0] }}</span>
                        </v-avatar>
                      </v-col>
                      <v-col class="py-0">
                        <v-list-item
                          color="rgba(0, 0, 0, .4)"
                          dark
                        >
                          <v-list-item-content>
                            <v-list-item-title class="text-h5">
                              {{ $store.getters.getProfile.first_name }} {{ $store.getters.getProfile.last_name }}
                            </v-list-item-title>
                            <v-list-item-subtitle style="font-size: 17px">  Слушатель </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-img>
                </v-card>
              </v-row>
              
              <v-row >
                <v-card
                style="padding:20px; margin:20px; padding-top:10px"
                >

                  <v-card-title>
                    <v-icon
                      large
                      left
                    >
                      mdi-earth
                    </v-icon>
                    <span class="text-h6 font-weight-light">Новости</span>
                  </v-card-title>
              <v-row>
                <v-col cols=12>
                    <v-card
                      class="mx-auto"
                      color="#2f1a54"
                      dark
                    >
                      <v-card-title>
                        <v-icon
                          large
                          left
                        >
                          mdi-vk
                        </v-icon>
                        <span class="text-h6 font-weight-light">VKontakte</span>
                      </v-card-title>

                      <v-card-text class="text-h5 font-weight-bold">
                        "Доступен новый формат подачи документов! Запись на курсы стала еще проще!"
                      </v-card-text>

                      <v-card-actions>
                        <v-list-item class="grow">
                          <v-list-item-avatar color="white darken-3">
                            <v-img
                              class="elevation-1"
                              alt=""
                              src="../../public/Logo.png"
                              width="1px"
                            ></v-img>
                          </v-list-item-avatar>

                          <v-list-item-content>
                            <v-list-item-title>KIIZ</v-list-item-title>
                          </v-list-item-content>

                          <v-row
                            align="center"
                            justify="end"
                          >
                            <v-icon class="mr-1">
                              mdi-heart
                            </v-icon>
                            <span class="subheading mr-2">150</span>
                            <span class="mr-1">·</span>
                            <v-icon class="mr-1">
                              mdi-share
                            </v-icon>
                            <span class="subheading">15</span>
                          </v-row>
                        </v-list-item>
                      </v-card-actions>
                    </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols=12>
                    <v-card
                      class="mx-auto"
                      color="#bdbbd0"
                      dark
                    >
                      <v-card-title>
                        <v-icon
                          large
                          left
                        >
                          mdi-twitter
                        </v-icon>
                        <span class="text-h6 font-weight-light">Twitter</span>
                      </v-card-title>

                      <v-card-text class="text-h5 font-weight-bold" style="color:white">
                        "Семинар "Импортозамещение. Варианты и последствия" переносится на 5 июня!"
                      </v-card-text>

                      <v-card-actions>
                        <v-list-item class="grow">
                          <v-list-item-avatar color="white darken-3">
                            <v-img
                              class="elevation-6"
                              alt=""
                              src="../../public/Logo.png"
                            ></v-img>
                          </v-list-item-avatar>

                          <v-list-item-content>
                            <v-list-item-title>KIIZ</v-list-item-title>
                          </v-list-item-content>

                          <v-row
                            align="center"
                            justify="end"
                          >
                            <v-icon class="mr-1">
                              mdi-heart
                            </v-icon>
                            <span class="subheading mr-2">255</span>
                            <span class="mr-1">·</span>
                            <v-icon class="mr-1">
                              mdi-share-variant
                            </v-icon>
                            <span class="subheading">55</span>
                          </v-row>
                        </v-list-item>
                      </v-card-actions>
                    </v-card>
                </v-col>
              </v-row>
            </v-card>
              </v-row>
            </v-col>
            

            <v-col cols=6>
              <v-row >
                <v-card
                style="padding:20px; margin-top:30px; padding-top:10px"
                >

                  <v-card-title>
                    <v-icon
                      large
                      left
                    >
                      mdi-presentation-play
                    </v-icon>
                    <span class="text-h6 font-weight-light">Курсы</span>
                  </v-card-title>
              <v-row style="padding:20px; padding-bottom:0px">
                <v-card
                  :loading="loading"
                  class="mx-auto"
                >
                  <template slot="progress">
                    <v-progress-linear
                      color="deep-purple"
                      height="10"
                      indeterminate
                    ></v-progress-linear>
                  </template>

                  <v-img
                    height="250"
                    src="../../public/main_2.jpg"
                  ></v-img>

                  <v-card-title>Облачные технологии</v-card-title>

                  <v-card-text>
                    <v-row
                      align="center"
                      class="mx-0"
                    >
                        <div class="grey--text ms-4">
                         Курс повышения квалификации
                      </div>
                    </v-row>

                    <div class="my-4 text-subtitle-1">
                      48 часов • Старт 15.06.2022
                    </div>

                    <div>Облачные технологии — это инновационные технологии для работы в сети интернет. Технология распределённой обработки данных в которой компьютерные ресурсы и мощности предоставляются пользователю, как интернет-сервис. </div>
                  </v-card-text>

                  <v-divider class="mx-4"></v-divider>

                  <v-card-actions>
                    <v-btn
                      color="deep-purple lighten-2"
                      text
                      @click="reserve"
                    >
                      Подробнее
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-row>
              <v-row style="padding:20px;padding-top:0px">
                <v-card
                  :loading="loading"
                  class="mx-auto my-12"
                >
                  <template slot="progress">
                    <v-progress-linear
                      color="deep-purple"
                      height="10"
                      indeterminate
                    ></v-progress-linear>
                  </template>

                  <v-img
                    height="250"
                    src="../../public/main_3.png"
                  ></v-img>

                  <v-card-title>Введение в ASSEMBLER</v-card-title>

                  <v-card-text>
                    <v-row
                      align="center"
                      class="mx-0"
                    >
                        <div class="grey--text ms-4">
                         Курс повышения квалификации
                      </div>
                    </v-row>

                    <div class="my-4 text-subtitle-1">
                      36 часов • Старт 10.06.2022
                    </div>

                    <div>Машинно-ориентированный язык программирования низкого уровня. Представляет собой систему обозначений, используемую для представления в удобно читаемой форме программ, записанных в машинном коде. Его команды прямо соответствуют отдельным командам машины или их последовательностям. </div>
                  </v-card-text>

                  <v-divider class="mx-4"></v-divider>

                  <v-card-actions>
                    <v-btn
                      color="deep-purple lighten-2"
                      text
                      @click="reserve"
                    >
                      Подробнее
                    </v-btn>
                  </v-card-actions>
                </v-card>

                </v-row>
                </v-card>
              </v-row>
            </v-col>
        </v-row>
  </div>
</template>

<script>
export default {
    components:{
      
    },

    data() {
        return {
          profileRole: $store.getters.getProfile.role_id,
        }
    },

    methods: {
      
       
    },
    computed: {

    },
    mounted() {
    }

}
</script>

<style scoped>
</style>