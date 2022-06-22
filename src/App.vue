<template>
  <!-- eslint-disable vuejs-accessibility/label-has-for-->
  <!-- eslint-disable max-len -->
  <AppHeader> </AppHeader>

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
  <AppPlayer></AppPlayer>
  <AuthModal></AuthModal>

  <!-- eslint-disable max-len -->
  <!-- eslint-disable vuejs-accessibility/label-has-for-->
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import AuthModal from "./components/AppAuth.vue";
import AppPlayer from "./components/AppPlayer.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AuthModal,
    AppPlayer,
  },
  created() {
    this.$store.dispatch("init_login");
  },
};
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.5s linear;
}
.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0l;
}
</style>
