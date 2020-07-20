<template>
  <v-app>
      <v-content>
        <v-container fluid fill-height>
          <v-row>
            <v-col cols="12 text-center">
              <h1>Pendaftaran Berhasil</h1>
              <br>
              <v-tooltip v-model="showTool" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-card v-bind="attrs" v-on="on" @click="copyText" color="red" class="mx-auto" max-width="400">
                    <v-card-text class="black--text">
                      <h2 id="copyTextField">{{registerId}}</h2>
                    </v-card-text>
                  </v-card>
                </template>
                <span style="pointer-events: initial;">Klik untuk salin</span>
              </v-tooltip>
              <br>
              <p>Silahkan simpan kode ini untuk mengecek status request UMKM anda <span class="blue--text" style="cursor: pointer; border-bottom: 1px solid #2196F3">Disini</span></p>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
  </v-app>
</template>

<script>
export default {
    name:'SuccessRegister',

    data() {
      return {
        showTool: true
      }
    },

    methods: {
      copyText() {
        var value = document.getElementById('copyTextField').innerHTML;
        var input_temp = document.createElement("input");
        input_temp.value = value;
        document.body.appendChild(input_temp);
        input_temp.select();
        document.execCommand("copy");
        document.body.removeChild(input_temp);
      }
    },

    computed: {
      registerId() {
        return this.$store.state.registerId
      }
    }
}
</script>

<style>
.v-tooltip__content {
  pointer-events: initial;
}
</style>