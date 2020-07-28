<template>
  <v-card>
    <v-card-title>Clear Data</v-card-title>
    <v-card-text>
      <br>Type
      <span style="color:red">
        <b>{{action}}</b>
      </span> into the box below and click delete to clear.
      <template v-if="action==='CLEAR SETTINGS'">
        <br>
        <b>Clearing settings, will also clear stored data.</b>
      </template>
      <br>
      <br>
      <v-text-field v-model="check" outlined clearable></v-text-field>
      <v-snackbar v-model="snackbar" timeout="3000">
        {{snackbarMessage}}
        <template v-slot:action="{ attrs }">
          <v-btn color="red" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
        </template>
      </v-snackbar>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="info" @click="clear">delete</v-btn>
      <v-btn text color="info" @click="$emit('close')">cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
//import * as file from "../scripts/file";
import * as store from "../scripts/store";
export default {
  name: "Reset",
  props: {
    action: String
  },
  data() {
    return {
      check: null,
      snackbar: false,
      snackbarMessage: "Error - please confirm to delete."
    };
  },
  methods: {
    clear() {
      if (this.action === "CLEAR SETTINGS" && this.check === "CLEAR SETTINGS") {
        store.resetSettings();
        this.$emit("close");
      } else if (this.action === "CLEAR DATA" && this.check === "CLEAR DATA") {
        store.resetData();
        this.$emit("close");
      } else this.snackbar = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>