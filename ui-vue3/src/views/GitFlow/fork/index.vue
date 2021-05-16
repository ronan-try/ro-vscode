<template>
  <el-container class="gitfork">
    <el-aside
      width="280px"
      style="padding:10px; text-align:left; background-color:rgb(238, 241, 246)"
    >
      <h1 style="margin:0; font-size:24px; color:#F56C6C;">Git Fork:</h1>
      <div>
        <p
          :class="{ 'step-actived': state.curProject }"
          class="gitfork_step step-1"
          title="点击重新选择项目"
          @click="reSelectPro"
        >*1. 选择项目: {{ state.curProject.projectName }}</p>
        <p
          class="gitfork_step step-2"
          :class="{ ' step-actived': state.checkGit }"
        >2. 确认Git仓库：{{ state.checkGit }} </p>
        <p
          class="gitfork_step step-3"
          :class="{ ' step-actived': state.checkTarget }"
        >3. 添加目标仓库: {{ state.checkTarget }} </p>
        <p
          class="gitfork_step step-4"
          :class="{ ' step-actived': state.checkFetch }"
        >4. Fetch目标仓库: {{ state.checkFetch }} </p>
        <p
          class="gitfork_step step-5"
          :class="{ ' step-actived': state.checkBranches }"
        >5. 获取目标的branch：{{ state.checkBranches }} </p>
        <p
          :class="{ 'step-actived': state.checkFork }"
          class="gitfork_step step-6"
        >6. 选择目标branch：{{ state.checkFork }} </p>
        <p
          :class="{ 'step-actived': state.checkFork }"
          class="gitfork_step step-7"
        >7. 命名本地开发branch：{{ state.checkFork }} </p>
        <p
          class="gitfork_step step-8"
          :class="{ ' step-actived': state.checkFork }"
        >8. Forking: {{ state.checkFork }} </p>
        <p
          class="gitfork_step step-9"
          :class="{ ' step-actived': state.checkTrack }"
        >9. Tracking {{ state.checkTrack }} </p>
      </div>
    </el-aside>
    <el-main style="padding-top:0; background-color: #e3e3e3">
      <div
        v-if="state.curProject"
        style="text-align:left; font-size:14px;"
      >
        <p>
          <span style="color:red;">LocalPath: </span> {{ state.curProject.localPath }} <br>
          <span style="color:red;">TargetRepo: </span> {{ state.curProject.targetRepo }} <br>
        </p>
      </div>
      <div
        v-show="!state.checkGit"
        style="text-align:left;"
      >
        <el-button @click="checkGitRepo">手动 确认Git仓库信息</el-button>
      </div>
      <!-- 下拉选择目标分支 -->
      <div
        v-show="state.checkBranches && !state.checkFork && !state.checkTrack"
        style="text-align:left;"
      >
        <el-select
          v-model="state.selectedTargetBranch"
          filterable
          placeholder="选择目标仓库branch"
          style="width:100%;"
        >
          <el-option
            v-for="item in state.branches"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <br>
        <br>
        <el-input v-model="state.inputedLocalBranch" placeholder="填写本地开发Branch" />
        <br>
        <br>
        <el-button @click="onForking">forking</el-button>
      </div>
      <div
        v-if="state.checkFork"
        style="text-align:left;"
      >
        <span style="color:red;">Target branch: </span> {{ state.selectedTargetBranch }} <br>
        <span style="color:red;">Dev branch: </span> {{ state.inputedLocalBranch }} <br>
      </div>
      <div
        v-if="state.checkTrack"
        style="margin:30px; font-size:30px;"
      >
        😀😃😄😁😆🙂😉😊🥰😍
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { toRaw, reactive, onMounted } from 'vue';
// enums
import * as MsgType from '@Ronan-try/cli-const/es/wsMessageType'
// composables
import vscodePostMessage from '../../../composables/vscodePostMessage';

const jsonString = JSON.stringify;
const jsonParse = JSON.parse;

const ws = {
  send () {},
  onmessage () {},
}

