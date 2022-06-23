import { auth, usersCollection } from "@/includes/firebase";

export default {
  // namespaced: true,
  state: {
    authModalShow: false,
    userLoggedIn: false,
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
      console.log(state.authModalShow);
    },
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },
  actions: {
    async register({ commit }, payload) {
      const userCred = await auth.createUserWithEmailAndPassword(
        payload.email,
        payload.password,
      );
      // select a document in the collection, argument is the name of the id,
      // this connects the uid and the document id so
      // are the same in firebase
      // await usersCollection.add({
      await usersCollection.doc(userCred.user.uid).set({
        name: payload.name,
        email: payload.email,
        age: payload.age,
        country: payload.country,
      });

      await userCred.user.updateProfile({
        displayName: payload.name,
      });

      commit("toggleAuth");
    },
    async login({ commit }, payload) {
      await auth.signInWithEmailAndPassword(payload.email, payload.password);

      commit("toggleAuth");
    },
    init_login({ commit }) {
      // set user to the currentUser
      const user = auth.currentUser;
      // check if currentUser is truthy
      if (user) {
        commit("toggleAuth");
      }
    },
    async signout({ commit }) {
      await auth.signOut();

      commit("toggleAuth");

      // if using this method, you need to pass "payload" as second argument after {commit}
      // if (payload.route.meta.requiresAuth) {
      //   payload.router.push({ name: "home" });
      // }
    },
  },
};
