<template>
    <div>    
        <v-row style="margin-left:180px; margin-right: 180px">
            <v-col cols="6">
                <v-card style="padding:20px; margin:50px; margin-bottom:0px;  margin-top:10px" class="mx-auto">
                    <!-- Организации -->
                    <v-card-title class="cardTitle"> Организации </v-card-title>

                    <v-card-text id="cardText" >
                        
                 <v-data-table
                    v-if="organizations"
                    :search="search"
                    :headers="headers"
                    :items="organizations.rows"
                    @click:row="showOrganization"
                    style="cursor:pointer"
                    item-key="item.id"
                    >
                    <template v-slot:top>
                        <v-text-field
                        color="#2f1a54"
                        v-model="search"
                        label="Поиск по организациям"
                        ></v-text-field>
                    </template>    
                </v-data-table>
                    </v-card-text>
                       </v-card>
            </v-col>
       
         <!-- Данные об организации -->
            <v-col cols="6">
            <v-card style="padding:20px; margin:50px; margin-bottom:0px;  padding-bottom:0px; margin-top:10px" class="mx-auto">
                 <!-- Заголовок -->
                    <v-card-title class="cardTitle"> 
                        {{ rightHeader }}
                    </v-card-title>
                    <!-- Основная информация -->
                    <v-card-text id="cardText">
                                
                
                <div  v-if="newIsShow">
                    <!-- добавление организации-->
                <form style="padding:10px"> 
                    <v-row>
                        <v-col cols=6>
                            <v-text-field
                                label="Название организации"
                                v-model="newName"
                                color="#2f1a54"
                                clearable
                                prepend-icon="mdi-pencil"
                            ></v-text-field>
                        </v-col>
                        <v-col cols=6>
                            <v-text-field
                                label="Руководитель"
                                v-model="newDirector"
                                color="#2f1a54"
                                clearable
                                prepend-icon="mdi-account"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols=6>
                            <v-text-field
                                label="Номер телефона"
                                v-model="newPhone"
                                color="#2f1a54"
                                clearable
                                prepend-icon="mdi-phone"
                            ></v-text-field>
                        </v-col>
                        <v-col cols=6>
                            <v-text-field
                                label="Электронная почта"
                                v-model="newEmail"
                                color="#2f1a54"
                                clearable
                                prepend-icon="mdi-email"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                       <v-btn
                        class="tile-glow-right"
                        outlined
                        color="#2f1a54"
                        @click="addNewOrganization"
                        
                        >
                        Добавить организацию
                        </v-btn>
                    </v-row>
                </form>
                </div>
                <!-- Изменение данных организации -->
                <div v-if="!newIsShow" v-key="currentUserId">
                    <v-row justify="right">
                                <v-col cols=12 id="closeInfo">
                                        <template>
                                            <v-btn 
                                                class="tile-glow-right2"
                                                text-color="#2f1a54" 
                                                color="white"                                       
                                                block
                                                @click="hideOrganization()">
                                                Свернуть
                                            </v-btn>
                                        </template>
                                </v-col>
                            </v-row>
                    <form style="padding:10px"> 
                        <v-row>
                            <v-col cols=6>
                                <v-text-field
                                    label="Название организации"
                                    v-model="currentName"
                                    color="#2f1a54"
                                    clearable
                                    prepend-icon="mdi-pencil"
                                ></v-text-field>
                            </v-col>
                            <v-col cols=6>
                                <v-text-field
                                    label="Руководитель"
                                    v-model="currentDirector"
                                    color="#2f1a54"
                                    clearable
                                    prepend-icon="mdi-account"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols=6>
                                <v-text-field
                                    label="Номер телефона"
                                    v-model="currentPhone"
                                    color="#2f1a54"
                                    clearable
                                    prepend-icon="mdi-phone"
                                ></v-text-field>
                            </v-col>
                            <v-col cols=6>
                                <v-text-field
                                    label="Электронная почта"
                                    v-model="currentEmail"
                                    color="#2f1a54"
                                    clearable
                                    prepend-icon="mdi-email"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row justify="center">
                        <v-btn
                            class="tile-glow-right"
                            outlined
                            color="#2f1a54"
                            @click="editOrganization"
                            
                            >
                            Изменить данные
                            </v-btn>
                        </v-row>
                    </form>

                    
            
                
            </div>  
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
                    </v-card-text>
            </v-card>

            <v-card v-if="!newIsShow" style="padding:20px; margin:50px; margin-bottom:0px;  margin-top:20px" class="mx-auto">
                    <v-card-title class="cardTitle">Курсы</v-card-title>
                    <!-- Добавить курс слушателю -->
                    <div>
                        <v-card style="padding:20px; margin:50px; margin-top:20px; margin-bottom:0px" class="mx-auto">
                       
                        <v-card-subtitle class="cardSubtitle">Оформление на курс</v-card-subtitle>


                        <!-- Новый курс -->
                        <v-card-text class="cardText" style="margin-top:40px">
                            <v-row >
                                    <v-select
                                        color="#4b2a86"
                                        :items="courseTypes.rows"
                                        dense
                                        outlined
                                        label="Выберите курс"
                                        hide-details
                                        v-model="courseSelected"
                                        item-text="name"
                                        item-value="id"
                                        item-key="item.id"
                                    ></v-select>
                             </v-row>
                             <v-row style="margin-top:20px">
                             <template v-if="courseSelected" >
                                <v-data-table
                                    :search="selected"
                                    :headers="usersHeaders"
                                    :items="users.rows"
                                    item-value="id"
                                    show-select
                                    v-model="selectedUsers"
                                    :items-per-page="5"
                                >
                                    <template v-slot:top>
                                        <v-text-field
                                        v-model="selected"
                                        label="Поиск слушателей"
                                        item-value="id"
                                        color="#2f1a54"
                                        ></v-text-field>
                                    </template>      
                                </v-data-table>
                            </template>    
                            </v-row>    
                                <v-row style="margin-top:30px">
                                <template v-if="courseSelected">
                                    <v-file-input
                                        label="Выберите соглашение"
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
                                    @click="uploadFile(courseSelected, selectedUsers)"
                                    >
                                    Загрузить соглашение
                                    </v-btn>
                                </v-row>                                                
                           
                            
                        </v-card-text>
                        </v-card>
                    </div>
                    <div v-if="courses" v-key="courses">
                        <!-- Все курсы -->
                        <v-card style="padding:20px; margin:50px; margin-top:20px; margin-bottom:0px" class="mx-auto">
                        <v-card-subtitle class="cardSubtitle">Информация о записи на курсы</v-card-subtitle>

                        <!-- Основная информация -->
                        <v-card-text id="cardText">
                            <v-data-table
                                :headers="coursesHeaders"
                                :items="courses.rows"
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

                               <!-- Договор -->
                                <template v-slot:[`item.agreements_link`] ="{ item }">
                                    <v-row justify="center" >
                                         <v-tooltip bottom>
                                             <template v-slot:activator="{ on, attrs }">
                                                 <v-btn 
                                                     v-bind="attrs"
                                                     v-on="on"
                                                     icon
                                                     @click = "downloadDoc(item.agreements_link)"
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

                                
                                 <!-- Счёт -->
                                <template v-slot:[`item.invoices_link`]="{ item }">
                                    
                                    <v-row  v-if="item.status==0 && item.invoice_status==0" justify="center">
                                        <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn 
                                                v-bind="attrs"
                                                v-on="on"
                                                icon
                                                @click="editInvoice(item.invoice_id)" 
                                            > 
                                                <v-icon id="addInvoice" size="45">mdi-plus</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Добавить</span>
                                        </v-tooltip>
                                    </v-row>

                                    <v-row  v-if="item.status==0 && item.invoice_status==-1" justify="center" >
                                        <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn 
                                                v-bind="attrs"
                                                v-on="on"
                                                icon
                                                @click="createInvoice(item)" 
                                            > 
                                                <v-icon id="addInvoice" size="35">mdi-repeat</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Сформировать новый</span>
                                        </v-tooltip>
                                    </v-row>

                                    <v-row  v-if="item.status==1" justify="center" >
                                        <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn 
                                                v-bind="attrs"
                                                v-on="on"
                                                icon
                                            > 
                                                <v-icon id="addInvoice" size="35">mdi-check</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Счёт оплачен</span>
                                        </v-tooltip>
                                    </v-row>

                                    <v-row  v-if="item.status==-1" justify="center" >
                                        <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn 
                                                v-bind="attrs"
                                                v-on="on"
                                                icon
                                            > 
                                                <v-icon size="35"> mdi-repeat-off </v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Платёж просрочен</span>
                                        </v-tooltip>
                                    </v-row>
                                    
                                </template>
                               
                            </v-data-table>
                        </v-card-text>
                        </v-card>
                    </div>            
                    </v-card>
                    
            </v-col>
        </v-row>
        </div>
        
        
