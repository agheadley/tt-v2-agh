<template>
  <v-card>
    <v-card-title>Change Name</v-card-title>
    <v-card-text>
      <v-text-field
        v-model="settings.name"
        label="Current Timetable Model Name"
        description="Current Timetable Model Name"
        outlined
        clearable
        counter
        @input="removeInvalidName"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="info" @click="store">store</v-btn>
      <v-btn text color="info" @click="$emit('close')">cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
//import * as file from "../scripts/file";
import * as store from "../scripts/store";

export default {
  name: "Name",
  data() {
    return {};
  },
  computed: {
    settings: function() {
      return store.getSettings();
    }
  },
  methods: {
    removeInvalidName() {
      if (this.settings.name !== null) {
        this.settings.name = this.settings.name.replace(/[^A-Za-z0-9-]/, "");
      } else {
        this.settings.name = "timetable1";
      }
    },
    store() {
      if (this.settings.name === null) this.settings.name = "timetable1";
      store.setSettings(this.settings);
      this.$emit("close", this.settings.name);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>