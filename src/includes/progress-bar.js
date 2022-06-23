import NProgress from "nprogress";

// we will use navGuards to load progress bar when load component,
// to access router to do so we  need to import this file in main.js and pass the router
// to the ProgressBar
export default (router) => {
  router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
  });
  // afterEach is navGaurd that does not take next parameter, we dont invoke the
  // done function since it would run right away but we want to run afterEach is run
  router.afterEach(NProgress.done);
};
