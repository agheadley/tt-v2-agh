<template>
  <v-row justify="center">
    <v-row justify="center">
      <v-btn text color="info" @click="resetSettings">RESET SETTINGS</v-btn>
      <v-btn text color="info" @click="resetData">RESET DATA</v-btn>
    </v-row>

    <v-card flat outlined width="80%">
      <!--<v-card-title>Monitor v1</v-card-title>-->
      <v-card-text>
        <v-alert type="info">Choose a text file</v-alert>
        <v-file-input @click="isData=false" v-model="chosenFile" label="Choose file" outlined dense></v-file-input>
        <v-row>
          <v-col>
            <v-alert type="info">Column count</v-alert>
          </v-col>
          <v-col>
            <v-slider
              v-model="sliderCols"
              class="align-center"
              :max="maxCols"
              :min="minCols"
              hide-details
            >
              <template v-slot:append>
                <v-text-field
                  v-model="sliderCols"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 2em"
                ></v-text-field>
              </template>
            </v-slider>
          </v-col>
        </v-row>
        <v-divider/>
        <br>
        <template v-if="isData">
          <v-row>
            <v-btn color="info" @click="isCode = !isCode">{{ isCode ? 'Show Chars' : 'Show Codes' }}</v-btn>
            <v-spacer/>
            <template v-if="isCode">
              <v-btn color="info" @click="isHex = !isHex">{{ isHex ? 'Hex' : 'Decimal' }}</v-btn>
            </template>
          </v-row>
          <v-row justify="center">
            <v-simple-table v-if="isData">
              <thead>
                <tr>
                  <th v-for="header in data.headers" v-bind:key="header">{{header}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row,rowIndex) in data.content" v-bind:key="rowIndex">
                  <template v-if="isCode">
                    <td v-for="col in data.headers" v-bind:key="col.code">
                      <template v-if="isHex">{{row[col].code}}</template>
                      <template v-if="!isHex">{{row[col].hex}}</template>
                    </td>
                  </template>
                  <template v-if="!isCode">
                    <td v-for="col in data.headers" v-bind:key="col.code">{{row[col].char}}</td>
                  </template>
                </tr>
              </tbody>
            </v-simple-table>
          </v-row>
        </template>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script>
import * as file from "../scripts/file";
import * as store from "../scripts/store";

export default {
  name: "Settings",
  data() {
    return {
      chosenFile: null,
      data: null,
      raw: null,
      isData: false,
      isCode: false,
      isHex: false,
      maxCols: 60,
      minCols: 1,
      sliderCols: 10
    };
  },
  methods: {
    resetSettings() {
      store.resetSettings();
    },
    resetData() {
      store.resetData();
    }
  },
  watch: {
    chosenFile: function(val, oldVal) {
      console.log(val, oldVal);
      file.read(val, data => {
        this.raw = data;
        this.data = file.tabulate(data, this.sliderCols);
        this.isData = true;
      });
    },
    sliderCols: function(val, oldVal) {
      console.log(val, oldVal);
      if (this.isData) this.data = file.tabulate(this.raw, this.sliderCols);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
