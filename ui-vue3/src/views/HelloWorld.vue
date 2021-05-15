<template>
  <div class="tools_board">
    <el-button id="ro_mr" class="tools_board-btn" @click="onClickMr"
      >Mr？</el-button
    >
    <el-button class="tools_board-btn">Fork？？</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface vscode {
  postMessage(message: any): void;
}
// // declare const vscode: vscode;

declare let acquireVsCodeApi: Function;

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    onClickMr() {
      const vscode = acquireVsCodeApi() as vscode;
      vscode.postMessage({
        command: "ro_mr",
        text: "good luck",
      });
    },
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
