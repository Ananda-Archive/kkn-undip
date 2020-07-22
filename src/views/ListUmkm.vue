<template>
    <v-app>
        <v-content>
            <v-container fluid>
                <v-row justify="center">
                    <v-col cols="10">
                        <v-text-field
                            outlined
                            v-model="searchUmkm"
                            append-icon="mdi-magnify"
                            label="Cari Nama UMKM"
                            class="mb-n6"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-data-iterator
                            :items="filteredList"
                            :items-per-page="itemsPerPage"
                            :page="page"
                            hide-default-footer
                            no-results-text="Artikel Tidak Ditemukan"
                            no-data-text=" "
                        >
                            <template v-slot:default="props">
                                <v-container>
                                    <v-row justify="start">
                                        <v-col cols="12" sm="12" md="3" v-for="(umkm,idx) in props.items" :key="idx">
                                                <v-card @click="openDialogFunc(umkm)" width="400px" align="left">
                                                    <v-img aspect-ratio="1" height="300px" :lazy-src="umkm.img[0]" :src="umkm.img[0]">
                                                        <template v-slot:placeholder>
                                                            <v-row
                                                                class="fill-height ma-0"
                                                                align="center"
                                                                justify="center"
                                                            >
                                                                <v-progress-circular indeterminate color="black"></v-progress-circular>
                                                            </v-row>
                                                        </template>
                                                    </v-img>
                                                    <v-card-title class="d-inline-block text-left">{{umkm.companyName.slice(0,23)}}<span v-if="umkm.companyName.length>23">...</span></v-card-title>
                                                </v-card>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </template>
                            <template v-slot:footer>
                                <v-container>
                                    <v-row justify="center">
                                        <v-pagination
                                            v-model="page"
                                            :length="numberOfPages"
                                            :total-visible="7"
                                            color="red"
                                        ></v-pagination>
                                    </v-row>
                                </v-container>
                            </template>
                        </v-data-iterator>
                    </v-col>
                </v-row>
            </v-container>
            <v-dialog v-model="openDialog" persistent max-width="1200px">
                <v-card>
                    <v-toolbar dense flat>
                        <span class="title font-weight-light">Detail UMKM</span>
                        <v-btn absolute right icon @click="close"><v-icon>mdi-close</v-icon></v-btn>
                    </v-toolbar>
                    <v-card-text v-if="!$vuetify.breakpoint.smAndDown">
                        <v-container>
                            <v-row no-gutters>
                                <v-col cols="6">
                                    <v-row>
                                        <v-col cols="12">
                                            <v-card>
                                                <v-img height="500px" width="800px" :lazy-src=imgSelected :src=imgSelected>
                                                    <template v-slot:placeholder>
                                                        <v-row
                                                            class="fill-height ma-0"
                                                            align="center"
                                                            justify="center"
                                                        >
                                                            <v-progress-circular indeterminate color="black"></v-progress-circular>
                                                        </v-row>
                                                    </template>
                                                </v-img>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="3" v-for="(img, idx) in umkm.img" :key="idx">
                                            <v-card width="300px" @click="changePic(img)">
                                                <v-img :lazy-src="img" :src="img" v-if="imgSelected == img" gradient="to top right, rgba(0,0,0,.73), rgba(0,0,0,.73)">
                                                    <template v-slot:placeholder>
                                                        <v-row
                                                            class="fill-height ma-0"
                                                            align="center"
                                                            justify="center"
                                                        >
                                                            <v-progress-circular indeterminate color="black"></v-progress-circular>
                                                        </v-row>
                                                    </template>
                                                </v-img>
                                                <v-img :lazy-src="img" :src="img" v-else>
                                                    <template v-slot:placeholder>
                                                        <v-row
                                                            class="fill-height ma-0"
                                                            align="center"
                                                            justify="center"
                                                        >
                                                            <v-progress-circular indeterminate color="black"></v-progress-circular>
                                                        </v-row>
                                                    </template>
                                                </v-img>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="6" class="px-6">
                                    <v-row>
                                        <v-col cols="12">
                                            <span class="display-1">{{umkm.companyName}}</span>
                                        </v-col>
                                        <v-col cols="12">
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
                                                <tr>
                                                    <td style="vertical-align:top">Nomor HP</td>
                                                    <td style="vertical-align:top" width="15%" align="end">:</td>
                                                    <td style="vertical-align:top" class="pl-2">{{umkm.phone}}</td>
                                                </tr>
                                                <tr>
                                                    <td style="vertical-align:top">Deskripsi Usaha</td>
                                                    <td style="vertical-align:top" width="15%" align="end">:</td>
                                                    <td style="vertical-align:top" class="pl-2">{{umkm.desc}}</td>
                                                </tr>
                                            </table>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-text v-else>
                        <v-container>
                            <v-row no-gutters>
                                <v-col cols="12">
                                    <v-row>
                                        <v-col cols="12">
                                            <v-card>
                                                <v-img height="200px" width="800px" :lazy-src=imgSelected :src=imgSelected>
                                                    <template v-slot:placeholder>
                                                        <v-row
                                                            class="fill-height ma-0"
                                                            align="center"
                                                            justify="center"
                                                        >
                                                            <v-progress-circular indeterminate color="black"></v-progress-circular>
                                                        </v-row>
                                                    </template>
                                                </v-img>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="3" v-for="(img, idx) in umkm.img" :key="idx">
                                            <v-card width="300px" @click="changePic(img)">
                                                <v-img :lazy-src="img" :src="img" v-if="imgSelected == img" gradient="to top right, rgba(0,0,0,.73), rgba(0,0,0,.73)">
                                                    <template v-slot:placeholder>
                                                        <v-row
                                                            class="fill-height ma-0"
                                                            align="center"
                                                            justify="center"
                                                        >
                                                            <v-progress-circular indeterminate color="black"></v-progress-circular>
                                                        </v-row>
                                                    </template>
                                                </v-img>
                                                <v-img :lazy-src="img" :src="img" v-else>
                                                    <template v-slot:placeholder>
                                                        <v-row
                                                            class="fill-height ma-0"
                                                            align="center"
                                                            justify="center"
                                                        >
                                                            <v-progress-circular indeterminate color="black"></v-progress-circular>
                                                        </v-row>
                                                    </template>
                                                </v-img>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="6">
                                    <v-row>
                                        <v-col cols="12">
                                            <span class="display-1">{{umkm.companyName}}</span>
                                        </v-col>
                                        <v-col cols="12">
                                            <table class="descTable">
                                                <tr>
                                                    <td style="vertical-align:top">Pemilik</td>
                                                    <td style="vertical-align:top" width="15%" align="end">:</td>
                                                    <td style="vertical-align:top" class="pl-2">{{umkm.name}}</td>
                                                </tr>
                                                <tr>
                                                    <td style="vertical-align:top">Nomor Usaha</td>
                                                    <td style="vertical-align:top" width="20%" align="end">:</td>
                                                    <td style="vertical-align:top" class="pl-2">{{umkm.nomorUsaha}}</td>
                                                </tr>
                                                <tr>
                                                    <td style="vertical-align:top">Alamat Usaha</td>
                                                    <td style="vertical-align:top" width="15%" align="end">:</td>
                                                    <td style="vertical-align:top" class="pl-2">{{umkm.address}}</td>
                                                </tr>
                                                <tr>
                                                    <td style="vertical-align:top">Nomor HP</td>
                                                    <td style="vertical-align:top" width="15%" align="end">:</td>
                                                    <td style="vertical-align:top" class="pl-2">{{umkm.phone}}</td>
                                                </tr>
                                                <tr>
                                                    <td style="vertical-align:top">Deskripsi Usaha</td>
                                                    <td style="vertical-align:top" width="15%" align="end">:</td>
                                                    <td style="vertical-align:top" class="pl-2">{{umkm.desc}}</td>
                                                </tr>
                                            </table>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-content>
    </v-app>
