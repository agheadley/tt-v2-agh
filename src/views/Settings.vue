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
      <v-card-text>
        <v-text-field v-model="settings.name" label="Name" readonly outlined></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="info" @click="openDialog('TIMETABLE NAME')">Update</v-btn>
      </v-card-actions>
    </v-card>
    <br>

    <v-card>
      <v-card-title>Data Validation</v-card-title>
      <v-card-text>
        <v-checkbox v-model="settings.checks.subject" label="Subject"></v-checkbox>
        <v-checkbox v-model="settings.checks.staff" label="Staff"></v-checkbox>
        <v-checkbox v-model="settings.checks.room" label="Rooms"></v-checkbox>
      </v-card-text>
    </v-card>
    <br>

    <v-card>
      <v-card-title>Lessons</v-card-title>
      <v-card-text>
        <v-simple-table v-for="week in data.weeks" v-bind:key="week.id">
          <thead>
            <tr>
              <th>WEEK {{week.name}}</th>
              <th>id</th>
              <th>day</th>
              <th>period</th>
              <th>block</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="lesson in week.headers" v-bind:key="lesson.id">
              <td>&nbsp;</td>
              <td>{{lesson.id}}</td>
              <td>{{lesson.day}}</td>
              <td>{{lesson.period}}</td>
              <td>{{lesson.block}}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>

      <v-card-actions>
        <v-btn text color="info" @click="openDialog('LESSONS')">UPDATE</v-btn>
      </v-card-actions>
    </v-card>
    <br>
    <template v-if="settings.blocks">
      <v-card>
        <v-card-title>Block Colours</v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-simple-table>
                <tbody>
                  <tr v-for="(block,index) in settings.blocks" v-bind:key="index">
                    <td>{{block.name}}</td>
                    <td :style="getColor(block)">&nbsp;&nbsp;</td>

                    <td>
                      <v-btn text color="info" @click="updateColor(index)">UPDATE</v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-col>
            <v-col>
              <v-color-picker v-model="color" hide-mode-switch mode="hexa"></v-color-picker>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions></v-card-actions>
      </v-card>
      <br>
      <v-card>
        <v-card-title>Years</v-card-title>
        <v-card-text>
          <v-simple-table>
            <thead>
              <tr>
                <th>Year Code</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(year,index) in settings.years" v-bind:key="year.id">
                <td>
                  <v-text-field
                    v-model="settings.years[index].name"
                    label="Year Code"
                    outlined
                    dense
                    @blur="checkYear(index)"
                  ></v-text-field>
                </td>
                <td>
                  <v-btn @click="deleteYear(index)" text small>
                    <v-icon dark>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
          <v-btn @click="addYear" class="mx-2" fab dark small color="info">
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
      <br>
      <v-card>
        <v-card-title>Subject List</v-card-title>
        <v-card-text>TBC</v-card-text>
        <v-card-actions></v-card-actions>
      </v-card>
      <br>
      <v-card>
        <v-card-title>Staff List</v-card-title>
        <v-card-text>TBC</v-card-text>
        <v-card-actions></v-card-actions>
      </v-card>
      <br>
      <v-card>
        <v-card-title>Room List</v-card-title>
        <v-card-text>TBC</v-card-text>
        <v-card-actions></v-card-actions>
      </v-card>
    </template>
    <v-snackbar v-model="snackbar" timeout="3000">
      {{snackbarMessage}}
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
    <v-dialog v-model="dialog" max-width="25em">
      <Reset
        v-if="action==='CLEAR SETTINGS' || action==='CLEAR DATA'"
        v-bind:action="action"
        v-on:close="updateReset"
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
      data: null,
      color: null,
      snackbar: false,
      snackbarMessage: ""
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

      this.data = store.getData();
      this.dialog = false;
    },
    updateReset() {
      this.settings = store.getSettings();
      this.data = store.getData();
      this.dialog = false;
    },
    updateColor(index) {
      this.settings.blocks[index].color = this.color.hex;
      store.setSettings(this.settings);
    },
    getColor(block) {
      return "background-color:" + block.color;
    },
    addYear() {
      this.settings.years.push({ id: this.settings.years.length, name: "*" });
      store.setSettings(this.settings);
    },
    deleteYear(index) {
      this.settings.years.splice(index, 1);
      store.setSettings(this.settings);
      this.snackbarMessage =
        "Warning - deleting years could cause timetable issues.";
      this.snackbar = true;
    },
    checkYear(index) {
      if (!this.settings.years[index].name) {
        this.snackbarMessage = "Warning - no text in year code";
        this.snackbar = true;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>