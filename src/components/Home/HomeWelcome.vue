<template>
    <section id="Home-Welcome">
        <v-row no-gutters>
            <v-img
                :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
                src="https://arsitagx-master.s3.ap-southeast-1.amazonaws.com/img_large/2888/4071/28595/photo-mp-ruko-dan-pasar-modern-310516-pasmo-gresik-desain-arsitek-oleh-tyan-borland.jpeg"
            >
            <v-theme-provider dark>
                <v-container fill-height>
                    <v-row align="center" class="white--text mx-auto" justify="center">
                        <v-col class="white--text text-center" cols="12" tag="h1">
                            <span :class="[$vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2']" class="font-weight-light">
                                WELCOME TO
                            </span>
                            <br>
                            <span :class="[$vuetify.breakpoint.smAndDown ? 'display-3': 'display-4']" class="font-weight-black">
                                VUETIFY
                            </span>
                        </v-col>
                        <v-btn class="align-self-end" fab outlined @click="$vuetify.goTo('#article')">
                            <v-icon>mdi-chevron-double-down</v-icon>
                        </v-btn>
                    </v-row>
                </v-container>
            </v-theme-provider>
            </v-img>
        </v-row>
    </section>
</template>

<script>
export default {
    name: "HomeWelcome"
}
</script>

<style>
</style>