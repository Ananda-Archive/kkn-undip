<template>
    <v-app>
        <v-content>
            <v-container fluid>
                <v-row justify="center">
                    <v-col class="text-center" cols="10">
                        <v-text-field
                            v-model="searchUmkm"
                            label="Kode"
                            dense
                            outlined
                        ></v-text-field>
                        <v-btn @click="check" class="green" dark :width="[$vuetify.breakpoint.smAndDown ? '100%' : '30%']">Cek</v-btn>
                    </v-col>
                    <v-col v-if="card == true" cols="10">
                        <v-card v-if="found == true" class="teal darken-1" dark>
                            <v-card-title>Status</v-card-title>
                            <v-card-text>
                                <table class="descTable">
                                    <tr>
                                        <td style="vertical-align:top">Pemilik</td>
                                        <td style="vertical-align:top" width="15%" align="end">:</td>
                                        <td style="vertical-align:top" class="pl-2">{{umkm.name}}</td>
                                    </tr>
                                    <tr>
                                        <td style="vertical-align:top">Nomor Usaha</td>
                                        <td style="vertical-align:top" width="15%" align="end">:</td>
                                        <td style="vertical-align:top" class="pl-2">{{umkm.nomorUsaha}}</td>
                                    </tr>
                                    <tr>
                                        <td style="vertical-align:top">Alamat Usaha</td>
                                        <td style="vertical-align:top" width="15%" align="end">:</td>
                                        <td style="vertical-align:top" class="pl-2">{{umkm.address}}</td>
                                    </tr>
                                    <tr v-if="this.umkm.status == 3">
                                        <td style="vertical-align:top">Alasan Ditolak</td>
                                        <td style="vertical-align:top" width="15%" align="end">:</td>
                                        <td style="vertical-align:top" class="pl-2">{{umkm.rejected}}</td>
                                    </tr>
                                </table>
                            </v-card-text>
                            <v-card-text v-if="this.umkm.status == 3" class="text-center"><h1 class="red--text">Ditolak</h1></v-card-text>
                            <v-card-text v-if="this.umkm.status == 2" class="text-center"><h1>Diterima</h1></v-card-text>
                            <v-card-text v-if="this.umkm.status == 1" class="text-center"><h1 class="yellow--text">Proses</h1></v-card-text>
                        </v-card>
                        <v-card v-if="found == false" flat>
                            <v-card-text class="text-center"><h1 class="red--text">Data Tidak Ditemukan</h1></v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>

import { db } from '../firebase'
import _ from 'lodash'

export default {
    data() {
        return {
            searchUmkm:'',
            card: false,
            found:false,
            umkms:[],
            umkm:{
                id:'',
                name:'',
                date: '',
                registerDate: '',
                nomorUsaha:'',
                address:'',
                companyName:'',
                desc:'',
                phone:'',
                status:'',
                img:[],
                rejected:''
            },
            umkmDefault:{
                id:'',
                name:'',
                date: '',
                registerDate: '',
                nomorUsaha:'',
                address:'',
                companyName:'',
                desc:'',
                phone:'',
                status:'',
                img:[],
                rejected:''
            },
        }
    },

    created() {
        this.get()
    },

    methods: {
        check() {
            this.card = true
            if(_.find(this.umkms, ['id',this.searchUmkm])) {
                this.found = true
                this.umkm = _.cloneDeep(_.find(this.umkms, ['id',this.searchUmkm]))
            } else {
                this.found = false
            }
        },
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
                            phone:doc.data().phone,
                            status:doc.data().status,
                            img:doc.data().img,
                            rejected:doc.data().rejected
                        })
                        console.log(doc.id, " => ", doc.data())
                    });
                    return umkms
                }) .catch((err) => {
                    console.log("Error getting documents: ", err);
                }) .finally(() => {
                    this.umkms = umkms
                })
        },
    }
}
</script>

<style>
.descTable tr td {
    height: 35px
}
</style>