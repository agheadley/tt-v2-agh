
<template>
  <v-btn
    title="show all years / set year toggle"
    text
    small
    color="info"
    @click="isAllYears ? isAllYears=false : isAllYears=true"
  >
    <template v-if="!isAllYears">[ALL YRS]</template>
    <template v-else>[BACK]</template>
  </v-btn>
</template>
<!--
<template>
  <v-btn
    title="show all years / set year toggle"
    icons
    dark
    fab
    small
    @click="isAllYears ? isAllYears=false : isAllYears=true"
  >
    <template v-if="!isAllYears">
      <v-icon>mdi-plus-box-multiple</v-icon>
    </template>
    <template v-else>
      <v-icon>mdi-checkbox-blank</v-icon>
    </template>
  </v-btn>
</template>
-->

<script>
//import * as file from "../scripts/file";

export default {
  name: "AllYearSelect",
  data() {
    return {
      isAllYears: false
    };
  },
  watch: {
    isAllYears: function(val) {
      this.$emit("updateAllYears", val);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>