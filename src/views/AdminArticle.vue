<template>
    <v-app>
        <v-content>
            <v-container fluid>
                <v-row justify="center">
                    <!-- Search Feature -->
                    <v-col class="text-center" cols="10">
                        <v-text-field
                            outlined
                            v-model="searchArticle"
                            append-icon="mdi-magnify"
                            label="Cari Artikel"
                        ></v-text-field>
                    </v-col>
                    <!-- List Artikel -->
                    <v-col class="text-center" cols="10">
                        <v-data-table
                            :headers="articleHeaders"
                            :items="articles"
                            :search="searchArticle"
                            v-if="!$vuetify.breakpoint.smAndDown"
                        >
                            <template v-slot:item.actions="{ item }">
                                <v-icon class="mr-4" @click.stop="editItem(item)">mdi-pencil</v-icon>
                                <v-icon @click.stop="confirmDelete(item)">mdi-delete</v-icon>
                            </template>
                        </v-data-table>
                        <v-data-table
                            v-else
                            :headers="articleHeaders"
                            :items="articles"
                            :search="searchArticle"
                            :disable-sort="true"
                            class="mt-n10"
                        >
                            <template v-slot:item="{ item }">
                                <v-card class="mt-1 mb-3 mx-2 pa-2" color="grey lighten-2" outlined>
                                    <div class="d-flex flex-no-wrap justify-space-between align-center">
                                        <div><v-card-title class="text-left body-2 mt-n2">{{item.title}}</v-card-title></div>
                                        <div class="mt-n2 mr-n2">
                                            <v-menu
                                                :close-on-click="true"
                                                :close-on-content-click="true"
                                                :offset-y="true"
                                            >
                                                <template v-slot:activator="{ on }">
                                                    <v-card-actions><v-icon v-on="on">mdi-dots-vertical</v-icon></v-card-actions>
                                                </template>
                                                <v-list>
                                                    <v-list-item @click.stop="editItem(item)">
                                                        <v-list-item-title>Edit</v-list-item-title>
                                                    </v-list-item>
                                                    <v-list-item @click.stop="confirmDelete(item)">
                                                        <v-list-item-title>Hapus</v-list-item-title>
                                                    </v-list-item>
                                                </v-list>
                                            </v-menu>
                                        </div>
                                    </div>
                                </v-card>
                            </template>
                        </v-data-table>
                    </v-col>
                    <!-- add -->
                    <v-btn fab dark large color="#C0392B" fixed left bottom @click="addDialogFunction">
                        <v-icon dark>mdi-plus</v-icon>
                    </v-btn>
                    <v-dialog v-model="addDialog" persistent max-width="1100px">
                        <v-card>
                            <v-toolbar dense flat>
                                <span class="title font-weight-light">Tambah Artikel</span>
                                <v-btn absolute right icon @click="close"><v-icon>mdi-close</v-icon></v-btn>
                            </v-toolbar>
                            <v-form ref="form">
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field
                                                outlined
                                                v-model="article.title"
                                                label="Judul Artikel"
                                                :rules="rules.title"
                                                counter
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" class="mt-n6">
                                            <vue-editor :editorToolbar="customToolbar" placeholder="Konten" v-model="article.content"></vue-editor>
                                        </v-col>
                                        <v-col cols="12" md="8" lg="8" class="mx-auto">
                                            <file-pond
                                                :allowDrop="!loadingState"
                                                :allowBrowse="!loadingState"
                                                style="cursor: pointer"
                                                name="test"
                                                ref="pond"
                                                label-idle="<span class='filepondFormatText'>Upload Gambar </span><span class='filepondFormatText'>Format: JPG/PNG</span>"
                                                v-bind:files="myFiles"
                                                instant-upload="false"
                                                v-on:updatefiles="handleFilePondUpdateFile"
                                                labelInvalidField="remove"
                                                allow-multiple="true"
                                                accepted-file-types="image/*"
                                                fileValidateTypeLabelExpectedTypes="Hanya menerima format JPG dan PNG"
                                            />
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-form>
                            <v-card-actions>
                                <v-container>
                                    <v-row justify="center">
                                        <v-btn :disabled="buttonStatus" large class="my-n8" color="blue darken-1 white--text" @click="add">
                                            <span v-if="loadingState">
                                                <v-progress-circular size="20" :indeterminate="loadingState"></v-progress-circular>
                                            </span>
                                            <span v-else>Buat</span>
                                        </v-btn>
                                    </v-row>
                                </v-container>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <!-- Update -->
                    <v-dialog v-model="editDialog" persistent max-width="1100px">
                        <v-card>
                            <v-toolbar dense flat>
                                <span class="title font-weight-light">Edit Artikel</span>
                                <v-btn absolute right icon @click="close"><v-icon>mdi-close</v-icon></v-btn>
                            </v-toolbar>
                            <v-form ref="form">
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field
                                                outlined
                                                v-model="article.title"
                                                label="Judul Artikel"
                                                :rules="rules.title"
                                                counter
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" class="mt-n6">
                                            <vue-editor :editorToolbar="customToolbar" placeholder="Konten" v-model="article.content"></vue-editor>
                                        </v-col>
                                        <v-col cols="12" md="8" lg="8" class="mx-auto">
                                            <file-pond
                                                :allowDrop="!loadingState"
                                                :allowBrowse="!loadingState"
                                                style="cursor: pointer"
                                                name="test"
                                                ref="pond"
                                                label-idle="<span class='filepondFormatText'>Upload Gambar </span><span class='filepondFormatText'>Format: JPG/PNG</span>"
                                                v-bind:files="myFiles"
                                                instant-upload="false"
                                                v-on:updatefiles="handleFilePondUpdateFile"
                                                labelInvalidField="remove"
                                                allow-multiple="true"
                                                accepted-file-types="image/*"
                                                fileValidateTypeLabelExpectedTypes="Hanya menerima format JPG dan PNG"
                                            />
                                        </v-col>
                                        <v-col cols="12">
                                            <v-expansion-panels v-model="panel" flat hover>
                                                <v-expansion-panel>
                                                    <v-expansion-panel-header>Gambar</v-expansion-panel-header>
                                                    <v-expansion-panel-content>
                                                        <v-row align="center">
                                                            <v-col cols="12" sm="12" md="4" v-for="(img, idx) in article.img" :key="idx">
                                                                <v-card>
                                                                    <v-img :src=img :lazy-src=img height="300px">
                                                                        <template v-slot:placeholder>
                                                                            <v-row
                                                                                class="fill-height ma-0"
                                                                                align="center"
                                                                                justify="center"
                                                                            >
                                                                                <v-progress-circular indeterminate color="black"></v-progress-circular>
                                                                            </v-row>
                                                                        </template>
                                                                        <v-col cols="12" class="text-right"><v-btn icon class="red--text" style="background-color:rgba(255,255,255,.5)" small @click="moveTrash(img)"><v-icon>mdi-close</v-icon></v-btn></v-col>
                                                                    </v-img>
                                                                </v-card>
                                                            </v-col>
                                                        </v-row>
                                                    </v-expansion-panel-content>
                                                </v-expansion-panel>
                                            </v-expansion-panels>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-form>
                            <v-card-actions>
                                <v-container>
                                    <v-row justify="center">
                                        <v-btn :disabled="buttonStatus" large class="my-n8" color="blue darken-1 white--text" @click="update">
                                            <span v-if="loadingState">
                                                <v-progress-circular size="20" :indeterminate="loadingState"></v-progress-circular>
                                            </span>
                                            <span v-else>Simpan</span>
                                        </v-btn>
                                    </v-row>
                                </v-container>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-row>
            </v-container>
        </v-content>
        <v-dialog persistent v-model="confirmDeleteDialog" width="500px">
            <v-card>
                <v-card-title>Konfirmasi</v-card-title>
                <v-card-text>Apakah Anda Yakin ingin menghapus ini?</v-card-text>
                <v-card-actions>
                    <v-container>
                        <v-row justify="center">
                            <v-btn :disabled="loadingState" class="mt-n5" color="red darken-1" text @click="close">Tidak</v-btn>
                            <v-btn :disabled="loadingState" class="mt-n5" color="blue darken-1" text @click="deleteItem">Ya</v-btn>
                        </v-row>
                    </v-container>
                </v-card-actions>
                    <v-progress-linear v-if="loadingState" color="red" :indeterminate="loadingState"></v-progress-linear>
            </v-card>
        </v-dialog>
        <v-snackbar
            v-model="snackbar"
            multi-line
            v-bind:color="snackbarColor"
        >
            {{ snackbarMessage }}
            <v-btn
                text
                @click="snackbar = false"
            >
            </v-btn>
        </v-snackbar>
    </v-app>
