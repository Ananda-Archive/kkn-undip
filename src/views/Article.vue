<template>
    <v-app>
        <v-content>
            <v-container fluid>
                <v-row justify="center">
                    <v-col cols="12" class="text-center"><h1>{{article.title}}</h1></v-col>
                    <v-card v-if="$vuetify.breakpoint.smAndDown" width="95%">
                        <v-img :lazy-src="selectedImg" :src=selectedImg width="500" height="400">
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
                    <v-card v-else>
                        <v-img :lazy-src="selectedImg" :src=selectedImg width="500" height="400">
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
                    <v-col class="text-center" cols="10">
                        <v-row justify="center">
                            <v-card v-for="(img, idx) in article.img" :key='idx' :class="[$vuetify.breakpoint.smAndDown ? 'gridImgMobile' : 'gridImg']">
                                <v-img @click="selectedImg = img" style="cursor:pointer" :lazy-src="img" :src="img" :height="[$vuetify.breakpoint.smAndDown ? '50px' : '100px']" :width="[$vuetify.breakpoint.smAndDown ? '50px' : '100px']">
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
                        </v-row>
                    </v-col>
                    <v-col cols="10">
                        <div v-html="article.content"></div>
                    </v-col>
                    <!-- <v-col class="mt-n8" cols="12" sm="12" md="10">
                        <h3>Lihat Artikel Lainnya</h3>
                        <v-divider class="mt-3"></v-divider>
                    </v-col>
                    <v-col cols="12" sm="12" md="10">
                            <v-row align="center">
                                <v-col cols="12" sm="12" md="3" v-for="(article, index) in filteredItems" :key="index">
                                    <v-card max-width="400" align="left">
                                        <v-img height="200px" :src=article.img[0]></v-img>
                                        <v-card-title class="d-inline-block text-left">{{article.title.slice(0,40)}}<span v-if="article.title.length>40">...</span></v-card-title>
                                        <v-card-actions>
                                            <v-btn @click="goTo(article.id)" text color="#C0392B">Baca Lebih Lanjut</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-col>
                            </v-row>
                    </v-col> -->
                </v-row>
            </v-container>
        </v-content>
        <v-footer
            class="justify-center"
            color="#292929"
            height="40"
        >
            <div class="subtitle-1 font-weight-light grey--text text--lighten-1 text-center">
            &copy; {{ (new Date()).getFullYear() }} — by Pengabdi Srondol Kulon
            </div>
        </v-footer>
    </v-app>
</template>

<script>

import { db } from '../firebase'
import _ from 'lodash'

export default {
    data() {
        return {
            id: this.$route.params.id,
            articles:[],
            article:{},
            selectedImg:'',
            loadingInitial: true
        }
    },

    created() {
        this.get()
    },

    methods: {
        get() {
            this.loadingInitial = true
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
                    this.loadingInitial = false
                    this.articles = articles
                    this.article = _.find(this.articles, ['id',this.$route.params.id])
                    this.selectedImg = this.article.img[0]
                })
        },
        goTo(id) {
            this.id = id
            this.$router.push('/Article/'+id)
            this.get()
            window.scrollTo(0,0);
        }
    },

    computed: {
        filteredItems: function () {
            return this.articles.slice(0, 4)
        }
    },
}
</script>

<style>
.gridImg:not(:last-child) {
    margin-right: 24px;
}
.gridImgMobile {
    margin-right: 24px;
    margin-bottom: 10px;
}
</style>