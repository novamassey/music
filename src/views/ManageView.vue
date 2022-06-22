<template>
  <!-- eslint-disable  -->
  <main>
    <section class="container mx-auto mt-6">
      <div class="md:grid md:grid-cols-3 md:gap-4">
        <div class="col-span-1">
          <AppUpload ref="upload" :addSong="addSong"></AppUpload>
        </div>
        <div class="col-span-2">
          <div
            class="bg-white rounded border border-gray-200 relative flex flex-col"
          >
            <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
              <span class="card-title">{{ $t("manage.my_songs") }}</span>
              <i
                class="fa fa-compact-disc float-right text-green-400 text-2xl"
              ></i>
            </div>
            <div class="p-6">
              <!-- Composition Items -->
              <CompositionItem
                v-for="(song, index) in songs"
                :key="song.docID"
                :song="song"
                :updateSong="updateSong"
                :index="index"
                :removeSong="removeSong"
                :updateUnsavedFlag="updateUnsavedFlag"
              ></CompositionItem>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- eslint-disable  -->
</template>

<script>
// import store from "@/store";
import AppUpload from "@/components/AppUpload.vue";
import CompositionItem from "@/components/CompositionItem.vue";
import { songsCollection, auth } from "@/includes/firebase";

export default {
  name: "ManageView",
  components: {
    AppUpload,
    CompositionItem,
  },
  data() {
    return {
      songs: [],
      unsavedFlag: false,
    };
  },
  mounted() {
    console.log("manage mounted");
  },
  unmounted() {
    console.log("manage unmounted");
  },
  async created() {
    const snapshot = await songsCollection
      .where("uid", "==", auth.currentUser.uid)
      .get();

    snapshot.forEach(this.addSong);
    // snapshot.forEach((document)=>{
    //     const song = {
    //     ...document.data(),
    //     docID: document.id,
    //   };
    // })
  },
  methods: {
    updateSong(index, values) {
      this.songs[index].modified_name = values.modified_name;
      this.songs[index].genre = values.genre;
    },
    removeSong(index) {
      this.songs.splice(index, 1);
    },
    addSong(document) {
      const song = {
        ...document.data(),
        docID: document.id,
      };
      this.songs.push(song);
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    },
  },

  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlag) {
      next();
    } else {
      // eslint-disable-next-line no-alert, no-restricted-globals
      const leave = confirm(
        "You have unsaved changes. Are you sure you want to leave?",
      );
      // next takes a boolean value, which will be returned by the alert confirm
      next(leave);
    }
    console.log("to", to, "from", from, "next", next);
  },
  // beforeRouteLeave(to, from, next) {
  //   this.$refs.upload.cancelUploads();
  //   next();
  // },
  // beforeRouteEnter(to, from, next) {
  //   console.log(store.state.userLoggedIn);
  //   if (store.state.userLoggedIn) {
  //     next();
  //   } else {
  //     next({ name: "home" });
  //   }
  // },
};
</script>

<style></style>
