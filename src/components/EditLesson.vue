<template>
  <v-card>
    <v-card-title>{{active.name}}</v-card-title>
    <v-card-text>
      <v-text-field
        label="set"
        dense
        outlined
        :rules="classRules"
        hint="(valid subject)/(set number)"
        persistent-hint
        counter
        maxlength="10"
        v-model="active.setInfo"
      ></v-text-field>
      <v-text-field
        label="staff"
        dense
        outlined
        :rules="staffRules"
        hint="(valid staff initials)"
        persistent-hint
        counter
        maxlength="4"
        v-model="active.staffInfo"
      ></v-text-field>
      <v-text-field
        label="room"
        dense
        outlined
        :rules="roomRules"
        hint="(valid room code)"
        persistent-hint
        counter
        maxlength="10"
        v-model="active.roomInfo"
      ></v-text-field>

      <v-snackbar v-model="snackbar" timeout="3000">
        {{snackbarMessage}}
        <template v-slot:action="{ attrs }">
          <v-btn color="red" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
        </template>
      </v-snackbar>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="info" text @click="store()">store</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import * as store from "../scripts/store";

export default {
  name: "EditLesson",
  data() {
    return {
      classRules: [
        v => !!v || "class required",
        v => /.+\/.+/.test(v) || "Subject/Set",
        v => v.length <= 10 || "Max 10 characters"
      ],
      staffRules: [
        //v => !!v || "staff required",
        v => v.length <= 4 || "Max 4 characters"
      ],
      roomRules: [
        //v => !!v || "room required",
        v => v.length <= 10 || "Max 10 characters"
      ],
      snackbar: false,
      snackbarMessage: ""
    };
  },
  props: {
    active: Object
  },
  created() {},
  methods: {
    store() {
      let isValid = true;
      this.snackbarMessage = "";

      if (!this.checksetInfo()) isValid = false;
      if (!this.checkStaffInfo()) isValid = false;
      if (!this.checkRoomInfo()) isValid = false;

      if (isValid) this.updateLesson();
      else this.snackbar = true;
    },
    updateLesson() {
      store.storeActive(
        this.active.setInfo,
        this.active.staffInfo,
        this.active.roomInfo
      );
      this.$emit("updateLesson");
    },
    checkStaffInfo() {
      let isValid = true;
      this.active.staffInfo = (" " + this.active.staffInfo)
        .toUpperCase()
        .replace(/ /g, "");

      let list = store.getSettings().staff.map(el => el.initials);
      console.log(list, this.active.staffInfo);
      if (list.indexOf(this.active.staffInfo) === -1) isValid = false;

      if (this.active.staffInfo === "") isValid = true; // accepts blanks here
      if (!isValid) this.snackbarMessage += "Invalid staff entry. ";
      return isValid;
    },
    checkRoomInfo() {
      let isValid = true;
      this.active.roomInfo = (" " + this.active.roomInfo).replace(/ /g, "");

      let list = store.getSettings().rooms.map(el => el.room);
      console.log(list, this.active.roomInfo);
      if (list.indexOf(this.active.roomInfo) === -1) isValid = false;

      if (this.active.roomInfo === "") isValid = true; // accepts blanks here
      if (!isValid) this.snackbarMessage += "Invalid room entry. ";
      return isValid;
    },
    checksetInfo() {
      let isValid = true;

      this.active.setInfo = (" " + this.active.setInfo).replace(/ /g, "");

      if (this.active.setInfo) {
        if (this.active.setInfo.length > 2) {
          if (this.active.setInfo.indexOf("/") > 0) {
            let subjectSet = this.active.setInfo.split("/");
            let list = store.getSettings().subjects.map(el => el.subject);
            //console.log(list, subjectSet[0]);
            if (list.indexOf(subjectSet[0]) === -1) isValid = false;
            if (subjectSet[1].length < 1) isValid = false;
          } else isValid = false;
        } else isValid = false;
      } else isValid = false;

      if (!isValid) this.snackbarMessage += "Invalid set entry. ";
      return isValid;
    }
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>