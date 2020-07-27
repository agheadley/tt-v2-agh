<template>
  <v-container fluid>
    <v-row align="baseline">
      <v-col cols="2">{{settings.name}}</v-col>
      <!-- week year block select-->
      <v-col cols="3">
        <WeekSelect v-bind:weeks="settings.weeks" v-on:updateWeek="week=$event"></WeekSelect>
      </v-col>

      <v-col cols="3">
        <YearSelect v-bind:years="settings.years" v-on:updateYear="year=$event"></YearSelect>
      </v-col>
      <v-col cols="2">
        <AllYearSelect v-on:updateAllYears="isAllYears=$event;"></AllYearSelect>
      </v-col>
      <!-- / week year block select-->
      <v-col cols="2">
        <BlockSelect v-on:updateBlock="isBlock=$event"></BlockSelect>
      </v-col>
    </v-row>

    <!-- timetable entry-->
    <v-simple-table>
      <thead>
        <tr>
          <th>&nbsp;</th>

          <template v-if="!isBlock">
            <th
              v-for="(header,headerIndex) in data.weeks[week].headers"
              :style="getColor(headerIndex)"
              v-bind:key="header.id"
            >{{header.block}}</th>
          </template>
          <template v-if="isBlock">
            <th
              v-for="header in data.weeks[week].blocks"
              :style="getColor(header.headersIndex)"
              v-bind:key="header.id"
            >{{header.block}}</th>
          </template>
        </tr>
        <tr>
          <th>&nbsp;</th>

          <template v-if="!isBlock">
            <th
              v-for="(header,headerIndex) in data.weeks[week].headers"
              :style="getColor(headerIndex)"
              v-bind:key="header.id"
            >
              <b>{{header.name}}</b>
            </th>
          </template>

          <template v-if="isBlock">
            <th
              v-for="header in data.weeks[week].blocks"
              :style="getColor(header.headersIndex)"
              v-bind:key="header.id"
            >
              <b>{{header.name}}</b>
            </th>
          </template>

          <th>
            <v-btn text icon color="red">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row,rowIndex) in data.weeks[week].rows" v-bind:key="rowIndex">
          <template v-if="(row.year.id===year && !isAllYears) || isAllYears">
            <th>{{row.year.name}}</th>

            <template v-if="!isBlock">
              <td
                v-for="(header,headerIndex) in data.weeks[week].headers"
                :style="getColor(headerIndex)"
                v-bind:key="header.id"
                @click="edit(rowIndex,headerIndex)"
              >
                {{row.data[headerIndex].setInfo}}
                <br>
                <b>{{row.data[headerIndex].staffInfo}}</b>
                <br>
                <i>{{row.data[headerIndex].roomInfo}}</i>
              </td>
            </template>

            <template v-if="isBlock">
              <td
                v-for="header in data.weeks[week].blocks"
                :style="getColor(header.headersIndex)"
                v-bind:key="header.id"
              >
                {{row.data[header.headersIndex].setInfo}}
                <br>
                <b>{{row.data[header.headersIndex].staffInfo}}</b>
                <br>
                <i>{{row.data[header.headersIndex].roomInfo}}</i>
              </td>
            </template>

            <th>
              <v-btn text icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </th>
          </template>
        </tr>
      </tbody>
    </v-simple-table>

    <!--

    <template v-if="!isBlock">
      <v-simple-table>
        <thead>
          <tr>
            <th>Block</th>
            <th
              v-for="(header,headerIndex) in data.weeks[week].headers"
              :style="getColor(headerIndex)"
              v-bind:key="header.id"
            >{{header.block}}</th>
            <th></th>
          </tr>

          <tr>
            <th>Year</th>
            <th v-for="header in data.weeks[week].headers" v-bind:key="header.id">{{header.name}}</th>
            <th>
              <v-btn text icon color="red">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row,rowIndex) in data.weeks[week].rows" v-bind:key="rowIndex">
            <th>{{row.year.name}}</th>
            <td
              v-for="(col,colIndex) in row.data"
              v-bind:key="colIndex"
              @click="edit(rowIndex,colIndex)"
            >
              {{col.setInfo}}
              <br>
              <b>{{col.staffInfo}}</b>
              <br>
              <i>{{col.roomInfo}}</i>
            </td>
            <th>
              <v-btn text icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </th>
          </tr>
        </tbody>
      </v-simple-table>
    </template>

    <template v-if="isBlock">
      <v-simple-table>
        <thead>
          <tr>
            <th>Block</th>
            <th v-for="header in data.weeks[week].blocks" v-bind:key="header.id">{{header.block}}</th>
            <th></th>
          </tr>
          <tr>
            <th>Year</th>
            <th v-for="header in data.weeks[week].blocks" v-bind:key="header.id">{{header.name}}</th>
            <th>
              <v-btn text icon color="red">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row,rowIndex) in data.weeks[week].rows" v-bind:key="rowIndex">
            <th>{{row.year.name}}</th>
            <td
              v-for="header in data.weeks[week].blocks"
              v-bind:key="header.id"
              @click="edit(rowIndex,header.headersIndex)"
            >
              {{row.data[header.headersIndex].setInfo}}
              <br>
              <b>{{row.data[header.headersIndex].staffInfo}}</b>
              <br>
              <i>{{row.data[header.headersIndex].roomInfoInfoInfo}}</i>
            </td>
            <th>
              <v-btn text icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </th>
          </tr>
        </tbody>
      </v-simple-table>
    </template>

    -->
    <!-- /timetable entry-->
    <!-- add row-->
    <br>
    <v-btn @click="addRow" title="add row" fab dark small color="info">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <!-- / add row-->
    <!-- edit dialog -->
    <v-dialog v-model="dialog" max-width="20em">
      <EditLesson v-bind:active="active" v-on:updateLesson="updateLesson"></EditLesson>
    </v-dialog>
    <!-- / edit dialog -->
  </v-container>
</template>

<script>
import * as store from "../scripts/store";
import WeekSelect from "../components/WeekSelect";
import YearSelect from "../components/YearSelect";
import BlockSelect from "../components/BlockSelect";
import AllYearSelect from "../components/AllYearSelect";
import EditLesson from "../components/EditLesson";

export default {
  name: "Master",
  components: {
    WeekSelect,
    YearSelect,
    BlockSelect,
    AllYearSelect,
    EditLesson
  },
  data() {
    return {
      settings: null,
      data: null,
      week: 0,
      year: 0,

      isBlock: false,
      isAllYears: false,

      dialog: false,
      active: null
    };
  },
  created() {
    this.settings = store.getSettings();
    this.data = store.getData();
  },
  methods: {
    addRow() {
      store.addRow(this.week, this.year);
      this.data = store.getData();
      //console.log(this.data.weeks[0]);
    },

    edit(row, col) {
      store.setActive(this.week, row, col);
      this.active = store.getActive();
      this.dialog = true;
    },

    updateLesson() {
      this.data = store.getData();
      this.dialog = false;
    },

    getColor(headerIndex) {
      let block = this.data.weeks[this.week].headers[headerIndex].block;
      let style = "";
      if (block !== "") {
        let colorArr = this.settings.blocks.filter(el => el.name === block);
        //console.log(colorArr);
        style = "background-color:" + colorArr[0].color;
      }
      return style;
    }
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
td {
  max-width: 5em;
  overflow: hidden;
}
</style>
