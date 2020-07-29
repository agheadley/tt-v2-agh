

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
    processLessons(lessons) {
      let weekInfo = [...new Set(lessons.map(el => el.week))].sort();
      let weeks = weekInfo.map((el, i) => ({ id: i, name: el }));
      console.log(weeks);

      let blockInfo = [...new Set(lessons.map(el => el.block))]
        .filter(el => el)
        .sort();

      let blocks = blockInfo.map(el => ({ name: el, color: "#eeeeee" }));

      this.settings.blocks = blocks;
      this.settings.weeks = weeks;
      this.settings.lessons = lessons;

      store.setSettings(this.settings);
      store.resetData();

      this.settings = store.getSettings();

      this.$emit("close");
    }
  },
  watch: {
    chosenFile: function(val) {
      if (val) {
        console.log(file);
        file.read(val, data => {
          console.log(data);
          let lessons = file.csvProcess(data, [
            "week",
            "id",
            "day",
            "period",
            ["block", false]
          ]);
          console.log(lessons);
          if (lessons.valid) this.processLessons(lessons.data);
          else this.snackbar = true;
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>       