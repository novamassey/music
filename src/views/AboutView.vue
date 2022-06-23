<template>
  <main>
    <div class="about">
      <h1>This is an about page</h1>
    </div>
  </main>
</template>
<script>
import dummyModule from "@/store/modules/dummy";

export default {
  name: "AboutView",
  created() {
    this.$store.registerModule("dummy", dummyModule);
  },
  mounted() {
    // console.log("about mounted");
  },
  // unmounted() {
  //   console.log("about unmounted");
  // },
};
</script>
