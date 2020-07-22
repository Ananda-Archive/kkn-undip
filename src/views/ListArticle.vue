<template>
    <v-app>
        <v-content>
            <v-container fluid>
                <v-row justify="center">
                    <v-col cols="10">
                        <v-text-field
                            outlined
                            v-model="searchArticle"
                            append-icon="mdi-magnify"
                            label="Cari Artikel"
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
                                        <v-col cols="12" sm="12" md="3" v-for="(article,idx) in props.items" :key="idx">
                                                <v-card @click="goTo(article.id)" width="400px" align="left">
                                                    <v-img aspect-ratio="1" height="200px" :lazy-src="article.img[0]" :src="article.img[0]">
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
                                                    <v-card-title class="d-inline-block text-left">{{article.title.slice(0,40)}}<span v-if="article.title.length>40">...</span></v-card-title>
                                                    <v-card-actions>
                                                        <v-btn @click="goTo(article.id)" text color="#C0392B">Baca Lebih Lanjut</v-btn>
                                                    </v-card-actions>
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
            <v-overlay :value="loadingInitial"><v-progress-circular indeterminate size="64"></v-progress-circular></v-overlay>
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

export default {
    name: 'ListArticle',

    data() {
        return {
            searchArticle:'',
            articles:[],
            loadingInitial:true,
            page:1,
            itemsPerPage:12
        }
    },

    mounted() {
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
                })
        },
        goTo(id) {
            this.$router.push('/Article/'+id)
        }
    },

    computed: {
        numberOfPages() {
            return Math.ceil(this.articles.length / this.itemsPerPage)
        },
        filteredList() {
            return this.articles.filter(post => {
                return post.title.toLowerCase().includes(this.searchArticle.toLowerCase())
            })
        }
    }
}
</script>

<style>

</style>