</template>

<script>
export default {
    data() {
        return {
            dialogText: null,
            dialog: false,
            courseSelected: null,
            selected: [],
            selectedUsers: [],
            organizations: null,
            users: null,
            errors: null,
            usersHeaders : [
                { text: 'Фамилия', value: 'last_name', align: 'left' },
                { text: 'Имя', value: 'first_name', align: 'left' },
                { text: 'Отчество', value: 'patronymic', align: 'left' },
            ],
            headers: [
                { text: 'Название организации', value: 'name', align: 'left' },
                { text: 'Руководитель', value: 'director', align: 'left' },
                { text: 'Телефон', value: 'phone', align: 'left' },
            ],
            coursesHeaders: [
                { text: 'Название курса', value: 'name' },
                { text: 'Соглашение', value: 'agreements_link' },
                { text: 'Счёт', value: 'invoices_link' },
            ],
            search: '',
            rightHeader: 'Добавление организации',
            newName: '',
            newDirector: '',
            newPhone: '',
            newEmail: '',
            currentUserId: -1,
            currentName: '',
            currentDirector: '',
            currentPhone: '',
            currentEmail: '',
            newIsShow: true,
            courseTypes: null,
            agreements: null,
            courses: null,

            // Загрузка и выгрузка
            loader: null,
            loading: false,
            files:null,
            currentFile: null,
            newDocName: null,

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

         uploadFile(selected, users) { 
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
              this.addCourse(selected, users, response.data);
            })
            .catch((error) => {
              this.dialogText = "Ошибка";
              this.showDialog();
              this.errors = error.data.detail
            })  
            this.files = null   
            this.currentFile = null
            this.newDocName = null
         },

        // Организации

        getOrganizations: function () {
            let fullURL = '/organizations/getOrganizations'

            this.axios.get(fullURL)
            .then((response) => {
              this.organizations = response.data;
            })
            .catch((error) => {
              this.errors = error.data.detail
            })
        },
        editOrganization () {
            let fullURL = '/organizations/editOrganization'
            this.axios.post(fullURL, {
              id: this.currentUserId,  
              name: this.currentName,
              director: this.currentDirector,
              phone: this.currentPhone,
              email: this.currentEmail,
            })
            .then((response) => {
              this.results = response.data;
              this.getOrganizations();
              this.getUsers();
              this.dialogText = "Данные об организации изменены";
              this.showDialog();
            })
            .catch((error) => {
              this.dialogText = "Ошибка";
              this.showDialog();
              this.errors = error.data.detail
            })            
        },
        showOrganization (list) {
            this.currentUserId = list.id;
            this.currentName = list.name;
            this.currentDirector = list.director;
            this.currentPhone = list.phone;
            this.currentEmail = list.email;
            this.newIsShow = false;
            this.rightHeader = 'Данные об организации';
            this.courseSelected = null,
            this.selected = [],
            this.getUsers();
            this.getCourses();
        },
        hideOrganization () {
            this.newIsShow = true;
            this.rightHeader = 'Добавление организации';
        },
        addNewOrganization: function () {
            let fullURL = '/organizations/addOrganization'
            
            this.axios.post(fullURL, {

              name: this.newName,
              director: this.newDirector,
              phone: this.newPhone,
              email: this.newEmail,
            })
            .then((response) => {
              this.results = response.data;
              this.getOrganizations();
              this.newName = '';
              this.newDirector = '';
              this.newPhone = '';
              this.newEmail = ''
              this.dialogText = "Организация добавлена";
              this.showDialog();
            })
            .catch((error) => {
              this.dialogText = "Ошибка";
              this.showDialog();
              this.errors = error.data.detail
            })            
        },

        // Слушатели

        getUsers: function () {
            let fullURL = '/users/getUsers'

            this.axios.get(fullURL)
            .then((response) => {
              this.users = response.data;
            })
            .catch((error) => {
              this.errors = error.data.detail
            })
        },

        // Курсы

        editInvoice: function (id) {
            let fullURL = '/invoices/editInvoice'
            this.axios.post(fullURL, {
              id: id,
              link: 'uploaded',
            })
            .then((response) => {
              this.results = response.data;
              this.getCourses();
              this.dialogText = "Счёт успешно добавлен";
              this.showDialog();
              
            })
            .catch((error) => {
              this.dialogText = "Ошибка";
              this.showDialog();
              this.errors = error.data.detail
            })     

        },
        createInvoice: function (item) {
       
            let fullURL = '/invoices/addRenewedInvoice'

            this.axios.post(fullURL, {
                amount: item.amount,
                agreement_id: item.agreement_id
            })
            .then((response) => {
              this.results = response.data;
              this.getCourses();
              this.dialogText = "Новый счёт успешно создан";
              this.showDialog();
            })
            .catch((error) => {
              this.dialogText = "Ошибка";
              this.showDialog();
              this.errors = error.data.detail
            })  

        },
        addCourse: function (id, selectedUsers, link) {
            if (id!=null) {
                if (this.selectedUsers.length > 0){
                    let fullURL = '/agreements/addAgreement/'
                    this.axios.post(fullURL, {
                        link: link,
                        status: 0,
                        organization_id: this.currentUserId,
                        course_id: id,
                        partnership_agreement_id: 0
                    })
                    .then((response) => {
                    this.selectedCourse = null;
                    this.newDocName = null
                    this.results = response.data;
                    this.results = response.data;
                    let amount = null;
                        this.courseTypes.rows.forEach(element => {
                            
                            if (element.id==id) 
                                amount = element.price * this.selectedUsers.length;
                        });

                        let fullURL2 = '/invoices/addInvoice/'+amount+'/'

                        this.axios.post(fullURL2, { 
                            amount: amount
                        })
                        .then((response) => {
                            this.results = response.data;
                            selectedUsers.forEach(element=> {
                            let fullURL3 = '/listeners_agreements/addListenerAgreement/'+element.id+'/'

                            this.axios.post(fullURL3, {
                                user_id: element.id,
                            })
                            .then((response) => {
                            this.results = response.data;
                            this.courseSelected = null,
                            this.selectedUsers = [],
                            this.getCourses();
                            this.dialogText = "Соглашение успешно добавлено";
                            })
                            .catch((error) => {
                            this.dialogText = "Ошибка";
                            this.errors = error.data.detail
                            })
                        });
                        })
                        .catch((error) => {
                            this.dialogText = "Ошибка";
                            this.errors = error.data.detail
                        })
                    })
                    .catch((error) => {
                    this.selectedCourse = null;
                    this.newDocName = null
                    this.results = response.data;
                    this.dialogText = "Ошибка";
                    this.errors = error.data.detail
                    })  
                }
                else this.dialogText = "Выберите слушателей из списка";
            }
            else this.dialogText = "Выберите курс";
            
            this.showDialog();
        },
        getCoursesTypes: function () {
            let fullURL = '/courses/getCoursesByDate'

            this.axios.get(fullURL)
            .then((response) => {
              this.courseTypes = response.data;
            })
            .catch((error) => {
              this.errors = error.data.detail
            })
        },
        getCourses: function () {
            if (this.currentUserId!=-1){
                let fullURL = '/agreements/getAgreementByOrganization/'+this.currentUserId+'/'
                this.axios.get(fullURL)
            .then((response) => {
              this.courses = response.data;
            })
            .catch((error) => {
              this.courses=null;
              this.errors = error
            })
            }    
        },
        
    },
    computed: {
    },
    mounted () {
      this.getOrganizations()
      this.getCoursesTypes()
    }
}
</script>