</template>

<script>

import {db} from '../firebase'
import moment from 'moment'
import firebase from 'firebase';
import {VueEditor} from 'vue2-editor'
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import _ from 'lodash'

const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginFileValidateSize
)

export default {
    name:'DashboardArticle',
    components: {
        VueEditor,
        FilePond
    },
    data() {
        return{
            snackbar: false,
            snackbarMessage: '',
            snackbarColor: '',
            searchArticle:'',
            articleHeaders: [
                {value:'title', text:'Judul', width:'80%'},
                {value:'actions', width:'10%'}
            ],
            articles:[],
            article:{
                id:'',
                title:'',
                content:'',
                date:moment().format('DD/MM/YYYY'),
                time:moment().format('HH:mm:ss'),
                img:[],
                created:firebase.firestore.FieldValue.serverTimestamp(),
                modified:firebase.firestore.FieldValue.serverTimestamp(),

            },
            articleDefault:{
                id:'',
                title:'',
                content:'',
                date:moment().format('DD/MM/YYYY'),
                time:moment().format('HH:mm:ss'),
                img:[],
                created:firebase.firestore.FieldValue.serverTimestamp(),
                modified:firebase.firestore.FieldValue.serverTimestamp(),
            },
            myFiles:[],
            tempDeletedImg:[],
            customToolbar: [
                [{ 'header': [false, 1, 2, 3, 4, 5, 6, ] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],
                [{ 'indent': '-1'}, { 'indent': '+1' }],
                [{ 'color': [] }, { 'background': [] }],
                ['link'],
                [{ 'direction': 'rtl' }],
                ['clean'],
            ],
            selectedImg: -1,
            selectedIndex: -1,
            panel:1,
            loadingState: false,
            addDialog: false,
            editDialog: false,
            confirmDeleteDialog:false,
            rules: {
                title: [
                    v => !!v || 'Judul Harus Diisi',
                    v => v.length>39 || 'Minimal 40 Karakter'
                ],
            }
        }
    },
    mounted(){
        if(this.uid) {
            this.$router.push('/DashboardArticle')
        } else {
            this.$router.push('/loginAdmin')
        }
        this.get()
    },
    methods: {
        handleFilePondUpdateFile(files) {
            this.myFiles = files.map(files => files.file);
        },
        close() {
            this.article = _.cloneDeep(this.articleDefault)
            this.addDialog = false
            this.editDialog = false
            this.confirmDeleteDialog = false
            this.tempDeletedImg = []
            this.myFiles = []
            this.selectedImg = -1
            this.selectedIndex = -1
            this.panel = 1
        },
        moveTrash(img) {
            this.selectedImg = this.article.img.indexOf(img)
            this.tempDeletedImg.push(img)
            this.article.img.splice(this.selectedImg, 1)
        },
        addDialogFunction() {
            this.addDialog = true
        },
        editItem(item) {
            this.selectedIndex = this.articles.indexOf(item)
            this.article = _.cloneDeep(item)
            this.editDialog = true
        },
        addImage(imageFile) {
            return new Promise((resolve, reject) => {
                var storageRef = firebase.storage().ref('article/'+Math.random() + '_'  + imageFile.name)
                storageRef.put(imageFile)
                .then((snapshot) => {
                    resolve(snapshot.ref.getDownloadURL())
                })
                .catch((err) => {
                    reject(err)
                })
            })
        },
        deleteImage(imageFile) {
            return new Promise((resolve, reject) => {
                let image = firebase.storage().refFromURL(imageFile)
                image.delete()
                .then(() => {
                    resolve()
                }) .catch((err) => {
                    reject(err)
                })
            })
        },
        confirmDelete(item) {
            this.selectedIndex = this.articles.indexOf(item)
            this.article = _.cloneDeep(item)
            this.article.img.forEach(e => {
                this.tempDeletedImg.push(e)
            });
            this.confirmDeleteDialog = true
        },
        // Firebase API
        async deleteItem() {
            this.loadingState = true
            for(let i=0; i<this.tempDeletedImg.length; i++) {
                await this.deleteImage(this.tempDeletedImg[i])
                    .then((response) => {
                        console.log(response)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
            db.collection("article")
                .doc(this.article.id)
                .delete()
                .then(() => {
                    this.snackbarMessage = 'Berhasil Dihapus'
                    this.snackbarColor = 'success'
                }) .catch(() => {
                    this.snackbarMessage = 'Gagal Dihapus'
                    this.snackbarColor = 'error'
                }) .finally(() => {
                    this.snackbar = true
                    this.get()
                    this.loadingState = false
                    this.close()
                })
        },
        async update() {
            if(this.$refs.form.validate()) {
                this.loadingState = true
                for(let i=0; i<this.myFiles.length; i++) {
                    await this.addImage(this.myFiles[i])
                        .then((response) => {
                            this.article.img.push(response)
                        })
                        .catch(() => {
                            console.log("gagal")
                        })
                }
                for(let i=0; i<this.tempDeletedImg.length; i++) {
                    await this.deleteImage(this.tempDeletedImg[i])
                        .then((response) => {
                            console.log(response)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
                db.collection("article")
                    .doc(this.article.id)
                    .update({
                        title:this.article.title,
                        content:this.article.content,
                        date:this.article.date,
                        time:this.article.time,
                        img:this.article.img,
                        created:this.article.created,
                        modified: firebase.firestore.FieldValue.serverTimestamp()
                    })
                    .then(() => {
                        this.snackbarMessage = 'Berhasil Diperbaharui'
                        this.snackbarColor = 'success'
                    })
                    .catch(() => {
                        this.snackbarMessage = 'Gagal Diperbaharui'
                        this.snackbarColor = 'error'
                    })
                    .finally(() => {
                        this.snackbar = true
                        this.close()
                        this.get()
                        this.loadingState = false
                    })
            }
        },
        async add() {
            if(this.$refs.form.validate()) {
                this.loadingState = true
                // push ke object article
                for(let i=0; i<this.myFiles.length; i++) {
                    await this.addImage(this.myFiles[i])
                        .then((response) => {
                            this.article.img.push(response)
                        })
                        .catch(() => {
                            console.log("gagal")
                        })
                }
            db.collection('article')
                .add({
                    title:this.article.title,
                    content:this.article.content,
                    date:this.article.date,
                    time:this.article.time,
                    img:this.article.img,
                    created:firebase.firestore.FieldValue.serverTimestamp(),
                    modified: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then((docRef) => {
                    console.log("Document successfully written!, ID: ", docRef.id);
                    this.snackbarMessage = 'Berhasil Dibuat'
                    this.snackbarColor = 'success'
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                    this.snackbarMessage = 'Gagal Dibuat'
                    this.snackbarColor = 'error'
                })
                .finally(() => {
                    this.snackbar = true
                    this.close()
                    this.get()
                    this.loadingState = false
                })
            }
        },
        get() {
            let articles = []
            db.collection('article')
                .orderBy('created','desc')
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        articles.push({
                            id:doc.id,
                            title:doc.data().title,
                            content:doc.data().content,
                            date:doc.data().date,
                            time:doc.data().time,
                            img:doc.data().img,
                            created:doc.data().created,
                            modified: doc.data().modified
                        })
                    });
                }) .finally(() => {
                    
                    this.articles = articles
                })
        }
    },
    computed: {
        uid() {
            return this.$store.state.uid
        },
        buttonStatus() {
            if(this.loadingState) {
                return true
            } else {
                for(let i=0; i<this.myFiles.length; i++) {
                    if(this.myFiles[i]['type'] === 'image/png' || this.myFiles[i]['type'] === 'image/jpeg' || this.myFiles[i]['type'] === 'image/jpg') {
                        return false
                    } else {
                        return true
                    }
                }
            }
            return false
        }
    }
}
</script>

<style>
.filepond--file-action-button {
    cursor: pointer;
}
.filepond--drop-label {
    color: white;
}
.filepond--panel-root {
    background-color: rgba(31, 31, 31, 0.8);
}
.filepond--file-action-button {
    background-color: white;
    color: red;
}
.filepond--item-panel {
    background-color: green;
}
.filepondFormatText {
    font-size: 12px !important;
    display: block;
}
.v-dialog > .v-card > .v-toolbar {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>