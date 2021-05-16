<template>
  <el-tabs v-model="state.activeName">
    <el-tab-pane
      v-for="pane of state.panes"
      :key="pane.name"
      :name="pane.name"
      :label="pane.name"
    >
      <component :is="pane.component" />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent, reactive, markRaw } from 'vue'
// components
import GitFork from './fork/index.vue'

export default defineComponent({
  setup(props, context) {
    const state = reactive({
      activeName: void 0,
      panes: [
        {
          name: 'GitFork',
          component: markRaw(GitFork),
        },
      ]
    })

    return {
      state
    }
  },
})
</script>
