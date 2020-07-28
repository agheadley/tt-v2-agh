

 <template>
  <v-card>
    <v-card-title>Choose File</v-card-title>
    <v-card-text>
      <v-file-input v-model="chosenFile" label="Choose file" outlined dense></v-file-input>
      <v-divider/>
      <v-snackbar v-model="snackbar" timeout="3000">File not valid, upload another.
        <template v-slot:action="{ attrs }">
          <v-btn color="red" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
        </template>
      </v-snackbar>
    </v-card-text>
    <v-card-actions></v-card-actions>
  </v-card>
</template>

<script>
//import * as file from "../scripts/file";
import * as store from "../scripts/store";
import * as file from "../scripts/file";

export default {
  name: "Lessons",
  data() {
    return {
      chosenFile: null,
      settings: null,
      snackbar: false
    };
  },
  created() {
    this.settings = store.getSettings();
  },
  methods: {
    checkLessons(raw) {
      let data = file.CSVToArray(raw, ",");
      let valid = true;
      let lessons = [];
      console.log(data);
      for (let [rowIndex, row] of data.entries()) {
        let obj = {};
        for (let [i, col] of data[0].entries()) {
          if (col !== "block" && !row[i]) valid = false;
          else obj[col] = row[i];
        }
        if (rowIndex > 0) lessons.push(obj);
      }

      let keys = Object.keys(lessons[0]);
      let check = ["id", "day", "period", "week", "block"];
      for (let item of check) {
        if (keys.indexOf(item) === -1) valid = false;
      }

      let weekInfo = [...new Set(lessons.map(el => el.week))].sort();
      let weeks = weekInfo.map((el, i) => ({ id: i, name: el }));
      console.log(weeks);

      let blockInfo = [...new Set(lessons.map(el => el.block))]
        .filter(el => el)
        .sort();

      let blocks = blockInfo.map(el => ({ name: el, color: "#eeeeee" }));

      //console.log(blocks);
      //console.log(valid);
      //console.log(lessons);
      if (valid) {
        this.settings.blocks = blocks;
        this.settings.weeks = weeks;
        this.settings.lessons = lessons;

        store.setSettings(this.settings);
        store.resetData();

        this.settings = store.getSettings();

        this.$emit("close");
      } else {
        this.snackbar = true;
      }

      //this.settings=store.getSettings()
    }
  },
  watch: {
    chosenFile: function(val) {
      if (val) {
        console.log(file);
        file.read(val, data => {
          console.log(data);
          this.checkLessons(data);
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>       