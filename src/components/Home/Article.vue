<template>
    <section id="article">
        <div class="pt-4"></div>
        <v-container fluid class="text-center px-0">
            <h2 :class="[$vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2']" class="font-weight-bold mb-3">GALERI UMKM</h2>
            <v-responsive class="mx-auto mb-8" width="56">
                <v-divider class="mb-1"></v-divider>
                <v-divider></v-divider>
            </v-responsive>
            <!-- <v-row align="center">
                <v-col cols="12" sm="12" md="3" v-for="(article, index) in filteredItems" :key="index">
                    <v-card max-width="400" align="left">
                        <v-img height="200px" :src=article.img[0]></v-img>
                        <v-card-title class="d-inline-block text-left">{{article.title.slice(0,40)}}<span v-if="article.title.length>40">...</span></v-card-title>
                        <v-card-actions>
                            <v-btn @click="goTo2(article.id)" text color="#C0392B">Baca Lebih Lanjut</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            <div class="my-12"></div>
            <v-btn @click="goTo('/ListArticle')" color="grey" href="" outlined large>
                <span class="grey--text text--darken-1 font-weight-bold">
                    LIHAT ARTIKEL LAIN
                </span>
            </v-btn> -->
            <v-carousel cycle hide-delimiter-background hide-delimiters>
                <v-carousel-item
                    v-for="(umkm,idx) in umkms"
                    :key="idx"
                    :src="umkm.img[0]"
                    reverse-transition="fade-transition"
                    transition="fade-transition"
                >
                    <v-container fluid fill-height class="align-end pb-0">
                        <v-row>
                            <v-col cols="12" class="grey darken-3" >
                                <h1>{{umkm.companyName}}</h1>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-carousel-item>
            </v-carousel>
        </v-container>
    </section>
</template>

<script>

import {db} from '../../firebase'
import _ from 'lodash'

export default {
    name: "Article",
    data() {
        return{
            umkms: []
        }
    },

    mounted() {
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
                    this.umkms = _.shuffle(this.umkms)
                })
        },
        goTo(path) {
            this.$router.push(path)
        },
    },

    computed: {
        filteredItems: function () {
            return this.articles.slice(0, 4)
        }
    }
}
</script>

<style>
</style>