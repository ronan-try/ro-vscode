import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router';
import HelloWorld from '../views/HelloWorld.vue';
import GitFlow from '../views/GitFlow/index.vue';

import { markRaw } from 'vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HelloWorld',
    component: markRaw(HelloWorld),
  },
  // {
  //   path: '/projects',
  //   name: 'Projects',
  //   // route level code-splitting
  //   // this generates a separate chunk (projects.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "projects" */ '../views/Projects.vue'),
  // },
  // {
  //   path: '/create',
  //   name: 'Create',
  //   component: () => import('../views/Create.vue'),
  // },
  // {
  //   path: '/import',
  //   name: 'Import',
  //   component: () => import('../views/Import.vue'),
  // },
  {
    path: '/gitflow',
    name: 'GitFlow',
    component: markRaw(GitFlow),
    // component: () => import(/* webpackChunkName: "gitflow" */ '../views/GitFlow/index.vue'),
  },
];

const router = createRouter({
  // history
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(process.env.BASE_URL),
  // history: createWebHistory(),
  // // hash
  // history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
