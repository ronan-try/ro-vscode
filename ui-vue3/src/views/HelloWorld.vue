<template>
  <div class="tools_board">
    <el-button
      class="tools_board-btn"
      @click="onClickMr"
    >
      Make a mr / pr
    </el-button>
    <el-button
      class="tools_board-btn"
      @click="onClickFork"
    >
      Fork？？
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import vscodePostMessage from '../composables/vscodePostMessage';

export default defineComponent({
  name: "HelloWorld",
  setup () {
    const onClickMr = () => {
      vscodePostMessage({
        command: "ro_mr",
        text: "good luck",
      })
    }

    const onClickFork = () => {
      vscodePostMessage({
        command: "alert",
        text: "good luck",
      })
    }

    return {
      onClickMr,
      onClickFork,
    }
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
