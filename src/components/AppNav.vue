<template>
    <v-app-bar app color="black" class="fixed" flat>
        <v-toolbar-title style="cursor: pointer">UMKM SRONDOL KULON</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title class="mr-10" style="cursor: pointer">
            <span class="hoverMenu">Daftar UMKM</span>
        </v-toolbar-title>
        <v-toolbar-title class="mr-10" style="cursor: pointer">
            <span class="hoverMenu">Tentang</span>
        </v-toolbar-title>
    </v-app-bar>
</template>

<script>
export default {
    name: 'AppNav',

    data() {
        return {
        }
    }
}
</script>

<style>
    .hoverMenu {
        padding: 3px;
        background: linear-gradient(black, black) bottom / 0 .4em no-repeat;
        transition: .2s background-size;
    }
    .hoverMenu:hover {
        background-size: 100% .1em;
    }
</style>