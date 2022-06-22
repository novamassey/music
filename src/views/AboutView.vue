<template>
  <main>
    <div class="about">
      <h1>This is an about page</h1>
    </div>
  </main>
</template>
<script>
export default {
  name: "AboutView",
  mounted() {
    console.log("about mounted");
  },
  unmounted() {
    console.log("about unmounted");
  },
};
</script>
