


<template>
  <v-btn
    title="master/block toggle"
    icons
    fab
    dark
    small
    color="info"
    @click="isBlock ? isBlock=false : isBlock=true"
  >
    <template v-if="!isBlock">
      <v-icon>mdi-shape</v-icon>
    </template>
    <template v-else>
      <v-icon>mdi-view-week-outline</v-icon>
    </template>
  </v-btn>
</template>

<script>
//import * as file from "../scripts/file";

export default {
  name: "BlockSelect",
  data() {
    return {
      isBlock: false
    };
  },
  watch: {
    isBlock: function(val) {
      this.$emit("updateBlock", val);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>