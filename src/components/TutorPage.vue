<template>
    <div>    
        <v-row style="margin-left:100px; margin-right: 100px; margin-top:-50px">
            <!-- Курсы -->
            <v-col cols="6">
                <v-card style="padding:20px; margin:50px; margin-bottom:0px" class="mx-auto">
                    <!-- Заголовок -->
                    <v-card-title id="cardTitle">Курируемые курсы</v-card-title>
                    
                    <v-card style="padding:20px; margin:50px; margin-top:20px; margin-bottom:0px" class="mx-auto">
                    <!-- Информация о текущих курсах -->
                    <v-card-subtitle id="cardSubtitle">Предстоящие и текущие курсы</v-card-subtitle>

                    <v-card-text id="cardText" v-if="this.havingCurrentCourses==1">
                        
                        <v-data-table
                            :headers="currentCoursesHeaders"
                            :items="currentCourses.rows"
                            hide-default-header
                            :items-per-page="5"
                            class="elevation-0"
                            :footer-props="{
                                showFirstLastPage: true,
                                firstIcon: 'mdi-chevron-double-left',
                                lastIcon: 'mdi-chevron-double-right',
                                prevIcon: 'mdi-chevron-left',
                                nextIcon: 'mdi-chevron-right'
                            }"
                            @click:row="showCourse"
                            style="cursor:pointer"
                        >
                            
                            <!-- Заголовки таблицы -->
                            <template v-slot:header="{ props: { headers } }">
                                <thead>
                                    <tr>
                                        <th v-for="head in headers" v-bind:key="head" id="tableHeader">
                                            <span>{{head.text}}</span>
                                        </th>
                                    </tr>
                                </thead>
                            </template>
                            
                            <!-- Программа курса -->
                            <template v-slot:[`item.program`]>
                                <v-row justify="center">
                                    <v-icon size=40  class="icons" id="tableClicked"> mdi-file-pdf-outline </v-icon>
                                </v-row>
                            </template>


                            <!-- Форма проведения -->
                            <template v-slot:[`item.form`]="{ item }">
                                <v-row justify="center">
                                        <v-icon v-if="item.form=='remote'" class="icons" size="35">mdi-remote-desktop
                                            <span>Добавить</span>
                                        </v-icon>
                                        <v-icon v-if="item.form!='remote'" class="icons" size="39">mdi-presentation</v-icon>
                                    
                                </v-row>
                            </template>
                        </v-data-table>
                    </v-card-text>

                    <v-card-text id="cardText" v-if="this.havingCurrentCourses==0" style="margin-top:20px;">
                            <v-simple-table>
                                <template v-slot:default>                        
                                    <tbody id="simpleTable">
                                        <tr>
                                            <td>В данный момент Вы не являетесь куратором курса</td>      
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-card-text>

                    </v-card>

                    <v-card style="padding:20px; margin:50px; margin-top:20px; margin-bottom:0px" class="mx-auto">
                    <!-- Информация о завершённых курсах -->
                    <v-card-subtitle id="cardSubtitle">Завершённые курсы</v-card-subtitle>

                    <v-card-text id="cardText" v-if="this.havingFinishedCourses==1">
                        
                        <v-data-table
                            :headers="finishedCoursesHeaders"
                            :items="finishedCourses.rows"
                            hide-default-header
                            :items-per-page="5"
                            class="elevation-0"
                            :footer-props="{
                                showFirstLastPage: true,
                                firstIcon: 'mdi-chevron-double-left',
                                lastIcon: 'mdi-chevron-double-right',
                                prevIcon: 'mdi-chevron-left',
                                nextIcon: 'mdi-chevron-right'
                            }"
                            @click:row="showCourse"
                            style="cursor:pointer"
                        >
                            
                            <!-- Заголовки таблицы -->
                            <template v-slot:header="{ props: { headers } }">
                                <thead>
                                    <tr>
                                        <th v-for="head in headers" v-bind:key="head" id="tableHeader">
                                            <span>{{head.text}}</span>
                                        </th>
                                    </tr>
                                </thead>
                            </template>
                            
                            <!-- Программа курса -->
                            <template v-slot:[`item.program`]>
                                <v-row justify="center">
                                    <v-icon size=40  class="icons" id="tableClicked"> mdi-file-pdf-outline </v-icon>
                                </v-row>
                            </template>


                            <!-- Расписание курса -->
                            <template v-slot:[`item.schedule`]>
                                <v-row justify="center">
                                   <v-icon size=40  class="icons" id="tableClicked"> mdi-file-pdf-outline </v-icon>
                                </v-row>
                            </template>
                            
                          

                            <!-- Форма проведения -->
                            <template v-slot:[`item.form`]="{ item }">
                                <v-row justify="center">
                                        <v-icon v-if="item.form=='remote'" class="icons" size="35">mdi-remote-desktop
                                            <span>Добавить</span>
                                        </v-icon>
                                        <v-icon v-if="item.form!='remote'" class="icons" size="39">mdi-presentation</v-icon>
                                    
                                </v-row>
                            </template>
                        </v-data-table>
                    </v-card-text>
                    <v-card-text id="cardText" v-if="this.havingFinishedCourses==0" style="margin-top:20px">
                            <v-simple-table>
                                <template v-slot:default>                        
                                    <tbody id="simpleTable">
                                        <tr>
                                            <td>В данный момент Вы не завершили курацию ни одного курса</td>      
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-card-text>
                    </v-card>
                </v-card>
            </v-col>

            
            <!-- Данные о курсе -->
            <v-col cols="6">
                <div v-if="!currentCourseId">
                    <v-card style="padding:20px; margin:50px; margin-bottom:0px" class="mx-auto">
                    <v-card-title id="cardTitle">Выберите курс</v-card-title> 
                    </v-card>
                </div>
                <div v-key="currentCourseId" v-if="currentCourseId">
                    <v-card style="padding:20px; margin:50px; margin-bottom:0px" class="mx-auto">
                    <v-card-title id="cardTitle">Курс "{{ currentCourseName }}"</v-card-title> 

                    
                   <v-card style="  margin:50px; margin-top:20px; margin-bottom:0px" class="mx-auto">
                    
                    <v-card-text>
                        <v-row justify="center">
                            <h4> 
                                <v-icon size=35 class="icons"> mdi-calendar-month-outline </v-icon>
                                Дата начала: <span style="font-weight:100">{{ this.start_date }} &nbsp;</span>
                                <v-icon size=35 class="icons"> mdi-calendar-month-outline </v-icon>
                                Дата окончания: <span style="font-weight:100">{{ this.end_date }} &nbsp;</span>
                            </h4>
                        </v-row>
                    </v-card-text>
                    
                   </v-card>
                   
                    <v-card style="padding:20px; margin:50px; margin-top:20px; margin-bottom:0px" class="mx-auto">
                    <!-- Список слушателей -->
                    <v-card-subtitle id="cardSubtitle">Слушатели</v-card-subtitle>

                    
                    <!-- Основная информация -->
                    <v-card-text id="cardText" v-if="this.havingListeners==1">
                        <v-data-table
                            :headers="listenersHeaders"
                            :items="courseInfo.rows"
                            hide-default-header
                            :items-per-page="15"
                            class="elevation-0"
                            :footer-props="{
                                showFirstLastPage: true,
                                firstIcon: 'mdi-chevron-double-left',
                                lastIcon: 'mdi-chevron-double-right',
                                prevIcon: 'mdi-chevron-left',
                                nextIcon: 'mdi-chevron-right'
                            }"
                        >
                            <!-- Заголовки таблицы -->
                            <template v-slot:header="{ props: { headers } }">
                                <thead>
                                    <tr>
                                        <th v-for="head in headers" v-bind:key="head" id="tableHeader">
                                            <span>{{head.text}}</span>
                                        </th>
                                    </tr>
                                </thead>
                            </template>

                           <!-- Процент успешности -->
                            <template v-slot:[`item.percent`]="{ item }">
                                <v-progress-circular
                                    :rotate="360"
                                    :size="50"
                                    :width="7"
                                    :value="item.percent"
                                    color="#4b2a86"
                                    class="my-1"
                                >
                                    {{ item.percent }}
                                </v-progress-circular>
                            </template>

                        </v-data-table>
                    </v-card-text>
                    <v-card-text id="cardText" v-if="this.havingListeners==0" style="margin-top:20px">
                            <v-simple-table>
                                <template v-slot:default>                        
                                    <tbody id="simpleTable">
                                        <tr>
                                            <td>В данный момент на курс не записан ни один слушатель</td>      
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-card-text>
                    </v-card>
                </v-card>
                </div>
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
            currentId: localStorage.getItem('user_id'),
            currentCourseId: null,
            currentCourseName: null,
            currentCourses: null,
            start_date: null,
            end_date:null,
            finishedCourses: null,
            havingCurrentCourses: 0,
            havingFinishedCourses: 0,
            havingListeners: 0,
            courseInfo: null,
            currentCoursesHeaders: [
                { text: 'Наименование курса', value: 'name', align: 'center' },
                { text: 'Программа курса', value: 'program', align: 'center' },
                { text: 'Форма проведения', value: 'form', align: 'center' },
            ],
            finishedCoursesHeaders: [
                { text: 'Наименование курса', value: 'name', align: 'center' },
                { text: 'Программа курса', value: 'program', align: 'center' },
                { text: 'Форма проведения', value: 'form', align: 'center' },
            ],
            listenersHeaders: [
                { text: 'Имя', value: 'first_name', align: 'center' },
                { text: 'Фамилия', value: 'last_name', align: 'center' },
                { text: 'Отчество', value: 'patronymic', align: 'center' },
                { text: 'Номер телефона', value: 'phone', align: 'center' },
                { text: 'Процент успешности', value: 'percent', align: 'center' },
            ],
        }
    },

    methods: {
        getCurrentCourses: function () {
            let fullURL = '/courses/getCurrentCourseByTutor/'+this.currentId+'/'
            this.axios.get(fullURL)
            .then((responce) => {
              this.currentCourses = responce.data;
              this.havingCurrentCourses = 1;
            })
            .catch((error) => {
              this.havingCurrentCourses = 0;
              this.currentCourses=null;
              this.errors = error.data.detail
            })  
        },
        getFinishedCourses: function () {
            let fullURL = '/courses/getFinishedCourseByTutor/'+this.currentId+'/'
            this.axios.get(fullURL)
            .then((responce) => {
              this.finishedCourses = responce.data;
              this.havingFinishedCourses = 1;
            })
            .catch((error) => {
              this.havingFinishedCourses = 0;
              this.finishedCourses=null;
              this.errors = error.data.detail
            })  
        },
        showCourse (list) {
            this.currentCourseId = list.id;
            this.currentCourseName = list.name;
            this.start_date = list.start_date;
            this.end_date = list.end_date;
            if (this.currentCourseId!=-1){
                let fullURL = '/listeners_courses/getListenerCourseByCourse/'+this.currentCourseId+'/'
                this.axios.get(fullURL)
            .then((responce) => {
              this.courseInfo = responce.data;
              this.havingListeners = 1;
            })
            .catch((error) => {
              this.courseInfo=null;
              this.havingListeners = 0;
              this.errors = error
            })
            }    
        },
    },
    computed: {
    },

    mounted () {
        this.getCurrentCourses()
        this.getFinishedCourses()
    }
}
</script>

