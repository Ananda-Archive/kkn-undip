<template>
  <v-app>
    <v-app-bar dark app flat color="#C0392B" class="absolute px-2">
      <v-btn icon class="pa-1"><v-img src="./assets/logo-1.png" contain width="20"></v-img></v-btn>
      <v-toolbar-title style="cursor: pointer" class="font-weight-bold">SRONDOL KULON</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title class="mr-10" style="cursor: pointer"><span class="hoverMenu">Daftar UMKM</span></v-toolbar-title>
      <v-toolbar-title class="mr-10" style="cursor: pointer"><span class="hoverMenu">Artikel</span></v-toolbar-title>
      <v-toolbar-title class="mr-5" style="cursor: pointer"><span class="hoverMenu">Tentang</span></v-toolbar-title>
    </v-app-bar>
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
  
};
</script>

<style scoped>
  .hoverMenu:after {
        content: '';
        display: block;
        margin: auto;
        height: 3px;
        width: 0px;
        background: transparent;
        transition: width .5s ease, background-color .5s ease;
    }
    .hoverMenu:hover:after {
        width: 100%;
        background: black;
    }
</style>