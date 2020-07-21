<template>
  <v-app>
      <v-content>
          <v-form ref="form">
            <v-row class="mx-12 my-8">
                <v-col cols="12">
                    <h1 class="font-weight-medium">DAFTAR UMKM</h1>
                    <v-divider></v-divider>
                </v-col>
                <v-col cols="12" md="6" lg="6">
                    <v-text-field
                        v-model="user.name"
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
                                v-model="user.date"
                                label="Tanggal Lahir"
                                outlined
                                dense
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                class="mb-n6"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="user.date" @input="datePickerMenu = false"></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" md="6" lg="6">
                    <v-text-field
                    v-model="user.companyName"
                        outlined
                        dense
                        label="Nama Usaha"
                        :rules="rules.companyName"
                        class="mb-n6"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" lg="6">
                    <v-text-field
                        v-model="user.nomorUsaha"
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
                        v-model="user.address"
                        :rules="rules.address"
                        class="mb-n6"
                    ></v-textarea>
                </v-col>
                <v-col cols="12">
                    <v-textarea
                        outlined
                        counter
                        label="Deskripsi Usaha"
                        v-model="user.desc"
                        :rules="rules.desc"
                        class="mb-n6"
                    ></v-textarea>
                </v-col>
                <v-col cols="12" md="8" lg="8" class="mx-auto">
                    <file-pond
                        :allowDrop="!loadingRegister"
                        :allowBrowse="!loadingRegister"
                        style="cursor: pointer"
                        name="test"
                        ref="pond"
                        label-idle="<span class='filepondFormatText'>Upload Gambar Produk atau Tempat Usaha (maksimal 7) </span><span class='filepondFormatText'>Format: JPG/PNG</span>"
                        v-bind:files="myFiles"
                        instant-upload="false"
                        labelInvalidField="remove"
                        allow-multiple="true"
                        accepted-file-types="image/*"
                        fileValidateTypeLabelExpectedTypes="Hanya menerima format JPG dan PNG"
                        maxFiles="7"
                    />
                </v-col>
                <v-col cols="12" class="text-center">
                        <v-btn :disabled="loadingRegister" @click="add()" class="green white--text" width="200px" x-large>
                            <span v-if="loadingRegister">
                                <v-progress-circular size="20" :indeterminate="loadingRegister"></v-progress-circular>
                            </span>
                            <span v-else>Daftar</span>
                        </v-btn>
                </v-col>
            </v-row>
          </v-form>

      </v-content>
  </v-app>
</template>

<script>

import { db } from '../firebase';
import firebase from 'firebase';
// import _ from 'lodash';
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';

const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginFileValidateSize
)

export default {
    name:'Register',
    components: {
      FilePond
    },
    data() {
        return {
            registerId:'',
            loadingRegister: false,
            datePickerMenu: false,
            myFiles:['https://firebasestorage.googleapis.com/v0/b/kkn-srondol-kulon.appspot.com/o/0.6767943318626448_wwadawd.PNG?alt=media&token=abe2fa23-3fc7-4d04-a8eb-179adb8957c0'],
            user: {
                name:'',
                date: new Date().toISOString().substr(0, 10),
                registerDate: new Date().toISOString().substr(0, 10),
                nomorUsaha:'',
                address:'',
                companyName:'',
                desc:'',
                status:0,
                img:[]
            },
            userDefault: {
                name:'',
                date: new Date().toISOString().substr(0, 10),
                registerDate: new Date().toISOString().substr(0, 10),
                nomorUsaha:'',
                address:'',
                companyName:'',
                desc:'',
                status:0,
                img:[]
            },
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
            }
        }
    },

    methods: {
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
        async add() {
            if(this.$refs.form.validate()) {
                this.loadingRegister = true
                for(let i=0; i<this.myFiles.length; i++) {
                    await this.addImage(this.myFiles[i])
                        .then((response) => {
                            this.user.img.push(response)
                        })
                        .catch(() => {
                            console.log("gagal")
                        })
                }
                db.collection("umkm")
                    .add(this.user)
                    .then((docRef) => {
                        console.log("Document successfully written!, ID: ", docRef.id);
                        this.$store.dispatch('setRegisterId',docRef.id)
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    })
                    .finally(() => {
                        this.$router.push('/PendaftaranBerhasil')
                        this.loadingRegister = false
                    })
            }

        },
        handleFilePondUpdateFile(files) {
            this.myFiles = files.map(files => files.file);
        }
    },
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

</style>