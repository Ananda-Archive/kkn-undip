<template>
    <v-app>
        <v-content>
            <v-container fluid>
                <v-row justify="center">
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
                            <v-icon @click.stop="deleteItem(item)">mdi-delete</v-icon>
                        </template>
                        </v-data-table>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
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

export default {
    name: 'Dashboard',

    data() {
        return {
            snackbar: false,
            snackbarMessage: '',
            snackbarColor: '',
            selected:[
                {id:0,val:'Belum Terdaftar'},
                {id:1,val:'Terdaftar'}
            ],
            umkms: [],
            unregisteredUmkms: [],
            registeredUmkms: [],
            searchUsaha:'',
            filterSelected:''
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
        deleteItem(item) {
            db.collection("umkm")
                .doc(item.id)
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
        }
    }
}
</script>

<style>

</style>