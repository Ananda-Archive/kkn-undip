<template>
    <v-app>
        <v-content>
            <v-container fluid>
                <v-row justify="center">
                    <!-- Search Feature -->
                    <v-col class="text-center" cols="10">
                        <v-text-field
                            outlined
                            v-model="searchUsaha"
                            append-icon="mdi-magnify"
                            label="Cari Nama Pemilik / Usaha"
                        ></v-text-field>
                    </v-col>
                    <v-col class="mt-n8 mb-n4" cols="10">
                        <v-row justify="end" no-gutters>
                            <v-col cols="12" md="4">
                                <v-select
                                    :items="selected"
                                    label="Status"
                                    outlined
                                    dense
                                    v-model="filterSelected"
                                    item-text="val"
                                    item-value="id"
                                    :clearable="true"
                                    @click:clear="filterSelected = ''"
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-col>
                    <!-- List UMKM -->
                    <v-col class="text-center" cols="10">
                        <v-data-table
                            :headers="umkmHeaders"
                            :items="umkms"
                            :search="searchUsaha"
                            v-if="$vuetify.breakpoint.smAndDown"
                        >
                            <template v-slot:item="{ item }">
                                <v-card class="mt-1 mb-3 mx-2 pa-2" color="grey lighten-2" outlined>
                                    <v-card-title class="body-2">{{item.companyName}}</v-card-title>
                                    <v-card-subtitle class="text-left">{{item.name}}</v-card-subtitle>
                                </v-card>
                            </template>
                        </v-data-table>
                        <v-data-table
                            :headers="umkmHeaders"
                            :items="umkms"
                            :search="searchUsaha"
                            style="cursor: pointer"
                            v-else
                        >
                        <template v-slot:item.actions="{ item }">
                            <v-icon class="mr-4" @click.stop="editItem(item)">mdi-pencil</v-icon>
                            <v-icon @click.stop="confirmDelete(item)">mdi-delete</v-icon>
                        </template>
                        </v-data-table>
                    </v-col>
                    <!-- Edit -->
                    <v-dialog v-model="editDialog" persistent max-width="1200px">
                        <v-card>
                            <template slot="progress">
                                <v-progress-linear height="8" color="red" indeterminate></v-progress-linear>
                            </template>
                            <v-toolbar dense flat>
                                <span class="title font-weight-light">Edit UMKM</span>
                                <v-btn absolute right icon @click="close"><v-icon>mdi-close</v-icon></v-btn>
                            </v-toolbar>
                            <v-form ref="form">
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-row justify="end">
                                                <v-col cols="6">
                                                    <v-select
                                                        v-model="umkm.status"
                                                        class="mb-n6"
                                                        dense
                                                        outlined
                                                        :items="selected"
                                                        item-text="val"
                                                        item-value="id"
                                                    >
                                                    </v-select>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                        <v-col cols="12" md="6" lg="6">
                                            <v-text-field
                                                v-model="umkm.name"
                                                outlined
                                                dense
                                                label="Nama (Sesuai Dengan KTP)"
                                                :rules="rules.name"
                                                class="mb-n6"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="6" lg="6">
                                            <v-menu
                                                v-model="datePickerMenu"
                                                :close-on-content-click="false"
                                                :nudge-right="40"
                                                transition="scale-transition"
                                                offset-y
                                                min-width="290px"
                                            >
                                                <template v-slot:activator="{on,attrs}">
                                                    <v-text-field
                                                        v-model="umkm.date"
                                                        label="Tanggal Lahir"
                                                        outlined
                                                        dense
                                                        readonly
                                                        v-bind="attrs"
                                                        v-on="on"
                                                        class="mb-n6"
                                                    ></v-text-field>
                                                </template>
                                                <v-date-picker v-model="umkm.date" @input="datePickerMenu = false"></v-date-picker>
                                            </v-menu>
                                        </v-col>
                                        <v-col cols="12" md="6" lg="6">
                                            <v-text-field
                                            v-model="umkm.companyName"
                                                outlined
                                                dense
                                                label="Nama Usaha"
                                                :rules="rules.companyName"
                                                class="mb-n6"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="6" lg="6">
                                            <v-text-field
                                                v-model="umkm.nomorUsaha"
                                                outlined
                                                dense
                                                label="Nomor Izin Usaha"
                                                :rules="rules.nomorUsaha"
                                                class="mb-n6"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-textarea
                                                outlined
                                                label="Alamat Usaha"
                                                :auto-grow="true"
                                                :rows="1"
                                                v-model="umkm.address"
                                                :rules="rules.address"
                                                class="mb-n6"
                                            ></v-textarea>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-textarea
                                                outlined
                                                counter
                                                label="Deskripsi Usaha"
                                                :auto-grow="true"
                                                :rows="1"
                                                v-model="umkm.desc"
                                                :rules="rules.desc"
                                                class="mb-n6"
                                            ></v-textarea>
                                        </v-col>
                                        <v-col cols="12" md="8" lg="8" class="mx-auto">
                                            <file-pond
                                                :allowDrop="!loadingState"
                                                :allowBrowse="!loadingState"
                                                style="cursor: pointer"
                                                name="test"
                                                ref="pond"
                                                label-idle="<span class='filepondFormatText'>Upload Gambar Produk atau Tempat Usaha (maksimal 7) </span><span class='filepondFormatText'>Format: JPG/PNG</span>"
                                                v-bind:files="myFiles"
                                                instant-upload="false"
                                                v-on:updatefiles="handleFilePondUpdateFile"
                                                labelInvalidField="remove"
                                                allow-multiple="true"
                                                accepted-file-types="image/*"
                                                fileValidateTypeLabelExpectedTypes="Hanya menerima format JPG dan PNG"
                                                maxFiles="7"
                                            />
                                        </v-col>
                                        <v-col cols="12">
                                            <v-expansion-panels v-model="panel" flat hover>
                                                <v-expansion-panel>
                                                    <v-expansion-panel-header>Gambar</v-expansion-panel-header>
                                                    <v-expansion-panel-content>
                                                        <v-row align="center">
                                                            <v-col cols="12" sm="12" md="4" v-for="(img, idx) in umkm.img" :key="idx">
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
                                        <v-btn :disabled="buttonStatus" large class="my-n11" color="blue darken-1 white--text" @click="updateItem">
                                            <span v-if="loadingState">
                                                <v-progress-circular size="20" :indeterminate="loadingState"></v-progress-circular>
                                            </span>
                                            <span v-else>Update</span>
                                        </v-btn>
                                    </v-row>
                                </v-container>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <!-- Delete -->
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
import firebase from 'firebase';
import _ from 'lodash'
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';

