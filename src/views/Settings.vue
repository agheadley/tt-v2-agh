<template>
  <v-container fluid>
    <v-card>
      <v-card-title>Clear Data</v-card-title>
      <v-card-actions>
        <v-btn text color="info" @click="openDialog('CLEAR SETTINGS')">Clear Settings</v-btn>
        <v-btn text color="info" @click="openDialog('CLEAR DATA')">Clear Data</v-btn>
      </v-card-actions>
    </v-card>
    <br>
    <v-card>
      <v-card-title>Timetable Name</v-card-title>
      <v-row align="baseline">
        <v-col>
          <v-card-text>
            <v-text-field v-model="settings.name" label="Name" readonly outlined></v-text-field>
          </v-card-text>
        </v-col>
        <v-col>
          <v-card-actions>
            <v-btn text color="info" @click="openDialog('TIMETABLE NAME')">Change Name</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
    <br>
    <v-card>
      <v-card-title>Lessons</v-card-title>
      <v-card-text>
        <template v-for="week in data.weeks">
          <b v-bind:key="week.id">WEEK {{week.name}}</b>
          <br v-bind:key="week.id">
          <v-simple-table v-bind:key="week.id">
            <thead>
              <tr>
                <th>id</th>
                <th>day</th>
                <th>period</th>
                <th>block</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="lesson in week.headers" v-bind:key="lesson.id">
                <td>{{lesson.id}}</td>
                <td>{{lesson.day}}</td>
                <td>{{lesson.period}}</td>
                <td>{{lesson.block}}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </template>
      </v-card-text>

      <v-card-actions>
        <v-btn text color="info" @click="openDialog('LESSONS')">UPDATE</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog" max-width="25em">
      <Reset
        v-if="action==='CLEAR SETTINGS' || action==='CLEAR DATA'"
        v-bind:action="action"
        v-on:close="dialog=false;"
      ></Reset>
      <Name v-if="action==='TIMETABLE NAME'" v-on:close="updateName"></Name>
      <Lessons v-if="action==='LESSONS'" v-on:close="updateLessons"></Lessons>
    </v-dialog>
  </v-container>
</template>

<script>
import * as store from "../scripts/store";
import Reset from "../components/Reset";
import Name from "../components/Name";
import Lessons from "../components/Lessons";

export default {
  name: "Settings",
  components: {
    Reset,
    Name,
    Lessons
  },
  data() {
    return {
      dialog: "",
      action: null,
      settings: null,
      data: null
    };
  },
  created() {
    this.settings = store.getSettings();
    this.data = store.getData();
  },

  methods: {
    openDialog(type) {
      this.action = type;
      this.dialog = true;
    },
    updateName(e) {
      console.log(e);
      console.log(this.settings.name);
      this.settings.name = e;
      this.dialog = false;
    },
    updateLessons() {
      this.settings = store.getSettings();
      this.dialog = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>