<template>
  <v-app>
      <v-content>
        <home-welcome></home-welcome>
        <Article></Article>
      </v-content>
      <v-footer
        class="justify-center"
        color="#292929"
        height="100"
      >
        <div class="title font-weight-light grey--text text--lighten-1 text-center">
          &copy; {{ (new Date()).getFullYear() }} — Made with 💜 by Pengabdi Srondol Kulon
        </div>
      </v-footer>
  </v-app>
</template>

<script>
import HomeWelcome from '@/components/Home/HomeWelcome'
import Article from '@/components/Home/Article'

export default {
  name: 'Home',
  components: {
    HomeWelcome,
    Article
  }
}
</script>

<style>
</style>