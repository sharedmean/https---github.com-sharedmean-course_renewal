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
                            <template v-slot:[`item.program`] ="{ item }">
                                <v-row justify="center">
                                   
                                    <v-tooltip bottom>
                                             <template v-slot:activator="{ on, attrs }">
                                                 <v-btn 
                                                     v-bind="attrs"
                                                     v-on="on"
                                                     icon
                                                     @click = "downloadDoc(item.program)"
                                                     :loading="loading"
                                                     :disabled="loading"
                                                     color="#2f1a54"
                                                 > 
                                                     <v-icon size="40">mdi-file-pdf-outline</v-icon>
                                                 </v-btn>
                                             </template>
                                         <span>Просмотр договора</span>
                                    </v-tooltip>
                                </v-row>
                            </template>


                            <!-- Форма проведения -->
                            <template v-slot:[`item.form`]="{ item }">
                                <v-row justify="center">
                                        <v-tooltip bottom v-if="item.form=='remote'">
                                             <template v-slot:activator="{ on, attrs }">
                                                 <v-btn 
                                                     v-bind="attrs"
                                                     v-on="on"
                                                     icon
                                                     color="#2f1a54"
                                                 > 
                                                     <v-icon size="40">mdi-remote-desktop</v-icon>
                                                 </v-btn>
                                             </template>
                                         <span>Удалённая</span>
                                        </v-tooltip>
                                        <v-tooltip bottom v-if="item.form!='remote'">
                                             <template v-slot:activator="{ on, attrs }">
                                                 <v-btn 
                                                     v-bind="attrs"
                                                     v-on="on"
                                                     icon
                                                     color="#2f1a54"
                                                 > 
                                                     <v-icon size="40">mdi-presentation</v-icon>
                                                 </v-btn>
                                             </template>
                                         <span>Очная</span>
                                        </v-tooltip>
                                        
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
                            <template v-slot:[`item.program`] ="{ item }">
                                <v-row justify="center">
                                   
                                    <v-tooltip bottom>
                                             <template v-slot:activator="{ on, attrs }">
                                                 <v-btn 
                                                     v-bind="attrs"
                                                     v-on="on"
                                                     icon
                                                     @click = "downloadDoc(item.program)"
                                                     :loading="loading"
                                                     :disabled="loading"
                                                     color="#2f1a54"
                                                 > 
                                                     <v-icon size="40">mdi-file-pdf-outline</v-icon>
                                                 </v-btn>
                                             </template>
                                         <span>Скачать задание</span>
                                    </v-tooltip>
                                </v-row>
                            </template>
                                                     

                            <!-- Форма проведения -->
                            <template v-slot:[`item.form`]="{ item }">
                                <v-row justify="center">
                                        <v-tooltip bottom v-if="item.form=='remote'">
                                             <template v-slot:activator="{ on, attrs }">
                                                 <v-btn 
                                                     v-bind="attrs"
                                                     v-on="on"
                                                     icon
                                                     color="#2f1a54"
                                                 > 
                                                     <v-icon size="40">mdi-remote-desktop</v-icon>
                                                 </v-btn>
                                             </template>
                                         <span>Удалённая</span>
                                        </v-tooltip>
                                        <v-tooltip bottom v-if="item.form!='remote'">
                                             <template v-slot:activator="{ on, attrs }">
                                                 <v-btn 
                                                     v-bind="attrs"
                                                     v-on="on"
                                                     icon
                                                     color="#2f1a54"
                                                 > 
                                                     <v-icon size="40">mdi-presentation</v-icon>
                                                 </v-btn>
                                             </template>
                                         <span>Очная</span>
                                        </v-tooltip>
                                        
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
                    <v-card-title id="cardTitle">Задания на проверку</v-card-title> 

                    <v-card style="  margin:50px; margin-top:20px; margin-bottom:0px" class="mx-auto">
                    
                    <v-card-text v-if="allHomeworksInfo">
                        <div v-for="item in allHomeworksInfo.rows" :key="item.id">
                            <template slot="progress">
                                <v-progress-linear
                                color="deep-purple"
                                height="10"
                                indeterminate
                                ></v-progress-linear>
                            </template>

                        
                            <v-card-text>
                                <v-row>
                                   <v-col cols=8>      
                                    <div class="my-1 text-subtitle-1">
                                    {{ item.course_name }} • {{ item.name }}
                                    </div>

                                    <div> {{ item.last_name }}  {{ item.first_name }} {{ item.patronymic }}</div>
                                   </v-col>
                                   <v-col cols=4>
                                    <div class="my-1 text-subtitle-1">
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon
                                                class="downloadedDoc"
                                                size=45
                                                v-bind="attrs"
                                                v-on="on"
                                                @click = "downloadDoc(item.link)"
                                                >
                                                mdi-file-pdf-outline
                                                </v-icon>
                                            </template>
                                        <span>Скачать задание</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-icon
                                                class="downloadedDoc"
                                                size=45
                                                v-bind="attrs"
                                                v-on="on"
                                                @click="makeAcceptUpload=item.id; makeDeclineUpload=null"
                                                >
                                                mdi-file-plus-outline
                                                </v-icon>
                                            </template>
                                        <span>Принять</span>
                                        </v-tooltip>

                                        <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon
                                            class="downloadedDoc"
                                            size=45
                                            v-bind="attrs"
                                            v-on="on"
                                            @click="makeDeclineUpload=item.id; makeAcceptUpload=null"
                                            >
                                            mdi-file-remove-outline
                                            </v-icon>
                                        </template>
                                        <span>Отклонить</span>
                                        </v-tooltip>
                                    </div>
                                     
                                  </v-col>
                                </v-row>
                                <v-row v-if="makeAcceptUpload==item.id">
                                    <v-col cols=8>
                                        <template>
                                            <v-file-input
                                                label="Выберите проверенный документ"
                                                v-model="files"
                                                @change="selectFile"
                                                color="#2f1a54"
                                            ></v-file-input>
                                        </template>
                                    </v-col>
                                    <!-- Кнопка принятия задания -->
                                    <v-col cols=4 >
                                        <v-btn
                                        v-if="files && makeAcceptUpload==item.id"
                                        outlined
                                        color="#2f1a54"
                                        @click="uploadHomeworkFile(item.id, item.link, 'accept')"
                                        style="margin-top:10px; margin-left:15px"
                                        >
                                        Принять задание
                                        </v-btn>    
                                    </v-col>
                                </v-row>
                                    
                                <v-row v-if="makeDeclineUpload==item.id">
                                    <v-col cols=8>
                                        <template>
                                            <v-file-input
                                                label="Выберите проверенный документ"
                                                v-model="files"
                                                @change="selectFile"
                                                color="#2f1a54"
                                            ></v-file-input>
                                        </template>
                                    </v-col>
                                    <!-- Кнопка отклонения задания -->
                                    <v-col cols=4 >
                                        <v-btn
                                        v-if="files && makeDeclineUpload==item.id"
                                        outlined
                                        color="#2f1a54"
                                        @click="uploadHomeworkFile(item.id, item.link, 'decline')"
                                        style="margin-top:10px;"    
                                        >
                                        Отклонить задание
                                        </v-btn>    
                                    </v-col>
                                </v-row>  
                            </v-card-text>

                            <v-divider class="mx-4"></v-divider>

                        </div>
                    </v-card-text>

                    <v-card-text id="cardText" v-if="!allHomeworksInfo" style="margin-top:20px">
                        <v-simple-table>
                            <template v-slot:default>                        
                                <tbody id="simpleTable">
                                    <tr>
                                        <td>В данный момент нет заданий для проверки</td>      
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card-text>
                    
                   </v-card>

                </v-card>
                </div>
                <div v-key="currentCourseId" v-if="currentCourseId">
                    <v-card style="padding:20px; margin:50px; margin-bottom:0px" class="mx-auto">
                    <v-card-title id="cardTitle">Курс "{{ currentCourseName }}"</v-card-title> 

                    <v-row justify="right" >
                        <v-col cols=12 id="closeInfo">
                                <template>
                                    <v-btn 
                                        class="tile-glow-right2"
                                        text-color="#2f1a54" 
                                        color="white"                                       
                                        block
                                        @click="currentCourseId=null">
                                        Свернуть
                                    </v-btn>
                                </template>
                        </v-col>
                    </v-row>
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

                   <!-- Данные о курсе -->
            
                    <v-card style="padding:20px; margin:50px; margin-top:20px; margin-bottom:0px" class="mx-auto">
                    <!-- Домашняя работа -->
                    <v-card-subtitle id="cardSubtitle">Добавление задания</v-card-subtitle>

                    
                                    
                    <v-card-text>
                <!-- добавление курса-->
                <form style="padding:10px"> 

                    <!-- Добавление названия -->

                    <v-row>
                        <v-col cols=12>
                            <v-text-field
                                label="Название"
                                v-model="newName"
                                color="#2f1a54"
                                clearable
                                prepend-icon="mdi-pencil"
                            ></v-text-field>
                        </v-col>
                        
                    </v-row>

                    <!-- Добавление  количества баллов и даты окончания-->

                    <v-row >
                        <v-col cols=6 >
                            <v-row style="padding-top:0px">

                            <!-- Процент успешности -->
                            <v-col cols=1>
                            <v-progress-circular 
                                :rotate="-90"
                                :size="40"
                                :width="5"
                                :value="newPercent"
                                color="#2f1a54"
                                >
                                {{ newPercent }}
                            </v-progress-circular>
                            </v-col>
                            <v-col cols=8 style="padding-top:0px; margin-left:40px">
                            <v-text-field
                                label="Количество баллов"
                                v-model="newPercent"
                                color="#2f1a54"
                                clearable
                            ></v-text-field>
                            </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols=6 style="padding-top:0px">
                            <v-menu
                            v-model="menu2"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width= "0px"
                            >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                v-model="menu2DateFormatted"
                                label="Дата окончания"
                                persistent-hint
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                color="#2f1a54"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="newEnd"
                                no-title
                                @input="menu2 = false"
                                color="#2f1a54"
                            ></v-date-picker>
                            </v-menu>
                        </v-col>

                    </v-row>

                
                    <v-row style="margin-top:0px; padding:10px">
                                <template>
                                <v-file-input
                                    label="Выберите файл с заданием"
                                    v-model="files"
                                    @change="selectFile"
                                    color="#2f1a54"
                                ></v-file-input>
                                </template>
                                </v-row>
                                
                    <v-row justify="center">
                       <v-btn
                            class="tile-glow-right"
                            outlined
                            color="#2f1a54"
                            @click="uploadFile(newName, newPercent, newEnd, currentCourseId)"
                        >
                            Добавить задание
                        </v-btn>
                    </v-row>
                    
                </form>
                    </v-card-text>
                    </v-card>
                    <v-card style="padding:20px; margin:50px; margin-top:20px; margin-bottom:0px" class="mx-auto">
                    <!-- Домашняя работа -->
                    <v-card-subtitle id="cardSubtitle">Задания</v-card-subtitle>

                    
                    <!-- Основная информация -->
                    <v-card-text id="cardText" v-if="this.havingHomework==1">
                        <v-data-table
                            :headers="homeworkHeaders"
                            :items="homeworkInfo.rows"
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


                            <!-- Программа курса -->
                            <template v-slot:[`item.link`] ="{ item }">
                                <v-row justify="center">
                                   
                                    <v-tooltip bottom>
                                             <template v-slot:activator="{ on, attrs }">
                                                 <v-btn 
                                                     v-bind="attrs"
                                                     v-on="on"
                                                     icon
                                                     @click = "downloadDoc(item.link)"
                                                     :loading="loading"
                                                     :disabled="loading"
                                                     color="#2f1a54"
                                                 > 
                                                     <v-icon size="40">mdi-file-pdf-outline</v-icon>
                                                 </v-btn>
                                             </template>
                                         <span>Скачать задание</span>
                                    </v-tooltip>
                                </v-row>
                            </template>

                        </v-data-table>
                           

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
        <!-- Диалоговое окно-->
        <v-dialog
            v-model="dialog"
            width="460px"
        >
            <v-card class= "dialog">
                <v-img src="/Logo.png" class="logo"></v-img>
                <v-card-title>
                    <b class="dialogText">{{ dialogText }}</b> 
                </v-card-title>
            </v-card>
        </v-dialog>  
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
            homeworkHeaders: [
                { text: 'Тема', value: 'name', align: 'center' },
                { text: 'Задание', value: 'link', align: 'center' },
                { text: 'Баллы', value: 'percent', align: 'center' },
                { text: 'Дата окончания сроков', value: 'end_date', align: 'center' },
            ],
            
            // Задания
            havingHomework: 0,
            homeworkInfo:  null,
            newPercent: 0,
            newName: null,
            newEnd: null,
            menu2: false,
            havingaAllHomeworks: 0,
            allHomeworksInfo: null,
            makeDeclineUpload: null,
            makeAcceptUpload: null,

            // Загрузка и выгрузка
            loader: null,
            loading: false,
            files:null,
            currentFile: null,
            newDocName: null,

            // диалоговое окно
            dialog: false,
            dialogText: null,
        }
    },

    methods: {

        showDialog() {
            this.dialog = true;
            setTimeout(() => (this.dialog = false), 4000)
        },

        // Загрузка и выгрузка файлов

        forceFIleDownload(response,link) {
            var fileName = link;
            var a = document.createElement("a");
            document.body.appendChild(a);
            var file = new Blob([response.data], {type: 'application/pdf'});
                var fileURL = window.URL.createObjectURL(file);
                a.href = fileURL;
                a.download = fileName;
                a.click();
        },

        downloadDoc(link) {
            this.loading = true

            let fullURL = '/download'

            this.axios.get(fullURL, {responseType: 'arraybuffer' , params: { name: link } })
            .then((response) => {
                this.loading = false,
                this.forceFIleDownload(response,link)
            })
            .catch((error) => {
              this.loading = false
              this.dialogText = "Ошибка";
              this.showDialog();
              this.errors = error.data.detail
              
            })  
        },

        selectFile(file) {
            this.currentFile = file;
        },

        uploadHomeworkFile(id, link, type) { 

            // сначала добавляем новый исправленный документ
            
            let fullURL = '/upload'
            let formData = new FormData();
            formData.append('file', this.currentFile);
            this.axios.post(fullURL,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
            })
            .then((response) => {
                var check;
                if (type=='accept') 
                    check=1;
                else check = -1;
                this.editListenerHomework(id, response.data, check)
                this.makeDeclineUpload = null
                this.makeAcceptUpload = null
            })
            .catch((error) => {
            this.dialogText = "Ошибка";
            this.showDialog();
            this.errors = error.data.detail
            this.makeDeclineUpload = null
            this.makeAcceptUpload = null
            })  

            // затем удаляем документ, который прислал слушатель

            fullURL = '/delete'

            this.axios.get(fullURL, {responseType: 'arraybuffer' , params: { name: link } })
            .then((response) => {
                this.loading = false
            })
            .catch((error) => {
              this.loading = false
              this.dialogText = "Ошибка, документ пользователя не был удалён";
              this.showDialog();
              this.errors = error.data.detail
              
            })  
           
            this.currentFile = null
            this.files = null
        },

        uploadFile(name, percent, end, course_id) { 
            if(this.currentFile){
                let fullURL = '/upload'
                let formData = new FormData();
                formData.append('file', this.currentFile);
                this.axios.post(fullURL,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                })
                .then((response) => {
                this.addHomework(name, percent, end, course_id, response.data)
                })
                .catch((error) => {
                this.dialogText = "Ошибка";
                this.showDialog();
                this.errors = error.data.detail
                })  
            }
            else {
               // this.dialogText = "Загрузите задание";
               // this.showDialog();
            }
            this.currentFile = null
            this.files = null
        },


        // задания

        getHomework: function (id) {
            let fullURL = '/homeworks/getHomeworksbyCourse/'+id+'/'
            this.axios.get(fullURL)
            .then((response) => {
              this.homeworkInfo = response.data;
              this.havingHomework = 1;
            })
            .catch((error) => {
              this.havingHomework = 0;
              this.homeworkInfo=null;
              this.errors = error.data.detail
            })  
        },

        addHomework: function (name, percent, end, course_id, link) {
            let fullURL = '/homeworks/addHomework'
            
            this.axios.post(fullURL, {
              name: name,
              percent: percent,
              end_date: end,
              course_id: course_id,
              link: link
            })
            .then((response) => {
              this.results = response.data
              this.getHomework(this.currentCourseId)
              this.newName = ''
              this.newHours = ''
              this.newAmount = ''
              this.newForm = ''
              this.newStart = ''
              this.newEnd = ''
              this.selectedTutor = null, 
              this.dialogText = "Задание добавлено";
              this.showDialog();
            })
            .catch((error) => {
              this.dialogText = "Ошибка";
              this.showDialog();
              this.errors = error.data.detail
            })          
            
        },

        getAllHomeworks: function () {
            let fullURL = '/homeworks/getAllHomeworks/'+this.currentId+'/'
            this.axios.get(fullURL)
            .then((response) => {
              this.allHomeworksInfo = response.data;
              this.havingAllHomeworks = 1;
            })
            .catch((error) => {
              this.havingAllHomeworks = 0;
              this.allHomeworksInfo=null;
              this.errors = error.data.detail
            })  
        },

        editListenerHomework (id, link, check) {
            let fullURL = '/homeworks/editListenerHomework'
            this.axios.post(fullURL, {
              id: id,
              link: link,
              status: check
            })
            .then((response) => {
              this.getAllHomeworks()
              this.results = response.data;
              this.dialogText = "Файл с правками успешно загружен";
              this.showDialog();
            })
            .catch((error) => {
              this.getAllHomeworks()
              this.dialogText = "Ошибка";
              this.showDialog();
              this.errors = error.data.detail
            })            
        },

        // курсы

        getCurrentCourses: function () {
            let fullURL = '/courses/getCurrentCourseByTutor/'+this.currentId+'/'
            this.axios.get(fullURL)
            .then((response) => {
              this.currentCourses = response.data;
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
            .then((response) => {
              this.finishedCourses = response.data;
              this.havingFinishedCourses = 1;
            })
            .catch((error) => {
              this.havingFinishedCourses = 0;
              this.finishedCourses=null;
              this.errors = error.data.detail
            })  
        },
        showCourse (list) {
            this.getHomework(list.id)
            this.currentCourseId = list.id;
            this.currentCourseName = list.name;
            this.start_date = list.start_date;
            this.end_date = list.end_date;
            if (this.currentCourseId!=-1){
                let fullURL = '/listeners_courses/getListenerCourseByCourse/'+this.currentCourseId+'/'
                this.axios.get(fullURL)
            .then((response) => {
              this.courseInfo = response.data;
              this.havingListeners = 1;
            })
            .catch((error) => {
              this.courseInfo=null;
              this.havingListeners = 0;
              this.errors = error
            })
            }    
        },
        formatDate (date) {
            if (!date) return null

            if (date.indexOf('.')==-1){
                const [year, month, day] = date.split('-')
                return `${day}.${month}.${year}`
            }
            else {
                const [day, month, year] = date.split('.')
                return `${day}.${month}.${year}`
            }
        }
    },
    computed: {
        menu2DateFormatted () {
            return this.formatDate(this.newEnd)
        },
    },

    mounted () {
        this.getCurrentCourses()
        this.getFinishedCourses()
        this.getAllHomeworks()
    }
}
</script>

<style lang="css" scoped>
    #closeInfo{
    text-align:end; 
    padding-top:20px; 
    padding-bottom: 0px;
    }
    .logo{
        width:50px;
    }
    .dialog  {
        padding:20px;
        background: linear-gradient(12deg, rgba(0,0,4,1) 0%, rgb(54 22 109) 79%, rgb(75 42 134) 79%);
    }
    .dialogText{
        color: white;
        margin: 0 auto;
        padding-bottom: 20px;
    }
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
    .tile-glow-right2{
        margin-bottom:20px;
        margin-top:0px;
    }
    .tile-glow-right:hover, .tile-glow-right2:hover{
    box-shadow: 0 0 10px #2f1a54;
    transition-duration: 0.3s;
    }
    .downloadedDoc {
        color: #2f1a54;
        margin-left:20px
    }
</style>