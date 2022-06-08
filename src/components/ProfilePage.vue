<template>
    <div>    
        <v-row style="margin-left:100px; margin-right: 100px; margin-top:-50px">
            <!-- Курсы -->
            <v-col cols="6">
                <v-card style="padding:20px; margin:50px; margin-bottom:0px" class="mx-auto">
                    <!-- Заголовок -->
                    <v-card-title id="cardTitle">Курсы</v-card-title>
                    
                    <v-card style="padding:20px; margin:50px; margin-top:20px; margin-bottom:0px" class="mx-auto">
                    <!-- Информация о текущих курсах -->
                    <v-divider color="white"></v-divider>
                    <v-card-subtitle id="cardSubtitle">Предстоящие и текущие курсы</v-card-subtitle>
                    <v-divider color="white"></v-divider>

                    <v-card-text id="cardText" v-if="this.havingCurrentCourses">
                        
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
                            item-key="item.id"
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
                            
                          

                            <!-- Процент прохождения -->
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

                    <v-card-text id="cardText" v-if="this.havingCurrentCourses==0" style="margin-top:20px">
                            <v-simple-table>
                                <template v-slot:default>                        
                                    <tbody id="simpleTable">
                                        <tr>
                                            <td>В данный момент Вы не являетесь слушателем курса</td>      
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
                            item-key="item.id"
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
                                    <!--  <v-img src="pdf.png" max-width="30" id="tableClicked"></v-img> -->
                                    <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn 
                                            v-bind="attrs"
                                            v-on="on"
                                            icon
                                        > 
                                            <v-icon size=40 id="downloadedDoc"> mdi-file-pdf-outline </v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Просмотр документа</span>
                                    </v-tooltip>
                                </v-row>
                            </template>


                            <!-- Оценки -->
                            <!--<template v-slot:[`item.score`]>
                                <v-row justify="center">
                                    <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn 
                                            v-bind="attrs"
                                            v-on="on"
                                            icon
                                        > 
                                            <v-icon size=40 id="downloadedDoc"> mdi-file-pdf-outline </v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Просмотр документа</span>
                                    </v-tooltip>
                                </v-row>
                            </template>-->


                            <!-- Сертификат -->
                            <template v-slot:[`item.certificate`]>
                                <v-row justify="center">
                                    <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn 
                                            v-bind="attrs"
                                            v-on="on"
                                            icon
                                        > 
                                            <v-icon size=40 id="downloadedDoc"> mdi-file-pdf-outline </v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Просмотр документа</span>
                                    </v-tooltip>
                                </v-row>
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
                    <v-card-text id="cardText" v-if="this.havingFinishedCourses==0" style="margin-top:20px">
                            <v-simple-table>
                                <template v-slot:default>                        
                                    <tbody id="simpleTable">
                                        <tr>
                                            <td>В данный момент Вы не завершили ни одного курса</td>      
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-card-text>
                </v-card>
                </v-card>
            </v-col>

            <!-- Документы -->
            <v-col cols="6">
                <div  v-if="!currentCourseId"> 
                <v-card style="padding:20px; margin:50px; margin-bottom:0px" class="mx-auto">
                    <v-card-title id="cardTitle">Документы</v-card-title>


                    <!-- Информация об отклонённых документах -->
                    <div v-if="this.docs">
                        <div v-if="this.showCancelledDocs.length">

                            <v-card style="padding:20px; margin:50px; margin-top:20px; margin-bottom:0px" class="mx-auto">

                                <v-card-subtitle id="cardSubtitle">Отклонённые документы</v-card-subtitle>
                            
                            <!-- Основная информация -->
                            <v-card-text id="cardText" style="margin-top:20px">
                                <v-simple-table>
                                    <template v-slot:default>                        
                                        <tbody id="simpleTable">
                                            <tr
                                                v-for="doc in showCancelledDocs"
                                                :key="doc.id"
                                            >
                                                <td>{{ doc.name }}</td>
                                                <td width="5">
                                                    <v-tooltip bottom>
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-btn 
                                                                v-bind="attrs"
                                                                v-on="on"
                                                                icon
                                                                :loading="loading"
                                                                :disabled="loading"
                                                            > 
                                                                <v-icon id="deleteDoc" size=30 @click="deleteDoc(doc)">mdi-delete</v-icon>
                                                            </v-btn>
                                                        </template>
                                                        <span>Удалить документ</span>
                                                    </v-tooltip>
                                                    
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-card-text>
                            </v-card>
                        </div>
                    </div>

                    <v-card style="padding:20px; margin:50px; margin-top:20px; margin-bottom:0px" class="mx-auto">
                    <!-- Загрузить новый документ -->
                    <v-card-subtitle id="cardSubtitle">Загрузить новый документ</v-card-subtitle>


                    <!-- Основная информация -->
                    <v-card-text id="cardText" style="margin-top:40px">
                        <v-row>
                                <v-select
                                    color="#4b2a86"
                                    :items="docTypes"
                                    dense
                                    outlined
                                    label="Тип документа"
                                    hide-details
                                    v-model="selected"

                                ></v-select>                            
                        </v-row>
                        
                        <v-row style="margin-top:30px">
                        <template v-if="selected">
                        <v-file-input
                            label="Выберите документ"
                            v-model="files"
                            @change="selectFile"
                            color="#2f1a54"
                        ></v-file-input>
                        </template>
                        </v-row>
                        <!-- Кнопка добавления документа -->
                        <v-row justify="center"  v-if="files">
                        <v-btn
                            class="tile-glow-right"
                            outlined
                            color="#2f1a54"
                            @click="uploadDocument(selected)"
                            >
                            Отправить на проверку
                            </v-btn>
                        </v-row>    
                            
                    </v-card-text>
                    </v-card>

                    <v-card style="padding:20px; margin:50px; margin-top:20px; margin-bottom:0px" class="mx-auto">
                    <!-- Загруженные документы -->
                    <v-card-subtitle id="cardSubtitle">Загруженные документы</v-card-subtitle>

                    
                        <!-- Основная информация -->
                        <v-card-text id="cardText" v-if="docs">
                            <v-data-table
                                :headers="downloadedDocsHeaders"
                                :items="docs.rows"
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
                                item-key="item.id"
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

                                <!-- Статус -->
                                <template v-slot:[`item.status`]="{ item }">
                                    <h4 v-if="item.status==1" id="downloadedDoc">Загружен</h4>
                                    <h4 v-if="item.status==0" class="waitingDoc">В ожидании</h4>
                                    <h4 v-if="item.status==-1" class="deniedDoc">Отклонён</h4>
                                </template>

                            </v-data-table>
                        </v-card-text>
                        <v-card-text id="cardText" v-if="!docs">
                            <v-simple-table>
                                <template v-slot:default>                        
                                    <tbody id="simpleTable">
                                        <tr>
                                            <td>В данный момент у Вас нет загруженных документов</td>      
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
                    
                    

                    <v-card style="padding:20px; margin:50px; margin-top:0px; margin-bottom:0px" class="mx-auto">
                    <!-- Домашняя работа -->
                    <v-card-subtitle id="cardSubtitle">Задания</v-card-subtitle>

        
                    <!-- Основная информация -->
                    <v-card-text id="cardText" v-if="homeworkInfo">
                        <v-data-table
                            :headers="homeworkHeaders"
                            :items="this.homeworkInfo.rows"
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
                            item-key="item.id"
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
                    <v-card-text id="cardText" v-if="!homeworkInfo">
                            <v-simple-table>
                                <template v-slot:default>                        
                                    <tbody id="simpleTable">
                                        <tr>
                                            <td>Куратор курса еще не добавил ни одного задания</td>      
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                    </v-card-text>
                    
                </v-card>

                <v-card style="padding:20px; margin:50px; margin-top:20px; margin-bottom:0px" class="mx-auto" v-if="availableHomework">
                    <!-- Домашняя работа -->
                    <v-card-subtitle id="cardSubtitle">Отправить выполненное задание на проверку</v-card-subtitle>

        
                    <!-- Добавление задания -->
                    <v-card-text class="cardText" style="margin-top:40px">
                        <v-row>
                                <v-select
                                    color="#4b2a86"
                                    :items="availableHomework.rows"
                                    dense
                                    outlined
                                    label="Выбрать задание"
                                    hide-details
                                    v-model="selectedHomework"
                                    prepend-icon="mdi-notebook-outline"
                                    item-text="name"
                                    item-value="id"
                                    item-key="item.id"
                                ></v-select>
                                
                        </v-row>
                        
                        <v-row style="margin-top:30px">
                            <template v-if="selectedHomework">
                            <v-file-input
                                label="Выберите файл с выполненным заданием"
                                v-model="files"
                                @change="selectFile"
                                color="#2f1a54"
                            ></v-file-input>
                            </template>
                        </v-row>
                        <!-- Кнопка добавления документа -->
                        <v-row justify="center" v-if="files">
                        <v-btn
                            class="tile-glow-right"
                            outlined
                            color="#2f1a54"
                            @click="uploadFile(selectedHomework, currentId)"
                            >
                            Отправить задание на проверку
                            </v-btn>
                        </v-row>    
                    </v-card-text>
                </v-card>

                <v-card style="padding:20px; margin:50px; margin-top:20px; margin-bottom:0px" class="mx-auto" v-if="this.havingHomework==1">
                    <!-- Домашняя работа -->
                    <v-card-subtitle id="cardSubtitle">Выполненные задания</v-card-subtitle>

        
                    <!-- Основная информация -->
                    <v-card-text id="cardText" v-if="homeworkbyListenerInfo">
                        <v-data-table
                            :headers="homeworkbyListenerHeaders"
                            :items="homeworkbyListenerInfo.rows"
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
                            item-key="item.id"
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

                           <!-- Статус -->
                                <template v-slot:[`item.check`]="{ item }">
                                    <h4 v-if="item.check==1" id="downloadedDoc">Работа принята</h4>
                                    <h4 v-if="item.check==0" class="waitingDoc">В ожидании проверки</h4>
                                    <h4 v-if="item.check==-1" class="deniedDoc">Работа не принята</h4>
                                </template>

                            <!-- файл с заданием -->
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
                                         <span v-if="item.check==1">Скачать проверенное задание</span>
                                         <span v-if="item.check==0">Скачать отправленное задание</span>
                                         <span v-if="item.check==-1">Скачать задание с замечаниями</span>
                                    </v-tooltip>
                                </v-row>
                            </template>

                        </v-data-table>
                    </v-card-text>

                    <!-- Если нет загруженных заданий-->

                        <v-card-text id="cardText" v-if="this.havingHomeworkbyListener==0">
                            <v-simple-table>
                                <template v-slot:default>                        
                                    <tbody id="simpleTable">
                                        <tr>
                                            <td>Вы еще не отправляли задания на проверку</td>      
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
        <v-dialog
            v-model="dialog"
            width="500px"
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
            dialogText: null,
            dialog: false,
            docs: null,
            currentCourses: null,
            finishedCourses: null,
            havingDocs: 0,
            havingCurrentCourses: 0,
            havingFinishedCourses: 0,
            selected: null,
            currentCoursesHeaders: [
                { text: 'Название курса', value: 'name', align: 'center' },
                { text: 'Программа курса', value: 'program', align: 'center' },
                { text: 'Дата начала', value: 'start_date', align: 'center' },
                { text: 'Дата окончания', value: 'end_date', align: 'center' },
                { text: 'Процент прохождения', value: 'percent', align: 'center' },
            ],

            finishedCoursesHeaders: [
                { text: 'Наименование курса', value: 'name', align: 'center' },
                { text: 'Программа курса', value: 'program', align: 'center' },
                { text: 'Сертификат', value: 'certificate', align: 'center' },
                { text: 'Процент успешности', value: 'percent', align: 'center' },
            ],
            
            docTypes: [
                'Паспорт',
                'СНИЛС',
                'Диплом о среднем профессиональном образовании',
                'Диплом о профессиональной переподготовке с присвоением квалификации'
            ],

            downloadedDocsHeaders: [
                { text: 'Наименование документа', value: 'name' },
                { text: 'Статус', value: 'status', align: 'center' },
            ],

            tableHeaderTiles: [
                'Название курса', 
                'Программа курса',
                'Оценки',
                'Процент успешности',
                'Сертификат'
            ],

            homeworkHeaders: [
                { text: 'Тема', value: 'name', align: 'center' },
                { text: 'Задание', value: 'link', align: 'center' },
                { text: 'Баллы', value: 'percent', align: 'center' },
                { text: 'Дата окончания сроков', value: 'end_date', align: 'center' },
            ],

            homeworkbyListenerHeaders: [
                { text: 'Задание', value: 'name', align: 'center' },
                { text: 'Файл', value: 'link', align: 'center' },
                { text: 'Статус', value: 'check', align: 'center' },
                
            ],

            // Загрузка и выгрузка
            loader: null,
            loading: false,
            files:null,
            currentFile: null,
            newDocName: null,

            // Задания
            currentCourseId: null,
            currentCourseName: null,
            havingHomework: 0,
            homeworkInfo:  null,
            selectedHomework: null,
            havingHomeworkbyListener: 0,
            homeworkbyListenerInfo:  null,
            availableHomework: null,
        }
    },

    methods: {

        selectFile(file) {
            this.currentFile = file;
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
              
            })  
        },

        uploadDocument(selected){
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
              this.newDocName = response.data;
              this.addDoc(selected, response.data)
            })
            .catch((error) => {
              this.dialogText = "Ошибка";
              this.showDialog();
            })  
            this.files = null   
            this.currentFile = null
            this.newDocName = null
         },
        
        uploadFile(selected, id) { 
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
              this.newDocName = response.data;
              this.addListenerHomework(selected, id, response.data)
            })
            .catch((error) => {
              this.dialogText = "Ошибка";
              this.showDialog();
            })  
            this.files = null   
            this.currentFile = null
            this.newDocName = null
         },

        showDialog() {
            this.dialog = true;
            setTimeout(() => (this.dialog = false), 4000)
        },

         // задания
        
        getAvailableHomework: function (id) {
            let fullURL = '/homeworks/getAvailableHomework/'+id+'/'
            this.axios.get(fullURL)
            .then((response) => {
              this.availableHomework = response.data;
            })
            .catch((error) => {
              this.availableHomework=null;
            })  
        },

        getHomework: function (id) {
            let fullURL = '/homeworks/getHomeworksbyCourse/'+id+'/'
            this.axios.get(fullURL)
            .then((response) => {
              this.homeworkInfo = response.data;
              this.havingHomework = 1;
              this.getAvailableHomework(id);
            })
            .catch((error) => {
              this.havingHomework = 0;
              this.homeworkInfo=null;
            })  
        },

        addListenerHomework(homework_id, listener_id, link){
            let fullURL = '/homeworks/addListenerHomework'
            
            this.axios.post(fullURL, {
              homework_id: homework_id,
              listener_id: listener_id,
              link: link,
              status: 0,
            })
            .then((response) => {
              this.results = response.data
              this.getHomework(this.currentCourseId)
              this.getHomeworksbyListener(listener_id, this.currentCourseId )
              this.selectedHomework = null, 
              this.dialogText = "Задание отправлено на проверку";
              this.showDialog();
            })
            .catch((error) => {
              this.dialogText = "Ошибка";
              this.showDialog();
            })          
        },

        getHomeworksbyListener: function (id, homework_id) {
            let fullURL = '/homeworks/getHomeworksbyListener/'+id+'/'+homework_id+'/'
            this.axios.get(fullURL)
            .then((response) => {
              this.homeworkbyListenerInfo = response.data;
              this.havingHomeworkbyListener = 1;
            })
            .catch((error) => {
              this.havingHomeworkbyListener = 0;
              this.homeworkbyListenerInfo=null;
            })  
        },

        // Документы

        getDocs: function () {
            let fullURL = '/docs/getDocsUser/'+this.currentId+'/'
            this.axios.get(fullURL)
            .then((response) => {
              this.docs = response.data;
              this.havingDocs = 1;
            })
            .catch((error) => {
              this.docs=null
            })  
        },
        deleteDoc: function (list) {
            //  удаляем документ, который прислал слушатель

            this.loading = true
            let fullURL = '/delete'

            this.axios.get(fullURL, {responseType: 'arraybuffer' , params: { name: list.link } })
            .then((response) => {
                this.loading = false
                // затем удаляем запись о нем в базе

                fullURL = '/docs/deleteDoc/'+list.id;
                
                this.axios.delete(fullURL, {
                    id: list.id,
                })
                .then((response) => {
                this.results = response.data;
                this.getDocs();
                this.dialogText = "Документ был удалён";
                this.showDialog();
                })
                .catch((error) => {
                this.dialogText = "Ошибка";
                this.showDialog();
                })  
            })
            .catch((error) => {
              this.loading = false
              this.dialogText = "Ошибка, документ не был удалён";
              this.showDialog();
              this.errors = error.data.detail
              
            })  
           
            
        },
        addDoc: function (name, link) {
            let fullURL = '/docs/addDoc/'
            this.axios.post(fullURL, {
                name: name,
                link: link,
                status: 0,
                user_id: this.currentId
            })
            .then((response) => {
              this.selected = null;
              this.newDocName = null
              this.results = response.data;
              this.getDocs();
              this.dialogText = "Документ был отправлен на проверку";
              this.showDialog();     
            })
            .catch((error) => {
              this.selected = null;
              this.dialogText = "Ошибка";
              this.showDialog();
            })  
        },

        // Курсы

        showCourse (list) {
            this.havingHomework = 0;
            this.getHomework(list.id)
            this.getHomeworksbyListener(this.currentId, list.id)
            this.currentCourseId = list.id;
            this.currentCourseName = list.name;
            if (this.currentCourseId!=-1){
                let fullURL = '/listeners_courses/getListenerCourseByCourse/'+this.currentCourseId+'/'
                this.axios.get(fullURL)
            .then((response) => {
              this.courseInfo = response.data;
            })
            .catch((error) => {
              this.courseInfo=null;
              this.errors = error
            })
            }    
        },

        getCurrentCourses: function () {
            let fullURL = '/listeners_courses/getCurrentCourseByListener/'+this.currentId+'/'
            this.axios.get(fullURL)
            .then((response) => {
              this.currentCourses = response.data;
              this.havingCurrentCourses = 1;
            })
            .catch((error) => {
              this.currentCourses=null
            })  
 
        },
        getFinishedCourses: function () {
            let fullURL = '/listeners_courses/getFinishedCourseByListener/'+this.currentId+'/'
            this.axios.get(fullURL)
            .then((response) => {
              this.finishedCourses = response.data;
              this.havingFinishedCourses = 1;
            })
            .catch((error) => {
              this.finishedCourses=null
            })  
        },
    },
    computed: {
        showCancelledDocs: function () {
            return this.docs.rows.filter(doc => {
                return (doc.status == -1);
            })
        },   
    },

    mounted () {
        this.getDocs()
        this.getCurrentCourses()
        this.getFinishedCourses()
    }
}
</script>

<style lang="css" scoped>
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
        font-size:15px;
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

    #downloadedDoc {
        color: #2f1a54;
    }

    .waitingDoc {
        color:#bdbbd0;
    }

    #deleteDoc {
        cursor: pointer;
        color: #2f1a54;
    }

    #deleteDoc:hover {
        cursor: pointer;
        color: rgb(0, 0, 0);
    }

    #addDoc {
        color: #2f1a54;
        padding-right: 20px;
    }

    #addDoc:hover {
        cursor: pointer;
        color: #bdbbd0;
    }

    .tile-glow-right{
        margin:20px;
    }
    .tile-glow-right2{
        margin-bottom:20px;
        margin-top:10px;
    }
    .tile-glow-right:hover, .tile-glow-right2:hover{
    box-shadow: 0 0 10px #2f1a54;
    transition-duration: 0.3s;
    }

</style>