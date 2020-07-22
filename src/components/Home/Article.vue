<template>
    <section id="article">
        <div class="py-12"></div>
        <v-container fluid class="text-center">
            <h2 :class="[$vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2']" class="font-weight-bold mb-3">ARTIKEL TERBARU</h2>
            <v-responsive class="mx-auto mb-8" width="56">
                <v-divider class="mb-1"></v-divider>
                <v-divider></v-divider>
            </v-responsive>
            <!-- Grid for article -->
            <v-row align="center">
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
            </v-btn>
        </v-container>
        <div class="py-12"></div>
    </section>
</template>

<script>

import {db} from '../../firebase'

export default {
    name: "Article",
    data() {
        return{
            articles: []
        }
    },

    mounted() {
        this.get()
    },

    methods: {
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
        },
        goTo2(id) {
            this.$router.push('/Article/'+id)
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