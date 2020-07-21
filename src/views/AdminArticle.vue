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
                        ></v-data-table>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>

import {db} from '../firebase'
// import firebase from 'firebase';

export default {
    name:'DashboardArticle',
    data() {
        return{
            searchArticle:'',
            articleHeaders: [
                {value:'title', text:'Judul', width:'80%'},
                {value:'actions', width:'10%'}
            ],
            articles:[]
        }
    },
    mounted(){
        if(this.uid) {
            this.$router.push('/DashboardArticle')
        } else {
            this.$router.push('/loginAdmin')
        }
        // this.get()
    },
    methods: {
        get() {
            let articles = []
            db.collection('articles')
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        articles.push({
                            id:doc.id,
                            
                        })
                    });
                })
        }
    },
    computed: {
        uid() {
            return this.$store.state.uid
        },
    }
}
</script>

<style>

</style>