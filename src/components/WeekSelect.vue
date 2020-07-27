<template>
  <v-select
    v-model="week"
    :items="weeks"
    label="Week"
    item-text="name"
    item-value="id"
    outlined
    dense
  />
</template>

<script>
//import * as file from "../scripts/file";

export default {
  name: "WeekSelect",
  props: {
    weeks: Array
  },
  data() {
    return {
      week: 0
    };
  },
  watch: {
    week: function(val) {
      console.log("***", val);
      this.$emit("updateWeek", val);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>