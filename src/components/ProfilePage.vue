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
                            <template v-slot:[`item.score`]>
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
                <div v-key="docs.rows"> 
                <v-card style="padding:20px; margin:50px; margin-bottom:0px" class="mx-auto">
                    <v-card-title id="cardTitle">Документы</v-card-title>


                    <!-- Информация об отклонённых документах -->
                    <div v-if="this.havingDocs==1">
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
                    <v-card-text id="cardText" style="margin-top:20px">
                        <v-row>
                            <v-col cols="11">
                                <v-select
                                    color="#4b2a86"
                                    :items="docTypes"
                                    dense
                                    outlined
                                    label="Новый документ"
                                    hide-details
                                    v-model="selected"
                                ></v-select>
                            </v-col>

                            <!-- Кнопка добавления документа -->
                            <v-col cols="1">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn 
                                            v-bind="attrs"
                                            v-on="on"
                                            icon
                                            @click="addDoc(selected)" 
                                        > 
                                            <v-icon id="addDoc" size="45">mdi-plus-box</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Добавить</span>
                                </v-tooltip>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    </v-card>

                    <v-card style="padding:20px; margin:50px; margin-top:20px; margin-bottom:0px" class="mx-auto">
                    <!-- Загруженные документы -->
                    <v-card-subtitle id="cardSubtitle">Загруженные документы</v-card-subtitle>

                    
                        <!-- Основная информация -->
                        <v-card-text id="cardText" v-if="this.havingDocs==1">
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
                        <v-card-text id="cardText" v-if="this.havingDocs==0">
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
                { text: 'Оценки', value: 'score', align: 'center' },
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
            
        }
    },

    methods: {

        showDialog() {
            this.dialog = true;
            setTimeout(() => (this.dialog = false), 4000)
        },

        // Документы

        getDocs: function () {
            let fullURL = '/docs/getDocsUser/'+this.currentId+'/'
            this.axios.get(fullURL)
            .then((responce) => {
              this.docs = responce.data;
              this.havingDocs = 1;
            })
            .catch((error) => {
              this.docs=null
              this.errors = error.data.detail
            })  
        },
        deleteDoc: function (list) {
            let fullURL = '/docs/deleteDoc/'+list.id;
            
            this.axios.delete(fullURL, {
                id: list.id,
            })
            .then((responce) => {
              this.results = responce.data;
              this.getDocs();
              this.dialogText = "Документ был удалён";
              this.showDialog();
            })
            .catch((error) => {
              this.dialogText = "Ошибка";
              this.showDialog();
              this.errors = error.data.detail
            })  
        },
        addDoc: function (name) {
            let fullURL = '/docs/addDoc/'
            
            this.axios.post(fullURL, {
                name: name,
                link: "knjcfhjedhy.pdf",
                status: 0,
                user_id: this.currentId
            })
            .then((responce) => {
              this.results = responce.data;
              this.selected = null;
              this.getDocs();
              this.dialogText = "Документ был отправлен на проверку";
              this.showDialog();
            })
            .catch((error) => {
              this.selected = null;
              this.dialogText = "Ошибка";
              this.showDialog();
              this.errors = error.data.detail
            })  
        },

        // Курсы

        getCurrentCourses: function () {
            let fullURL = '/listeners_courses/getCurrentCourseByListener/'+this.currentId+'/'
            this.axios.get(fullURL)
            .then((responce) => {
              this.currentCourses = responce.data;
              this.havingCurrentCourses = 1;
            })
            .catch((error) => {
              this.currentCourses=null
              this.errors = error.data.detail
            })  
 
        },
        getFinishedCourses: function () {
            let fullURL = '/listeners_courses/getFinishedCourseByListener/'+this.currentId+'/'
            this.axios.get(fullURL)
            .then((responce) => {
              this.finishedCourses = responce.data;
              this.havingFinishedCourses = 1;
            })
            .catch((error) => {
              this.finishedCourses=null
              this.errors = error.data.detail
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

</style>