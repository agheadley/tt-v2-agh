


<template>
  <v-select
    v-model="year"
    :items="years"
    label="Year"
    item-text="name"
    item-value="id"
    outlined
    dense
  />
</template>

<script>
//import * as file from "../scripts/file";

export default {
  name: "YearSelect",
  data() {
    return {
      year: 0
    };
  },
  props: {
    years: Array
  },
  watch: {
    year: function(val) {
      this.$emit("updateYear", val);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>