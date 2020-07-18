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
                <v-col cols="12" sm="12" md="3" v-for="(article, index) in articles" :key="index">
                    <v-card max-width="400">
                        <v-img height="200px" :src=article.image[0]></v-img>
                        <v-card-title>{{article.title}}</v-card-title>
                        <v-card-text class="text-primary text-start">
                            <div>{{article.content.slice(0,80)}} ...</div>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn text color="#C0392B">Baca Lebih Lanjut</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            <div class="my-12"></div>
            <v-btn color="grey" href="" outlined large>
                <span class="grey--text text--darken-1 font-weight-bold">
                    LIHAT ARTIKEL LAIN
                </span>
            </v-btn>
        </v-container>
        <div class="py-12"></div>
    </section>
</template>

<script>
export default {
    name: "Article",
    data() {
        return{
            articles: [
                {
                    id:1,
                    title:'Lorem Ipsum',
                    image:[
                        'https://source.unsplash.com/random'
                    ],
                    content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae velit est iste excepturi ipsa adipisci quae, blanditiis accusamus eveniet ullam! Nemo, ea quidem? Optio deserunt eius veniam rerum atque dolorum aliquid facilis temporibus, minus neque earum, voluptas doloremque iure corrupti eligendi nulla dolor placeat officia quisquam in nemo explicabo debitis perferendis. Ullam voluptatem ab nulla neque recusandae accusamus, soluta magni ducimus laudantium qui. Facilis, eum ratione necessitatibus nesciunt cupiditate placeat praesentium maxime adipisci laudantium doloribus quas dolorum minus quidem ullam ducimus libero numquam. Debitis iusto neque expedita magni eligendi molestias, in ad laboriosam perspiciatis labore, quasi enim sapiente dolorum accusamus.'
                },
                {
                    id:2,
                    title:'Lorem Ipsum',
                    image:[
                        'https://source.unsplash.com/random'
                    ],
                    content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae velit est iste excepturi ipsa adipisci quae, blanditiis accusamus eveniet ullam! Nemo, ea quidem? Optio deserunt eius veniam rerum atque dolorum aliquid facilis temporibus, minus neque earum, voluptas doloremque iure corrupti eligendi nulla dolor placeat officia quisquam in nemo explicabo debitis perferendis. Ullam voluptatem ab nulla neque recusandae accusamus, soluta magni ducimus laudantium qui. Facilis, eum ratione necessitatibus nesciunt cupiditate placeat praesentium maxime adipisci laudantium doloribus quas dolorum minus quidem ullam ducimus libero numquam. Debitis iusto neque expedita magni eligendi molestias, in ad laboriosam perspiciatis labore, quasi enim sapiente dolorum accusamus.'
                },
                {
                    id:3,
                    title:'Lorem Ipsum',
                    image:[
                        'https://source.unsplash.com/random'
                    ],
                    content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae velit est iste excepturi ipsa adipisci quae, blanditiis accusamus eveniet ullam! Nemo, ea quidem? Optio deserunt eius veniam rerum atque dolorum aliquid facilis temporibus, minus neque earum, voluptas doloremque iure corrupti eligendi nulla dolor placeat officia quisquam in nemo explicabo debitis perferendis. Ullam voluptatem ab nulla neque recusandae accusamus, soluta magni ducimus laudantium qui. Facilis, eum ratione necessitatibus nesciunt cupiditate placeat praesentium maxime adipisci laudantium doloribus quas dolorum minus quidem ullam ducimus libero numquam. Debitis iusto neque expedita magni eligendi molestias, in ad laboriosam perspiciatis labore, quasi enim sapiente dolorum accusamus.'
                },
                {
                    id:4,
                    title:'Lorem Ipsum',
                    image:[
                        'https://source.unsplash.com/random'
                    ],
                    content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae velit est iste excepturi ipsa adipisci quae, blanditiis accusamus eveniet ullam! Nemo, ea quidem? Optio deserunt eius veniam rerum atque dolorum aliquid facilis temporibus, minus neque earum, voluptas doloremque iure corrupti eligendi nulla dolor placeat officia quisquam in nemo explicabo debitis perferendis. Ullam voluptatem ab nulla neque recusandae accusamus, soluta magni ducimus laudantium qui. Facilis, eum ratione necessitatibus nesciunt cupiditate placeat praesentium maxime adipisci laudantium doloribus quas dolorum minus quidem ullam ducimus libero numquam. Debitis iusto neque expedita magni eligendi molestias, in ad laboriosam perspiciatis labore, quasi enim sapiente dolorum accusamus.'
                },
                {
                    id:5,
                    title:'Lorem Ipsum',
                    image:[
                        'https://source.unsplash.com/random'
                    ],
                    content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae velit est iste excepturi ipsa adipisci quae, blanditiis accusamus eveniet ullam! Nemo, ea quidem? Optio deserunt eius veniam rerum atque dolorum aliquid facilis temporibus, minus neque earum, voluptas doloremque iure corrupti eligendi nulla dolor placeat officia quisquam in nemo explicabo debitis perferendis. Ullam voluptatem ab nulla neque recusandae accusamus, soluta magni ducimus laudantium qui. Facilis, eum ratione necessitatibus nesciunt cupiditate placeat praesentium maxime adipisci laudantium doloribus quas dolorum minus quidem ullam ducimus libero numquam. Debitis iusto neque expedita magni eligendi molestias, in ad laboriosam perspiciatis labore, quasi enim sapiente dolorum accusamus.'
                },
            ]
        }
    }
}
</script>

<style>
</style>