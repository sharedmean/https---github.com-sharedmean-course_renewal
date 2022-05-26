<template>
  <div>    
        <v-row style="margin-left:180px; margin-right: 180px">
            <v-col cols="6">
                <v-card style="padding:20px; margin:50px; margin-bottom:0px;  margin-top:10px" class="mx-auto">
                    <!-- Слушатели -->
                    <v-card-title class="cardTitle"> Слушатели </v-card-title>

                    <v-card-text id="cardText" >
                        <v-data-table
                            v-if="users"
                            :search="search"
                            :headers="headers"
                            :items="users.rows"
                            @click:row="showListener"
                            style="cursor:pointer"
                            item-key="item.id"
                            >
                            <template v-slot:top>
                                <v-text-field
                                v-model="search"
                                label="Поиск по слушателям"
                                ></v-text-field>
                            </template>    
                        </v-data-table>
                     </v-card-text>
                </v-card>
            </v-col>
                 <!-- Данные о слушателе -->
            <v-col cols="6">
            <v-card style="padding:20px; margin:50px; margin-bottom:0px; padding-bottom:0px; margin-top:10px" class="mx-auto">
                 <!-- Заголовок -->
                    <v-card-title class="cardTitle"> 
                        {{ rightHeader }}
                    </v-card-title>
                    <!-- Основная информация -->
                    <v-card-text id="cardText">
                <div  v-if="newIsShow">
                    <!-- добавление слушателя-->
                    <form style="padding:10px"> 
                    <v-row>
                        <v-col cols=4>
                            <v-text-field
                                label="Фамилия"
                                v-model="newLastName"
                                color="#2f1a54"
                                clearable
                                prepend-icon="mdi-account"
                            ></v-text-field>
                        </v-col>
                        <v-col cols=4>
                            <v-text-field
                                label="Имя"
                                v-model="newFirstName"
                                color="#2f1a54"
                                clearable
                                prepend-icon="mdi-account"
                            ></v-text-field>
                        </v-col>
                        <v-col cols=4>
                            <v-text-field
                                label="Отчество"
                                v-model="newPatronymic"
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
                    <v-row style="padding-left:20px; padding-top:10px">
                        <v-col cols=5>
                            <v-row>
                            <v-text-field
                                label="Логин"
                                v-model="newLogin"
                                color="#2f1a54"
                                clearable
                                prepend-icon="mdi-account-arrow-right"
                            ></v-text-field>
                            </v-row>
                        </v-col>
                        <v-col cols=5 style="margin-left:20px; margin-right:10px">
                            <v-row>
                            <v-text-field
                                label="Пароль"
                                v-model="newPassword"
                                color="#2f1a54"
                                clearable
                                prepend-icon="mdi-account-key"
                            ></v-text-field>
                            </v-row>
                        </v-col>
                        <v-col cols=1>
                             <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon
                                    class="downloadedDoc"
                                    size=40
                                    v-bind="attrs"
                                    v-on="on"
                                    @click="createLoginPassword()"
                                    >
                                    mdi-reload
                                    </v-icon>
                                </template>
                            <span>Сформировать логин и пароль</span>
                            </v-tooltip>
                        </v-col>
                    </v-row>

                    <!-- Добавление роли -->
                    
                    <v-row justify="center">
                        <v-radio-group
                            v-model="newRole"
                            row
                            >
                            <v-radio
                                label="Слушатель"
                                value="3"
                                color="#4b2a86"
                                style="margin-right:70px"
                            ></v-radio>
                            <v-radio
                                label="Преподаватель"
                                value="2"
                                color="#4b2a86"
                                style="margin-right:70px"
                            ></v-radio>
                            <v-radio
                                label="Администратор"
                                value="1"
                                color="#4b2a86"
                            ></v-radio>
                        </v-radio-group>
                    </v-row>

                    <v-row justify="center">
                       <v-btn
                        class="tile-glow-right"
                        outlined
                        color="#2f1a54"
                        @click="addNewListener"
                        >
                        Добавить слушателя
                        </v-btn>
                    </v-row>
                </form>
                   
                
                </div>
              
                <!-- Изменение данных слушателя -->
                <div v-if="!newIsShow" v-key="currentId" item-key="currentId">
                    <v-row justify="right">
                                <v-col cols=12 id="closeInfo">
                                        <template>
                                            <v-btn 
                                                class="tile-glow-right2"
                                                text-color="#2f1a54" 
                                                color="white"                                       
                                                block
                                                @click="hideListener()">
                                                Свернуть
                                            </v-btn>
                                        </template>
                                </v-col>
                            </v-row>
                    <form style="padding:10px"> 
                        <v-row>
                            <v-col cols=4>
                                <v-text-field
                                    label="Фамилия"
                                    v-model="currentLastName"
                                    color="#2f1a54"
                                    clearable
                                    prepend-icon="mdi-account"
                                ></v-text-field>
                            </v-col>
                            <v-col cols=4>
                                <v-text-field
                                    label="Имя"
                                    v-model="currentFirstName"
                                    color="#2f1a54"
                                    clearable
                                    prepend-icon="mdi-account"
                                ></v-text-field>
                            </v-col>
                            <v-col cols=4>
                                <v-text-field
                                    label="Отчество"
                                    v-model="currentPatronymic"
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
                        <v-row style="padding-left:20px; padding-top:10px">
                            <v-col cols=5>
                                <v-row>
                                <v-text-field
                                    label="Логин"
                                    v-model="currentLogin"
                                    color="#2f1a54"
                                    disabled
                                    prepend-icon="mdi-account-arrow-right"
                                ></v-text-field>
                                </v-row>
                            </v-col>
                            <v-col cols=5 style="margin-left:20px; margin-right:10px">
                                <v-row>
                                <v-text-field
                                    label="Пароль"
                                    v-model="currentPassword"
                                    color="#2f1a54"
                                    clearable
                                    prepend-icon="mdi-account-key"
                                ></v-text-field>
                                </v-row>
                            </v-col>
                            <v-col cols=1>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon
                                        class="downloadedDoc"
                                        size=40
                                        v-bind="attrs"
                                        v-on="on"
                                        @click="createPassword()"
                                        >
                                        mdi-reload
                                        </v-icon>
                                    </template>
                                <span>Сформировать новый пароль</span>
                                </v-tooltip>
                            </v-col>
                        </v-row>
                        <v-row justify="center">
                            <v-radio-group
                                v-model="currentRole"
                                row
                                >
                                <v-radio
                                    label="Слушатель"
                                    value="3"
                                    color="#4b2a86"
                                    style="margin-right:70px"
                                ></v-radio>
                                <v-radio
                                    label="Преподаватель"
                                    value="2"
                                    color="#4b2a86"
                                    style="margin-right:70px"
                                ></v-radio>
                                <v-radio
                                    label="Администратор"
                                    value="1"
                                    color="#4b2a86"
                                ></v-radio>
                            </v-radio-group>
                        </v-row>
                        <v-row justify="center" v-if="this.currentPassword">
                        <v-btn
                            class="tile-glow-right"
                            outlined
                            color="#2f1a54"
                            @click="editListener"
                            >
                            Изменить данные с изменением пароля
                            </v-btn>
                        </v-row>
                        <v-row justify="center" v-if="!this.currentPassword">
                        <v-btn
                            class="tile-glow-right"
                            outlined
                            color="#2f1a54"
                            @click="editListenerWithoutPassword"
                            >
                            Изменить данные без изменения пароля
                            </v-btn>
                        </v-row>
                    </form>
                </div>
             </v-card-text>
            </v-card> 
            
              
                    <v-card v-if="!newIsShow" style="padding:20px; margin:50px; margin-bottom:0px; margin-top:20px" class="mx-auto">
                    <v-card-title class="cardTitle">Документы</v-card-title>
                    <!-- Документы в ожидании проверки -->
                    <div v-if="docs">
                    <div v-if="this.showDocsStatus0.length" v-key="this.showDocsStatus0">
                        <v-card style="padding:20px; margin:50px; margin-top:20px; margin-bottom:0px" class="mx-auto">
                        <v-card-subtitle class="cardSubtitle">Документы в ожидании</v-card-subtitle>
                        <v-card-text class="cardText">
                            <v-simple-table>
                                <template v-slot:default>                        
                                    <tbody id="simpleTable">
                                        <tr
                                            v-for="doc in showDocsStatus0"
                                            :key="doc.id"
                                            item-key="doc.id"
                                        >
                                            <td>{{ doc.name }}</td>
                                            <td class="tableClicked">
                                                <v-tooltip bottom>
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-btn 
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            icon
                                                            @click = "downloadDoc(doc.link)"
                                                            :loading="loading"
                                                            :disabled="loading"
                                                            color="#2f1a54"
                                                        > 
                                                            <v-icon size="40">mdi-file-pdf-outline</v-icon>
                                                        </v-btn>
                                                    </template>
                                                <span>Просмотр файла</span>
                                                </v-tooltip>
                                            </td>
                                            <td class="tableClicked">
                                                <v-tooltip bottom>
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-icon
                                                        class="downloadedDoc"
                                                        size=40
                                                        v-bind="attrs"
                                                        v-on="on"
                                                        @click="acceptDoc(doc)"
                                                        >
                                                        mdi-file-plus
                                                        </v-icon>
                                                    </template>
                                                <span>Принять</span>
                                                </v-tooltip>
                                            </td>
                                            <td class="tableClicked">
                                                <v-tooltip bottom>
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-icon
                                                        class="downloadedDoc"
                                                        size=40
                                                        v-bind="attrs"
                                                        v-on="on"
                                                        @click="cancelDoc(doc)"
                                                        >
                                                        mdi-file-remove
                                                        </v-icon>
                                                    </template>
                                                <span>Отклонить</span>
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
                        <!-- Загрузить новый документ -->
                    <div  v-if="!newIsShow">
                        <v-card style="padding:20px; margin:50px; margin-top:20px; margin-bottom:0px" class="mx-auto">
                        <v-card-subtitle class="cardSubtitle">Загрузить новый документ</v-card-subtitle>


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
                            <v-row justify="center" v-if="files">
                            <v-btn
                                class="tile-glow-right"
                                outlined
                                color="#2f1a54"
                                @click="uploadFile(selected, 'doc')"
                                >
                                Загрузить документ
                                </v-btn>
                            </v-row>    
                                
                        </v-card-text>
                        </v-card>
                    </div>
                    <div v-if="docs" v-key="currentId">
                        <v-card style="padding:20px; margin:50px; margin-top:20px; margin-bottom:0px" class="mx-auto">
                        <!-- Загруженные документы -->
                        <v-card-subtitle class="cardSubtitle">Загруженные документы</v-card-subtitle>

                        <!-- Основная информация -->
                        <v-card-text id="cardText">
                            <v-data-table
                                :headers="downloadedDocsHeaders"
                                :items="docs.rows"
                                hide-default-header
                                :items-per-page="5"
                                class="elevation-0"
                                item-key="item.id"
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
                                    <h4 v-if="item.status==1" class="downloadedDoc">Загружен</h4>
                                    <h4 v-if="item.status==0" class="waitingDoc">В ожидании</h4>
                                    <h4 v-if="item.status==-1" class="cancelledDoc">Отклонён</h4>
                                </template>

                            </v-data-table>
                        </v-card-text>
                        </v-card>
                    </div>
                
                    
                    </v-card>
                    <!-- Курсы слушателя -->
                    <v-card  v-if="!newIsShow" style="padding:20px; margin:50px; margin-bottom:0px;  margin-top:20px" class="mx-auto">
                    <v-card-title class="cardTitle">Курсы</v-card-title>
                    <!-- Добавить курс слушателю -->
                    <div>
                        <v-card style="padding:20px; margin:50px; margin-top:20px; margin-bottom:0px" class="mx-auto">
                        <v-card-subtitle class="cardSubtitle">Оформление на курс</v-card-subtitle>


                        <!-- Основная информация -->
                        <v-card-text class="cardText" style="margin-top:40px">
                            <v-row>
                                    <v-select
                                        color="#4b2a86"
                                        :items="courseTypes.rows"
                                        dense
                                        outlined
                                        label="Новый курс"
                                        hide-details
                                        v-model="selectedCourse"
                                        item-text="name"
                                        item-value="id"
                                        item-key="item.id"
                                    ></v-select>
                                    
                            </v-row>
                            
                            <v-row style="margin-top:30px">
                                <template v-if="selectedCourse">
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
                                @click="uploadFile(selectedCourse, 'agreement')"
                                >
                                Загрузить соглашение
                                </v-btn>
                            </v-row>    
                        </v-card-text>
                        </v-card>
                    </div>
                    <div v-if="courses" v-key="currentId">
                        <v-card style="margin:50px; margin-top:20px; margin-bottom:0px" class="mx-auto">
                        <!-- Загруженные документы -->
                        <v-card-subtitle class="cardSubtitle">Информация о записи на курсы</v-card-subtitle>

                        <!-- Основная информация -->
                        <v-card-text id="cardText">
                            <v-data-table
                                :headers="coursesHeaders"
                                :items="courses.rows"
                                hide-default-header
                                :items-per-page="5"
                                class="elevation-0"
                                item-key="item.id"
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
                                    <v-row  v-if="item.status==0 && item.invoice_status==0 && item.organization_id==0" justify="center" >
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
                                        <span>Добавить счёт</span>
                                        </v-tooltip>
                                    </v-row>

                                    <v-row  v-if="item.status==0 && item.invoice_status==-1 && item.organization_id==0" justify="center" >
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
                                        <span>Сформировать новый счёт</span>
                                        </v-tooltip>
                                    </v-row>

                                    <v-row  v-if="item.status==1 && item.organization_id==0" justify="center" >
                                        <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn 
                                                v-bind="attrs"
                                                v-on="on"
                                                icon
                                            > 
                                                <v-icon size="35" id="addInvoice">mdi-check</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Счёт оплачен</span>
                                        </v-tooltip>
                                    </v-row>
                                    
                                    <v-row  v-if="item.status==1 && item.organization_id!=0" justify="center" >
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-icon size=35 class="downloadedDoc" v-on="on"> mdi-bank </v-icon>  
                                            </template>
                                            <span>Счёт оплачен организацией</span>
                                        </v-tooltip>
                                    </v-row>

                                    <v-row  v-if="item.status==0 && item.organization_id!=0" justify="center" >
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-icon size=35 class="downloadedDoc" v-on="on"> mdi-bank-plus </v-icon>  
                                            </template>
                                            <span>Загрузите платёж в разделе "Организации"</span>
                                        </v-tooltip>
                                    </v-row>

                                    <v-row  v-if="item.status==-1 && item.organization_id!=0" justify="center" >
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-icon size=35 v-on="on"> mdi-bank-remove </v-icon>  
                                            </template>
                                            <span>Платёж был просрочен организацией</span>
                                        </v-tooltip>
                                    </v-row>
                                    
                                    
                                    <v-row  v-if="item.status==-1 && item.organization_id==0" justify="center" >
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-icon size=35 v-on="on"> mdi-repeat-off </v-icon>  
                                            </template>
                                            <span>Платёж был просрочен слушателем</span>
                                        </v-tooltip>
                                    </v-row>
                                </template>
                               

                            </v-data-table>
                        </v-card-text>
                        </v-card>
                    </div>   

                    
                    
            </v-card>

            <div v-if="newIsShow">
                        <v-row justify="center" style="padding-bottom:30px">
                    <v-col>
                          <!-- Проверка всех документов в ожидании --> 
                     <div v-if="docsStatus0" v-key="docsStatus0.rows">
                       <v-card v-if="newIsShow" style="padding:20px; margin:50px; margin-bottom:0px; margin-top:20px" class="mx-auto">
                            <v-card-title class="cardTitle">{{ docsStatus0Header }}</v-card-title>
                            <div>
                                <v-card-text class="cardText">
                                    <v-simple-table>
                                        <template v-slot:default>                        
                                            <tbody id="simpleTable">
                                                <tr
                                                    v-for="doc in docsStatus0.rows"
                                                    :key="doc.id"
                                                    item-key="doc.id"
                                                >
                                                    <td>{{ doc.last_name + " " + doc.first_name + " " + doc.patronymic }}</td>
                                                    
                                                    <td class="tableClicked">
                                                        <v-tooltip bottom>
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn 
                                                                    v-bind="attrs"
                                                                    v-on="on"
                                                                    icon
                                                                    @click = "downloadDoc(doc.link)"
                                                                    :loading="loading"
                                                                    :disabled="loading"
                                                                    color="#2f1a54"
                                                                > 
                                                                    <v-icon size="40">mdi-file-pdf-outline</v-icon>
                                                                </v-btn>
                                                            </template>
                                                        <span> {{ doc.name }} </span>
                                                        </v-tooltip>
                                                    </td>
                                                    <td class="tableClicked">
                                                        <v-tooltip bottom>
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-icon
                                                                class="downloadedDoc"
                                                                size=40
                                                                v-bind="attrs"
                                                                v-on="on"
                                                                @click="acceptDoc(doc)"
                                                                >
                                                                mdi-file-plus
                                                                </v-icon>
                                                            </template>
                                                        <span>Принять</span>
                                                        </v-tooltip>
                                                    </td>
                                                    <td class="tableClicked">
                                                        <v-tooltip bottom>
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-icon
                                                                class="downloadedDoc"
                                                                size=40
                                                                v-bind="attrs"
                                                                v-on="on"
                                                                @click="cancelDoc(doc)"
                                                                >
                                                                mdi-file-remove
                                                                </v-icon>
                                                            </template>
                                                        <span>Отклонить</span>
                                                        </v-tooltip>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-card-text>
                            </div>
                       </v-card>
                    </div>
                    </v-col> 
                    </v-row>
                    </div>         
            </v-col>

        </v-row>
         
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
    data() {
        return {
            dialogText: null,
            dialog: false,
            selected: null,
            selectedCourse: null,
            users: null,
            docs: null,
            errors: null,
            courseTypes: null,
            agreements: null,
            courses: null,
            docsStatus0: null,
            headers: [
                { text: 'Фамилия', value: 'last_name', align: 'left' },
                { text: 'Имя', value: 'first_name', align: 'left' }, 
                { text: 'Отчество', value: 'patronymic', align: 'left' },
                { text: 'Мобильный телефон', value: 'phone', align: 'center' }
            ],
            downloadedDocsHeadersStatus0: [
                { text: 'Наименование документа', value: 'name',  },
                { text: 'Принять', value: 'Принять', align: 'center' },
                { text: 'Отклонить', value: 'cancel', align: 'center' },
            ],
            coursesHeaders: [
                { text: 'Название курса', value: 'name' },
                { text: 'Соглашение', value: 'agreements_link' },
                { text: 'Счёт', value: 'invoices_link' },
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
            search: '',
            newDocId: -1,
            rightHeader: 'Добавление слушателя',
            docsStatus0Header: 'Документы в ожидании проверки',
            fio: '',
            newLogin: '',
            newPassword: '',
            newFirstName: '',
            newLastName: '',
            newPatronymic: '',
            newPhone: '',
            newEmail: '',
            newRole: '3',
            currentId: -1,
            currentFirstName: '',
            currentLastName: '',
            currentPatronymic: '',
            currentPhone: '',
            currentEmail: '',
            currentLogin: '',
            currentPassword: '',
            currentRole: '3',
            newIsShow: true,
            newCourseId: -1,
            addDocStatus: 0,
            nextListenerId: 11,

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

        createLoginPassword() {
            this.newLogin = Math.random().toString(36).substring(2, 15);
            this.newPassword = Math.random().toString(36).substring(2, 15);
        },

        createPassword() {
            this.currentPassword = Math.random().toString(36).substring(2, 15);
        },

        // Загрузка и выгрузка файлов

        forceFIleDownload(responce,link) {
            var fileName = link;
            var a = document.createElement("a");
            document.body.appendChild(a);
            var file = new Blob([responce.data], {type: 'application/pdf'});
                var fileURL = window.URL.createObjectURL(file);
                a.href = fileURL;
                a.download = fileName;
                a.click();
        },

        downloadDoc(link) {
            this.loading = true

            let fullURL = '/download'

            this.axios.get(fullURL, {responseType: 'arraybuffer' , params: { name: link } })
            .then((responce) => {
                this.loading = false,
                this.forceFIleDownload(responce,link)
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

         uploadFile(selected, type) { 
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
            .then((responce) => {
              this.newDocName = responce.data;
              if (type=="doc")
                this.addDoc(selected, responce.data);
              else if(type=="agreement")
                this.addCourse(selected, responce.data);
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

        // Документы

        getDocsStatus0: function () {
            let fullURL = '/docs/getAllDocsStatus0'

            this.axios.get(fullURL)
            .then((responce) => {
                this.docsStatus0 = responce.data;
            })
            .catch((error) => {
              this.docsStatus0 = null;
              this.errors = error.data.detail
            })
        },

        ifDocs: function() {
            if (this.currentId!=-1){
                let fullURL = '/docs/ifDocsUser/'+this.currentId+'/'
                this.axios.get(fullURL)
            .then((responce) => {
              return responce.data;
            })
            .catch((error) => {
              this.errors = error
            })
            }    
        },
        getDocs: function () {
            if (this.currentId!=-1){
                let fullURL = '/docs/getDocsUser/'+this.currentId+'/'
                this.axios.get(fullURL)
            .then((responce) => {
              this.docs = responce.data;

            })
            .catch((error) => {
              this.docs=null;
              this.errors = error
            })
            }    
        },
        cancelDoc: function (list) {
            let fullURL = '/docs/editDoc/'
            
            this.axios.post(fullURL, {
                id: list.id,
                name: list.name,
                link: list.link,
                status: -1,
                user_id: list.user_id
            })
            .then((responce) => {
              this.results = responce.data;
              this.getDocs();
              this.getDocsStatus0();
              this.dialogText = "Документ отклонён";
              this.showDialog();
            })
            .catch((error) => {
              this.dialogText = "Ошибка";
              this.showDialog();
              this.errors = error.data.detail
            })  
        },
        acceptDoc: function (list) {
            let fullURL = '/docs/editDoc/'
            
            this.axios.post(fullURL, {
                id: list.id,
                name: list.name,
                link: list.link,
                status: 1,
                user_id: list.user_id
            })
            .then((responce) => {
              this.results = responce.data;
              this.getDocs();
              this.getDocsStatus0();
              this.dialogText = "Документ принят";
              this.showDialog();
            })
            .catch((error) => {
              this.dialogText = "Ошибка";
              this.showDialog();  
              this.errors = error.data.detail
            })  
        },
        addDoc: function (name, link) {
            if(name!=null){
                let fullURL = '/docs/addDoc/'
            
                this.axios.post(fullURL, {
                    name: name,
                    link: link,
                    status: 1,
                    user_id: this.currentId
                })
                .then((responce) => {
                this.selected = null;
                this.newDocName = null
                this.results = responce.data;
                this.getDocs();
                this.getDocsStatus0();
                this.dialogText = "Документ успешно добавлен";
                })
                .catch((error) => {
                this.selected = null;
                this.newDocName = null
                this.errors = error.data.detail
                this.dialogText = "Ошибка";
                })  
            }
            else this.dialogText = "Выберите документ";

            this.showDialog();
        },

        // Курсы

        editInvoice: function (id) {
            let fullURL = '/invoices/editInvoice'
            this.axios.post(fullURL, {
              id: id,
              link: String(Math.random().toString(36).substring(2, 15))+'.pdf',
            })
            .then((responce) => {
              this.results = responce.data;
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
            .then((responce) => {
              this.results = responce.data;
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
        addCourse: function (id, link) {
            if (id!=null){
                let fullURL = '/agreements/addAgreement/'
                this.axios.post(fullURL, {
                    link: link,
                    status: 0,
                    organization_id: 0,
                    course_id: id,
                    partnership_agreement_id: 0
                })
                .then((responce) => {
                    this.selectedCourse = null;
                    this.newDocName = null
                    this.results = responce.data;
                    let amount = null;
                    this.courseTypes.rows.forEach(element => {
                        if (element.id==id) 
                            amount = element.price;
                    });

                    let fullURL2 = '/invoices/addInvoice/'+amount+'/'

                    this.axios.post(fullURL2, { 
                        amount: amount
                    })
                    .then((responce) => {
                        this.results = responce.data;
                        let fullURL3 = '/listeners_agreements/addListenerAgreement/'+this.currentId+'/'
                    
                        this.axios.post(fullURL3, {
                            user_id: this.currentId,
                        })
                        .then((responce) => {
                            this.results = responce.data;
                            this.getCourses();
                            this.dialogText = "Соглашение успешно добавлено";
                        })
                        .catch((error) => {
                            this.dialogText = "Ошибка";
                            this.errors = error.data.detail
                        })
                    })
                    .catch((error) => {
                        this.dialogText = "Ошибка";
                        this.errors = error.data.detail
                    })
                })
                .catch((error) => {
                    this.dialogText = "Ошибка";
                    this.errors = error.data.detail
                })  
            }
            else this.dialogText = "Выберите курс";
            
            this.showDialog();
            
        },
        getCoursesTypes: function () {
            let fullURL = '/courses/getCoursesByDate'

            this.axios.get(fullURL)
            .then((responce) => {
              this.courseTypes = responce.data;
            })
            .catch((error) => {
              this.errors = error.data.detail
            })
        },
        getCourses: function () {
            if (this.currentId!=-1){
                let fullURL = '/listeners_agreements/getListenerAgreementByListener/'+this.currentId+'/'
                this.axios.get(fullURL)
            .then((responce) => {
              this.courses = responce.data;

            })
            .catch((error) => {
              this.courses=null;
              this.errors = error
            })
            }    
        },

        // Слушатели

        getUsers: function () {
            let fullURL = '/users/getUsers'

            this.axios.get(fullURL)
            .then((responce) => {
              this.users = responce.data;
            })
            .catch((error) => {
              this.errors = error.data.detail
            })
        },
        
        addNewListener: function () {
            let fullURL = '/users/addUser'
            
            this.axios.post(fullURL, {

              first_name: this.newFirstName,
              last_name: this.newLastName,
              patronymic: this.newPatronymic,
              phone: this.newPhone,
              email: this.newEmail,
              login: this.newLogin,
              password: this.newPassword,
              role_id: this.newRole,
            })
            .then((responce) => {
              this.results = responce.data;
              this.getUsers();
              this.newFirstName = '';
              this.newLastName = '';
              this.newPatronymic = '';
              this.newPhone = '';
              this.newEmail = '';
              this.newLogin = '',
              this.newPassword = '',
              this.newRole = '1',
              this.dialogText = "Пользователь добавлен";
              this.showDialog();
            })
            .catch((error) => {
              this.dialogText = "Ошибка";
              this.showDialog();
              this.errors = error.data.detail
            })            
        },
    
        editListenerWithoutPassword () {
            let fullURL = '/users/editUserWithoutPassword'
            this.axios.post(fullURL, {
              id: this.currentId,  
              first_name: this.currentFirstName,
              last_name: this.currentLastName,
              patronymic: this.currentPatronymic,
              phone: this.currentPhone,
              email: this.currentEmail,
              login: this.currentLogin,
              role_id: this.currentRole,
            })
            .then((responce) => {
              this.results = responce.data;
              this.getUsers();
              this.dialogText = "Данные пользователя изменены";
              this.showDialog();
            })
            .catch((error) => {
              this.dialogText = "Ошибка";
              this.showDialog();
              this.errors = error.data.detail
            })            
        },
        editListener () {
            let fullURL = '/users/editUser'
            this.axios.post(fullURL, {
              id: this.currentId,  
              first_name: this.currentFirstName,
              last_name: this.currentLastName,
              patronymic: this.currentPatronymic,
              phone: this.currentPhone,
              email: this.currentEmail,
              login: this.currentLogin,
              password: this.currentPassword,
              role_id: this.currentRole,
            })
            .then((responce) => {
              this.results = responce.data;
              this.getUsers();
              this.dialogText = "Данные пользователя изменены";
              this.showDialog();
            })
            .catch((error) => {
              this.dialogText = "Ошибка";
              this.showDialog();
              this.errors = error.data.detail
            })            
        },
        showListener (list) {
            this.currentId = list.id;
            this.currentFirstName = list.first_name;
            this.currentLastName = list.last_name;
            this.currentPatronymic = list.patronymic;
            this.currentPhone = list.phone;
            this.currentEmail = list.email;
            this.currentLogin = list.login;
            this.currentPassword = null,
            this.currentRole = String(list.role_id);
            this.newIsShow = false;
            this.rightHeader = 'Данные о слушателе';
            this.getDocs();
            this.getCourses();
        },
        hideListener () {
            this.newIsShow = true;
            this.rightHeader = 'Добавление слушателя';
        },
        
        
    },
    computed: {
        showDocsStatus0: function () {
            return this.docs.rows.filter(doc => {
                return (doc.status == 0);
            })
        },         
    },
    mounted () {
      this.getUsers()
      this.getCoursesTypes()
      this.getDocsStatus0()
    },
    
}
</script>

<style scoped>
.cardSubtitle {
   /* background-color: #bdbbd0; */
   background: linear-gradient(12deg, #bdbbd0 0%, #bdbbd056 79%, #bdbbd088 79%);
    color: black !important;
    text-align: center;
    font-weight: bold;
}
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
    color: black;
    text-align: center;
}
#addDoc {
    color: #2f1a54;
    padding-right: 25px;
}
#addInvoice {
    color: #2f1a54;
}

.waitingDoc {
    color:#bdbbd0;
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

.tile-right-item {
   cursor: default;;
   margin:30px;
   width: 100%;
}

.right-hat{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.add-agreement :hover{
    box-shadow: 0 0 8px #4b2a86;
    transition-duration: 0.4s;
    border-radius: 50%;
    cursor: pointer;
}

.courses-table, .listeners-table{
   font-size: 14px;
   text-align: center;
   box-shadow: 0 0 3px #000000;
}

.courses-table {
    margin-top: 30px;
    width:100%;
    margin-bottom: 30px;
}

.courses-table tr, .courses-table td, .listeners-table tr, .listeners-table td{
   padding:10px;  
   box-shadow: 0 0 1px black;      
}

.listeners-table tr:hover{
   box-shadow: 0 0 10px #4b2a86;
   cursor: pointer;  
   transition-duration: 0.7s;
}
.table-hat{
    background: linear-gradient(12deg, rgba(75,42,134,1) 0%, rgba(0,0,4,1) 79%);
    color: white;
}
.nav-item {
    color: black;
    text-decoration: none;
}
.active {
    color: #2f1a54;
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