</template>

<script>

import { db } from '../firebase'
import _ from 'lodash'

export default {
    data() {
        return {
            searchUmkm: '',
            umkms:[],
            umkm:{
                name:'',
                date: '',
                registerDate: '',
                nomorUsaha:'',
                address:'',
                companyName:'',
                desc:'',
                phone:'',
                status:'',
                img:[]
            },
            umkmDefault:{
                name:'',
                date: '',
                registerDate: '',
                nomorUsaha:'',
                address:'',
                companyName:'',
                desc:'',
                phone:'',
                status:'',
                img:[]
            },
            imgSelected:'',
            page:1,
            itemsPerPage:12,
            openDialog:false,
        }
    },

    created() {
        this.get()
    },

    methods: {
        changePic(val) {
            this.imgSelected = val
        },
        openDialogFunc(item) {
            this.openDialog = true
            this.umkm = _.cloneDeep(item)
            this.imgSelected = this.umkm.img[0]
        },
        close() {
            this.openDialog = false
            this.imgSelected=""
            this.umkm = _.cloneDeep(this.umkmDefault)
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
                            img:doc.data().img
                        })
                        console.log(doc.id, " => ", doc.data())
                    });
                }) .catch((err) => {
                    console.log("Error getting documents: ", err);
                }) .finally(() => {
                    this.umkms = []
                    umkms.forEach(e => {
                        if(e.status == 2) {
                            this.umkms.push(e)
                        }
                    });
                })
        },
    },

    computed: {
        numberOfPages() {
            return Math.ceil(this.umkms.length / this.itemsPerPage)
        },
        filteredList() {
            return this.umkms.filter(post => {
                return post.companyName.toLowerCase().includes(this.searchUmkm.toLowerCase())
            })
        }
    }
}
</script>

<style>
.descTable tr td {
    height: 35px
}

.v-dialog > .v-card > .v-toolbar {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>