<style lang="css" scoped>
    h4{
        font-size: 17px;
        color: black;
        padding: 10px;
        font-weight: 600;
    }
    #cardText{
        cursor:pointer;
    }
    #cardTitle {
        background: linear-gradient(12deg, rgba(0,0,4,1) 0%, rgb(54 22 109) 79%, rgb(75 42 134) 79%);
        justify-content: center;
        color: white;
        font-size: 18px;
    }

    #cardSubtitle {
       /* background-color: #bdbbd0; */
       background: linear-gradient(12deg, #bdbbd0 0%, #bdbbd056 79%, #bdbbd088 79%);
        color: black;
        text-align: center;
        font-weight: bold;
    }

    #tableHeader  {
        text-align: center;
        color: black;
    }

    #tableClicked:hover {
        cursor: pointer;
    }

    #simpleTable tr,td {
        background: #ffffff; 
        border-top: 1px solid rgba(0, 0, 0, .2);
        border-bottom: 1px solid rgba(0, 0, 0, .2);
        /* border: 1px solid rgb(0, 0, 0);  */
        color: black;
        text-align: center;
    }

    .icons {
        color: #2f1a54;
    }

    #addDoc {
        color: #4b2a86;
        padding-right: 20px;
    }

    #addDoc:hover {
        cursor: pointer;
        color: #bdbbd0;
    }
</style>