const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginFileValidateSize
)

export default {
    name: 'Dashboard',
    components: {
      FilePond
    },
    data() {
        return {
            confirmDeleteDialog: false,
            loadingState: false,
            snackbar: false,
            snackbarMessage: '',
            snackbarColor: '',
            selected:[
                {id:1,val:'Belum Terdaftar'},
                {id:2,val:'Terdaftar'}
            ],
            umkms: [],
            unregisteredUmkms: [],
            registeredUmkms: [],
            umkm: {
                name:'',
                date: '',
                registerDate: '',
                nomorUsaha:'',
                address:'',
                companyName:'',
                desc:'',
                status:null,
                img:[]
            },
            umkmDefault: {
                name:'',
                date: '',
                registerDate: '',
                nomorUsaha:'',
                address:'',
                companyName:'',
                desc:'',
                status:null,
                img:[]
            },
            tempDeletedImg: [],
            myFiles:[],
            searchUsaha:'',
            filterSelected:null,
            selectedIndex:-1,
            selectedImg:-1,
            datePickerMenu: false,
            rules: {
                name: [
                    v => !!v || 'Nama Harus Diisi'
                ],
                nomorUsaha: [
                    v => !!v || 'Nomor Usaha Harus Diisi'
                ],
                address: [
                    v => !!v || 'Alamat Usaha Harus Diisi'
                ],
                companyName: [
                    v => !!v || 'Nama Usaha Harus Diisi'
                ],
                desc: [
                    v => !!v || 'Deskripsi Harus Diisi'
                ],
            },
            panel:1,
            // Dialog
            editDialog: false
        }
    },

    mounted(){
        if(this.uid) {
            this.$router.push('/Dashboard')
        } else {
            this.$router.push('/loginAdmin')
        }
        this.get()
    },

    methods: {
        editItem(item) {
            this.selectedIndex = this.umkms.indexOf(item)
            this.umkm = _.cloneDeep(item)
            this.editDialog = true
        },
        close() {
            this.umkm = _.cloneDeep(this.umkmDefault)
            this.editDialog = false
            this.confirmDeleteDialog = false
            this.tempDeletedImg = []
            this.myFiles = []
            this.selectedImg = -1
            this.selectedIndex = -1
            this.panel = 1
        },
        moveTrash(img) {
            this.selectedImg = this.umkm.img.indexOf(img)
            this.tempDeletedImg.push(img)
            this.umkm.img.splice(this.selectedImg, 1)
        },
        handleFilePondUpdateFile(files) {
            this.myFiles = files.map(files => files.file);
        },
        // Firebase API
        get() {
            let umkms = []
            db.collection('umkm')
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        umkms.push({
                            id: doc.id,
                            name: doc.data().name,
                            date: doc.data().date,
                            registerDate: doc.data().registerDate,
                            nomorUsaha:doc.data().nomorUsaha,
                            address:doc.data().address,
                            companyName:doc.data().companyName,
                            desc:doc.data().desc,
                            status:doc.data().status,
                            img:doc.data().img
                        })
                        console.log(doc.id, " => ", doc.data())
                    });
                    return umkms
                }) .catch((err) => {
                    console.log("Error getting documents: ", err);
                }) .finally(() => {
                    this.umkms = umkms
                    this.unregisteredUmkms = []
                    this.registeredUmkms = []
                    umkms.forEach(e => {
                        if(e.status == 0) {
                            this.unregisteredUmkms.push(e)
                        } else {
                            this.registeredUmkms.push(e)
                        }
                    });
                })
        },
        // upload image
        addImage(imageFile) {
            return new Promise((resolve, reject) => {
                var storageRef = firebase.storage().ref(Math.random() + '_'  + imageFile.name)
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
        // update umkm
        async updateItem() {
            if(this.$refs.form.validate()) {
                this.loadingState = true
                // push ke object umkm
                for(let i=0; i<this.myFiles.length; i++) {
                    await this.addImage(this.myFiles[i])
                        .then((response) => {
                            this.umkm.img.push(response)
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
                db.collection("umkm")
                    .doc(this.umkm.id)
                    .update({
                        name:this.umkm.name,
                        date: this.umkm.date,
                        registerDate: this.umkm.registerDate,
                        nomorUsaha:this.umkm.nomorUsaha,
                        address:this.umkm.address,
                        companyName:this.umkm.companyName,
                        desc:this.umkm.desc,
                        status:this.umkm.status,
                        img:this.umkm.img
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
        confirmDelete(item) {
            this.selectedIndex = this.umkms.indexOf(item)
            this.umkm = _.cloneDeep(item)
            this.umkm.img.forEach(e => {
                this.tempDeletedImg.push(e)
            });
            this.confirmDeleteDialog = true
        },
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
            db.collection("umkm")
                .doc(this.umkm.id)
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
        advanceFilter(val) {
            if(!this.filterSelected) {
                return true
            }
            return val === this.filterSelected
        }
    },

    computed: {
        uid() {
            return this.$store.state.uid
        },
        umkmHeaders() {
            return [
                {value:'name', text:'Nama Pemilik', width:'40%'},
                {value:'companyName', text:'Nama Usaha', width:'50%'},
                {value:'status', align: ' d-none', filter:this.advanceFilter},
                {value:'actions', width:'10%'}
            ]
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