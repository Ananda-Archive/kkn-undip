<template>
  <v-app>
    <v-app-bar dark app flat color="#C0392B" class="absolute px-2" v-if="!$vuetify.breakpoint.smAndDown && this.$route.meta.drawer">
      <v-btn @click="goTo('/')" icon class="pa-1"><v-img src="./assets/logo-1.png" contain width="20"></v-img></v-btn>
      <v-toolbar-title @click="goTo('/')" style="cursor: pointer" class="font-weight-bold">SRONDOL KULON</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title @click="goTo('/Dashboard')" v-if="this.uid" class="mr-10" style="cursor: pointer"><span class="hoverMenu">Dashboard</span></v-toolbar-title>
      <v-toolbar-title @click="goTo('/ListUmkm')" class="mr-10" style="cursor: pointer"><span :class="[this.$route.name == 'ListUmkm' ? 'selectedMenu' : 'hoverMenu']">Daftar UMKM</span></v-toolbar-title>
      <v-toolbar-title @click="goTo('/ListArticle')" class="mr-10" style="cursor: pointer"><span :class="[this.$route.name == 'ListArticle' ? 'selectedMenu' : 'hoverMenu']">Artikel</span></v-toolbar-title>
      <!-- <v-toolbar-title class="mr-5" style="cursor: pointer"><span :class="[this.$route.name == 'About' ? 'selectedMenu' : 'hoverMenu']">Tentang</span></v-toolbar-title> -->
    </v-app-bar>
    <v-app-bar dark app flat color="#C0392B" class="absolute px-2"  v-else-if="$vuetify.breakpoint.smAndDown && this.$route.meta.drawer">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-btn @click="goTo('/')" icon class="pa-2 mr-2"><v-img src="./assets/logo-1.png" contain width="10"></v-img></v-btn>
      <v-toolbar-title @click="goTo('/')" style="cursor: pointer" class="font-weight-bold">SRONDOL KULON</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer app dark v-model="drawer">
      <v-list dense>
        <v-list-item @click="goTo('/')" link>
          <v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon>
          <v-list-item-title>Beranda</v-list-item-title>
        </v-list-item>
        <v-list-item @click="goTo('/Dashboard')" link v-if="this.uid">
          <v-list-item-icon><v-icon>mdi-monitor-dashboard</v-icon></v-list-item-icon>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>
        <v-list-item @click="goTo('/ListUmkm')" link>
          <v-list-item-icon><v-icon>mdi-format-list-text</v-icon></v-list-item-icon>
          <v-list-item-title>Daftar UMKM</v-list-item-title>
        </v-list-item>
        <v-list-item @click="goTo('/ListArticle')" link >
          <v-list-item-icon><v-icon>mdi-newspaper</v-icon></v-list-item-icon>
          <v-list-item-title>Artikel</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="logout" v-if="this.uid">
          <v-list-item-icon><v-icon class="red--text">mdi-power</v-icon></v-list-item-icon>
          <v-list-item-title class="red--text">Keluar</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar dark app flat color="#C0392B" class="absolute px-2" v-if="!$vuetify.breakpoint.smAndDown && this.$route.meta.auth">
      <v-btn @click="goTo('/')" icon class="pa-1"><v-img src="./assets/logo-1.png" contain width="20"></v-img></v-btn>
      <v-toolbar-title @click="goTo('/')" style="cursor: pointer" class="font-weight-bold">SRONDOL KULON</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title @click="goTo('/Dashboard')" class="mr-10" style="cursor: pointer"><span :class="[this.$route.name == 'Dashboard' ? 'selectedMenu' : 'hoverMenu']">UMKM</span></v-toolbar-title>
      <v-toolbar-title @click="goTo('/dashboardArticle')" class="mr-10" style="cursor: pointer"><span :class="[this.$route.name == 'DashboardArticle' ? 'selectedMenu' : 'hoverMenu']">Artikel</span></v-toolbar-title>
      <v-btn icon @click="logout">
        <v-icon>mdi-power</v-icon>
      </v-btn>
    </v-app-bar>
    <v-app-bar dark app flat color="#C0392B" class="absolute px-2"  v-else-if="$vuetify.breakpoint.smAndDown && this.$route.meta.auth">
      <v-app-bar-nav-icon @click.stop="drawer2 = !drawer2"/>
      <v-btn @click="goTo('/Dashboard')" icon class="pa-2 mr-2"><v-img src="./assets/logo-1.png" contain width="10"></v-img></v-btn>
      <v-toolbar-title @click="goTo('/')" style="cursor: pointer" class="font-weight-bold">Admin</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer app dark v-model="drawer2">
      <v-list dense>
        <v-list-item @click="goTo('/')" link>
          <v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon>
          <v-list-item-title>Beranda</v-list-item-title>
        </v-list-item>
        <v-list-item @click="goTo('/Dashboard')" link>
          <v-list-item-icon><v-icon>mdi-format-list-text</v-icon></v-list-item-icon>
          <v-list-item-title>UMKM</v-list-item-title>
        </v-list-item>
        <v-list-item @click="goTo('/dashboardArticle')" link >
          <v-list-item-icon><v-icon>mdi-newspaper</v-icon></v-list-item-icon>
          <v-list-item-title>Artikel</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="logout">
          <v-list-item-icon><v-icon class="red--text">mdi-power</v-icon></v-list-item-icon>
          <v-list-item-title class="red--text">Keluar</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <router-view></router-view>
  </v-app>
</template>

<script>

import {firebaseApp} from './firebase'

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    drawer: false,
    drawer2: false,
  }),

  methods: {
    goTo(path) {
      this.$router.push(path)
    },
    logout() {
      firebaseApp.auth().signOut()
        .then( () => {
          this.$store.dispatch('mutateUid',null)
          this.$router.push('/loginAdmin')
        })
        .catch( (err) => {
          alert(err)
        })
    }
  },

  computed: {
    uid() {
        return this.$store.state.uid
    },
    homeNav() {
      return this.$store.state.homeNav
    },
    adminNav() {
      return this.$store.state.adminNav
    }
  }
  
};
</script>

<style scoped>
  .selectedMenu:after {
        content: '';
        display: block;
        margin: auto;
        height: 3px;
        width: 100%;
        background: black;
        transition: width .5s ease, background-color .5s ease;
  }
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