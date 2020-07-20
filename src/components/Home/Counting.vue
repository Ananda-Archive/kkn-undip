<template>
  <section id="counting">
      <v-parallax
        :height="$vuetify.breakpoint.smAndDown ? 600 : 500"
        src="@/assets/bg.jpeg"
      >
        <v-container fill-height>
            <v-row class="mx-auto">
                <v-col v-for="[value, title] of stats" :key="title" cols="12" md="4">
                    <div class="text-center">
                        <div
                            class="display-3 font-weight-black mb-4"
                            v-text="value"
                        ></div>

                        <div
                            class="title font-weight-regular text-uppercase"
                            v-text="title"
                        ></div>
                    </div>
                </v-col>
                <v-col cols="12" class="text-center mt-8 mb-n4">
                    <span>UMKM Anda Belum Terdaftar?</span>
                </v-col>
                <v-col cols="12" class="text-center">
                    <v-btn @click="goTo('/DaftarUMKM')" outlined x-large class="white--text">Daftarkan UMKM Anda</v-btn>
                </v-col>
            </v-row>
        </v-container>
      </v-parallax>
  </section>
</template>

<script>
export default {
    name: "Counting",
    data() {
        return {
            stats: [
                ['64', 'RT'],
                ['11', 'RW'],
                ['100+', 'UMKM'],
            ]
        }
    },
    methods: {
        goTo(path) {
            this.$router.push(path)
        }
    }
}
</script>

<style>

</style>