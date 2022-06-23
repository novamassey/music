/* eslint-disable */
import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "@/views/HomeView.vue";
// import AboutView from "@/views/AboutView.vue";
// import ManageView from "@/views/ManageView.vue";
// import SongView from "@/views/SongView.vue";
import store from "@/store";

// creating chunks so only views loaded when needed to save space
const HomeView = () => import("@/views/HomeView.vue");
const AboutView = () => import("@/views/AboutView.vue");
const ManageView = () =>
  import(/* webpackChunkName: "groupedChunk" */ "@/views/ManageView.vue");
const SongView = () =>
  import(/* webpackChunkName: "groupedChunk" */ "@/views/SongView.vue");

const routes = [
  {
    name: "home",
    path: "/",
    component: HomeView,
  },
  {
    name: "about",
    path: "/about",
    component: AboutView,
  },
  {
    name: "manage",
    // alias: "/manage",
    path: "/manage-music",
    meta: {
      requiresAuth: true,
    },
    component: ManageView,
    beforeEnter: (to, from, next) => {
      console.log("manage route guard");
      next();
      console.log("to:", to, "from:", from, "next:", next);
    },
  },
  {
    path: "/manage",
    redirect: { name: "manage" },
  },
  {
    path: "/:catchAll(.*)*",
    redirect: { name: "home" },
  },
  {
    name: "song",
    path: "/song/:id",
    component: SongView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: "text-yellow-500",
});

//  before when no modules and only one store file
// router.beforeEach((to, from, next) => {
//   // console.log(to.matched);

//   if (!to.matched.some((record) => record.meta.requiresAuth)) {
//     next();
//     return;
//   }

//   if (store.state.userLoggedIn) {
//     next();
//   } else {
//     next({ name: "home" });
//   }
// });

// using modules in store method
router.beforeEach((to, from, next) => {
  //   console.log(to.matched, from);
  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    return;
  }

  if (store.state.auth.userLoggedIn) {
    next();
  } else {
    next({ name: "home" });
  }
});

export default router;