export default {
  name: 'GitFork',
  setup () {
    const state = reactive({
      mustInfos: [],
      projects: [],
      branches: [],
      selectedTargetBranch: null,
      inputedLocalBranch: null,
      checkGit: false,
      checkTarget: false,
      checkFetch: false,
      checkBranches: false,
      checkFork: false,
      checkTrack: false,

      // curProject
      curProject: {
        projectName: 'xxx',
        localPath: 'xxxxxxx',
        targetRepo: 'xxxxxxxxxxxxxxxxxx',
      },
    })

    onMounted(() => {
      const handler = () => {
        ws.send(toJSONString({ type: MsgType.cacheProjects }));
        ws.onmessage = (event) => {
          const objMsg = toJSONParse(event.data);

          if (objMsg.type === MsgType.cacheProjects) {
            this.projects = objMsg.data;
          } else if (objMsg.type === MsgType.addTargetUpstream) {
            if (objMsg.data.success) {
              this.checkTarget = true;
              ws.send(toJSONString({
                type: MsgType.fetchRocliUpstream,
                data: toRaw(state.curProject),
              }));
            } else {
              console.error('啊呀，坏了');
            }
          } else if (objMsg.type === MsgType.fetchRocliUpstream) {
            if (objMsg.data.success) {
              this.checkFetch = true;
              ws.send(toJSONString({
                type: MsgType.gitBranchR,
                data: toRaw(state.curProject),
              }));
            } else {
              console.error('啊啊啊啊，坏了');
            }
          } else if (objMsg.type === MsgType.gitBranchR) {
            if (objMsg.data.success) {
              this.checkBranches = true;
              this.branches = objMsg.data.branches;
            } else {
              console.error('啊啊啊啊， 坏了');
            }
          } else if (objMsg.type === MsgType.gitFork) {
            if (objMsg.data.success) {
              state.checkFork = true;

              ws.send(toJSONString({
                type: MsgType.gitTrack,
                data: {
                  project: toRaw(state.curProject),
                  localBranch: this.inputedLocalBranch,
                },
              }));
            } else {
              console.error('啊啊啊啊啊，坏了');
            }
          } else if (objMsg.type === MsgType.gitTrack) {
            if (objMsg.data.success) {
              this.checkTrack = true;
              this.onOpenVSCode();
            }
          }
        };
      };
      if (ws.readyState === 1) {
        handler();
      } else {
        ws.onopen = handler;
      }
    })

    function checkGitRepo() {
      state.checkGit = true;

      vscodePostMessage({
        type: MsgType.ADD_TARGET_UPSTREAM,
        command: MsgType.ADD_TARGET_UPSTREAM,
        text: MsgType.ADD_TARGET_UPSTREAM,
        data: toRaw(state.curProject),
      })
    }
    function onForking() {
      ws.send(toJSONString({
        type: MsgType.gitFork,
        data: {
          project: toRaw(state.curProject),
          localBranch: this.inputedLocalBranch,
          targetBranch: this.selectedTargetBranch,
        },
      }));
    }
    function onOpenVSCode() {
      ws.send(toJSONString({
        type: MsgType.openWithVSCode,
        data: toRaw(state.curProject),
      }));
    }
    function onOpenFolder() {
      ws.send(toJSONString({
        type: MsgType.openWithFolder,
        data: toRaw(state.curProject),
      }));
    }
    function reSelectPro() {
      state.checkGit = false;
      state.checkGit = false;
      this.checkTarget = false;
      this.checkFetch = false;
      this.checkBranches = false;
      state.checkFork = false;
      this.checkTrack = false;
    }
    function reCheckFork() {
      state.checkFork = false;
      this.checkTrack = false;
    }

    return {
      state,
      checkGitRepo,
      onForking,
      onOpenVSCode,
      onOpenFolder,
      reSelectPro,
      reCheckFork,
    }
  },
};
</script>

<style>
.gitfork_step {
  opacity: .3;
}
.gitfork_step.step-1,
.gitfork_step.step-6,
.gitfork_step.step-7 {
  cursor: pointer;
}
.gitfork_step.step-actived {
  opacity: 1;
  color: #409EFF;
}
</style>
