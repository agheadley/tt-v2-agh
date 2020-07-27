<template>
  <div id="app">
    <v-app>
      <v-app-bar app class="d-print-none">
        <v-toolbar-title>TT v1</v-toolbar-title>
        <v-spacer></v-spacer>

        <template v-slot:extension>
          <v-tabs color="info" v-model="tabs">
            <v-tab href="#">master</v-tab>
            <v-tab href="#">staff</v-tab>
            <v-tab href="#">room</v-tab>
            <v-tab href="#">
              <v-icon>mdi-cog</v-icon>
            </v-tab>

            <v-tabs-slider color="red"></v-tabs-slider>
          </v-tabs>
        </template>
      </v-app-bar>
      <v-main>
        <v-container fluid>
          <Master v-if="tabs===0"></Master>
          <Staff v-if="tabs===1"></Staff>
          <Room v-if="tabs===2"></Room>
          <Settings v-if="tabs===3"></Settings>
        </v-container>
      </v-main>
      <v-footer app class="d-print-none">
        <v-toolbar-title>AGH</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-item-group>
          <v-row>
            <v-col>
              <v-btn icon>
                <v-icon>mdi-import</v-icon>
              </v-btn>
            </v-col>

            <v-col>
              <v-btn icon @click="print">
                <v-icon>mdi-printer</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn icon>
                <v-icon>mdi-export</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn icon @click="dialog=true">
                <v-icon>mdi-close-circle</v-icon>
              </v-btn>
              <v-dialog v-model="dialog" max-width="50%">
                <v-card>
                  <v-card-text>
                    <v-container>Close Application?</v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" text @click="dialog=false">cancel</v-btn>
                    <v-btn color="red" text @click="exit">exit</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
        </v-item-group>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import * as store from "./scripts/store";

import Settings from "./views/Settings";
import Master from "./views/Master";

import Staff from "./views/Staff";
import Room from "./views/Room";

export default {
  name: "App",
  data() {
    return {
      tabs: null,
      dialog: false
    };
  },
  components: {
    Settings,
    Master,
    Staff,
    Room
  },
  created() {
    store.init();
  },
  methods: {
    print() {
      console.log("print");
      window.print();
    },
    exit() {
      this.dialog = false;
      window.close();
    }
  }
};
</script>