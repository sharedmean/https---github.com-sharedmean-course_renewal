<template >
    <div v-if="$store.getters.isAuthenticated">    
        <v-row style="margin-left:180px; margin-right: 180px">
            <!-- Курсы -->
            <v-col cols="6">
                <v-card style="padding:20px; margin:50px; margin-bottom:0px;  margin-top:10px" class="mx-auto">
                    <!-- Заголовок -->
                    <v-card-title id="cardTitle">Курсы</v-card-title>
                    
                    <v-card style="padding:20px; margin:50px; margin-top:20px; margin-bottom:0px" class="mx-auto">    
                    <!-- Информация о предстоящих курсах -->
                    <v-card-subtitle id="cardSubtitle">Предстоящие курсы</v-card-subtitle>

                    <v-card-text id="cardText" v-if="this.havingUpcomingCourses==1">
                        
                        <v-data-table
                            :headers="coursesHeaders"
                            :items="upcomingCourses.rows"
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
                            @click:row="showUpcomingCourse"
                            style="cursor:pointer"
                        >
                            
                            <!-- Заголовки таблицы -->
                            <template v-slot:header="{ props: { headers } }">
                                <thead>
                                    <tr>
                                        <th v-for="head3 in headers" v-bind:key="head3" id="tableHeader">
                                            <span>{{head3.text}}</span>
                                        </th>
                                    </tr>
                                </thead>
                            </template>
                            
                            
                        </v-data-table>
                    </v-card-text>

                    <v-card-text id="cardText" v-if="this.havingUpcomingCourses==0" style="margin-top:20px">
                        <v-simple-table>
                            <template v-slot:default>                        
                                <tbody id="simpleTable">
                                    <tr>
                                        <td>В данный момент нет предстоящих курсов</td>      
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card-text>
                    </v-card>

                    <v-card style="padding:20px; margin:50px; margin-top:20px; margin-bottom:0px" class="mx-auto">    
                    <!-- Информация о текущих курсах -->
                    <v-card-subtitle id="cardSubtitle">Текущие курсы</v-card-subtitle>

                    <v-card-text id="cardText" v-if="this.havingCurrentCourses==1">
                        
                        <v-data-table
                            :headers="coursesHeaders"
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
                            @click:row="showCurrentCourse"
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
                            
                            
                        </v-data-table>
                    </v-card-text>

                    <v-card-text id="cardText" v-if="this.havingCurrentCourses==0" style="margin-top:20px">
                        <v-simple-table>
                            <template v-slot:default>                        
                                <tbody id="simpleTable">
                                    <tr>
                                        <td>В данный момент курсы не проводятся</td>      
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
                            :headers="coursesHeaders"
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
                            @click:row="showFinishedCourse"
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
                        </v-data-table>
                    </v-card-text>
                    <v-card-text id="cardText" v-if="this.havingFinishedCourses==0" style="margin-top:20px">
                            <v-simple-table>
                                <template v-slot:default>                        
                                    <tbody id="simpleTable">
                                        <tr>
                                            <td>В данный момент еще нет завершённых курсов</td>      
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
                
                <div v-if="upcomingId==-1 && currentId ==-1 && finishedId ==-1">
                    <v-card style="padding:20px; margin:50px; margin-bottom:0px; padding-bottom:0px; margin-top:10px" class="mx-auto">
                    <v-card-title id="cardTitle">Добавление курса</v-card-title> 

                    
                   
                    <v-divider color="#000000"></v-divider>               
                    
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

                    <!-- Добавление дат проведения-->

                    <v-row >
                        <v-col cols=6 style="padding-top:0px;">
                            <v-menu
                            v-model="menu1"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width= "0px"
                            >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                v-model="menu1DateFormatted"
                                label="Дата начала"
                                persistent-hint
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                color="#2f1a54"
                                
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="newStart"
                                no-title
                                @input="menu1 = false"
                                color="#2f1a54"
                            ></v-date-picker>
                            </v-menu>
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

                    

                    <!-- Добавление стоимости и количества часов-->

                    <v-row>
                        <v-col cols=6>
                            <v-text-field
                                label="Стоимость"
                                v-model="newAmount"
                                color="#2f1a54"
                                clearable
                                prepend-icon="mdi-cash"
                            ></v-text-field>
                        </v-col>
                        <v-col cols=6>
                            <v-text-field
                                label="Количество часов"
                                v-model="newHours"
                                color="#2f1a54"
                                clearable
                                prepend-icon="mdi-clock"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    
                    <!-- Добавление формы обучения -->
                    
                    <v-row justify="center">
                        <v-radio-group
                            v-model="newForm"
                            row
                            >
                            <v-radio
                                label="Дистанционная форма обучения"
                                value="remote"
                                color="#4b2a86"
                            ></v-radio>
                            <v-radio
                                label="Очная форма обучения"
                                value="class"
                                color="#4b2a86"
                            ></v-radio>
                        </v-radio-group>
                    </v-row>

                    <!-- Добавление куратора-->

                    <v-row>
                        <v-col cols="12">
                            <v-select
                                color="#4b2a86"
                                :items="tutors.rows"
                                dense
                                outlined
                                label="Куратор курса"
                                hide-details
                                v-model="selectedTutor"
                                prepend-icon="mdi-teach"
                                item-text="name"
                                item-value="id"
                            >
                            </v-select>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                       <v-btn
                        class="tile-glow-right"
                        outlined
                        color="#2f1a54"
                        @click="addCourse(selectedTutor)"
                        >
                        Добавить курс
                        </v-btn>
                    </v-row>
                    
                </form>
                    </v-card-text>
                    </v-card>
                
                </div>
                <div v-if="upcomingId!=-1 || currentId !=-1 || finishedId !=-1">
                    <v-card style="padding:20px; margin:50px; margin-bottom:0px;  margin-top:10px" class="mx-auto">               
                        <v-card-title id="cardTitle">Изменение курса</v-card-title>          
                        <v-divider color="#000000"></v-divider>               
                    
                        <v-card-text>

                            <!-- Изменение курса-->

                            <v-row justify="right">
                                <v-col cols=12 id="closeInfo">
                                        <template>
                                            <v-btn 
                                                class="tile-glow-right2"
                                                text-color="#2f1a54" 
                                                color="white"                                       
                                                block
                                                @click="hideCourse()">
                                                Свернуть
                                            </v-btn>
                                        </template>
                                </v-col>
                            </v-row>
                            
                            <!-- Изменение предстоящего курса  -->
                            
                            <form style="padding:10px"   v-if="upcomingId!=-1">

                                <!-- Изменение названия-->

                                <v-row>
                                    <v-col cols=12>
                                        <v-text-field 
                                            label="Название"
                                            v-model="upcomingName"
                                            color="#2f1a54"
                                            clearable
                                            prepend-icon="mdi-pencil"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>

                                <!-- Изменение дат-->

                                <v-row >
                                    <v-col cols=6 style="padding-top:0px;">
                                        <v-menu
                                        v-model="menu3"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        min-width= "0px"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field 
                                                v-model="menu3DateFormatted"
                                                label="Дата начала"
                                                persistent-hint
                                                prepend-icon="mdi-calendar"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                                color="#2f1a54"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker
                                                v-model="upcomingStart"
                                                no-title
                                                @input="menu3 = false"
                                                color="#2f1a54"
                                            ></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col cols=6 style="padding-top:0px">
                                        <v-menu
                                        v-model="menu4"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        min-width= "0px"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field
                                                v-model="menu4DateFormatted"
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
                                                v-model="upcomingEnd"
                                                no-title
                                                @input="menu4 = false"
                                                color="#2f1a54"
                                            ></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                </v-row>

                                <!-- Изменение цены и количества часов-->

                                <v-row>
                                    <v-col cols=6>
                                        <v-text-field
                                            label="Стоимость"
                                            v-model="upcomingAmount"
                                            color="#2f1a54"
                                            clearable
                                            prepend-icon="mdi-cash"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols=6>
                                        <v-text-field
                                            label="Количество часов"
                                            v-model="upcomingHours"
                                            color="#2f1a54"
                                            clearable
                                            prepend-icon="mdi-clock"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>

                                <!-- Изменение формы обучения-->

                                <v-row justify="center">
                                    <v-radio-group
                                        v-model="upcomingForm"
                                        row
                                        >
                                        <v-radio
                                            label="Дистанционная форма обучения"
                                            value="remote"
                                            color="#4b2a86"
                                        ></v-radio>
                                        <v-radio
                                            label="Очная форма обучения"
                                            value="class"
                                            color="#4b2a86"
                                        ></v-radio>
                                    </v-radio-group>
                                </v-row>

                                <!-- Изменение куратора-->

                                <v-row>
                                    <v-col cols="12">
                                        <v-select
                                            color="#4b2a86"
                                            :items="tutors.rows"
                                            dense
                                            outlined
                                            label="Куратор курса"
                                            hide-details
                                            v-model="selectedTutor"
                                            prepend-icon="mdi-teach"
                                            item-text="name"
                                            item-value="id"
                                        >
                                        </v-select>
                                    </v-col>
                                </v-row>
                                <v-row justify="center">
                                <v-btn
                                    class="tile-glow-right"
                                    outlined
                                    color="#2f1a54"
                                    @click="editCourse(upcomingId, upcomingName, upcomingHours, upcomingAmount, upcomingForm, upcomingStart, upcomingEnd,selectedTutor)"
                                    >
                                    Изменить данные
                                    </v-btn>
                                <v-btn
                                    class="tile-glow-right"
                                    outlined
                                    color="#2f1a54"
                                    @click="deleteCourse(upcomingId)"
                                    >
                                    Удалить курс
                                    </v-btn>
                                </v-row>
                    
                            </form>

                            <!-- Изменение текущего курса  -->

                            <form style="padding:10px" v-if="currentId!=-1">

                                <!-- Изменение названия-->

                                <v-row>
                                    <v-col cols=12>
                                        <v-text-field 
                                            label="Название"
                                            v-model="currentName"
                                            color="#2f1a54"
                                            clearable
                                            prepend-icon="mdi-pencil"
                                            disabled
                                        ></v-text-field>
                                    </v-col>
                                </v-row>

                                <!-- Изменение дат-->

                                <v-row >
                                    <v-col cols=6 style="padding-top:0px;">
                                        <v-menu
                                        v-model="menu5"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        min-width= "0px"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field 
                                                v-model="menu5DateFormatted"
                                                label="Дата начала"
                                                persistent-hint
                                                prepend-icon="mdi-calendar"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                                color="#2f1a54"
                                                disabled
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker
                                                v-model="currentStart"
                                                no-title
                                                @input="menu5 = false"
                                                color="#2f1a54"
                                            ></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col cols=6 style="padding-top:0px">
                                        <v-menu
                                        v-model="menu6"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        min-width= "0px"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field
                                                v-model="menu6DateFormatted"
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
                                                v-model="currentEnd"
                                                no-title
                                                @input="menu6 = false"
                                                color="#2f1a54"
                                            ></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                </v-row>

                                <!-- Изменение цены и количества часов-->

                                <v-row>
                                    <v-col cols=6>
                                        <v-text-field
                                            label="Стоимость"
                                            v-model="currentAmount"
                                            color="#2f1a54"
                                            clearable
                                            prepend-icon="mdi-cash"
                                            disabled
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols=6>
                                        <v-text-field
                                            label="Количество часов"
                                            v-model="currentHours"
                                            color="#2f1a54"
                                            clearable
                                            prepend-icon="mdi-clock"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>

                                <!-- Изменение формы обучения-->

                                <v-row justify="center">
                                    <v-radio-group
                                        v-model="currentForm"
                                        row
                                        disabled
                                        >
                                        <v-radio
                                            label="Дистанционная форма обучения"
                                            value="remote"
                                            color="#4b2a86"
                                        ></v-radio>
                                        <v-radio
                                            label="Очная форма обучения"
                                            value="class"
                                            color="#4b2a86"
                                        ></v-radio>
                                    </v-radio-group>
                                </v-row>

                                <!-- Изменение куратора-->

                                <v-row>
                                    <v-col cols="12">
                                        <v-select
                                            color="#4b2a86"
                                            :items="tutors.rows"
                                            dense
                                            outlined
                                            label="Куратор курса"
                                            hide-details
                                            v-model="selectedTutor"
                                            prepend-icon="mdi-teach"
                                            item-text="name"
                                            item-value="id"
                                        >
                                        </v-select>
                                    </v-col>
                                </v-row>
                                <v-row justify="center">
                                <v-btn
                                    class="tile-glow-right"
                                    outlined
                                    color="#2f1a54"
                                    @click="editCourse(currentId, currentName, currentHours, currentAmount, currentForm, currentStart, currentEnd,selectedTutor)"
                                    >
                                    Изменить данные
                                    </v-btn>
                                </v-row>
                    
                            </form>


                             <!-- Изменение завершённого курса  -->

                            <form style="padding:10px" v-if="finishedId!=-1">

                                <!-- Изменение названия-->

                                <v-row>
                                    <v-col cols=12>
                                        <v-text-field 
                                            label="Название"
                                            v-model="finishedName"
                                            color="#2f1a54"
                                            clearable
                                            prepend-icon="mdi-pencil"
                                            disabled
                                        ></v-text-field>
                                    </v-col>
                                </v-row>

                                <!-- Изменение дат-->

                                <v-row >
                                    <v-col cols=6 style="padding-top:0px;">
                                        <v-menu
                                        v-model="menu7"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        min-width= "0px"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field 
                                                v-model="menu7DateFormatted"
                                                label="Дата начала"
                                                persistent-hint
                                                prepend-icon="mdi-calendar"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                                color="#2f1a54"
                                                disabled
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker
                                                v-model="finishedStart"
                                                no-title
                                                @input="menu7 = false"
                                                color="#2f1a54"
                                            ></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col cols=6 style="padding-top:0px">
                                        <v-menu
                                        v-model="menu8"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        min-width= "0px"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field
                                                v-model="menu8DateFormatted"
                                                label="Дата окончания"
                                                persistent-hint
                                                prepend-icon="mdi-calendar"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                                color="#2f1a54"
                                                disabled
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker
                                                v-model="finishedEnd"
                                                no-title
                                                @input="menu8 = false"
                                                color="#2f1a54"
                                            ></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                </v-row>

                                <!-- Изменение цены и количества часов-->

                                <v-row>
                                    <v-col cols=6>
                                        <v-text-field
                                            label="Стоимость"
                                            v-model="finishedAmount"
                                            color="#2f1a54"
                                            clearable
                                            prepend-icon="mdi-cash"
                                            disabled
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols=6>
                                        <v-text-field
                                            label="Количество часов"
                                            v-model="finishedHours"
                                            color="#2f1a54"
                                            clearable
                                            prepend-icon="mdi-clock"
                                            disabled
                                        ></v-text-field>
                                    </v-col>
                                </v-row>

                                <!-- Изменение формы обучения-->

                                <v-row justify="center">
                                    <v-radio-group
                                        v-model="finishedForm"
                                        row
                                        disabled
                                        >
                                        <v-radio
                                            label="Дистанционная форма обучения"
                                            value="remote"
                                            color="#4b2a86"
                                        ></v-radio>
                                        <v-radio
                                            label="Очная форма обучения"
                                            value="class"
                                            color="#4b2a86"
                                        ></v-radio>
                                    </v-radio-group>
                                </v-row>

                                <!-- Изменение куратора-->

                                <v-row>
                                    <v-col cols="12">
                                        <v-select
                                            color="#4b2a86"
                                            :items="tutors.rows"
                                            dense
                                            outlined
                                            label="Куратор курса"
                                            hide-details
                                            v-model="selectedTutor"
                                            prepend-icon="mdi-teach"
                                            item-text="name"
                                            item-value="id"
                                            disabled
                                        >
                                        </v-select>
                                    </v-col>
                                </v-row>
                    
                            </form>


                             <!-- Список слушателей -->
                            <v-card style="padding:20px; margin:50px; margin-top:20px; margin-bottom:0px" class="mx-auto">
                            <v-card-subtitle id="cardSubtitle">Слушатели</v-card-subtitle>

                            <!-- Основная информация -->
                            <v-card-text id="cardText" v-if="this.havingListeners==1 && upcomingCourseInfo" v-key="upcomingId">
                                <v-data-table
                                    :headers="listenersHeaders"
                                    :items="upcomingCourseInfo.rows"
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
                                                <th v-for="head6 in headers" v-bind:key="head6" id="tableHeader">
                                                    <span>{{head6.text}}</span>
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
                            

                            <!-- Основная информация -->
                            <v-card-text id="cardText" v-if="this.havingListeners==1 && courseInfo" v-key="currentId">
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
                                                <th v-for="head7 in headers" v-bind:key="head7" id="tableHeader">
                                                    <span>{{head7.text}}</span>
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

                            <!-- Основная информация -->
                            <v-card-text id="cardText" v-if="this.havingListeners==1 && finishedCourseInfo" v-key="finishedId">
                                <v-data-table
                                    :headers="listenersHeaders"
                                    :items="finishedCourseInfo.rows"
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
                                                <th v-for="head2 in headers" v-bind:key="head2" id="tableHeader">
                                                    <span>{{head2.text}}</span>
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

                            <!-- Если нет слушателей-->

                            <v-card-text id="cardText" v-if="this.havingListeners==0">
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
                        </v-card-text>
                    
                       
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
            row: null,
            courseType: 0,
            dialog: false,
            dialogText: null,
            selectedTutor: null,
            tutors: null,
            menu2: false,
            menu1: false,
            menu3:null,
            menu4: null,
            menu5: false,
            menu6: false,
            menu7:null,
            menu8: null,
            currentCourses: null,
            finishedCourses: null,
            upcomingCourses: null,
            havingCurrentCourses: 0,
            havingFinishedCourses: 0,
            havingUpcomingCourses: 0,
            havingListeners: 0,
            courseInfo: null,
            upcomingCourseInfo: null,
            finishedCourseInfo: null,
            newName: null,
            newStart: null,
            newEnd: null,
            newAmount: null,
            newHours: null,
            newForm: null,
            upcomingId: -1,
            upcomingName: null,
            upcomingStart: null,
            upcomingEnd: null,
            upcomingAmount: null,
            upcomingHours: null,
            upcomingForm: null,
            currentId: -1,
            currentName: null,
            currentStart: null,
            currentEnd: null,
            currentAmount: null,
            currentHours: null,
            currentForm: null,
            finishedId: -1,
            finishedName: null,
            finishedStart: null,
            finishedEnd: null,
            finishedAmount: null,
            finishedHours: null,
            finishedForm: null,
            coursesHeaders: [
                { text: 'Наименование курса', value: 'name', align: 'center' },
                { text: 'Дата начала', value: 'start_date', align: 'center' },
                { text: 'Дата окончания', value: 'end_date', align: 'center' },
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
        //allowedEndDates: val => ["2022-05-03", "2022-05-25"].indexOf(val) !== -1,
        showDialog() {
            this.dialog = true;
            setTimeout(() => (this.dialog = false), 4000)
        },
        hideCourse () {
            this.currentId = -1,
            this.upcomingId = -1,
            this.finishedId = -1
        },
        addCourse: function (id) {
            let fullURL = '/courses/addCourse'
            
            this.axios.post(fullURL, {
              name: this.newName,
              hours: this.newHours,
              price: this.newAmount,
              form: this.newForm,
              start_date: this.newStart,
              end_date: this.newEnd,
              tutor_id: id,
              program: "",
              schedule: "",
            })
            .then((responce) => {
              this.results = responce.data
              this.getUpcomingCourses()
              this.getCurrentCourses()
              this.getFinishedCourses() 
              this.newName = ''
              this.newHours = ''
              this.newAmount = ''
              this.newForm = ''
              this.newStart = ''
              this.newEnd = ''
              this.selectedTutor = null, 
              this.dialogText = "Курс добавлен";
              this.showDialog();
            })
            .catch((error) => {
              this.dialogText = "Ошибка";
              this.showDialog();
              this.errors = error.data.detail
            })          
            
        },
        editCourse (id, name, hours, price, form, start_date, end_date, tutor_id) {
            let fullURL = '/courses/editCourse'
            this.axios.post(fullURL, {
              id: id,
              name: name,
              hours: hours,
              price: price,
              form: form,
              start_date: start_date,
              end_date: end_date,
              tutor_id: tutor_id,
              program: "",
              schedule: "",
            })
            .then((responce) => {
              this.getUpcomingCourses()
              this.getCurrentCourses()
              this.getFinishedCourses() 
              this.results = responce.data;
              this.dialogText = "Данные курса изменены";
              this.showDialog();
              this.getUsers();
            })
            .catch((error) => {
              alert(error.data.detail)
              this.dialogText = "Ошибка";
              this.showDialog();
              this.errors = error.data.detail
            })            
        },
        deleteCourse (id) {
            let fullURL = '/courses/deleteCourse/'+id+'/'
            this.axios.delete(fullURL)
            .then((responce) => {
              this.upcomingId = -1
              this.upcomingName = null
              this.courseType = null
              this.upcomingStart = null
              this.upcomingEnd = null
              this.upcomingAmount = null
              this.upcomingHours = null
              this.upcomingForm = null
              this.selectedTutor = null
              this.getUpcomingCourses()
              this.getCurrentCourses()
              this.getFinishedCourses() 
              this.dialogText = "Курс успешно удалён";
              this.showDialog();
              this.results = responce.data;
              
            })
            .catch((error) => {
              alert(error.data.detail)
              this.dialogText = "Ошибка";
              this.showDialog();
              this.errors = error.data.detail
            })            
        },
        getUpcomingCourses: function () {
            let fullURL = '/courses/getUpcomingCourses'
            this.axios.get(fullURL)
            .then((responce) => {
              this.upcomingCourses = responce.data;
              this.havingUpcomingCourses = 1;
            })
            .catch((error) => {
              this.havingUpcomingCourses = 0;
              this.upcomingCourses=null;
              this.errors = error.data.detail
            })  
        },
        getCurrentCourses: function () {
            let fullURL = '/courses/getCurrentCourses'
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
            let fullURL = '/courses/getFinishedCourses'
            this.axios.get(fullURL)
            .then((responce) => {
              this.finishedCourses = responce.data;
              this.havingFinishedCourses = 1;
            })
            .catch((error) => {
              this.havingCurrentCourses = 0;
              this.finishedCourses=null;
              this.errors = error.data.detail
            })  
        },
        showUpcomingCourse (list) {
            this.currentId = -1
            this.finishedId = -1
            this.newIsShow = false
            this.upcomingId = list.id
            this.upcomingName = list.name
            this.courseType = 0
            this.upcomingStart = this.editDate(list.start_date)
            this.upcomingEnd = this.editDate(list.end_date)
            this.upcomingAmount = list.price
            this.upcomingHours = list.hours
            this.upcomingForm = list.form
            this.selectedTutor = list.tutor_id
            if (this.upcomingId!=-1){
                let fullURL = '/listeners_courses/getCountListenerCourseByCourse/'+this.upcomingId+'/'
                this.axios.get(fullURL)
                    .then((responce1) => {
                        if(responce1.data.rows[0].listeners_count != 0)
                        {
                            let fullURL = '/listeners_courses/getListenerCourseByCourse/'+this.upcomingId+'/'
                            this.axios.get(fullURL)
                                .then((responce) => {
                                    this.upcomingCourseInfo = responce.data;
                                    this.havingListeners = 1;
                                    this.courseInfo=null;
                                    this.finishedCourseInfo=null;
                                })
                                .catch((error) => {
                                    this.errors = error
                                })
                        }
                        else {
                            this.upcomingCourseInfo=null;
                            this.courseInfo=null;
                            this.finishedCourseInfo=null;
                            this.havingListeners = 0;
                        }
                    })
                    .catch((error) => {
                    this.errors = error
                })
                
            }    
        },

        showCurrentCourse (list) {
            this.upcomingId = -1
            this.finishedId = -1
            this.newIsShow = false
            this.currentId = list.id
            this.currentName = list.name
            this.courseType = 1
            this.currentStart = this.editDate(list.start_date)
            this.currentEnd = this.editDate(list.end_date)
            this.currentAmount = list.price
            this.currentHours = list.hours
            this.currentForm = list.form
            this.selectedTutor = list.tutor_id
            if (this.currentId!=-1){
                let fullURL = '/listeners_courses/getCountListenerCourseByCourse/'+this.currentId+'/'
                this.axios.get(fullURL)
                    .then((responce1) => {
                        if(responce1.data.rows[0].listeners_count != 0)
                        {
                            let fullURL = '/listeners_courses/getListenerCourseByCourse/'+this.currentId+'/'
                            this.axios.get(fullURL)
                                .then((responce) => {
                                    this.courseInfo = responce.data;
                                    this.havingListeners = 1;
                                    this.upcomingCourseInfo=null;
                                    this.finishedCourseInfo=null;
                                })
                                .catch((error) => {
                                    this.errors = error
                                })
                        }
                        else {
                            this.upcomingCourseInfo=null,
                            this.courseInfo=null,
                            this.finishedCourseInfo=null,
                            this.havingListeners = 0
                        }
                    })
                    .catch((error) => {
                    this.errors = error
                })
                
            }    
        },

        showFinishedCourse (list) {
            this.currentId = -1
            this.upcomingId = -1
            this.newIsShow = false
            this.finishedId = list.id
            this.finishedName = list.name
            this.finishedype = 0
            this.finishedStart = this.editDate(list.start_date)
            this.finishedEnd = this.editDate(list.end_date)
            this.finishedAmount = list.price
            this.finishedHours = list.hours
            this.finishedForm = list.form
            this.selectedTutor = list.tutor_id
            if (this.finishedId!=-1){
                let fullURL = '/listeners_courses/getCountListenerCourseByCourse/'+this.finishedId+'/'
                this.axios.get(fullURL)
                    .then((responce1) => {
                        if(responce1.data.rows[0].listeners_count != 0)
                        {
                            let fullURL = '/listeners_courses/getListenerCourseByCourse/'+this.finishedId+'/'
                            this.axios.get(fullURL)
                                .then((responce) => {
                                    this.finishedCourseInfo = responce.data;
                                    this.havingListeners = 1;
                                    this.courseInfo=null;
                                    this.upcomingCourseInfo=null;
                                })
                                .catch((error) => {
                                    this.errors = error
                                })
                        }
                        else {
                            this.upcomingCourseInfo=null,
                            this.courseInfo=null,
                            this.finishedCourseInfo=null,
                            this.havingListeners = 0
                        }
                    })
                    .catch((error) => {
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
        
            
        },
        getTutors: function () {
            let fullURL = '/users/getTutors'
            this.axios.get(fullURL)
            .then((responce) => {
              this.tutors = responce.data;
            })
            .catch((error) => {
              this.errors = error.data.detail
            })  
        },
        editDate(ddate){
            const [day, month, year] = ddate.split('.')
            return `${year}-${month}-${day}`
        }, 
        checkCourseType(start, end){
            var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
            const [day, month, year] = start.split('.')
            var start2 = `${year}/${month}/${day}`
            const [day2, month2, year2] = end.split('.')
            var end2 = `${year2}/${month2}/${day2}`
            if (end2 < utc) return 2;
            else if (start2 <= utc) return 1;
            else if (start2 > utc) return 0;
        },
        
    },
    computed: {
        menu1DateFormatted () {
            return this.formatDate(this.newStart)
        },
        menu2DateFormatted () {
            return this.formatDate(this.newEnd)
        },
        menu3DateFormatted () {
            return this.formatDate(this.upcomingStart)
        },
        menu4DateFormatted () {
            return this.formatDate(this.upcomingEnd)
        },
        menu5DateFormatted () {
            return this.formatDate(this.currentStart)
        },
        menu6DateFormatted () {
            return this.formatDate(this.currentEnd)
        },
        menu7DateFormatted () {
            return this.formatDate(this.finishedStart)
        },
        menu8DateFormatted () {
            return this.formatDate(this.finishedEnd)
        },
    },

    mounted () {
        this.getUpcomingCourses()
        this.getCurrentCourses()
        this.getFinishedCourses()
        this.getTutors()
    }
}
</script>

<style lang="css" scoped>
#closeInfo{
   text-align:end; 
   padding-top:10px; 
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
        color: #2f1a54;
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
.tile-glow-right{
    margin:20px;
}
.tile-glow-right:hover, .tile-glow-right2:hover{
   box-shadow: 0 0 10px #2f1a54;
   transition-duration: 0.3s;
}
  
</style>