<style scoped>
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
h1{
    font-size: 30px;
}
.downloadedDoc {
   color: #2f1a54;
}
.docsStatus0{
    padding-top: 40px;
    padding-bottom: 15px;
}
.cardTitle {
    background: linear-gradient(12deg, rgba(0,0,4,1) 0%, rgb(54 22 109) 79%, rgb(75 42 134) 79%);
    justify-content: center;
    color: white;
    font-size: 18px;
}
.simpleTable tr,td {
    background: #ffffff; 
    border-top: 1px solid rgba(0, 0, 0, .2);
    border-bottom: 1px solid rgba(0, 0, 0, .2);
    /* border: 1px solid rgb(0, 0, 0);  */
    color: black;
    text-align: center;
}
.cardSubtitle {
   /* background-color: #bdbbd0; */
   background: linear-gradient(12deg, #bdbbd0 0%, #bdbbd056 79%, #bdbbd088 79%);
    color: black !important;
    text-align: center;
    font-weight: bold;
}
#addDoc {
    color: #2f1a54;
    padding-right: 25px;
}
#addInvoice {
    color: #2f1a54;
}

.main-block{
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: space-between;
    padding-top: 30px;
}
.tableClicked:hover {
    cursor: pointer;   
}
#tableHeader  {
   text-align: center;
    color: black;
 }
.listeners-form{
    padding-bottom: 30px;
}

.right-hat{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.close-img{
    width: 40px;
    cursor: pointer;
}

.close-img:hover {
    transform: rotate(45deg);
    transition-duration: 0.5s;
}
.tile-glow-right2{
    margin-bottom:20px;
    margin-top:5px;
}
.tile-glow-right{
    margin:20px;
}
.tile-glow-right:hover, .tile-glow-right2:hover{
   box-shadow: 0 0 10px #2f1a54;
   transition-duration: 0.3s;
}
</style>    