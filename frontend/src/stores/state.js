import { defineStore } from 'pinia';

export const useStateStore = defineStore('state', {
  state: () => ({
    _id: "",
  }),
  getters: {
    loggedIn: (state) => {
      return state._id != "";
    }
  },
  actions: {
  },
});
