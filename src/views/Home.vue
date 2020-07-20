<template>
  <v-app>
      <v-content>
        <home-welcome></home-welcome>
        <Article></Article>
        <Counting></Counting>
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
      <v-overlay :value="overlayLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
  </v-app>
</template>

<script>
import HomeWelcome from '@/components/Home/HomeWelcome'
import Article from '@/components/Home/Article'
import Counting from '@/components/Home/Counting'

export default {
  name: 'Home',
  components: {
    HomeWelcome,
    Article,
    Counting
  },
  data() {
    return {
      overlayLoading: false,
    }
  }
}
</script>

<style>
</style>